import { PrismaClient } from '@prisma/client'

declare global {
  // eslint-disable-next-line no-var -- only var works here
  var db: PrismaClient | undefined
}

let db: PrismaClient

if (process.env.NODE_ENV === 'production') {
  db = new PrismaClient()
} else {
  if (!global.db) {
    global.db = new PrismaClient()
  }
  db = global.db
}

export { db }
