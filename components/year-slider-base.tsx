"use client"
import Slider, { SliderProps } from "rc-slider"
import { useEffect, useState } from "react"
import useMediaQuery from "beautiful-react-hooks/useMediaQuery"
import styles from "@/components/year-slider-base.module.css"
import "rc-slider/assets/index.css"

const startYear = 1930
const years = new Date().getFullYear() + 1 - startYear

type YearSliderBaseProps = SliderProps

export const YearSliderBase = (props: YearSliderBaseProps) => {
  const isUnder768 = useMediaQuery("(max-width: 768px)")
  const isUnder480 = useMediaQuery("(max-width: 540px)")
  const [marks, setMarks] = useState({})
  useEffect(() => {
    let yearMarks
    // todo use a fixed array of years
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
  }, [isUnder768, isUnder480, setMarks])

  return (
    <div className='h-10 flex place-items-center mt-5'>
      <div className='p-0 md:p-10 w-full'>
        <Slider
          min={startYear}
          max={new Date().getFullYear()}
          marks={marks}
          step={1}
          railStyle={{ backgroundColor: "rgba(0,0,0,0)" }}
          {...props}
        />
      </div>
    </div>
  )
}
