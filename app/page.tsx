import styles from "./page.module.scss"
import Image from "next/image"
import hectorLavoe from "@/public/images/hector-lavoe-animated.jpg"
import { Metadata } from "next"

// todo https://nextjs.org/docs/app/building-your-application/optimizing/metadata
export const metadata: Metadata = {
  //todo better meta with images, graph
  title: "Cha cha cha | Chronosalsa",
  openGraph: {
    images: [hectorLavoe.src],
  },
}

export default async function Home() {
  return (
    <main className={`${styles.main} container`}>
      <div className={"section flex flex-col justify-center items-center"}>
        <h1 className={"title text-bg"}>ayeeee</h1>
        <Image
          className={styles.mainImage}
          src={hectorLavoe}
          alt={"Hector Lavoe flipping off camera"}
          height={420}
        />
        <a className={"btn btn-primary cursor-pointer"} href={`/play`}>
          Play
        </a>
      </div>
    </main>
  )
}
