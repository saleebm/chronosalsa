import styles from "../page.module.css"

// todo https://nextjs.org/docs/app/building-your-application/optimizing/metadata
export const metadata = {
  //todo better meta with images, graph
  title: "About | Chronosalsa",
}

export default async function Home() {
  return (
    <main className={`${styles.main} container`}>
      <div className={"section flex flex-col justify-center items-center"}>
        <h1 className={"title"}>Discover Salsa Music</h1>
        <div>
          <p className={"textBg text-black text-center max-w-prose text-xl"}>
            Chronosalsa helps you find new salsa music to dance to. It&apos;s a
            collection of salsa music from the 1930s to today. Heavily inspired
            by the{" "}
            <a
              className={"text-red-900 underline"}
              href={"https://www.chronophoto.app"}
              target={"_blank"}
              rel={"noopener noreferrer"}
            >
              Chronophoto
            </a>{" "}
            app.
          </p>
        </div>
      </div>
    </main>
  )
}
