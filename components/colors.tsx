"use client"
import { useCanvas } from "@/lib/use-canvas.tsx"
import { decode } from "blurhash"
import styles from "@/components/colors.module.css"

export function Colors({ blurhashData }: { blurhashData: string }) {
  const ref = useCanvas((ctx) => {
    const width = Math.floor(ctx.canvas.getBoundingClientRect().width)
    const height = Math.floor(ctx.canvas.getBoundingClientRect().height)
    const pixels = decode(blurhashData, width, height)
    const imageData = ctx.createImageData(width, height)
    imageData.data.set(pixels)
    ctx.canvas.width = ctx.canvas.getBoundingClientRect().width
    ctx.canvas.height = ctx.canvas.getBoundingClientRect().height
    ctx.putImageData(imageData, 0, 0)
  }, true)
  return (
    <div className={styles.blurImageWrap}>
      <canvas className={styles.canvas} ref={ref} />
    </div>
  )
}
