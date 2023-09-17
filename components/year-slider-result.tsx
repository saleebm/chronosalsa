import { YearSliderBase } from "@/components/year-slider-base.tsx"
import { Properties } from "csstype"

interface YearSliderResultProps {
  guess: number
  correct: number
}

export function YearSliderResult({ guess, correct }: YearSliderResultProps) {
  const commonHandleStyle = {
    border: "1px solid rgba(0,0,0,0.5)",
    borderRadius: 4,
    height: 42,
    width: 10,
    marginTop: -33,
    zIndex: 2,
    opacity: 1,
  }
  const getDotValue = (dotValue: number) => {
    if (guess === correct && dotValue === guess) {
      return {
        "--var-guess-value": `'${dotValue}'`,
        "--var-guess-color": `#0ad739`,
      } as Properties<string>
    } else if (dotValue === guess) {
      return {
        "--var-guess-value": `'${dotValue}'`,
        "--var-guess-color": `#ff0016`,
      } as Properties<string>
    } else if (dotValue === correct) {
      return {
        "--var-correct-value": `'${dotValue}'`,
        "--var-correct-zindex": `2`,
      } as Properties<string>
    }
    return {}
  }
  return (
    <YearSliderBase
      range
      defaultValue={[guess, correct]}
      value={[guess, correct]}
      allowCross
      handleStyle={[
        // first is the guess
        {
          backgroundColor: guess !== correct ? "#ff0016" : "#0ad739",
          ...commonHandleStyle,
        },
        // second is the correct answer
        {
          backgroundColor: "#0ad739",
          ...commonHandleStyle,
        },
      ]}
      trackStyle={{
        backgroundColor:
          guess !== correct ? "rgba(255,255,255,0.69)" : "rgba(0,0,0,0.0)",
        height: 34,
        bottom: 5,
        zIndex: 1,
        border: "1px solid #009322",
        borderRadius: 0,
      }}
      dotStyle={getDotValue}
      disabled
    />
  )
}
