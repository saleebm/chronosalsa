import React from "react"
import { CurrentResultAnswer } from "@/types"
import Image from "next/image"
import styles from "@/components/result.module.scss"
import { Colors } from "@/components/colors.tsx"
import spotifyImg from "@/public/images/spotify-green.png"

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
            width={200}
            height={200}
            className={styles.albumArt}
            objectFit={"cover"}
            blurDataURL={result?.blurHash || "L00000fQfQfQfQfQfQfQfQfQfQfQ"}
            placeholder={"blur"}
          />
        </div>
        <div className={styles.infoWrap}>
          <h3 className={"text-2xl"}>
            {result.song.name} - {result.song.albumName}
          </h3>
          <h4 className={"text-xl"}>{result.song.artistName}</h4>
          <h5 className={"text-lg text-black"}>
            <span className={"line-through text-red-500"}>{result.guess}</span>
            &nbsp;{result.correctAnswer}
          </h5>
          <div className={"w-1/2 mr-auto pt-3"}>
            <a
              href={result.song.externalUrl}
              target={"_blank"}
              rel={"noopener noreferrer"}
            >
              <Image
                width={100}
                height={10}
                src={spotifyImg}
                alt={"play on spotify"}
                title={"Play on Spotify"}
              />
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
