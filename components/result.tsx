import React from "react"
import { CurrentResultAnswer } from "@/types"
import Image from "next/image"

interface Props {
  result: CurrentResultAnswer
}

export function Result({ result }: Props) {
  return (
    <div>
      <Image
        src={result.song.albumArtUrl}
        alt={result.song.albumName}
        width={300}
        height={300}
      />
    </div>
  )
}
