import styles from "../page.module.scss"

export const metadata = {
  title: "About",
}

export default async function Home() {
  return (
    <main className={`${styles.main} container`}>
      <div
        className={"section flex flex-col justify-center items-center text-bg"}
      >
        <h1 className={"title"}>Discover Salsa Music</h1>
        <div>
          <p className={"text-black text-center max-w-prose text-xl"}>
            Chronosalsa helps you find new salsa music to dance to. It&apos;s a
            collection of salsa music from the 1930s to today. Heavily inspired
            by the{" "}
            <a
              href={"https://www.chronophoto.app"}
              target={"_blank"}
              rel={"noopener noreferrer"}
            >
              Chronophoto
            </a>{" "}
            app. Find an inaccuracy? Want to add a song?{" "}
            <a href={"mailto:saleebmina@copt.dev"}>Email me</a>.
          </p>
          <br />
          <p className={"text-center max-w-prose text-xl"}>
            <a
              href={"https://github.com/saleebm/chronosalsa"}
              target={"_blank"}
              rel={"noopener noreferrer"}
            >
              Built with Next.js and ❤️
            </a>
          </p>
        </div>
      </div>
    </main>
  )
}
