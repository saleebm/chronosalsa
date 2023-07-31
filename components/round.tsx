"use client"

import { useFormContext } from "react-hook-form"
import { YearSlider } from "@/components/year-slider.tsx"
import type H5AudioPlayer from "react-h5-audio-player"
import AudioPlayer from "react-h5-audio-player"
import "react-h5-audio-player/lib/styles.css"
import { useGameContext } from "@/components/context/game"
import styles from "@/components/round.module.css"
import { useRef } from "react"
import { useHotkeys } from "react-hotkeys-hook"

export function Round() {
  const { register } = useFormContext()
  const { round, currentSong, currentRoundName } = useGameContext()
  const ref = useRef<H5AudioPlayer>(null)
  useHotkeys(
    "space",
    () => {
      if (ref.current?.audio.current?.paused) {
        ref.current?.audio.current?.play().catch((e) => {
          console.log(e)
        })
      } else if (ref.current?.audio.current?.played) {
        ref.current?.audio.current?.pause()
      }
    },
    { preventDefault: true },
  )

  return (
    <>
      <fieldset className={styles.fieldset}>
        <legend className={`textBg ${styles.legend}`}>Round {round}</legend>
        <AudioPlayer
          showFilledProgress={true}
          autoPlayAfterSrcChange={false}
          autoPlay={false}
          src={currentSong?.previewUrl}
          showDownloadProgress={false}
          showSkipControls={false}
          showJumpControls={false}
          hasDefaultKeyBindings={false}
          className={styles.audioPlayer}
          ref={ref}
          customAdditionalControls={[]}
        />
        <label className={"select-none sr-only"} htmlFor={`round_${round}`}>
          Year
        </label>
        <input
          {...register(currentRoundName, { required: true })}
          type='number'
          hidden
          className={"select-none sr-only"}
        />
        <div className={styles.yearPickerWrap}>
          <YearSlider />
        </div>
      </fieldset>
    </>
  )
}
