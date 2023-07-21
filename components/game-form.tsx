import styles from "@/components/game.module.css"
import { Round } from "@/components/round.tsx"
import React, { useEffect, useMemo } from "react"

// todo: don't use any
type TODO = any

export function GameForm({
  currentResult,
  onSubmit,
  round,
  songs,
  songOrder,
}: TODO) {
  useEffect(() => {
    console.log(
      `
      songOrder: ${JSON.stringify(songOrder, null, 2)}
      songOrder[round]: ${songOrder[round]}\nsong: ${
        JSON.stringify(songs[songOrder[round]], null, 2) || "null"
      }`,
    )
  })
  // this optimization actually helps lol without it, I get a lot of re-renders and warning
  // about server client mismatch
  return useMemo(
    () => (
      <form className={styles.form} onSubmit={onSubmit}>
        <Round
          round={round}
          disabled={!!currentResult}
          song={songs[songOrder[round]]}
        />
        {!currentResult && (
          <button className={"btn btn-primary mt-20"}>Submit</button>
        )}
      </form>
    ),
    [currentResult, onSubmit, round, songs, songOrder],
  )
}
