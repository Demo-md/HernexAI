import type { APIRoute } from "astro";
import { adminEmail, adminPassword, sessionToken } from "../../lib/auth";

export const POST: APIRoute = async ({ request, cookies }) => {
  const { email, password } = await request.json().catch(() => ({}));
  if (email !== adminEmail() || password !== adminPassword()) return Response.json({ error: "Incorrect email or password." }, { status: 401 });
  cookies.set("hernex_admin", sessionToken(), { httpOnly: true, sameSite: "strict", secure: import.meta.env.PROD, path: "/", maxAge: 60 * 60 * 8 });
  return Response.json({ ok: true });
};
