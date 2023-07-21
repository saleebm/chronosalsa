import { NextResponse } from "next/server"
import { getAuth } from "@/lib/auth/spotify/get-auth"
import { cookies } from "next/headers"
import { getTrack } from "@/lib/spotify/get-track"
import { insertSong } from "@/lib/prisma/insert-song"

export async function GET(request: Request, response: NextResponse) {
  let error
  try {
    const authResult = await getAuth(cookies())
    if (!authResult?.authenticated)
      return new NextResponse(null, {
        status: 403,
      })

    const songs = [
      {
        id: "53ouAECHnwj8AV1fzXf5dk",
      },
      {
        id: "7Kmfjms3yyhg2y56mN7EfZ",
      },
      {
        id: "5Uve0jm1RgxKWzdSvncBDO",
      },
      {
        id: "1r6oqZhRYStrYWSeGKuCFP",
      },
      {
        id: "3QHMxEOAGD51PDlbFPHLyJ",
      },
      {
        id: "2naqSVQHgiaoEpxtkVOhmK",
      },
      {
        id: "44U35RnFHAyhnk68LWwhYj",
        releaseYear: "1930", // spotify has the wrong release year
      },
    ]
    const genre = "salsa"
    const promises: Array<Promise<any>> = []

    for (const song of songs) {
      const track = await getTrack(song.id)

      if (track && "error" in track) {
        console.error("received error from get track", track.error)
        return NextResponse.json({ success: false, error: track.error.message })
      } else {
        // seed
        const promise = insertSong({
          track,
          force: true,
          genre,
          ...("releaseYear" in song ? { releaseYear: song.releaseYear } : {}),
        })
        promises.push(promise)
      }
    }
    await Promise.allSettled(promises)

    return NextResponse.json({
      success: true,
    })
  } catch (e) {
    console.error("seed track failed", e)
    error = e instanceof Error && "message" in e ? e.message : "unknown error"
  }

  return NextResponse.json({ success: false, error: error })
}
