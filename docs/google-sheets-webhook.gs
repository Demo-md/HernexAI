const SCHEMAS = {
  lead: { sheet: "Leads", headers: ["createdAt", "name", "phone", "email", "businessType", "requirement", "budgetRange", "urgency", "intent", "leadScore", "leadStatus", "conversationSummary", "source"] },
  support_ticket: { sheet: "Support Tickets", headers: ["createdAt", "ticketId", "name", "phone", "category", "issueSummary", "priority", "status", "source"] },
  conversation: { sheet: "Conversations", headers: ["createdAt", "sessionId", "role", "message", "intent"] },
  blog_post: { sheet: "Blog Posts", headers: ["slug", "title", "excerpt", "coverImage", "content", "status", "date", "author", "updatedAt"] },
};

function setupSheets() {
  const workbook = SpreadsheetApp.getActiveSpreadsheet();
  Object.values(SCHEMAS).forEach(({ sheet: name, headers }) => {
    const sheet = workbook.getSheetByName(name) || workbook.insertSheet(name);
    if (sheet.getLastRow() === 0) sheet.appendRow(headers);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, headers.length).setBackground("#11152A").setFontColor("#FFFFFF").setFontWeight("bold");
    sheet.autoResizeColumns(1, headers.length);
  });
}

function doPost(event) {
  try {
    const body = JSON.parse(event.postData.contents || "{}");
    const schema = SCHEMAS[body.type];
    if (!schema || !body.payload) return response({ ok: false, error: "Invalid record type" });
    const workbook = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = workbook.getSheetByName(schema.sheet);
    if (!sheet) return response({ ok: false, error: "Run setupSheets first" });

    if (body.type === "blog_post") return handleBlogPost(sheet, schema, body);

    sheet.appendRow(schema.headers.map((header) => body.payload[header] ?? ""));
    return response({ ok: true });
  } catch (error) {
    return response({ ok: false, error: String(error) });
  }
}

function handleBlogPost(sheet, schema, body) {
  const action = body.action || "save";
  if (action === "list") {
    const rows = sheet.getDataRange().getValues().slice(1);
    const posts = rows
      .filter((row) => row[0])
      .map((row) => Object.fromEntries(schema.headers.map((header, index) => [header, row[index] ?? ""])));
    return response({ ok: true, posts });
  }

  const slug = body.payload.slug;
  if (!slug) return response({ ok: false, error: "Missing blog slug" });
  const lastRow = sheet.getLastRow();
  const slugs = lastRow > 1 ? sheet.getRange(2, 1, lastRow - 1, 1).getValues().flat() : [];
  const index = slugs.findIndex((value) => value === slug);

  if (action === "delete") {
    if (index >= 0) sheet.deleteRow(index + 2);
    return response({ ok: true });
  }

  const row = schema.headers.map((header) => body.payload[header] ?? "");
  if (index >= 0) sheet.getRange(index + 2, 1, 1, row.length).setValues([row]);
  else sheet.appendRow(row);
  return response({ ok: true, post: body.payload });
}

function doGet() {
  return response({ ok: true, service: "HerNexAI chatbot webhook" });
}

function response(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}
