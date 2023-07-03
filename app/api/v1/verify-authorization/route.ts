import { NextResponse } from "next/server"
import { verifyAuthorization } from "@/lib/auth/spotify/verify-authorization.ts"

// called from server side only (I know, silly)
// but it is a workaround to not use prisma in middleware
export async function POST(request: Request) {
  const authData = await request.json()
  if (
    typeof authData === "object" &&
    authData != null &&
    "refresh_token" in authData
  ) {
    try {
      await verifyAuthorization(authData)
      console.log("successfully found user")
      return NextResponse.json({ success: true })
    } catch (e) {
      console.error(e)
    }
  }

  return NextResponse.json({ success: false })
}
