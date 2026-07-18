import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { blogFixtures, type BlogPost, type BlogStatus } from "../data/blog";

export type { BlogPost } from "../data/blog";

type LegacyPost = Partial<BlogPost> & { author?: string; date?: string };
type SheetsResponse = { ok?: boolean; error?: string; posts?: LegacyPost[]; post?: LegacyPost };

const file = join(process.cwd(), "data", "blogs.json");
const fallbackDate = () => new Date().toISOString();
const statuses: BlogStatus[] = ["draft", "scheduled", "published", "archived"];

const asArray = (value: unknown) => Array.isArray(value) ? value.map(String).filter(Boolean) : [];
const withPhase2cFixtures = (posts: BlogPost[]) => [
  ...posts,
  ...blogFixtures.map(normalizePost).filter((fixture) => !posts.some((post) => post.slug === fixture.slug)),
];

export const normalizePost = (post: LegacyPost): BlogPost => {
  const publishedAt = String(post.publishedAt || post.date || post.updatedAt || fallbackDate());
  // Legacy repository posts predate explicit status and were already public.
  const status = statuses.includes(post.status as BlogStatus) ? post.status as BlogStatus : "published";
  const title = String(post.title || "");
  const slug = String(post.slug || "");
  return {
    id: String(post.id || slug || crypto.randomUUID()),
    title,
    slug,
    excerpt: String(post.excerpt || ""),
    content: String(post.content || ""),
    coverImage: String(post.coverImage || ""),
    coverImageAlt: String(post.coverImageAlt || ""),
    authorName: String(post.authorName || post.author || "HerNexAI Team"),
    category: String(post.category || "Perspective"),
    tags: asArray(post.tags),
    status,
    featured: Boolean(post.featured),
    publishedAt,
    updatedAt: String(post.updatedAt || publishedAt),
    estimatedReadingTime: String(post.estimatedReadingTime || "3 min read"),
    metaTitle: String(post.metaTitle || `${title} | HerNexAI`),
    metaDescription: String(post.metaDescription || post.excerpt || ""),
    canonicalUrl: post.canonicalUrl ? String(post.canonicalUrl) : undefined,
    ogImage: post.ogImage ? String(post.ogImage) : undefined,
    noindex: Boolean(post.noindex),
    isDevelopmentFixture: Boolean(post.isDevelopmentFixture),
  };
};

async function sheetBlog(action: "list" | "save" | "delete", payload: Record<string, unknown> = {}): Promise<SheetsResponse | null> {
  const webhook = import.meta.env.GOOGLE_SHEETS_WEBHOOK_URL || process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!webhook) return null;
  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "blog_post", action, payload }),
      signal: AbortSignal.timeout(20_000),
    });
    if (!response.ok) throw new Error(`Sheets webhook returned ${response.status}`);
    const result = await response.json().catch(() => null) as SheetsResponse | null;
    if (!result?.ok) throw new Error(result?.error || "Sheets webhook rejected blog action");
    return result;
  } catch (error) {
    console.error("[sheets:blog_post]", error instanceof Error ? error.message : "Webhook failed");
    return null;
  }
}

export async function getPosts(): Promise<BlogPost[]> {
  const remote = await sheetBlog("list");
  if (Array.isArray(remote?.posts) && remote.posts.length) return withPhase2cFixtures(remote.posts.map(normalizePost).filter((post) => post.slug));
  try {
    const local = JSON.parse(await readFile(file, "utf8")) as LegacyPost[];
    return withPhase2cFixtures(local.map(normalizePost).filter((post) => post.slug));
  } catch {
    return withPhase2cFixtures([]);
  }
}

export const isPublicPost = (post: BlogPost, now = Date.now()) =>
  post.status === "published" || (post.status === "scheduled" && new Date(post.publishedAt).getTime() <= now);

export async function getPublicPosts(now = Date.now()) {
  return (await getPosts()).filter((post) => isPublicPost(post, now)).sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
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
  if (remote) return;
  const posts = await getPosts();
  await writePosts(posts.filter((post) => post.slug !== slug));
}
