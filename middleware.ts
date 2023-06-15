import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { generateRandomString } from "@/lib/utils/generate-random-string"

// dev route
const requireSillySecret = (request: NextRequest) => {
  if (!process.env.SILLY_SECRET) {
    console.error("configure the silly secret!")
    return new NextResponse<unknown>(null, { status: 500 })
  }
  // has middleware to validate silly secret
  const stateKey = process.env.STATE_SECRET
  if (!stateKey) {
    throw new Error("configure your state key!!")
  }
  if (request.nextUrl.searchParams.has("sillySecret")) {
    const sillySecret = request.nextUrl.searchParams.get("sillySecret")
    if (process.env.SILLY_SECRET !== sillySecret) {
      console.error("got " + sillySecret)
      // return NextResponse
      return new NextResponse(
        "<h1>Unauthorized</h1>",
        { status: 401, headers: { "content-type": "text/html" } }
      )
    }
  } else {
    // if somehow accessing without the silly frickin secret, redirect home
    console.log("login accessed without silly frickin secret!!!")
    return NextResponse.redirect(new URL("/", request.url))
  }
}

// isPath Does path fragment start with the provided path
const isPath = (path: string, request: NextRequest) => request.nextUrl.pathname.startsWith(path)

export function middleware( request: NextRequest) {
  // require a silly secret
  if (isPath("/login", request)) {
    const result = requireSillySecret(request)
    if (result) return result
  }
  // authorize spotify
  if (isPath("/api/v1/authorize-spotify", request)) {
    const result = requireSillySecret(request)
    if (result) return result
  }
}
