"use client"
import { useForm } from "react-hook-form"
import { useState } from "react"

export function SeedForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<{ playlistId: string; trackId: string }>()
  const [submitted, setSubmitted] = useState(false)
  const [results, setResults] = useState<
    Array<{
      message: string
      id: string
      type: string
    }>
  >([])

  const onSubmit = handleSubmit(async (values) => {
    setSubmitted(true)
    try {
      let res, type
      if (values.playlistId) {
        type = "playlist"
        res = await fetch("/api/seed/playlist", {
          method: "POST",
          body: JSON.stringify({
            playlistId: values.playlistId,
          }),
        }).then((response) => response.json())
      } else if (values.trackId) {
        type = "track"
        res = await fetch("/api/seed/track", {
          method: "POST",
          body: JSON.stringify({
            trackId: values.trackId,
          }),
        }).then((response) => response.json())
      } else {
        console.error("no data transmitted")
        return
      }
      setResults([
        ...results,
        {
          message: !res.success || "error" in res ? res.error : "true",
          type,
          id: values.playlistId || values.trackId,
        },
      ])
    } catch (e) {
      console.error(e)
    }
    reset()
    setSubmitted(false)
  })

  return (
    <form className={"flex min-w-full flex-col"} onSubmit={onSubmit}>
      <label className={"mb-8"}>
        <p>Playlist ID</p>
        <input
          className={"form-input w-full"}
          type='text'
          {...register("playlistId")}
        />
      </label>
      <label className={"mb-8"}>
        <p>Track ID</p>
        <input
          className={"form-input w-full"}
          type='text'
          {...register("trackId")}
        />
      </label>
      <button
        disabled={submitted}
        className={"btn btn-primary cursor-pointer"}
        type={"submit"}
      >
        Submit
      </button>
      <div className={"mt-10 w-full"}>
        <table className='w-full max-w-md border border-gray-300 bg-white'>
          <thead>
            <tr>
              <th className='border-b px-4 py-2'>ID</th>
              <th className='border-b px-4 py-2'>Type</th>
              <th className='border-b px-4 py-2'>Result</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <tr key={index}>
                <td className='border-b px-4 py-2'>{result.id}</td>
                <td className='border-b px-4 py-2'>{result.type}</td>
                <td className='border-b px-4 py-2'>
                  <span
                    className={
                      "inline-flex rounded-full px-2 text-xs font-semibold" +
                      ` leading-5 ${
                        result.message === "success"
                          ? "bg-green-100"
                          : "bg-red-100"
                      }`
                    }
                  >
                    {result.message}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </form>
  )
}
