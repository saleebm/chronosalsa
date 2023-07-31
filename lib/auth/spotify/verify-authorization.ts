import type { AuthToken } from "@/lib/auth/spotify/get-auth.ts"
import { getCurrentUser } from "@/lib/spotify/get-current-user.ts"
import prisma from "@/lib/prisma"

// cannot be used in middleware because Prisma requires proxy
export async function verifyAuthorization(
  cookieVal: AuthToken & { refresh_token: unknown },
) {
  const currentUser = await getCurrentUser(cookieVal)
  if (!currentUser || (currentUser && "error" in currentUser)) {
    console.error("verifyAuthorization failed", currentUser)
    throw new Error(
      currentUser && "error" in currentUser
        ? currentUser.error.message
        : "Current user not found",
    )
  }
  const user = await prisma.user.findUnique({
    where: {
      id: currentUser.id,
    },
  })
  if (!user) {
    console.error("verifyAuthorization sneaky sneaky?", currentUser)
    throw new Error("Sneaky sneaky")
  }
}
