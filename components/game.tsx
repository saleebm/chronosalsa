"use client"
import React from "react"
import { FormProvider, useForm } from "react-hook-form"
import { SongQuestion, SongQuestions } from "@/types"
import { GameForm } from "@/components/game-form.tsx"
import { GameContextProvider } from "@/components/context/game.tsx"
import { Result } from "@/components/result.tsx"

// todo no optimizations?????
export function Game({
  songs,
  steps,
}: {
  songs: SongQuestions
  steps: number
}) {
  // useForm is a hook from react-hook-form that provides methods for managing the form, context
  // is used on the input components to access the methods
  const methods = useForm()

  return (
    <FormProvider {...methods}>
      <GameContextProvider steps={steps}>
        {/*begin section for rounds*/}
        <section id={"round"} className={"section"}>
          <h2>Game</h2>
          <GameForm songs={songs} />
        </section>
        {/*end section for rounds*/}
        {/*begin section for current result*/}
        <section id={"current-result"} className={"section"}>
          <Result />
        </section>
        {/*end section for current result*/}
        {/*begin section for results*/}
        {/*todo move to separate page, redirect to url with list of ids?*/}
        <section id={"results"} className={"section"}></section>
        {/*end section for results*/}
      </GameContextProvider>
    </FormProvider>
  )
}
