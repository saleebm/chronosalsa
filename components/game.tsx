"use client"
import React, { useEffect } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { SongQuestion } from "@/types"
import { GameForm } from "@/components/game-form.tsx"

// todo: don't use any
type TODO = any

const randomizeOrder = (array: Array<any>) => {
  const result = [...array]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i)
    const temp = result[i]
    result[i] = result[j]
    result[j] = temp
  }
  return result
}

// todo no optimizations
export function Game({
  songs,
  steps,
}: {
  songs: Array<SongQuestion>
  steps: number
}) {
  // songOrder is the order of songs, it is randomized from the get go
  // it is an object with the key as the round number and the value as the index of the song in the songs array
  const [songOrder, setSongOrder] = React.useState<TODO>(null)
  // round is the current round and is incremented when the user submits the current round
  const [round, setRound] = React.useState(1)
  // current result is the result of the current round and is null if the round has not been submitted
  const [currentResult, setCurrentResult] = React.useState<TODO>(null)
  // results is the accumulated results of all rounds
  const [results, setResults] = React.useState<TODO>(null)
  // submitted is true when the user has submitted the last round
  const [submitted, setSubmitted] = React.useState<boolean>(false)
  // make an array of form names
  const formFieldNames = Array.from(
    { length: steps },
    (_, i) => `round_${i + 1}`,
  )
  const methods = useForm()
  // onSubmit Called when the user submits the current round, calculates current result and accumulates results
  const onSubmit = methods.handleSubmit((data) => {
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
    methods.reset(accResult, {
      keepValues: false,
      keepIsSubmitted: false,
    })
    // todo scroll to current results after timeout
  })
  useEffect(() => {
    if (typeof window !== "undefined") {
      const order = randomizeOrder(
        Array.from({ length: steps }, (_, i) => i),
      ).reduce((acc, cur, i) => ({ ...acc, [i + 1]: cur }), {})
      setSongOrder(order)
    }
  }, [songs, steps])
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
  return (
    <FormProvider {...methods}>
      {/*begin section for rounds*/}
      <section id={"round"} className={"section"}>
        <h2>Game</h2>
        {songOrder != null && round <= steps && !submitted && (
          <GameForm
            currentResult={currentResult}
            onSubmit={onSubmit}
            round={round}
            songs={songs}
            songOrder={songOrder}
          />
        )}
      </section>
      {/*end section for rounds*/}
      {/*begin section for current result*/}
      <section id={"current-result"} className={"section"}>
        {!!currentResult && (
          <>
            <h2>Result</h2>
            <pre>{JSON.stringify(currentResult, null, 2)}</pre>
            <button
              className={"btn btn-outline-primary"}
              onClick={onClickNextRound}
            >
              {round === steps ? "Submit" : "Next Round"}
            </button>
          </>
        )}
      </section>
      {/*end section for current result*/}
      {/*begin section for results*/}
      {/*todo move to separate page, redirect to url with list of ids?*/}
      <section id={"results"} className={"section"}>
        {submitted && (
          <>
            <h2>Results</h2>
            <pre>{JSON.stringify(results, null, 2)}</pre>
          </>
        )}
      </section>
      {/*end section for results*/}
    </FormProvider>
  )
}
