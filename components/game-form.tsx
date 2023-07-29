"use client"
import styles from "@/components/game.module.css"
import { Round } from "@/components/round.tsx"
import React from "react"
import { useGameContext } from "@/components/context/game"
import { SongAnswer } from "@/types"
import { useFormContext } from "react-hook-form"

export function GameForm() {
  const { handleSubmit, unregister, reset } = useFormContext()
  const { currentResult, currentRoundName, currentSong, submitRound } =
    useGameContext()

  // onSubmit Called when the user submits the current round, calculates current result and accumulates results
  const onSubmit = handleSubmit(async (data) => {
    try {
      const guess = parseInt(data[currentRoundName])
      // fetch answer
      const response = await fetch(`/api/song?id=${currentSong?.id}`)
      const responseJson = await response.json()
      if (!responseJson.success) {
        throw new Error(responseJson.message || "Error fetching song")
      }
      const song = responseJson.song as SongAnswer

      // submit round in context
      submitRound(guess, song)

      // reset the form
      unregister(currentRoundName)
      reset(
        {},
        {
          keepValues: false,
          keepIsSubmitted: false,
        },
      )
    } catch (error) {
      console.error(error)
      //todo handle error
    }
  })

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <Round />
      <button
        disabled={!!currentResult}
        className={`btn btn-primary mt-20 ${!!currentResult ? "disabled" : ""}`}
      >
        Submit
      </button>
    </form>
  )
}
