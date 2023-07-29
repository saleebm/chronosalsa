"use client"
import "rc-slider/assets/index.css"
import Slider from "rc-slider"
import { useGameContext } from "@/components/context/game"
import styles from "@/components/year-slider.module.css"
import { useEffect, useState } from "react"
import { useFormContext } from "react-hook-form"
import { useDebounce } from "usehooks-ts"
import { Properties } from "csstype"
import useMediaQuery from "beautiful-react-hooks/useMediaQuery"

const startYear = 1930
const years = new Date().getFullYear() + 1 - startYear
// the year in between startYear and current year
const halfway = Math.floor(years / 2) + startYear

export const YearSlider = () => {
  const isUnder768 = useMediaQuery("(max-width: 768px)")
  const isUnder480 = useMediaQuery("(max-width: 540px)")
  const { setValue } = useFormContext()
  const { round } = useGameContext()
  const [year, setYear] = useState(halfway)
  const debouncedValue = useDebounce<number>(year, 300)
  const [marks, setMarks] = useState({})
  useEffect(() => {
    let yearMarks = {}
    let rule: number = 5
    if (isUnder480) {
      rule = 30
    } else if (isUnder768) {
      rule = 10
    }
    yearMarks = Array.from(Array(years).keys()).reduce(
      (acc, curr) => ({
        ...acc,
        [curr + startYear]: (
          <p className={curr % rule === 0 ? styles.yearSliderTick : ""}>
            {curr % rule === 0 ? curr + startYear : ""}
          </p>
        ),
      }),
      {},
    )
    setMarks(yearMarks)
  }, [isUnder768, setMarks])

  // reset the value of the round when the round changes
  useEffect(() => {
    console.log("resetting round")
    setValue(`round_${round}`, "")
    setYear(halfway)
  }, [round, setValue, setYear])

  // set the value of the round when the debounced value changes
  useEffect(() => {
    console.log("setting round")
    setValue(`round_${round}`, debouncedValue)
  }, [debouncedValue, round, setValue])

  // todo mobile
  return (
    <div className='h-10 flex place-items-center mt-5'>
      <div className='p-0 md:p-10 w-full'>
        <Slider
          min={startYear}
          max={new Date().getFullYear()}
          marks={marks}
          keyboard
          included={false}
          value={year}
          step={1}
          dotStyle={(dotValue) =>
            dotValue === year
              ? // see globals.scss for usage
                ({ "--var-dot-value": `'${dotValue}'` } as Properties<string>)
              : {}
          }
          trackStyle={{ backgroundColor: "#ccc", height: 2 }}
          handleStyle={{
            borderColor: "#00ef30",
            borderWidth: 3,
            height: 33,
            width: 33,
            marginTop: -25,
            backgroundColor: "rgba(0,0,0,0.42)",
          }}
          railStyle={{ backgroundColor: "rgba(255, 255, 255, 0)" }}
          onChange={(value) => {
            setYear(value as number)
          }}
        />
      </div>
    </div>
  )
}
