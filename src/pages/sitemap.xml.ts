import type { APIRoute } from "astro";
import { getPublicPosts } from "../lib/blog";

const escapeXml = (value: string) => value.replace(/[<>&'\"]/g, (character) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" })[character] || character);

export const GET: APIRoute = async ({ url }) => {
  const origin = import.meta.env.PUBLIC_SITE_URL || url.origin;
  const staticPaths = ["/", "/about", "/capabilities", "/contact", "/services", "/services/marketing", "/services/technology", "/insights"];
  const posts = (await getPublicPosts()).filter((post) => !post.noindex);
  const urls: Array<{ loc: string; lastmod?: string }> = [...staticPaths.map((path) => ({ loc: new URL(path, origin).toString() })), ...posts.map((post) => ({ loc: new URL(`/insights/${post.slug}`, origin).toString(), lastmod: post.updatedAt }))];
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map((item) => `\n  <url><loc>${escapeXml(item.loc)}</loc>${item.lastmod ? `<lastmod>${escapeXml(item.lastmod)}</lastmod>` : ""}</url>`).join("")}\n</urlset>`;
  return new Response(body, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
};
