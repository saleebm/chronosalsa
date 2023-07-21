import styles from "@/app/page.module.css"
import { Game } from "@/components/game.tsx"
import prisma from "@/lib/prisma"
import { obfuscateYear } from "@/lib/utils/obfuscate.ts"
import React from "react"

export const metadata = {
  title: "Play",
}

// todo get songs without revealing answers
const getProps = async () => {
  const pageSize = 5
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

  const ids = results.map((item) => item.id)
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
  return {
    songs: songs.map((song) => ({
      releaseYear: obfuscateYear(song.Album!.releaseYear),
      blurHash: song.Album!.blurHash,
      previewUrl: song.previewUrl,
      id: song.id,
    })),
  }
}

export default async function Play() {
  const data = await getProps()

  // todo: don't hard code 5, pass in as prop
  const steps = 5

  return (
    <main className={`${styles.main} container`}>
      <h1 className={styles.title}>Play</h1>
      <Game songs={data.songs} steps={steps} />
    </main>
  )
}
