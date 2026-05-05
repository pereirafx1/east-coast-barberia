import { SignJWT, jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET ?? "east-coast-secret-change-in-production"
);
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "barberia2025";
const TOKEN_COOKIE = "admin_token";

export { TOKEN_COOKIE, ADMIN_PASSWORD };

export async function signToken(): Promise<string> {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(SECRET);
}

export async function verifyToken(token: string): Promise<boolean> {
  try {
    await jwtVerify(token, SECRET);
    return true;
  } catch {
    return false;
  }
}
