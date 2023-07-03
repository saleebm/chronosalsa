import { insertSong } from "../lib/prisma/insert-song.ts"
import sixth_sense from "../fixtures/6th-sense.json" assert { type: "json" }
import TrackObjectFull = SpotifyApi.TrackObjectFull

async function test() {
  console.log("test")
  const trackData = await insertSong(sixth_sense as TrackObjectFull)
}

test()
  .then((res) => {
    console.log(res)
  })
  .catch((err) => {
    console.error(err)
  })
