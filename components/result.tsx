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
        <h3 className={"text-4xl"}>{result.song.name}</h3>
        <h4 className={"text-2xl"}>{result.song.artistName}</h4>
        <h5>{result.song.albumName}</h5>
        {/*todo year slider with right year*/}
        <p className={"text-2xl w-full"}>
          Guessed:{" "}
          <span className={"text-purple-800 font-bold"}>{result.guess}</span>
        </p>
        <p className={"text-2xl w-full"}>
          Release year:{" "}
          <span className={"text-green-800 font-bold"}>
            {result.correctAnswer}
          </span>
        </p>
      </div>
    </>
  )
}
