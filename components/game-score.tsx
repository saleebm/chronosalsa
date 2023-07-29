"use client"
import { useGameContext } from "@/components/context/game"
import { Score } from "@/components/score.tsx"

// gets context for score
export function GameScore() {
  const { score, round } = useGameContext()
  return round === 1 ? null : <Score score={score} />
}
