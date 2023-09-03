import styles from "@/app/page.module.scss"
import { Game } from "@/components/game.tsx"
import prisma from "@/lib/prisma"
import { obfuscateYear } from "@/lib/utils/obfuscate.ts"
import { GameContextWrap } from "@/components/context/game/wrap.tsx"

export const metadata = {
  title: "Play",
}

export const dynamic = "force-dynamic"
export const revalidate = 0

// todo: don't hard code 5, pass in as prop along with genre
const pageSize = 5

const getProps = async () => {
  let ids: string[] = []
  try {
    // todo: don't use raw query
    // query for songs with genre salsa and use mysql rand() function to randomize
    const results = await prisma.$queryRawUnsafe<{ id: string }[]>(
      // select where genre is equal to "salsa" using a mysql query
      `SELECT id
     FROM Song
     WHERE genre = "salsa"
     ORDER BY RAND() LIMIT ${pageSize};`,
    )
    if (!results) {
      console.error(`Error: ${results}`)
      throw new Error("Error: no results")
    }

    ids = results.map((item) => item.id)
  } catch (e) {
    console.error(`Error:`, e)
    return {
      songs: [],
      error: e instanceof Error ? e.message : "unknown error",
    }
  }

  const songs = await prisma.song.findMany({
    where: {
      id: {
        in: ids,
      },
    },
    include: {
      Album: true,
      Artist: true,
    },
  })
  try {
    await prisma.playedHistory.create({
      data: {
        songs: {
          connect: ids.map((id) => ({
            id,
          })),
        },
      },
    })
  } catch (e) {
    console.error(`Error creating played history: ${e}`)
  }
  return {
    songs: songs.map((song) => ({
      // try to keep myself from cheating
      releaseYear: obfuscateYear(song.Album!.releaseYear),
      blurHash: song.Album!.blurHash,
      previewUrl: song.previewUrl,
      id: song.id,
    })),
  }
}

export default async function Play() {
  const data = await getProps()
  if (process.env.NODE_ENV === "development") {
    console.table(data)
  }

  return (
    <main className={`${styles.main} container`}>
      <h1 className={"title text-bg"}>Play</h1>
      <GameContextWrap songs={data.songs} steps={pageSize}>
        <Game />
      </GameContextWrap>
    </main>
  )
}
