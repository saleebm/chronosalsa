import { NextResponse } from "next/server"
import { getAuth } from "@/lib/auth/spotify/get-auth"
import { cookies } from "next/headers"
import { getPlaylistItems } from "@/lib/spotify/get-playlist-items.ts"
import { bulkInsertSongs } from "@/lib/prisma/bulk-insert-songs.ts"

export async function POST(request: Request, response: NextResponse) {
  let error
  try {
    const authResult = await getAuth(cookies())
    if (!authResult?.authenticated)
      return new NextResponse(null, {
        status: 403,
      })

    const { playlistId, genre: genreRaw, force } = await request.json()
    const genre = genreRaw.toLowerCase()

    const playlistItems = await getPlaylistItems(playlistId, force)
    if ("error" in playlistItems) {
      return new NextResponse(JSON.stringify(playlistItems), {
        status: 500,
      })
    } else {
      const { items } = playlistItems

      const result = await bulkInsertSongs(items, genre, force)
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
