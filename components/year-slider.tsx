import Slider from "rc-slider"
import "rc-slider/assets/index.css"
import { useEffect, useState } from "react"
import styles from "@/components/year-slider.module.css"

interface YearSliderProps {
  onChange: (value: number) => void
  currentYear: number
}

// map years from 1900 to current year, but only show every 10 years
const marks = Array.from(Array(new Date().getFullYear() - 1930).keys()).reduce(
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
export const YearSlider = (props: YearSliderProps) => {
  const [year, setYear] = useState<number>(props.currentYear)

  useEffect(() => {
    props.onChange(year)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year])

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
