"use client"
import { useSearchParams } from "next/navigation"

export function LoginForm() {
  const params = useSearchParams()
  return (
    <>
      <h1 className={"m-5"}>Login</h1>
      <a
        className={"btn btn-primary"}
        href={`/api/v1/authorize-spotify?${params.toString()}`}
      >
        Authorize Spotify
      </a>
    </>
  )
}
