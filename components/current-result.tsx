"use client"
import React from "react"
import { useGameContext } from "@/components/context/game"
import { Result } from "@/components/result.tsx"
import styles from "@/components/current-result.module.css"
import { Score } from "@/components/score.tsx"

export function CurrentResult() {
  const {
    currentResult,
    roundScore,
    round,
    currentRoundName,
    steps,
    onClickNextRound,
  } = useGameContext()

  return !!currentResult ? (
    <div className={styles.wrap}>
      <h2>Result</h2>
      <Score score={roundScore} />
      <Result result={currentResult[currentRoundName]} />
      <button className={"btn btn-outline-primary"} onClick={onClickNextRound}>
        {/* if round equals steps, then it is time to see the final results */}
        {round === steps ? "See final results" : "Next Round"}
      </button>
    </div>
  ) : null
}
