import { NextApiResponse } from "next"
import { CookieSerializeOptions, serialize } from "cookie"

export const getCookieValue = (
  name: string,
  value: unknown,
  options: CookieSerializeOptions = {}
) => {
  const stringValue = typeof value === "object" ? "j:" + JSON.stringify(value) : String(value)

  if (typeof options.maxAge === "number") {
    options.expires = new Date(Date.now() + options.maxAge * 1000)
  }

  return serialize(name, stringValue, options)
}
