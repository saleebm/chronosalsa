"use client"
import { useForm } from "react-hook-form"
import { useState } from "react"

export function SeedForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<{
    playlistId: string
    trackId: string
    genre: string
    force: boolean
  }>()
  const [submitted, setSubmitted] = useState(false)
  const [results, setResults] = useState<
    Array<{
      message: string
      id: string
      type: string
      genre: string
    }>
  >([])

  const onSubmit = handleSubmit(async (values) => {
    setSubmitted(true)
    try {
      let res, type
      const defaultFormFields = {
        genre: values.genre,
        force: values.force,
      }
      if (values.playlistId) {
        type = "playlist"
        res = await fetch("/api/seed/playlist", {
          method: "POST",
          body: JSON.stringify({
            playlistId: values.playlistId,
            ...defaultFormFields,
          }),
        }).then((response) => response.json())
      } else if (values.trackId) {
        type = "track"
        res = await fetch("/api/seed/track", {
          method: "POST",
          body: JSON.stringify({
            trackId: values.trackId,
            ...defaultFormFields,
          }),
        }).then((response) => response.json())
      } else {
        console.error("no data transmitted")
        return
      }
      setResults([
        ...results,
        {
          message: !res.success || "error" in res ? res.error : "success",
          type,
          id: values.playlistId || values.trackId,
          genre: values.genre,
        },
      ])
    } catch (e) {
      console.error(e)
    }
    reset()
    setSubmitted(false)
  })

  return (
    <form
      className={"flex min-w-full flex-col pb-10 pt-10"}
      onSubmit={onSubmit}
    >
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
      <label className={"mb-8"}>
        <p>Genre</p>
        <input
          className={"form-input w-full"}
          type='text'
          required
          {...register("genre", {
            required: true,
          })}
        />
      </label>
      {/* a checkbox field for force */}
      <label className={"mb-8"}>
        <p>Force</p>
        <input
          className={"form-checkbox"}
          type='checkbox'
          {...register("force")}
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
        <table className='w-full min-w-full max-w-md border border-gray-300 bg-white'>
          <thead>
            <tr>
              <th className='border-b px-4 py-2'>ID</th>
              <th className='border-b px-4 py-2'>Type</th>
              <th className='border-b px-4 py-2'>Genre</th>
              <th className='border-b px-4 py-2'>Result</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <tr key={index}>
                <td className='border-b px-4 py-2'>{result.id}</td>
                <td className='border-b px-4 py-2'>{result.type}</td>
                <td className='border-b px-4 py-2'>{result.genre}</td>
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
