import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { SongAnswer } from "@/types"

export async function GET(request: Request, response: NextResponse) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")
  if (!id) {
    // bad request
    return new NextResponse(null, {
      status: 400,
    })
  }
  const track = await prisma.song.findUnique({
    where: {
      id,
    },
    include: {
      Album: true,
      Artist: true,
    },
  })
  if (!track) {
    return new NextResponse(null, {
      status: 404,
    })
  }
  return NextResponse.json({
    success: true,
    song: {
      id: track.id,
      releaseYear: track.Album!.releaseYear,
      name: track.name,
      externalUrl: track.externalUrl,
      albumArt: track.Album!.imageUrl,
      albumName: track.Album!.name,
      artistName: track.Artist!.map((artist) => artist.name).join(", "),
      albumArtUrl: track.Album!.imageUrl,
    } as SongAnswer,
  })
}
