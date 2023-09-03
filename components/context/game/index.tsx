"use client"
import React, { createContext, useContext, useEffect } from "react"
import { randomizeOrder } from "@/lib/utils/randomize-order.ts"
import {
  CurrentResult,
  CurrentResultAnswer,
  SongAnswer,
  SongQuestion,
  SongQuestions,
} from "@/types"
import { reverseObfuscation } from "@/lib/utils/reverse-obfuscation.ts"
import { getScore } from "@/lib/game/get-score.ts"

type Props = {
  children: React.ReactNode
  steps: number
  songs: SongQuestions
}

type Context = {
  currentSong: SongQuestion | null
  currentRoundName: string
  songOrder: Record<string, number> | null
  round: number
  currentResult: CurrentResult | null // only the current round's results if round has been submitted
  results: CurrentResult | null // accumulated results
  submitted: boolean
  steps: number
  submitRound: (guess: number, song: SongAnswer) => void
  onClickNextRound: () => void
  score: number
  roundScore: number
}

// Just find-replace "GameContext" with whatever context name you like. (ie. DankContext)
const GameContext = createContext<Context | null>(null)

export const GameContextProvider = ({ children, steps, songs }: Props) => {
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)
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

  const [score, setScore] = React.useState(0)
  const [roundScore, setRoundScore] = React.useState(0)

  // set song order on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const order = randomizeOrder(
        Array.from({ length: steps }, (_, i) => i),
      ).reduce((acc, cur, i) => ({ ...acc, [i + 1]: cur }), {})
      setSongOrder(order)
    }
  }, [steps])

  const submitRound = (guess: number, song: SongAnswer) => {
    const currentSong = songs[songOrder![round]]
    // get score
    const correctAnswer = reverseObfuscation(currentSong.releaseYear)
    const currentScore = getScore(guess, correctAnswer)
    setRoundScore(currentScore)
    setScore(score + currentScore)

    // set current result and accumulate results
    const currentRound = formFieldNames[round - 1]
    const currentResult = {
      [currentRound]: {
        guess: guess,
        song,
        correctAnswer,
        score: currentScore,
        blurHash: currentSong.blurHash,
      } as CurrentResultAnswer,
    } as CurrentResult
    const accResult = {
      ...results,
      ...currentResult,
    }
    setCurrentResult(currentResult)
    setResults(accResult)

    timeoutRef.current = setTimeout(() => {
      // scroll to bottom of page
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      })
    }, 300)
  }

  // onClickNextRound Called when the user clicks the Next Round button, after viewing the current result
  const onClickNextRound = () => {
    const currentRound = round + 1
    if (round < steps) {
      // set the next round
      setRound(currentRound)
      setCurrentResult(null)
    } else {
      // todo - submit results here, save high score to local storage
      console.log(`score ${score}`)
      console.log(`submitting ${JSON.stringify(results, null, 2)}`)
      setCurrentResult(null)
      setSubmitted(true)
    }
    timeoutRef.current = setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    }, 250)
  }

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [timeoutRef])

  return (
    <GameContext.Provider
      value={{
        songOrder,
        round,
        currentResult,
        results,
        submitted,
        steps,
        submitRound,
        onClickNextRound,
        currentSong: songOrder ? songs[songOrder[round]] : null,
        currentRoundName: formFieldNames[round - 1],
        score,
        roundScore,
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
