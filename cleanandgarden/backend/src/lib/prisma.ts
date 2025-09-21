import { PrismaClient } from '../../generated/prisma'

// Guardamos la instancia en globalThis para evitar duplicados en dev
const globalForPrisma = global as unknown as { prisma?: PrismaClient }

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({ log: ['warn', 'error'] })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
