import "rc-slider/assets/index.css"
import Slider from "rc-slider"
import { useGameContext } from "@/components/context/game.tsx"
import styles from "@/components/year-slider.module.css"
import { useEffect, useState } from "react"
import { useFormContext } from "react-hook-form"
import { useDebounce } from "usehooks-ts"

const years = new Date().getFullYear() - 1930
// map years from 1900 to current year, but only show every 10 years
const marks = Array.from(Array(years).keys()).reduce(
  (acc, curr) => ({
    ...acc,
    [curr + 1930]: (
      <span className={curr % 10 === 0 ? styles.yearSliderTick : ""}>
        {curr % 10 === 0 ? curr + 1930 : ""}
      </span>
    ),
  }),
  {},
)

// the year in between 1930 and current year
const halfway = Math.floor(years / 2) + 1930

export const YearSlider = () => {
  const { setValue } = useFormContext()
  const { round } = useGameContext()
  const [year, setYear] = useState(halfway)
  const debouncedValue = useDebounce<number>(year, 300)

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

  return (
    <div className='h-10 flex place-items-center'>
      <div className='p-10 w-full'>
        <Slider
          min={1930}
          max={new Date().getFullYear()}
          defaultValue={year}
          marks={marks}
          keyboard
          included={false}
          step={1}
          dotStyle={(dotValue) => ({
            borderRadius: 0,
            border: `${dotValue === year ? "3px" : "1px"} solid #ffffff`,
            height: 15,
            width: dotValue === year ? 4 : 2,
            marginTop: -14,
            opacity: 1,
            // add drop-shadow
            filter: "drop-shadow(0px 0px 2px #000)",
            ...(dotValue === year
              ? { "--var-dot-value": `'${dotValue}'` }
              : {}),
          })}
          // todo styles for active
          trackStyle={{ backgroundColor: "#ccc", height: 2 }}
          handleStyle={{
            borderColor: "#ffffff",
            borderWidth: 3,
            height: 30,
            width: 30,
            marginTop: -14,
            backgroundColor: "rgba(0,0,0,0.4)",
          }}
          railStyle={{ backgroundColor: "#ccc", height: 2 }}
          onChange={(value) => {
            setYear(value as number)
          }}
        />
      </div>
    </div>
  )
}
