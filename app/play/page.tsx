import styles from "@/app/page.module.css"
import { Game } from "@/components/game.tsx"

export const metadata = {
  title: "Play",
}

// todo get songs without revealing answers

export default async function Play() {
  return (
    <main className={`${styles.main} container`}>
      <h1 className={styles.title}>Play</h1>
      <Game />
    </main>
  )
}
