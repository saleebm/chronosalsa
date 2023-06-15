import "./globals.scss"
import { openSans } from "@/lib/fonts"

// automatically used by Next.js for seo data
export const metadata = {
  title: {
    default: "Chronosalsa",
    template: "%s | Chronosalsa",
  },
  description: "",
  icons: {
    icon: "public/favicon.png", //todo
  },
  openGraph: {
    title: "Chronosalsa",
    description: "",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' className={`${openSans.variable}`}>
      <body>
        {children}
      </body>
    </html>
  )
}
