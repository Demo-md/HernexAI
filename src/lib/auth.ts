import { createHmac, timingSafeEqual } from "node:crypto";

const secret = () => process.env.ADMIN_SESSION_SECRET || "change-this-secret";
export const adminEmail = () => process.env.ADMIN_EMAIL || "";
export const adminPassword = () => process.env.ADMIN_PASSWORD || "";
export const sessionToken = () => createHmac("sha256", secret()).update(`${adminEmail()}:${adminPassword()}`).digest("hex");
export const validSession = (value?: string) => {
  if (!value) return false;
  const expected = sessionToken();
  return value.length === expected.length && timingSafeEqual(Buffer.from(value), Buffer.from(expected));
};
