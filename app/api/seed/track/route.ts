import { NextResponse } from "next/server"
import { getAuth } from "@/lib/auth/spotify/get-auth"
import { cookies } from "next/headers"
import { getTrack } from "@/lib/spotify/get-track"
import { insertSong } from "@/lib/prisma/insert-song"

export async function POST(request: Request, response: NextResponse) {
  try {
    const authResult = await getAuth(cookies())
    if (!authResult?.authenticated)
      return new NextResponse(null, {
        status: 403
      })

    const { trackId } = await request.json()
    const track = await getTrack(trackId)

    if (track && "error" in track) {
      console.error("received error from get track", track.error)
      return NextResponse.json({ success: false, error: track.error.message })
    } else {
      // seed
      await insertSong(track)
      return NextResponse.json({
        success: true
      })
    }
  } catch (e) {
    console.error("seed track failed", e)
  }

  return NextResponse.json({ success: false })
}
