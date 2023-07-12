import { Open_Sans, Salsa } from "next/font/google"

export const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const salsa = Salsa({
  subsets: ["latin"],
  variable: "--font-salsa",
  weight: "400",
})
