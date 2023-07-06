import styles from "./page.module.css"
import prisma from "@/lib/prisma"
import { Colors } from "@/components/colors.tsx"

// todo https://nextjs.org/docs/app/building-your-application/optimizing/metadata
export const metadata = {
  //todo better meta with images, graph
  title: "Play ball | Chronosalsa",
}

const getProps = async () => {
  return await prisma.song.findFirst({
    select: {
      Album: true,
    },
  })
}

export default async function Home() {
  const props = await getProps()
  return (
    <main className={styles.main}>
      <h1>
        Chronosalsa<span> 💃</span>
      </h1>
      <div>
        {props?.Album?.blurHash && (
          <Colors blurhashData={props.Album.blurHash} />
        )}
      </div>
    </main>
  )
}
