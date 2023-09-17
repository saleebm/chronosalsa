import { CurrentResultAnswer } from "@/types"
import { Score } from "@/components/score.tsx"
import { Result } from "@/components/result.tsx"
import styles from "@/components/current-result.module.css"
import { YearSliderResult } from "@/components/year-slider-result.tsx"
import React from "react"

interface RoundResultProps {
  result: CurrentResultAnswer
}
export function RoundResult({ result }: RoundResultProps) {
  return (
    <>
      <Score score={result.score} />
      <Result result={result} />
      <div className={styles.yearPickerWrap}>
        <YearSliderResult guess={result.guess} correct={result.correctAnswer} />
      </div>
    </>
  )
}
