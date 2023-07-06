import { insertSong } from "../lib/prisma/insert-song.ts"
import sixth_sense from "../fixtures/6th-sense.json" assert { type: "json" }
import TrackObjectFull = SpotifyApi.TrackObjectFull

async function test() {
  console.log("test")
  const trackData = await insertSong({
    track: sixth_sense as TrackObjectFull,
    genre: "test",
    number: 0,
    force: true,
  })
  console.log(trackData)
}

test()
  .then((res) => {
    console.log(res)
  })
  .catch((err) => {
    console.error(err)
  })
