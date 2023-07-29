import { blurhashFromURL } from "@/lib/blurhash-from-url.ts"
import prisma from "@/lib/prisma/index.ts"

export const createAlbum = async (track: SpotifyApi.TrackObjectFull) => {
  // todo optimize this
  // image url
  const image =
    Array.isArray(track.album.images) && !!track.album.images[0]
      ? track.album.images.sort((a, b) =>
          !!a.width && b.width && a.width > b.width ? -1 : 1,
        )[0]
      : null
  let blurredImageData = null
  if (!!image) {
    blurredImageData = await blurhashFromURL(image.url, {
      width: 640,
      height: 640,
    })
    console.log("blurredImageData", blurredImageData)
  }
  // release year
  let releaseDate
  if (!!track.album.release_date) {
    releaseDate = new Date(track.album.release_date)
    if (isNaN(releaseDate.getTime())) {
      throw new Error(
        `Parsed invalid date date=${track.album.release_date} precision=${track.album.release_date_precision}`,
      )
    }
  }
  if (!releaseDate) {
    throw new Error(
      `Did not get a release year for track=${track.name} album=${track.album.name} id=${track.id}`,
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
