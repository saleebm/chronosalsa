import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

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
    },
  })
  if (!track) {
    return new NextResponse(null, {
      status: 404,
    })
  }
  return NextResponse.json({
    success: true,
    data: {
      releaseYear: track.Album!.releaseYear,
      name: track.name,
      externalUrl: track.externalUrl,
      albumArt: track.Album!.imageUrl,
    },
  })
}
