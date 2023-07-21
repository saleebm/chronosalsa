import React, { createContext, useContext, useState, useEffect } from "react"
import { randomizeOrder } from "@/lib/utils/randomize-order.ts"

type Props = {
  children: React.ReactNode
  steps: number
}

type CurrentResult = Record<string, string>

type Context = {
  songOrder: Record<string, number> | null
  setSongOrder: React.Dispatch<React.SetStateAction<Context["songOrder"]>>
  round: number
  setRound: React.Dispatch<React.SetStateAction<Context["round"]>>
  currentResult: CurrentResult | null // only the current round's results if round has been submitted
  setCurrentResult: React.Dispatch<
    React.SetStateAction<Context["currentResult"]>
  >
  results: CurrentResult | null // accumulated results
  setResults: React.Dispatch<React.SetStateAction<Context["results"]>>
  submitted: boolean
  setSubmitted: React.Dispatch<React.SetStateAction<Context["submitted"]>>
  formFieldNames: Array<string>
  steps: number
}

// Just find-replace "GameContext" with whatever context name you like. (ie. DankContext)
const GameContext = createContext<Context | null>(null)

export const GameContextProvider = ({ children, steps }: Props) => {
  // songOrder is the order of songs, it is randomized from the get go
  // it is an object with the key as the round number and the value as the index of the song in the songs array
  const [songOrder, setSongOrder] = React.useState<Context["songOrder"]>(null)

  // round is the current round and is incremented when the user submits the current round
  const [round, setRound] = React.useState(1)

  // current result is the result of the current round and is null if the round has not been submitted
  const [currentResult, setCurrentResult] = React.useState<
    Context["currentResult"] | null
  >(null)

  // results is the accumulated results of all rounds
  const [results, setResults] = React.useState<Context["results"] | null>(null)

  // submitted is true when the user has submitted the last round
  const [submitted, setSubmitted] = React.useState<boolean>(false)

  // make an array of form names
  const [formFieldNames, _] = React.useState(() =>
    Array.from({ length: steps }, (_, i) => `round_${i + 1}`),
  )

  // set song order on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const order = randomizeOrder(
        Array.from({ length: steps }, (_, i) => i),
      ).reduce((acc, cur, i) => ({ ...acc, [i + 1]: cur }), {})
      setSongOrder(order)
    }
  }, [steps])

  return (
    <GameContext.Provider
      value={{
        songOrder,
        setSongOrder,
        round,
        setRound,
        currentResult,
        setCurrentResult,
        results,
        setResults,
        submitted,
        setSubmitted,
        formFieldNames,
        steps,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

export const useGameContext = () => {
  const context = useContext(GameContext)

  if (!context)
    throw new Error(
      "GameContext must be called from within the GameContextProvider",
    )

  return context
}
