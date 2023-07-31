"use client"
import { GameForm } from "@/components/game-form.tsx"
import { CurrentResult } from "@/components/current-result.tsx"
import { GameScore } from "@/components/game-score.tsx"
import { BlurhashBackground } from "@/components/blurhash-background.tsx"
import { FinalResults } from "@/components/final-results.tsx"
import { useGameContext } from "@/components/context/game"
import { useMemo } from "react"

export function Game() {
  const { submitted } = useGameContext()
  return useMemo(
    () =>
      !submitted ? (
        <>
          <BlurhashBackground />
          <section id={"score"}>
            <GameScore />
          </section>
          {/*begin section for rounds*/}
          <section id={"round"} className={"section section-sm-padding"}>
            <GameForm />
          </section>
          {/*end section for rounds*/}
          {/*begin section for current result*/}
          <section
            id={"current-result"}
            className={"section section-sm-padding"}
          >
            <CurrentResult />
          </section>
          {/*end section for current result*/}
        </>
      ) : (
        <section id={"results"} className={"section section-sm-padding"}>
          <FinalResults />
        </section>
      ),
    [submitted],
  )
}
