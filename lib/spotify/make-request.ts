import { AuthToken } from "@/lib/auth/spotify/get-auth.ts"

export async function makeRequest<T>(
  auth: AuthToken,
  path: string
): Promise<T> {
  const endpoint = `https://api.spotify.com/v1${path}`

  const response = await fetch(endpoint, {
    headers: {
      Authorization: `${auth.token_type} ${auth.access_token}`,
      "Content-Type": "application/json",
    },
    redirect: "follow",
  })

  const contentType = `${response.headers.get("Content-Type")}`
  if (contentType.includes("application/json")) {
    return (await response.json()) as T
  } else {
    console.error("unexpected non-json response: ", contentType)
    return {} as any
  }
}
