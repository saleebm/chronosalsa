import React from "react"
import { CurrentResultAnswer } from "@/types"
import Image from "next/image"

interface Props {
  result: CurrentResultAnswer
}

export function Result({ result }: Props) {
  return (
    <div>
      <h3>{result.song.name}</h3>
      <h4>{result.song.artistName}</h4>
      <h5>{result.song.albumName}</h5>
      <p className={"text-2xl accent-purple-200"}>{result.correctAnswer}</p>
      <Image
        src={result.song.albumArtUrl}
        alt={result.song.albumName}
        width={300}
        height={300}
      />
    </div>
  )
}
