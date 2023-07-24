"use client"

import { useFormContext } from "react-hook-form"
import { useEffect } from "react"
import type { SongQuestion } from "@/types"
import { Colors } from "@/components/colors.tsx"
import { YearSlider } from "@/components/year-slider.tsx"
import AudioPlayer from "react-h5-audio-player"
import "react-h5-audio-player/lib/styles.css"
import { useGameContext } from "@/components/context/game.tsx"
import styles from "@/components/round.module.css"

interface Round {
  song: SongQuestion
}

export function Round({ song }: Round) {
  const { register, setValue } = useFormContext()
  const { round } = useGameContext()

  return (
    <>
      <fieldset>
        <legend>Round {round}</legend>
        <Colors
          // default to a black image
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
          className={styles.audioPlayer}
        />
        <label className={"select-none sr-only"} htmlFor={`round_${round}`}>
          Year
        </label>
        <input
          {...register(`round_${round}`, { required: true })}
          type='number'
          hidden
          className={"select-none sr-only"}
        />
        <YearSlider />
      </fieldset>
    </>
  )
}
