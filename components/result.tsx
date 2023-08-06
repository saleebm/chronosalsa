import React from "react"
import { CurrentResultAnswer } from "@/types"
import Image from "next/image"
import styles from "@/components/result.module.css"

interface Props {
  result: CurrentResultAnswer
}

export function Result({ result }: Props) {
  // todo make the data look better
  return (
    <>
      <div className={styles.imageWrap}>
        <Image
          src={result.song.albumArtUrl}
          alt={result.song.albumName}
          width={640}
          height={640}
          className={styles.image}
        />
      </div>
      <div className={styles.wrap}>
        <div className={styles.albumWrap}>
          <Image
            src={result.song.albumArtUrl}
            alt={result.song.albumName}
            width={240}
            height={240}
          />
        </div>
        <div>
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
