import type { Prisma } from "@prisma/client"
import prisma from "@/lib/prisma/index"
import { createAlbum } from "@/lib/prisma/create-album.ts"
import { createArtist } from "@/lib/prisma/create-artist.ts"

export interface InsertSongProps {
  track: SpotifyApi.TrackObjectFull
  genre: string
  force?: boolean
  releaseYear?: string | null
}

// todo optimize this for bulk insert
export async function insertSong({
  track,
  genre,
  force = false,
  releaseYear = null,
}: InsertSongProps) {
  try {
    if (!track.preview_url) {
      throw new Error(
        `Track has no preview url name=${track.name} id=${track.id} genre=${genre}`,
      )
    }
    let album = await prisma.album.findUnique({
      where: {
        uniqueId: track.album.id,
      },
    })
    if (!album || force) {
      console.log(`Creating album for track=${track.name} id=${track.id}`)
      album = await createAlbum(track)
    }
    if (releaseYear && album.releaseYear !== releaseYear) {
      await prisma.album.update({
        where: {
          uniqueId: track.album.id,
        },
        data: {
          releaseYear,
        },
      })
    }
    let artists: Array<{ id: string }> = []
    for (const trackArtist of track.artists) {
      let artist = await prisma.artist.findUnique({
        where: {
          uniqueId: trackArtist.id,
        },
      })
      if (!artist || force) {
        artist = await createArtist(track)
      }
      artists = [
        ...artists,
        {
          id: artist.id,
        },
      ]
    }

    const data = {
      Album: {
        connect: {
          id: album.id,
        },
      },
      Artist: {
        connect: artists as Prisma.ArtistWhereUniqueInput[],
      },
      uniqueId: track.id,
      genre,
      name: track.name,
      previewUrl: track.preview_url,
      externalUrl: track.external_urls.spotify,
    }

    return await prisma.song.upsert({
      where: {
        uniqueId: track.id,
      },
      create: data,
      update: data,
    })
  } catch (e) {
    console.error(e)
  }
}
