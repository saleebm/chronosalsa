"use client"

import { useFormContext } from "react-hook-form"
import { useEffect } from "react"
import type { SongQuestion } from "@/types"
import { Colors } from "@/components/colors.tsx"
import { YearSlider } from "@/components/year-slider.tsx"
import AudioPlayer from "react-h5-audio-player"
import "react-h5-audio-player/lib/styles.css"
import { useGameContext } from "@/components/context/game.tsx"

interface Round {
  song: SongQuestion
}

export function Round({ song }: Round) {
  const { register, setValue } = useFormContext()
  const { round, currentResult } = useGameContext()

  return (
    <>
      <fieldset>
        <legend>Round {round}</legend>
        <Colors
          blurhashData={song.blurHash || "L00000fQfQfQfQfQfQfQfQfQfQfQ"}
        />
        <AudioPlayer
          showFilledProgress={true}
          autoPlayAfterSrcChange={false}
          autoPlay={false}
          src={song.previewUrl}
          showDownloadProgress={false}
          showSkipControls={false}
          showJumpControls={false}
          hasDefaultKeyBindings={false}
        />
        <label htmlFor={`round_${round}`}>Year</label>
        <input
          {...register(`round_${round}`, { required: true })}
          type='number'
          disabled={!!currentResult}
        />
        <YearSlider />
      </fieldset>
    </>
  )
}
