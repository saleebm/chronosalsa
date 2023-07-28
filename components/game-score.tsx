import { useGameContext } from "@/components/context/game.tsx"
import { Score } from "@/components/score.tsx"

// gets context for score
export function GameScore() {
  const { score } = useGameContext()
  return <Score score={score} />
}
