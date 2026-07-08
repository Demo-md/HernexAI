import type { APIRoute } from "astro";
import { validSession } from "../../lib/auth";
import { deletePost, getPosts, savePost } from "../../lib/blog";

export const GET: APIRoute = async () => Response.json(await getPosts());

const slugify = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 80);

async function parsePost(request: Request) {
  const body = await request.json().catch(() => ({}));
  const title = String(body.title || "").trim().slice(0, 140);
  const excerpt = String(body.excerpt || "").trim().slice(0, 300);
  const content = String(body.content || "").trim().slice(0, 30000);
  const slug = slugify(String(body.slug || title));
  const coverImage = String(body.coverImage || "").trim().slice(0, 600);
  const status = body.status === "draft" ? "draft" : "published";
  const date = String(body.date || new Date().toISOString().slice(0, 10));
  if (!slug || !title || !excerpt || content.length < 50) return { error: "Add a title, excerpt, and at least 50 characters of article content." };
  return { slug, title, excerpt, content, coverImage, status, date, author: "HerNexAI Team", updatedAt: new Date().toISOString() };
}

export const POST: APIRoute = async ({ request, cookies }) => {
  if (!validSession(cookies.get("hernex_admin")?.value)) return Response.json({ error: "Sign in again to publish." }, { status: 401 });
  const post = await parsePost(request);
  if ("error" in post) return Response.json({ error: post.error }, { status: 400 });
  return Response.json(await savePost(post), { status: 201 });
};

export const PUT: APIRoute = async ({ request, cookies }) => {
  if (!validSession(cookies.get("hernex_admin")?.value)) return Response.json({ error: "Sign in again to update." }, { status: 401 });
  const post = await parsePost(request);
  if ("error" in post) return Response.json({ error: post.error }, { status: 400 });
  return Response.json(await savePost(post));
};

export const DELETE: APIRoute = async ({ request, cookies }) => {
  if (!validSession(cookies.get("hernex_admin")?.value)) return Response.json({ error: "Sign in again to delete." }, { status: 401 });
  const { slug } = await request.json().catch(() => ({}));
  if (!slug) return Response.json({ error: "Missing post slug." }, { status: 400 });
  await deletePost(String(slug));
  return Response.json({ ok: true });
};
