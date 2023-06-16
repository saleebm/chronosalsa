export function parseCookieValue<T>(val: string | undefined): T | string | null | undefined {
  try {
    if (typeof val === "string" && val.startsWith("j:")) {
      return JSON.parse(val.substring(2))
    } else {
      // string
      return val
    }
  } catch (e) {
    console.error("unable to parse: ", val, e)
    return null
  }
}
