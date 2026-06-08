/**
 * Bible Parent — Waitlist endpoint for Google Sheets
 * ------------------------------------------------
 * This script appends each submitted e-mail as a new row in your Sheet.
 *
 * SETUP (one time):
 *   1. Create a Google Sheet. In the first row, add headers:
 *        A1: Date    B1: Email    C1: Source
 *   2. In the Sheet menu: Extensions ▸ Apps Script.
 *   3. Delete any sample code and paste THIS whole file.
 *   4. Click Deploy ▸ New deployment ▸ type "Web app".
 *        - Description: Bible Parent waitlist
 *        - Execute as:  Me
 *        - Who has access: Anyone
 *   5. Click Deploy, authorize, and COPY the Web app URL.
 *   6. Paste that URL into script.js as ENDPOINT_URL.
 *
 * To get a CSV later: File ▸ Download ▸ Comma-separated values (.csv).
 */

function doPost(e) {
  return handle(e);
}

// Allows quick testing in a browser: ...exec?email=test@test.com
function doGet(e) {
  return handle(e);
}

function handle(e) {
  try {
    var params = (e && e.parameter) || {};
    var email = (params.email || "").toString().trim();
    var source = (params.source || "").toString().trim();

    if (!email || email.indexOf("@") === -1) {
      return json({ ok: false, error: "invalid_email" });
    }

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];

    // Optional: prevent duplicate e-mails.
    var existing = sheet.getRange("B:B").getValues().flat()
      .map(function (v) { return v.toString().trim().toLowerCase(); });
    if (existing.indexOf(email.toLowerCase()) !== -1) {
      return json({ ok: true, duplicate: true });
    }

    sheet.appendRow([new Date(), email, source]);
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: err.toString() });
  }
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
