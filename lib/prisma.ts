import { PrismaClient } from "@prisma/client";

function normalizeDatabaseUrl(url: string | undefined): string | undefined {
  if (!url) return url;
  if (url.includes("connection_timeout")) return url;
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}connection_limit=3&connection_timeout=30000&pool_timeout=30&socket_timeout=60`;
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

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;