export type ArticleBlock =
  | { type: "heading"; depth: 2 | 3; id: string; text: string }
  | { type: "paragraph"; text: string }
  | { type: "quote"; text: string }
  | { type: "list"; items: string[] }
  | { type: "code"; text: string }
  | { type: "divider" }
  | { type: "callout"; label: string; text: string }
  | { type: "image"; alt: string; src: string }
  | { type: "table"; headers: string[]; rows: string[][] };

const slugify = (value: string) => value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "section";
const tableCells = (value: string) => value.trim().replace(/^\||\|$/g, "").split("|").map((cell) => cell.trim());

export function parseArticle(content: string): ArticleBlock[] {
  const lines = content.replace(/\r/g, "").split("\n");
  const blocks: ArticleBlock[] = [];
  let index = 0;
  const paragraph = (parts: string[]) => parts.join(" ").trim();

  while (index < lines.length) {
    const line = lines[index].trim();
    if (!line) { index += 1; continue; }
    if (line.startsWith("```") ) {
      const code: string[] = []; index += 1;
      while (index < lines.length && !lines[index].trim().startsWith("```")) code.push(lines[index++]);
      if (index < lines.length) index += 1;
      blocks.push({ type: "code", text: code.join("\n") }); continue;
    }
    if (line.startsWith(":::")) {
      const label = line.slice(3).trim() || "Note"; const note: string[] = []; index += 1;
      while (index < lines.length && lines[index].trim() !== ":::") note.push(lines[index++]);
      if (index < lines.length) index += 1;
      blocks.push({ type: "callout", label, text: paragraph(note) }); continue;
    }
    const heading = line.match(/^(#{2,3})\s+(.+)$/);
    if (heading) { const text = heading[2]; blocks.push({ type: "heading", depth: heading[1].length as 2 | 3, text, id: slugify(text) }); index += 1; continue; }
    const image = line.match(/^!\[([^\]]*)\]\(([^\)]+)\)$/);
    if (image) { blocks.push({ type: "image", alt: image[1], src: image[2] }); index += 1; continue; }
    if (/^---+$/.test(line)) { blocks.push({ type: "divider" }); index += 1; continue; }
    if (line.startsWith(">")) { blocks.push({ type: "quote", text: line.replace(/^>\s?/, "") }); index += 1; continue; }
    if (/^-\s+/.test(line)) { const items: string[] = []; while (index < lines.length && /^-\s+/.test(lines[index].trim())) items.push(lines[index++].trim().replace(/^-\s+/, "")); blocks.push({ type: "list", items }); continue; }
    if (line.startsWith("|") && lines[index + 1]?.trim().match(/^\|?\s*:?-+/)) {
      const headers = tableCells(line); index += 2; const rows: string[][] = [];
      while (index < lines.length && lines[index].trim().startsWith("|")) rows.push(tableCells(lines[index++]));
      blocks.push({ type: "table", headers, rows }); continue;
    }
    const parts = [line]; index += 1;
    while (index < lines.length && lines[index].trim() && !/^(#{2,3}\s+|```|:::|!\[|>\s?|[-]\s+|---+$|\|)/.test(lines[index].trim())) parts.push(lines[index++].trim());
    blocks.push({ type: "paragraph", text: paragraph(parts) });
  }
  return blocks;
}
