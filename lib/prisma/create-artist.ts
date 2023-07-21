import prisma from "@/lib/prisma/index.ts"

export const createArtist = async (track: SpotifyApi.TrackObjectFull) => {
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
