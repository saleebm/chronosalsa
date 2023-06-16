import querystring from "query-string"

export async function authenticateWithRefresh(refreshToken: string) {
  const clientID = process.env.SPOTIFY_CLIENT_ID
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
  const host = process.env.NEXT_PUBLIC_HOST

  if (!clientID || !clientSecret || !host) {
    throw new Error('CONFIGURE YOUR env DUDE!')
  }

  const token = Buffer.from(`${clientID}:${clientSecret}`).toString('base64')
  // get new token first using refresh
  const refreshUrl = `https://accounts.spotify.com/api/token?${querystring.stringify({
    grant_type: 'refresh_token',
    refresh_token: refreshToken
  })}`

  return await fetch(refreshUrl, {
    method: 'POST',
    headers: {
      Authorization: 'Basic ' + token,
      'content-type': 'application/x-www-form-urlencoded'
    }
  }).then(result => result.json())
}
