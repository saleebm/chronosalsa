import styles from "./page.module.css"
import Image from "next/image"
import hectorLavoe from "@/public/images/hector-lavoe-animated.jpg"

// todo https://nextjs.org/docs/app/building-your-application/optimizing/metadata
export const metadata = {
  //todo better meta with images, graph
  title: "Cha cha cha | Chronosalsa",
}

export default async function Home() {
  return (
    <main className={`${styles.main} container`}>
      <h1 className={styles.title}>Cha Cha Cha</h1>
      <Image
        className={styles.mainImage}
        src={hectorLavoe}
        alt={"Hector Lavoe flipping off camera"}
        width={420}
      />
      <a className={"btn btn-primary cursor-pointer"} href={`/play`}>
        Play
      </a>
    </main>
  )
}
