import { PrismaClient } from "@prisma/client"
import * as util from "util"

// Prevent multiple instances of Prisma Client in development
const globalAny: typeof globalThis & { prisma?: PrismaClient } = global

let prisma =
  globalAny.prisma ||
  new PrismaClient({
    log: [
      { level: "query", emit: "event" },
      { level: "warn", emit: "event" },
      { level: "info", emit: "event" },
      { level: "error", emit: "event" },
    ],
    errorFormat: "pretty",
  })

if (process.env.NODE_ENV === "development" && !globalAny.prisma) {
  // method to find time for querying, and log it with the query
  const xprisma = prisma.$extends({
    query: {
      async $allOperations({ operation, model, args, query }) {
        const start = performance.now()
        const result = await query(args)
        const end = performance.now()
        const time = end - start
        console.log(
          util.inspect(
            { model, operation, args, time },
            { showHidden: false, depth: null, colors: true },
          ),
        )
        return result
      },
    },
  })
  prisma = xprisma as PrismaClient

  process.on("exit", async (_code) => {
    if (globalAny.prisma) {
      await globalAny.prisma.$disconnect()
      globalAny.prisma = undefined
      console.log(`Prisma Client disconnected`)
    }
  })

  globalAny.prisma = prisma
}

export default prisma
