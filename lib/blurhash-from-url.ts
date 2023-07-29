import { encode } from "blurhash"
import sharp from "sharp"
import fs from "fs"

export interface IOptions {
  width?: number
  height?: number
}

export interface IOutput {
  encoded: string
  width: number
  height: number
}

export const blurhashFromURL = async (url: string, options: IOptions = {}) => {
  const { width = 32, height = 32 } = options
  console.log("blurhashFromURL", url, width, height)

  let arrayBuffer
  const safeUrl = url.replace(/\//g, "_")
  const cachedPath = `${process.cwd()}/fixtures/tracks/${safeUrl}`

  if (fs.existsSync(cachedPath)) {
    // load image from disk into buffer
    console.log("cachedPath reading from", cachedPath)
    const file = fs.readFileSync(cachedPath)
    arrayBuffer = file.buffer
  } else {
    let response
    let retries = 0
    while (retries < 3) {
      try {
        response = await fetch(url)
        break
      } catch (e) {
        retries++
        console.log(`Error fetching ${url}, retrying...`)
      }
    }
    if (!response) {
      throw new Error(`Unable to fetch ${url}`)
    }
    arrayBuffer = await response.arrayBuffer()
    // write the file to disk for later use
    console.log("cachedPath writing to", cachedPath)
    fs.writeFileSync(cachedPath, Buffer.from(arrayBuffer))
  }
  const returnedBuffer = Buffer.from(arrayBuffer)

  const { info, data } = await sharp(returnedBuffer)
    .resize(width, height, {
      fit: "cover",
      withoutReduction: true,
    })
    .ensureAlpha()
    .raw()
    .toBuffer({
      resolveWithObject: true,
    })

  const encoded = encode(
    new Uint8ClampedArray(data),
    info.width,
    info.height,
    6, // components
    6,
  )

  const output: IOutput = {
    encoded,
    width,
    height,
  }

  return output
}
