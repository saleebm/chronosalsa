import { RefObject, useEffect, useRef } from "react"

export const useCanvas = (
  draw: (context: CanvasRenderingContext2D) => void,
  animate: boolean = false,
): RefObject<HTMLCanvasElement> => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas == null) {
      console.error("Failed to get a canvas from canvasRef")
      return
    }
    const context = canvas.getContext("2d")
    if (context == null) {
      console.error("Failed to get context from canvas")
      return
    }

    let frameCount = 0
    let animationFrameId: number
    const fps = 0.5
    let timeout: ReturnType<typeof setTimeout>

    const render = () => {
      resizeCanvasToDisplaySize(canvas)
      frameCount++
      draw(context)
      if (animate) {
        timeout = setTimeout(() => {
          animationFrameId = requestAnimationFrame(render)
        }, 1000 / fps)
      }
    }
    render()

    return () => {
      window.cancelAnimationFrame(animationFrameId)
      if (timeout != null) clearTimeout(timeout)
    }
  }, [draw, animate])

  return canvasRef
}

function resizeCanvasToDisplaySize(canvas: HTMLCanvasElement) {
  const { width, height } = canvas.getBoundingClientRect()
  console.log({ width, height })

  if (canvas.width !== width || canvas.height !== height) {
    const { devicePixelRatio: ratio = 1 } = window
    canvas.width = width
    canvas.height = height
    return true // here you can return some usefull information like delta width and delta height instead of just true
    // this information can be used in the next redraw...
  }

  return false
}
