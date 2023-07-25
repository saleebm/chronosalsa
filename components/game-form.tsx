import styles from "@/components/game.module.css"
import { Round } from "@/components/round.tsx"
import React from "react"
import { useGameContext } from "@/components/context/game.tsx"
import { SongAnswer, SongQuestions } from "@/types"
import { useFormContext } from "react-hook-form"

// todo: don't use any
export type GameFormProps = {
  songs: SongQuestions
}

export function GameForm({ songs }: GameFormProps) {
  const { handleSubmit, reset } = useFormContext()
  const {
    songOrder,
    formFieldNames,
    round,
    currentResult,
    setCurrentResult,
    results,
    setResults,
  } = useGameContext()

  // onSubmit Called when the user submits the current round, calculates current result and accumulates results
  const onSubmit = handleSubmit(async (data) => {
    try {
      console.log(`round submitted - ${JSON.stringify(data, null, 2)}`)
      const currentSong = songs[songOrder![round]]
      const response = await fetch(`/api/song?id=${currentSong.id}`)
      const responseJson = await response.json()
      if (!responseJson.success) {
        throw new Error(responseJson.message || "Error fetching song")
      }
      const song = responseJson.song as SongAnswer

      // set current result and accumulate results
      const currentRound = formFieldNames[round - 1]
      const currentResult = {
        [currentRound]: {
          guess: data[currentRound],
          song,
        },
      }
      const accResult = {
        ...results,
        ...currentResult,
      }
      setCurrentResult(currentResult)
      setResults(accResult)
      // reset the form, but sets values as accResult
      reset(accResult, {
        keepValues: false,
        keepIsSubmitted: false,
      })

      // scroll to #current-result
      const currentResultEl = document.getElementById("current-result")
      if (currentResultEl) {
        currentResultEl.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    } catch (error) {
      console.error(error)
    }
  })

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <Round song={songOrder ? songs[songOrder[round]] : null} />
      <button
        disabled={!!currentResult}
        className={`btn btn-primary mt-20 ${!!currentResult ? "disabled" : ""}`}
      >
        Submit
      </button>
    </form>
  )
}
