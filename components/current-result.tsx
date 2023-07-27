import React from "react"
import { useGameContext } from "@/components/context/game.tsx"
import { Result } from "@/components/result.tsx"

export function CurrentResult() {
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
      // set the next round
      setRound(currentRound)
      setCurrentResult(null)
    } else {
      // todo - submit results
      console.log(`submitting ${JSON.stringify(results, null, 2)}`)
      setCurrentResult(null)
      setSubmitted(true)
    }
  }

  return !!currentResult ? (
    <>
      <h2>Result</h2>
      <Result result={currentResult} />
      <button className={"btn btn-outline-primary"} onClick={onClickNextRound}>
        {/* if round equals steps, then it is time to see the final results */}
        {round === steps ? "Submit" : "Next Round"}
      </button>
    </>
  ) : null
}
