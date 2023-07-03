import { NextResponse } from "next/server"
import { getAuth } from "@/lib/auth/spotify/get-auth"
import { cookies } from "next/headers"

export async function POST(request: Request, response: NextResponse) {
  const authResult = await getAuth(cookies())
  if (!authResult?.authenticated)
    return new NextResponse(null, {
      status: 403
    })

  const { playlistId } = await request.json()

  return NextResponse.json({})
}
