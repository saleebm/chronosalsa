import { encode } from "blurhash"
import sharp from "sharp"

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

  const response = await fetch(url)
  const arrayBuffer = await response.arrayBuffer()
  const returnedBuffer = Buffer.from(arrayBuffer)

  const { info, data } = await sharp(returnedBuffer)
    .resize(width, height, {
      fit: "cover",
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
    4,
    4
  )

  const output: IOutput = {
    encoded,
    width,
    height,
  }

  return output
}
