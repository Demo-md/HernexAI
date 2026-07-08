import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { blogSeed } from "../data/site";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  coverImage: string;
  status: "draft" | "published";
  date: string;
  updatedAt: string;
};
const file = join(process.cwd(), "data", "blogs.json");

const fallbackDate = () => new Date().toISOString();
const normalizePost = (post: Partial<BlogPost>): BlogPost => ({
  slug: String(post.slug || ""),
  title: String(post.title || ""),
  excerpt: String(post.excerpt || ""),
  content: String(post.content || ""),
  author: String(post.author || "HerNexAI Team"),
  coverImage: String(post.coverImage || ""),
  status: post.status === "draft" ? "draft" : "published",
  date: String(post.date || post.updatedAt || fallbackDate()),
  updatedAt: String(post.updatedAt || post.date || fallbackDate()),
});

async function sheetBlog(action: "list" | "save" | "delete", payload: Record<string, unknown> = {}) {
  const webhook = import.meta.env.GOOGLE_SHEETS_WEBHOOK_URL || process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!webhook) return null;
  try {
    const response = await fetch(webhook, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ type: "blog_post", action, payload }), signal: AbortSignal.timeout(20000) });
    if (!response.ok) throw new Error(`Sheets webhook returned ${response.status}`);
    const result = await response.json().catch(() => null);
    if (!result?.ok) throw new Error(result?.error || "Sheets webhook rejected blog action");
    return result;
  } catch (error) {
    console.error("[sheets:blog_post]", error instanceof Error ? error.message : "Webhook failed");
    return null;
  }
}

export async function getPosts(): Promise<BlogPost[]> {
  const remote = await sheetBlog("list");
  if (Array.isArray(remote?.posts)) return remote.posts.map(normalizePost).filter((post) => post.slug);
  try { return JSON.parse(await readFile(file, "utf8")).map(normalizePost); }
  catch { return blogSeed.map(normalizePost); }
}

async function writePosts(posts: BlogPost[]) {
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, JSON.stringify(posts, null, 2));
}

export async function savePost(post: BlogPost) {
  const normalized = normalizePost(post);
  const remote = await sheetBlog("save", normalized);
  if (remote?.post) return normalizePost(remote.post);
  const posts = await getPosts();
  const next = [normalized, ...posts.filter((item) => item.slug !== normalized.slug)];
  await writePosts(next);
  return normalized;
}

export async function deletePost(slug: string) {
  const remote = await sheetBlog("delete", { slug });
  if (remote?.ok) return;
  const posts = await getPosts();
  await writePosts(posts.filter((item) => item.slug !== slug));
}
