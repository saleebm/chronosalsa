import { getAuth } from "@/lib/auth/spotify/get-auth"
import { cookies } from "next/headers"
import { strict as assert } from "assert"
import { makeRequest } from "@/lib/spotify/make-request"
import fs from "fs"
import { getFixture } from "@/lib/utils/get-fixture.ts"

export async function getPlaylistItems(
  playlistId: string,
  forceRefresh = false,
) {
  const authResult = await getAuth(cookies())
  assert.ok(authResult.authenticated)

  let result
  const cachedPath = `${process.cwd()}/fixtures/playlists/${playlistId}.json`
  if (!forceRefresh && fs.existsSync(cachedPath)) {
    try {
      const file = getFixture(cachedPath)
      if (file) result = file
    } catch (error) {
      console.log("error getting existing fixture", error)
    }
  } else {
    const { auth } = authResult
    let path = `/playlists/${playlistId}/tracks`
    // paginate through the results, adding each track to the items array, then replacing the
    // items in the result with the new array
    let items: ReadonlyArray<SpotifyApi.TrackObjectFull> = []
    while (path.length > 0) {
      console.log(`fetching ${path}`)
      const response = await makeRequest<
        SpotifyApi.PlaylistTrackResponse | { error: SpotifyApi.ErrorObject }
      >(auth, path)
      // set the result to the response, if there's an error, break out of the loop
      result = response
      if ("error" in response) {
        break
      } else {
        const { items: tracks, next: nextPath } = response
        for (const track of tracks) {
          if (!!track && track.track) {
            items = [...items, track.track]
          } else {
            console.error("no track", track)
          }
        }
        if (nextPath) {
          const nextUrl = new URL(nextPath)
          path = nextUrl.pathname + nextUrl.search
          if (!!path) {
            path = path.replace("/v1", "")
          }
        } else {
          path = ""
        }
      }
    }

    result = {
      ...result,
      items,
    } as
      | SpotifyApi.PlaylistTrackResponse
      | {
          error: SpotifyApi.ErrorObject
          items: SpotifyApi.TrackObjectFull[]
        }
    if (!("error" in result)) {
      console.log(`got ${result.items.length} tracks, expected ${result.total}`)
    }
  }

  if ("error" in result) return result
  // write the file to disk for later use
  fs.writeFileSync(cachedPath, JSON.stringify(result))
  return result
}
