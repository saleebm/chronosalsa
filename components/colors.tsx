"use client"
import { useCanvas } from "@/lib/use-canvas.tsx"
import { decode } from "blurhash"
import styles from "@/components/colors.module.css"

const SIZE = 640

export function Colors({ blurhashData }: { blurhashData: string }) {
  const ref = useCanvas((ctx) => {
    const pixels = decode(blurhashData, SIZE, SIZE)
    const imageData = ctx.createImageData(SIZE, SIZE)
    imageData.data.set(pixels)
    ctx.putImageData(imageData, 0, 0)
  })
  return (
    <div className={styles.blurImageWrap}>
      <canvas width={SIZE} height={SIZE} ref={ref} />
    </div>
  )
}
