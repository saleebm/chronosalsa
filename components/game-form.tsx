import styles from "@/components/game.module.css"
import { Round } from "@/components/round.tsx"
import React, { useEffect } from "react"
import { useGameContext } from "@/components/context/game.tsx"
import { SongQuestions } from "@/types"
import { useFormContext } from "react-hook-form"

// todo: don't use any
export type GameFormProps = {
  songs: SongQuestions
}

export function GameForm({ songs }: GameFormProps) {
  const {
    submitted,
    steps,
    songOrder,
    formFieldNames,
    round,
    currentResult,
    setCurrentResult,
    results,
    setResults,
  } = useGameContext()
  // log songOrder
  useEffect(() => {
    if (songOrder != null && process.env.NODE_ENV === "development") {
      console.log(
        `
      songOrder: ${JSON.stringify(songOrder, null, 2)}
      songOrder[round]: ${songOrder[round]}\nsong: ${
        JSON.stringify(songs[songOrder[round]], null, 2) || "null"
      }`,
      )
    }
  }, [songOrder, round, songs])

  // handle submit
  const { handleSubmit, reset } = useFormContext()
  // onSubmit Called when the user submits the current round, calculates current result and accumulates results
  const onSubmit = handleSubmit((data) => {
    console.log(`form submitted - ${JSON.stringify(data, null, 2)}`)
    const currentRound = formFieldNames[round - 1]
    const currentResult = {
      [currentRound]: data[currentRound],
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
    // todo scroll to current results after timeout
  })
  // this optimization actually helps lol. Without it, I get a lot of re-renders and warning
  // about server client mismatch
  return songOrder != null && round <= steps && !submitted ? (
    <form className={styles.form} onSubmit={onSubmit}>
      <Round song={songs[songOrder[round]]} />
      {!currentResult && (
        <button className={"btn btn-primary mt-20"}>Submit</button>
      )}
    </form>
  ) : null
}
