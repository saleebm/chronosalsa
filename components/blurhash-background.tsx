"use client"
import { Colors } from "@/components/colors.tsx"
import { useGameContext } from "@/components/context/game"

export function BlurhashBackground() {
  const { currentSong } = useGameContext()
  return currentSong ? (
    <Colors
      // default to a black image
      blurhashData={currentSong?.blurHash || "L00000fQfQfQfQfQfQfQfQfQfQfQ"}
    />
  ) : null
}
