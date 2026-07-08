export type SheetRecordType = "lead" | "support_ticket" | "conversation";

export async function appendToSheet(type: SheetRecordType, payload: Record<string, unknown>) {
  const webhook = import.meta.env.GOOGLE_SHEETS_WEBHOOK_URL || process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!webhook) {
    console.info(`[sheets:${type}]`, JSON.stringify(payload));
    return { saved: false, mode: "log" as const };
  }
  try {
    const response = await fetch(webhook, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ type, payload }), signal: AbortSignal.timeout(20000) });
    if (!response.ok) throw new Error(`Sheets webhook returned ${response.status}`);
    const result = await response.json().catch(() => null);
    if (!result?.ok) throw new Error(result?.error || "Sheets webhook rejected the record");
    return { saved: true, mode: "webhook" as const };
  } catch (error) {
    console.error(`[sheets:${type}]`, error instanceof Error ? error.message : "Webhook failed", JSON.stringify(payload));
    return { saved: false, mode: "log" as const };
  }
}
