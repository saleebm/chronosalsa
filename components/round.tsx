"use client"

import { useFormContext } from "react-hook-form"
import { useEffect } from "react"

interface Round {
  readonly round: number
  disabled?: boolean
}

export function Round({ round, disabled }: Round) {
  const { register, setValue } = useFormContext()
  useEffect(() => {
    // reset the value of the round when the round changes
    setValue(`round_${round}`, "")
  }, [round, setValue])
  return (
    <>
      <fieldset className={"form-input"}>
        <legend>Round {round}</legend>
        <label htmlFor='song'>Song</label>
        <input
          disabled={disabled}
          type='text'
          {...register(`round_${round}`)}
        />
      </fieldset>
    </>
  )
}
