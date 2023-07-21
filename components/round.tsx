"use client"

import { useFormContext } from "react-hook-form"
import { useEffect } from "react"
import type { SongQuestion } from "@/types"
import { Colors } from "@/components/colors.tsx"
import { YearSlider } from "@/components/year-slider.tsx"
import AudioPlayer from "react-h5-audio-player"
import "react-h5-audio-player/lib/styles.css"

interface Round {
  readonly round: number
  disabled?: boolean
  song: SongQuestion
}

export function Round({ round, disabled, song }: Round) {
  const { register, setValue } = useFormContext()

  useEffect(() => {
    // reset the value of the round when the round changes
    setValue(`round_${round}`, "")
  }, [round, setValue])
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
          disabled={disabled}
          defaultValue={1969}
        />
        <YearSlider
          currentYear={1969}
          onChange={(value) => {
            setValue(`round_${round}`, value)
          }}
        />
      </fieldset>
    </>
  )
}
