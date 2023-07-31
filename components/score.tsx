import styles from "@/components/score.module.css"

export function Score({ score }: { score: number }) {
  return (
    <div className={styles.box}>
      <p className={styles.label}>Score</p>
      <p className={styles.value} aria-label='Score'>
        {score}
      </p>
    </div>
  )
}
