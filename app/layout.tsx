import "./globals.scss"
import styles from "./page.module.scss"
import { openSans, salsa } from "@/lib/fonts"
import Link from "next/link"

// automatically used by Next.js for seo data
export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_HOST),
  title: {
    default: "Chronosalsa",
    template: "%s | Chronosalsa",
  },
  description: "Discover salsa music by era, artist, and more.",
  openGraph: {
    title: "Chronosalsa",
    description: "Discover salsa music by era, artist, and more.",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' className={`${openSans.variable} ${salsa.variable}`}>
      <body>
        <div id={"top"} />
        <header className={styles.header}>
          <div className={styles.logo}>
            <p className={styles.logoText}>
              <Link href={"/"} title={"Homepage"}>
                CHRONOSALSA
              </Link>
            </p>
          </div>
          <Link className={styles.navLink} href={"/about"} title={"About"}>
            About
          </Link>
        </header>
        {children}
      </body>
    </html>
  )
}
