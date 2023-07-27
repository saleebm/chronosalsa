import React from "react"
import { CurrentResult } from "@/types"

interface Props {
  result: CurrentResult
}

export function Result({ result }: Props) {
  return <pre>{JSON.stringify(result, null, 2)}</pre>
}
