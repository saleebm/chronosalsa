import { insertSong } from "@/lib/prisma/insert-song.ts"

export type BulkSong = {
  id: string
  releaseYear?: string
  type?: "playlist"
}

export async function bulkInsertSongs(
  tracks: Array<SpotifyApi.TrackObjectFull | undefined | null>,
  genre: string,
  optional: Record<string, BulkSong> = {},
  force = false,
) {
  const promises: Array<any> = []
  for (const track of tracks) {
    if (!track) continue

    let song = optional[track.id] || {}
    const promise = await insertSong({
      track,
      force,
      genre,
      ...("releaseYear" in song ? { releaseYear: song.releaseYear } : {}),
    })
    promises.push(promise)
  }
  return promises
}
