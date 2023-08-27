"use client"
import React from "react"
import { useGameContext } from "@/components/context/game"
import { Result } from "@/components/result.tsx"
import { Score } from "@/components/score.tsx"
import styles from "@/components/current-result.module.css"

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
      <h2 className={"title text-bg"}>Result</h2>
      <Score score={roundScore} />
      <Result result={currentResult[currentRoundName]} />
      <button className={"btn btn-primary"} onClick={onClickNextRound}>
        {/* if round equals steps, then it is time to see the final results */}
        {round === steps ? "See final results" : "Next Round"}
      </button>
    </div>
  ) : null
}
