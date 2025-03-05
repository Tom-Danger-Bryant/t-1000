import { PrismaClient } from '@prisma/client';
import type { PrismaClient as Client } from  '@prisma/client';

declare global {
    var prisma : Client
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;