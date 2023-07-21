import { NextResponse } from "next/server"
import { getAuth } from "@/lib/auth/spotify/get-auth"
import { cookies } from "next/headers"
import { getTrack } from "@/lib/spotify/get-track"
import { insertSong } from "@/lib/prisma/insert-song"

export async function POST(request: Request, response: NextResponse) {
  let error
  try {
    const authResult = await getAuth(cookies())
    if (!authResult?.authenticated)
      return new NextResponse(null, {
        status: 403,
      })

    const { trackId, genre: genreRaw, force } = await request.json()
    const genre = genreRaw.toLowerCase()
    const track = await getTrack(trackId, force)

    if (track && "error" in track) {
      console.error("received error from get track", track.error)
      return NextResponse.json({ success: false, error: track.error.message })
    } else {
      // seed
      const result = await insertSong({
        track,
        force,
        genre,
      })
      return NextResponse.json({
        success: true,
        result,
      })
    }
  } catch (e) {
    console.error("seed track failed", e)
    error = e instanceof Error && "message" in e ? e.message : "unknown error"
  }

  return NextResponse.json({ success: false, error: error })
}
