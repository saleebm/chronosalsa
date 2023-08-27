"use client"
import { useGameContext } from "@/components/context/game"
import { Score } from "@/components/score.tsx"

// gets context for score
export function GameScore() {
  const { score, round, currentResult } = useGameContext()
  return !!currentResult || round === 1 ? null : <Score score={score} />
}
