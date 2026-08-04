import bcrypt from "bcryptjs";
import { prisma } from "./prisma";
import { createToken, verifyToken, verifyTokenPayload, COOKIE_NAME } from "./jwt";

/* ------------------------------------------------------------------ */
/*  Password hashing                                                   */
/* ------------------------------------------------------------------ */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export { createToken, verifyToken, verifyTokenPayload, COOKIE_NAME };

/* ------------------------------------------------------------------ */
/*  Login verification                                                  */
/* ------------------------------------------------------------------ */export async function authenticateAdmin(
  email: string,
  password: string
): Promise<string | null> {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || !user.active) return null;

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return null;

  return createToken(user.id, user.role);
}

export async function getUserByToken(token: string) {
  const payload = await verifyTokenPayload(token);
  if (!payload) return null;

  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
    select: { id: true, name: true, email: true, role: true, active: true },
  });

  return user;
}