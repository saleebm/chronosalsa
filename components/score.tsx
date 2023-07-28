import styles from "@/components/score.module.css"

export function Score({ score }: { score: number }) {
  // a sexy boxy thing with blue background and yellow text (tailwind)
  // also this is a highly accessible component, label the score using aria-label
  return (
    <div className='flex flex-col items-center justify-center w-24 h-24 bg-blue-500 text-yellow-500'>
      <p className={styles.value} aria-label='Score'>
        {score}
      </p>
      <p className={styles.label}>Score</p>
    </div>
  )
}
