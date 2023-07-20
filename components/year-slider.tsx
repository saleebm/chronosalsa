import Slider from "rc-slider"
import "rc-slider/assets/index.css"
import { useEffect, useState } from "react"

interface YearSliderProps {
  onChange: (value: number) => void
  currentYear: number
}

// map years from 1900 to current year, but only show every 10 years
const marks = Array.from(Array(2022 - 1930).keys()).reduce(
  (acc, curr) => ({
    ...acc,
    [curr + 1930]: {
      style: {
        color: "white",
      },
      label: curr % 10 === 0 ? curr + 1930 : "",
    },
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
          step={1}
          trackStyle={{ backgroundColor: "#ccc", height: 2 }}
          handleStyle={{
            borderColor: "#44ff44",
            height: 30,
            width: 30,
            marginTop: -14,
            backgroundColor: "#44ff44",
            mixBlendMode: "difference",
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
