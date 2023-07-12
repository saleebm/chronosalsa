"use client"

import { useFormContext } from "react-hook-form"

interface Round {
  readonly round: number
  disabled?: boolean
}

export function Round({ round, disabled }: Round) {
  const { register } = useFormContext()
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
