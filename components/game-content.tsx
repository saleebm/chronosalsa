"use client"
import { BlurhashBackground } from "@/components/blurhash-background.tsx"
import { GameScore } from "@/components/game-score.tsx"
import { GameForm } from "@/components/game-form.tsx"
import { CurrentResult } from "@/components/current-result.tsx"
import { useGameContext } from "@/components/context/game"

export function GameContent() {
  const { submitted } = useGameContext()
  return !submitted ? (
    <>
      <BlurhashBackground />
      <section id={"score"} className={"fixed right-10"}>
        <GameScore />
      </section>
      {/*begin section for rounds*/}
      <section id={"round"} className={"section section-sm-padding"}>
        <GameForm />
      </section>
      {/*end section for rounds*/}
      {/*begin section for current result*/}
      <section id={"current-result"} className={"section current-result"}>
        <CurrentResult />
      </section>
    </>
  ) : null
}
