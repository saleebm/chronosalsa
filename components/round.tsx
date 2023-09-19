"use client"
import type H5AudioPlayer from "react-h5-audio-player"
import AudioPlayer from "react-h5-audio-player"

import { useEffect, useRef } from "react"
import { useHotkeys } from "react-hotkeys-hook"
import { useFormContext } from "react-hook-form"
import { YearSlider } from "@/components/year-slider.tsx"
import { useGameContext } from "@/components/context/game"
import { reverseObfuscation } from "@/lib/utils/reverse-obfuscation.ts"
import styles from "@/components/round.module.scss"

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

  useEffect(() => {
    if (ref.current?.audio?.current) {
      // set progress to 0
      ref.current.audio.current.currentTime = 0
    }
  }, [round])

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.log(`round ${round}`, {
        answer: reverseObfuscation(`${currentSong?.releaseYear}`),
      })
    }
  }, [round, currentSong])

  return (
    <fieldset className={styles.fieldset}>
      <legend className={`text-bg ${styles.legend}`}>
        <span>Round {round}</span>
      </legend>
      <AudioPlayer
        showFilledProgress
        autoPlayAfterSrcChange={false}
        autoPlay={false}
        src={currentSong?.previewUrl}
        showDownloadProgress={false}
        showSkipControls={false}
        showJumpControls={false}
        hasDefaultKeyBindings={false}
        className={styles.audioPlayer}
        ref={ref}
        layout={"stacked-reverse"}
        customAdditionalControls={[
          <div tabIndex={0} key={"1"} className='help-tip'>
            <label
              htmlFor={`round_${round}`}
              className={`select-none ${styles.label}`}
            >
              Listen to the song and guess the year it was released.
            </label>
          </div>,
        ]}
      />
      <div className={styles.yearPickerWrap}>
        <YearSlider />
        <input
          {...register(currentRoundName, { required: true })}
          type='number'
          hidden
          className={"select-none sr-only"}
        />
      </div>
    </fieldset>
  )
}
