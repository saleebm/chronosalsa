import prisma from "@/lib/prisma/index"

// todo export insertSongAwaitable (create a promise for bulk insert?)

export async function insertSong(track: SpotifyApi.TrackObjectFull) {
  console.log(track.album.images)
  // todo test
  const imageUrl =
    Array.isArray(track.album.images) && !!track.album.images[0]
      ? track.album.images.sort((a, b) =>
          !!a.width && b.width && a.width > b.width ? 1 : -1
        )[0].url
      : null

  // await prisma.song.create({
  //   data: {
  //     Album: {
  //       connectOrCreate: {
  //         where: {
  //           uniqueId: track.album.id,
  //         },
  //         create: {
  //           uniqueId: track.album.id,
  //           name: track.album.name,
  //           imageUrl: imageUrl,
  //         },
  //       },
  //     },
  //   },
  // })
}
