"use client"
import { useRouter } from "next/navigation"
import { useGameContext } from "@/components/context/game"
import { Result } from "@/components/result.tsx"
import { Score } from "@/components/score.tsx"
import styles from "@/components/final-results.module.css"
import { RoundResult } from "@/components/round-result.tsx"

const PlayItAgain = () => {
  const router = useRouter()
  return (
    <button className={"btn btn-primary mt-4"} onClick={() => router.push("/")}>
      Play it Again
    </button>
  )
}

export function FinalResults() {
  const { results, score, submitted } = useGameContext()
  return submitted ? (
    <section id={"results"} className={"section section-sm-padding"}>
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
              <RoundResult result={result} />
            </div>
          ))}
        <PlayItAgain />
      </div>
    </section>
  ) : null
}
