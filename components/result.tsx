import React from "react"
import { CurrentResultAnswer } from "@/types"
import Image from "next/image"
import styles from "@/components/result.module.scss"
import { Colors } from "@/components/colors.tsx"

interface Props {
  result: CurrentResultAnswer
}

export function Result({ result }: Props) {
  // todo make the data look better
  return (
    <>
      <Colors
        blurhashData={result?.blurHash || "L00000fQfQfQfQfQfQfQfQfQfQfQ"}
      />
      <div className={styles.wrap}>
        <div className={styles.albumWrap}>
          <Image
            src={result.song.albumArtUrl}
            alt={result.song.albumName}
            width={250}
            height={250}
            className={styles.albumArt}
            objectFit={"cover"}
            blurDataURL={result?.blurHash || "L00000fQfQfQfQfQfQfQfQfQfQfQ"}
            placeholder={"blur"}
          />
        </div>
        <div className={styles.infoWrap}>
          <h3 className={"text-4xl"}>{result.song.name}</h3>
          <p className={"text-lg"}>
            {result.song.albumName} - {result.song.artistName}
          </p>
          {/*todo year slider with right year*/}
          <p className={"text-2xl w-full"}>
            Guessed:{" "}
            <span className={"text-purple-400 font-bold text-3xl"}>
              {result.guess}
            </span>
          </p>
          <p className={"text-2xl w-full"}>
            Released:{" "}
            <span className={"text-green-500 font-bold text-3xl"}>
              {result.correctAnswer}
            </span>
          </p>
        </div>
      </div>
    </>
  )
}
