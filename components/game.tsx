import React from "react"
import { GameForm } from "@/components/game-form.tsx"
import { CurrentResult } from "@/components/current-result.tsx"
import { GameScore } from "@/components/game-score.tsx"
import { BlurhashBackground } from "@/components/blurhash-background.tsx"

// todo no optimizations?????
export function Game() {
  return (
    <>
      <BlurhashBackground />
      <section id={"score"}>
        <GameScore />
      </section>
      {/*begin section for rounds*/}
      <section id={"round"} className={"section"}>
        <GameForm />
      </section>
      {/*end section for rounds*/}
      {/*begin section for current result*/}
      <section id={"current-result"} className={"section"}>
        <CurrentResult />
      </section>
      {/*end section for current result*/}
      {/*begin section for results*/}
      {/*todo move to separate page, redirect to url with list of ids?*/}
      <section id={"results"} className={"section"}></section>
      {/*end section for results*/}
    </>
  )
}
