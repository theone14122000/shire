import { PrismaClient } from "@prisma/client";

function normalizeDatabaseUrl(url: string | undefined): string | undefined {
  if (!url) return url;
  if (url.includes("connection_limit")) return url;
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}connection_limit=1&pool_timeout=30000`;
}

if (process.env.DATABASE_URL) {
  process.env.DATABASE_URL = normalizeDatabaseUrl(process.env.DATABASE_URL);
}

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query"] : [],
  });

globalForPrisma.prisma = prisma;
