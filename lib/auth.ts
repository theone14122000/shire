import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "himalayan-shire-default-secret-change-me"
);
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "shire2024";

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
export async function createToken(): Promise<string> {
  return new SignJWT({ role: "admin" })
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

/* ------------------------------------------------------------------ */
/*  Login verification                                                  */
/* ------------------------------------------------------------------ */
export async function authenticateAdmin(
  password: string
): Promise<string | null> {
  if (password === ADMIN_PASSWORD) {
    return createToken();
  }
  return null;
}

export { COOKIE_NAME };
