import React from "react"
import { useGameContext } from "@/components/context/game.tsx"

export function Result() {
  const {
    currentResult,
    round,
    setRound,
    steps,
    setSubmitted,
    setCurrentResult,
    results,
  } = useGameContext()

  // onClickNextRound Called when the user clicks the Next Round button, after viewing the current result
  const onClickNextRound = () => {
    const currentRound = round + 1
    if (round < steps) {
      setRound(currentRound)
      setCurrentResult(null)
    } else {
      // todo submit
      console.log(`submitting ${JSON.stringify(results, null, 2)}`)
      setCurrentResult(null)
      setSubmitted(true)
    }
  }
  return !!currentResult ? (
    <>
      <h2>Result</h2>
      <pre>{JSON.stringify(currentResult, null, 2)}</pre>
      <button className={"btn btn-outline-primary"} onClick={onClickNextRound}>
        {/* if round equals steps, then it is time to see the final results */}
        {round === steps ? "Submit" : "Next Round"}
      </button>
    </>
  ) : null
}
