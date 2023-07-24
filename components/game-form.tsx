import styles from "@/components/game.module.css"
import { Round } from "@/components/round.tsx"
import React from "react"
import { useGameContext } from "@/components/context/game.tsx"
import { SongQuestions } from "@/types"
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
    console.log(`round submitted - ${JSON.stringify(data, null, 2)}`)
    if (!songOrder) {
      throw new Error("songOrder is null")
    }
    const currentSong = songs[songOrder[round]]
    // todo
    const songData = await fetch(`/api/song?id=${currentSong.id}`)
    const song = await songData.json()
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
    // scroll to #current-result
    const currentResultEl = document.getElementById("current-result")
    if (currentResultEl) {
      currentResultEl.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })

  return songOrder ? (
    <form className={styles.form} onSubmit={onSubmit}>
      <Round song={songs[songOrder[round]]} />
      {!currentResult && (
        <button className={"btn btn-primary mt-20"}>Submit</button>
      )}
    </form>
  ) : null
}
