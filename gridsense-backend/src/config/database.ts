import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient | null = null;

try {
  prisma = new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error']
  });
} catch (e) {
  console.warn('PrismaClient not initialized with live PostgreSQL. Fallback store active.');
}

export default prisma;
