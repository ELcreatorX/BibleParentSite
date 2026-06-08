// ─────────────────────────────────────────────────────────────
//  CONFIG — paste your Google Apps Script Web App URL here.
//  See README.md (section "Connect Google Sheets") for how to get it.
//  Until you set this, submissions are stored locally in your browser
//  so you can still test the page.
// ─────────────────────────────────────────────────────────────
const ENDPOINT_URL = "REMPLACEZ_PAR_VOTRE_URL_APPS_SCRIPT";

const form = document.getElementById("waitlist-form");
const emailInput = document.getElementById("email");
const submitBtn = document.getElementById("submit-btn");
const message = document.getElementById("form-message");
const hero = document.querySelector(".hero");

document.getElementById("year").textContent = new Date().getFullYear();

function showMessage(text, type) {
  message.textContent = text;
  message.className = "form-message show " + type;
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function setLoading(loading) {
  submitBtn.disabled = loading;
  submitBtn.classList.toggle("is-loading", loading);
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = emailInput.value.trim();

  if (!isValidEmail(email)) {
    showMessage("Please enter a valid email address.", "error");
    emailInput.focus();
    return;
  }

  setLoading(true);
  message.className = "form-message"; // hide previous message

  try {
    if (ENDPOINT_URL && !ENDPOINT_URL.startsWith("REMPLACEZ")) {
      // Send to Google Apps Script. We use no-cors + URL-encoded body so the
      // Apps Script doGet/doPost receives it without a CORS preflight.
      const body = new URLSearchParams({ email, source: location.hostname });
      await fetch(ENDPOINT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      // With mode:"no-cors" the response is opaque (can't be read), so we
      // optimistically treat a completed request as success.
    } else {
      // No endpoint configured yet — store locally so the page is testable.
      const stored = JSON.parse(localStorage.getItem("waitlist") || "[]");
      stored.push({ email, ts: new Date().toISOString() });
      localStorage.setItem("waitlist", JSON.stringify(stored));
      console.info("[Bible Parent] Endpoint not configured — email stored locally:", email);
    }

    hero.classList.add("submitted");
    showMessage("🎉 Thank you! You're on the list. We'll keep you posted.", "success");
    form.reset();
  } catch (err) {
    console.error(err);
    showMessage("Something went wrong. Please try again in a moment.", "error");
    setLoading(false);
  }
});
