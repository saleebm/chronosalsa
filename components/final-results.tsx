"use client"
import { useRouter } from "next/navigation"
import { useGameContext } from "@/components/context/game"
import { Result } from "@/components/result.tsx"
import { Score } from "@/components/score.tsx"
import styles from "@/components/final-results.module.css"

const PlayItAgain = () => {
  const router = useRouter()
  return (
    <button className={"btn btn-primary"} onClick={() => router.push("/")}>
      Play it Again
    </button>
  )
}

export function FinalResults() {
  const { results, score } = useGameContext()
  return (
    <div className={styles.wrap}>
      <div className={styles.headingWrap}>
        <h2 className={"title text-bg"}>Final Results</h2>
        <Score score={score} />
        <PlayItAgain />
      </div>
      {results &&
        Object.values(results).map((result, index) => (
          <div key={index} className={styles.result}>
            <h3 className={"title text-bg"}>Round {index + 1}</h3>
            <Score score={result.score} />
            <Result result={result} />
          </div>
        ))}
      <PlayItAgain />
    </div>
  )
}
