// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

// Cliente base
const prismaClientSingleton = () => {
  return new PrismaClient().$extends({
    query: {
      user: {
        async create({ args, query }) {
          // Novos usuários (ex.: cadastro via NextAuth) já nascem como ADMIN
          args.data = { ...args.data, role: (args.data as any).role ?? 'ADMIN' };
          return query(args);
        },
      },
    },
  });
};

type PrismaClientExtended = ReturnType<typeof prismaClientSingleton>;

// Garante que apenas uma instância do PrismaClient seja criada no ambiente de desenvolvimento
let prisma: PrismaClientExtended;

if (process.env.NODE_ENV === 'production') {
  prisma = prismaClientSingleton();
} else {
  // @ts-ignore
  if (!global.prisma) {
    // @ts-ignore
    global.prisma = prismaClientSingleton();
  }
  // @ts-ignore
  prisma = global.prisma;
}

export default prisma;
