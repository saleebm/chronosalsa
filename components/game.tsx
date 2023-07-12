"use client"
import React from "react"
import { FormProvider, useForm } from "react-hook-form"
import { Round } from "@/components/round.tsx"

// todo: don't hard code 5
const steps = 5
// todo
type TODO = any

export function Game() {
  const [round, setRound] = React.useState(1)
  const [currentResult, setCurrentResult] = React.useState<TODO>(null)
  const [results, setResults] = React.useState<TODO>(null)
  const [submitted, setSubmitted] = React.useState<boolean>(false)
  const methods = useForm()
  const onSubmit = methods.handleSubmit((data) => {
    console.log(data)
    const currentResult = {
      [`round_${round}`]: data[`round_${round}`],
    }
    const accResult = {
      ...results,
      ...currentResult,
    }
    setCurrentResult(currentResult)
    setResults(accResult)
    methods.reset()
  })
  const onClickNextRound = () => {
    if (round < steps) {
      setRound(round + 1)
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
      <section className={"section"}>
        {round <= steps && !submitted && (
          <form onSubmit={onSubmit}>
            <Round round={round} disabled={!!currentResult} />
            {!currentResult && (
              <button className={"btn btn-primary"}>Submit</button>
            )}
          </form>
        )}
      </section>
      {/*end section for rounds*/}
      {/*begin section for current result*/}
      <section className={"section"}>
        {!!currentResult && (
          <>
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
      <section className={"section"}>
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
