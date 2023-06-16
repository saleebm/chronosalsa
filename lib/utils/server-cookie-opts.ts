import { CookieSerializeOptions } from "cookie"

export const serverCookieOpts = {
  maxAge: 300000,
  httpOnly: true,
  secure: process.env.NODE_ENV !== "development",
  path: "/",
  sameSite: "lax"
} as CookieSerializeOptions
