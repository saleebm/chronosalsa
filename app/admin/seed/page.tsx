import styles from "@/app/page.module.css"
import { SeedForm } from "@/components/seed-form.tsx"

export const metadata = {
  //todo better meta with images, graph
  title: "Seed tings",
  description: "time is now",
}

export default async function Seed() {
  return (
    <main className={styles.main}>
      <h1>
        time to seed tings<span> 🌱</span>
      </h1>
      <div
        style={{
          width: 500,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <SeedForm />
      </div>
    </main>
  )
}
