import { PrismaClient } from '@prisma/client'

declare global {
  // eslint-disable-next-line no-var -- only var works here
  var db: PrismaClient | undefined
}

const db = global.db || new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
})

if (process.env.NODE_ENV !== 'production') {
  global.db = db
}

export { db }
