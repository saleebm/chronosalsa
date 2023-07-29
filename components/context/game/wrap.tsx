"use client"
import React from "react"
import { FormProvider, useForm } from "react-hook-form"
import { SongQuestions } from "@/types"
import { GameContextProvider } from "@/components/context/game/index.tsx"

export function GameContextWrap({
  children,
  songs,
  steps,
}: {
  children: React.ReactNode
  songs: SongQuestions
  steps: number
}) {
  // useForm is a hook from react-hook-form that provides methods for managing the form, context
  // is used on the input components to access the methods
  const methods = useForm()

  return (
    <FormProvider {...methods}>
      <GameContextProvider steps={steps} songs={songs}>
        {children}
      </GameContextProvider>
    </FormProvider>
  )
}
