"use client"
import { useRouter } from "next/navigation"
import { useGameContext } from "@/components/context/game"
import { Result } from "@/components/result.tsx"
import { Score } from "@/components/score.tsx"
import styles from "@/components/final-results.module.css"

export function FinalResults() {
  const { results, score } = useGameContext()
  const router = useRouter()
  // todo map over all the results and display them with round number
  return (
    <div className={styles.wrap}>
      <div className={styles.headingWrap}>
        <h2 className={"title text-bg sr-only"}>Final Results</h2>
        <Score score={score} />
      </div>
      {results &&
        Object.values(results).map((result, index) => (
          <div key={index} className={styles.result}>
            <h3 className={"title text-bg"}>Round {index + 1}</h3>
            <Score score={result.score} />
            <Result result={result} />
          </div>
        ))}
      <button
        className={"btn btn-outline-primary"}
        onClick={() => router.push("/")}
      >
        Play Again
      </button>
    </div>
  )
}
