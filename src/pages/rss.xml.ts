import type { APIRoute } from "astro";
import { getPublicPosts } from "../lib/blog";

const escapeXml = (value: string) => value.replace(/[<>&'\"]/g, (character) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" })[character] || character);

export const GET: APIRoute = async ({ url }) => {
  const origin = import.meta.env.PUBLIC_SITE_URL || url.origin;
  const posts = (await getPublicPosts()).filter((post) => !post.noindex);
  const items = posts.map((post) => `<item><title>${escapeXml(post.title)}</title><link>${escapeXml(new URL(`/insights/${post.slug}`, origin).toString())}</link><guid>${escapeXml(new URL(`/insights/${post.slug}`, origin).toString())}</guid><description>${escapeXml(post.excerpt)}</description><pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate></item>`).join("");
  const body = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>HerNexAI Blog</title><link>${escapeXml(new URL("/insights", origin).toString())}</link><description>Practical notes from HerNexAI.</description>${items}</channel></rss>`;
  return new Response(body, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
};
