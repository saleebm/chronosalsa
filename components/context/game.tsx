import React, { createContext, useContext, useState, useEffect } from "react"

type Props = {
  children: React.ReactNode
}
type Context = {
  count: number
  increment: () => void
}

// Just find-replace "GameContext" with whatever context name you like. (ie. DankContext)
const GameContext = createContext<Context | null>(null)

export const GameContextProvider = ({ children }: Props) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    setCount(42)
  }, [])

  const increment = () => {
    setCount(count + 1)
  }

  return (
    <GameContext.Provider value={{ count, increment }}>
      {children}
    </GameContext.Provider>
  )
}

export const useGameContext = () => {
  const context = useContext(GameContext)

  if (!context)
    throw new Error(
      "GameContext must be called from within the GameContextProvider",
    )

  return context
}
