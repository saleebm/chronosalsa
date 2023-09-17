"use client"
import React from "react"
import { useGameContext } from "@/components/context/game"
import styles from "@/components/current-result.module.css"
import { RoundResult } from "@/components/round-result.tsx"

export function CurrentResult() {
  const { currentResult, round, currentRoundName, steps, onClickNextRound } =
    useGameContext()

  return !!currentResult ? (
    <div className={styles.wrap}>
      <h2 className={"title text-bg"}>Result</h2>
      <RoundResult result={currentResult[currentRoundName]} />
      <button className={"btn btn-primary"} onClick={onClickNextRound}>
        {/* if round equals steps, then it is time to see the final results */}
        {round === steps ? "See final results" : "Next Round"}
      </button>
    </div>
  ) : null
}
