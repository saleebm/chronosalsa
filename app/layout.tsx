import "./globals.scss"
import styles from "./page.module.css"
import { openSans, salsa } from "@/lib/fonts"
import Link from "next/link"

// automatically used by Next.js for seo data
export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_HOST),
  title: {
    default: "Chronosalsa",
    template: "%s | Chronosalsa",
  },
  description: "", //todo
  icons: {
    icon: "public/favicon.png", //todo
  },
  openGraph: {
    title: "Chronosalsa",
    description: "", //todo
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
        </header>
        {children}
        <div className={styles.overlay} />
      </body>
    </html>
  )
}
