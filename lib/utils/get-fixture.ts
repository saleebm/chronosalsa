import fs from "fs"

export const getFixture = (path: string) => {
  const file = fs.readFileSync(path, "utf-8")
  if (file && file.length > 0) {
    console.log(`reading from file in fixtures ${path}`)
    const result = JSON.parse(file)
    return JSON.parse(file)
  }
  return null
}
