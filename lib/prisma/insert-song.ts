import prisma from "@/lib/prisma/index"
import { blurhashFromURL } from "@/lib/blurhash-from-url.ts"

// todo export insertSongAwaitable (create a promise for bulk insert?)

const createArtist = async (track: SpotifyApi.TrackObjectFull) => {
  const artistData = {
    uniqueId: track.artists[0].id,
    name: track.artists[0].name,
  }
  return await prisma.artist.upsert({
    where: {
      uniqueId: track.artists[0].id,
    },
    create: artistData,
    update: artistData,
  })
}

const createAlbum = async (track: SpotifyApi.TrackObjectFull) => {
  // image url
  const image =
    Array.isArray(track.album.images) && !!track.album.images[0]
      ? track.album.images.sort((a, b) =>
          !!a.width && b.width && a.width > b.width ? -1 : 1
        )[0]
      : null
  let blurredImageData = null
  if (!!image) {
    blurredImageData = await blurhashFromURL(image.url, {
      width: 300,
      height: 300,
    })
  }
  // release year
  let releaseDate
  if (!!track.album.release_date) {
    releaseDate = new Date(track.album.release_date)
    if (isNaN(releaseDate.getTime())) {
      throw new Error(
        `Parsed invalid date date=${track.album.release_date} precision=${track.album.release_date_precision}`
      )
    }
  }
  if (!releaseDate) {
    throw new Error(
      `Did not get a release year for track=${track.name} album=${track.album.name} id=${track.id}`
    )
  }
  const albumData = {
    uniqueId: track.album.id,
    name: track.album.name,
    imageUrl: image?.url,
    releaseYear: `${releaseDate.getUTCFullYear()}`,
    releaseMonth: `${releaseDate.getUTCMonth() + 1}`,
    releaseDay: `${releaseDate.getUTCDate()}`,
    blurHash: blurredImageData?.encoded,
  }
  return await prisma.album.upsert({
    where: {
      uniqueId: track.album.id,
    },
    create: albumData,
    update: albumData,
  })
}

async function insertSongAwaitable({
  track,
  number,
  genre,
  force = false,
}: {
  track: SpotifyApi.TrackObjectFull
  number: number
  genre: string
  force?: boolean
}) {
  if (!track.preview_url) {
    throw new Error(
      `Track has no preview url name=${track.name} id=${track.id} genre=${genre}`
    )
  }
  let album = await prisma.album.findUnique({
    where: {
      uniqueId: track.album.id,
    },
  })
  if (!album || force) {
    album = await createAlbum(track)
  }
  let artists: ReadonlyArray<{ id: string }> = []
  for (const artist of track.artists) {
    let artist = await prisma.artist.findUnique({
      where: {
        uniqueId: track.artists[0].id,
      },
    })
    if (!artist || force) {
      artist = await createArtist(track)
      artists = [
        ...artists,
        {
          id: artist.id,
        },
      ]
    }
  }

  const data = {
    Album: {
      connect: {
        id: album.id,
      },
    },
    Artist: {
      connect: [],
    },
    uniqueId: track.id,
    number: number,
    genre,
    name: track.name,
    previewUrl: track.preview_url,
    externalUrl: track.external_urls.spotify,
  }

  return prisma.song.upsert({
    where: {
      uniqueId: track.id,
    },
    create: data,
    update: data,
  })
}

export async function insertSong({
  track,
  number,
  genre,
  force = false,
}: {
  track: SpotifyApi.TrackObjectFull
  number: number
  genre: string
  force?: boolean
}) {
  return await insertSongAwaitable({ track, number, genre, force })
}
