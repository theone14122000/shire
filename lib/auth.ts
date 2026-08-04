import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { prisma } from "./prisma";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "himalayan-shire-default-secret-change-me"
);
const TOKEN_EXPIRY = "24h";
const COOKIE_NAME = "admin_token";

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

/* ------------------------------------------------------------------ */
/*  JWT tokens                                                         */
/* ------------------------------------------------------------------ */
export async function createToken(userId: string, role: string): Promise<string> {
  return new SignJWT({ userId, role })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(TOKEN_EXPIRY)
    .sign(JWT_SECRET);
}

export async function verifyToken(token: string): Promise<boolean> {
  try {
    await jwtVerify(token, JWT_SECRET);
    return true;
  } catch {
    return false;
  }
}

export async function verifyTokenPayload(token: string): Promise<{ userId: string; role: string } | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return { userId: payload.userId as string, role: payload.role as string };
  } catch {
    return null;
  }
}

/* ------------------------------------------------------------------ */
/*  Login verification                                                  */
/* ------------------------------------------------------------------ */
export async function authenticateAdmin(
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

export { COOKIE_NAME };