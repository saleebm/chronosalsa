import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { getAuth } from "@/lib/auth/spotify/get-auth"
import authConfig from "@/config/auth.json"
import { serverCookieOpts } from "@/lib/utils/server-cookie-opts"

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
      // guess game? todo rate limit
      console.error("got " + sillySecret)
      // return NextResponse
      return new NextResponse("<h1>Unauthorized</h1>", {
        status: 401,
        headers: { "content-type": "text/html" },
      })
    }
  } else {
    // if somehow accessing without the silly frickin secret, redirect home
    console.log("login accessed without silly frickin secret!!!")
    return NextResponse.redirect(new URL("/", request.url))
  }
}

// doesPathStartWith Does path fragment start with the provided path
const doesPathStartWith = (path: string, request: NextRequest) =>
  request.nextUrl.pathname.startsWith(path)

export async function middleware(request: NextRequest) {
  // authorize spotify
  if (doesPathStartWith("/api/v1/authorize-spotify", request)) {
    const result = requireSillySecret(request)
    if (result) return result
  }

  // login
  if (doesPathStartWith("/admin/login", request)) {
    const result = requireSillySecret(request)
    if (result) return result
    try {
      const auth = await getAuth(request.cookies)
      if (auth.authenticated) {
        // authenticated already
        return NextResponse.redirect(new URL("/admin/seed", request.url))
      }
    } catch (e) {
      console.error(e)
      return NextResponse.redirect(new URL("/", request.url))
    }
  }

  // seed
  if (doesPathStartWith("/admin/seed", request)) {
    // if authenticated, get refresh token
    try {
      const auth = await getAuth(request.cookies)
      if (auth.authenticated) {
        const response = NextResponse.next()
        // set refresh token
        response.cookies.set({
          name: authConfig.spotify.tokenName,
          value: `j:${JSON.stringify(auth.auth)}`,
          ...serverCookieOpts,
        })
        return response
      }
    } catch (e) {
      console.error("unable to authenticate for seed page", e)
    }
    return NextResponse.redirect(new URL("/", request.url))
  }
}
