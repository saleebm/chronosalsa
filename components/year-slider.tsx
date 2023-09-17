"use client"
import { useEffect, useState } from "react"
import { useFormContext } from "react-hook-form"
import { useDebounce } from "usehooks-ts"
import { Properties } from "csstype"
import { useGameContext } from "@/components/context/game"
import { YearSliderBase } from "@/components/year-slider-base.tsx"

const halfway = 1977

export const YearSlider = () => {
  const { setValue } = useFormContext()
  const { round, currentResult } = useGameContext()
  const [year, setYear] = useState(halfway)
  const debouncedValue = useDebounce<number>(year, 300)

  // reset the value of the round when the round changes
  useEffect(() => {
    setValue(`round_${round}`, "")
    setYear(halfway)
  }, [round, setValue, setYear])

  // set the value of the round when the debounced value changes
  useEffect(() => {
    setValue(`round_${round}`, debouncedValue)
  }, [debouncedValue, round, setValue])

  return (
    <YearSliderBase
      dotStyle={(dotValue) =>
        dotValue === year
          ? // see globals.scss for usage
            ({ "--var-dot-value": `'${dotValue}'` } as Properties<string>)
          : {}
      }
      keyboard
      value={year}
      handleStyle={{
        borderColor: "#000093",
        borderWidth: 4,
        height: 42,
        width: 42,
        marginTop: -33,
        backgroundColor: "rgba(255,255,255,0.3)",
      }}
      trackStyle={{ backgroundColor: "black", height: 1 }}
      included={false}
      onChange={(value) => {
        setYear(value as number)
      }}
      disabled={!!currentResult}
    />
  )
}
