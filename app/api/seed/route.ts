import { NextResponse } from "next/server"
import fs from "fs"
import { cookies } from "next/headers"
import { getAuth } from "@/lib/auth/spotify/get-auth"
import { getTracks } from "@/lib/spotify/get-tracks.ts"
import { bulkInsertSongs, BulkSong } from "@/lib/prisma/bulk-insert-songs.ts"
import { getPlaylistItems } from "@/lib/spotify/get-playlist-items.ts"

// todo this should run in a worker
export async function GET(request: Request, response: NextResponse) {
  let error
  const { searchParams } = new URL(request.url)
  const force = searchParams.get("force") === "true"
  console.log("getSeed begin force", force)
  try {
    const authResult = await getAuth(cookies())
    if (!authResult?.authenticated)
      return new NextResponse(null, {
        status: 403,
      })

    // read seed file `pwd`/fixtures/seed.json
    const fileSync = fs.readFileSync(
      `${process.cwd()}/fixtures/seed.json`,
      "utf8",
    )
    if (!fileSync) {
      console.error("could not read seed file")
      return NextResponse.json({ success: false, error: "could not read file" })
    }
    const songs = JSON.parse(fileSync) as Array<BulkSong>
    if (!songs || songs.length === 0) {
      console.error("no songs found in seed file")
      return NextResponse.json({ success: false, error: "no songs found" })
    }
    const trackIds = songs.filter((s) => s.type !== "playlist").map((s) => s.id)
    let data = await getTracks(trackIds)
    const playlists = songs.filter((s) => s.type === "playlist")
    if (playlists.length > 0) {
      const playlistIds = playlists.map((p) => p.id)
      for (const playlistId of playlistIds) {
        const playlistData = await getPlaylistItems(playlistId)
        if ("error" in playlistData) {
          console.error(
            "received error from get playlist items, data: ",
            playlistData,
          )
          return NextResponse.json({
            success: false,
            error: playlistData.error.message,
          })
        }
        data ||= { tracks: [] }
        // todo types
        if (!("tracks" in data)) (data as any).tracks = []
        ;(data as any).tracks.push(...playlistData.items)
      }
    }
    if (!data || "error" in data || !("tracks" in data)) {
      const errMsg =
        data != null && "error" in data ? data.error.message : "unknown error"
      console.error("received error from get tracks, data: ", data)
      return NextResponse.json({ success: false, error: errMsg })
    }
    for (const song of songs) {
      if (song.type === "playlist") continue

      const track = data.tracks.find((t) => t.id === song.id)
      if (!track) {
        console.error("could not find track for song", song)
        return NextResponse.json({
          success: false,
          error: `missing track for song ${song.id}`,
        })
      }
    }
    // optional is a record of id to the song object
    const optional: Record<string, BulkSong> = songs.reduce(
      (acc, song) => {
        acc[song.id] = song
        return acc
      },
      {} as Record<string, BulkSong>,
    )
    const results = await bulkInsertSongs(data.tracks, "salsa", optional, force)
    return NextResponse.json({
      success: true,
      results,
    })
  } catch (e) {
    console.error("seed track failed\n", e)
    error = e instanceof Error && "message" in e ? e.message : "unknown error"
  }

  return NextResponse.json({ success: false, error: error })
}
