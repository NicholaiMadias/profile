"use strict";

const extension = location.protocol === "chrome-extension:";
const field = (id) => document.getElementById(id);
const statusMessage = field("status");
const answer = field("answer");
const send = field("send");

function backendUrl(value) {
  const url = new URL(value);
  const cloud = url.protocol === "https:" && url.hostname.endsWith(".run.app");
  const local = url.protocol === "http:" && url.hostname === "127.0.0.1";
  if ((!cloud && !local) || url.username || url.password ||
      url.pathname !== "/" || url.search || url.hash) {
    throw new Error("Enter the root URL of a Cloud Run service or http://127.0.0.1:8080.");
  }
  return url;
}

if (extension) {
  document.body.classList.add("extension");
  field("web-links").hidden = true;
  const capture = field("capture");
  capture.hidden = false;
  capture.addEventListener("click", async () => {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (!tab?.id || !/^https?:/.test(tab.url ?? "")) {
        throw new Error("Select text on a regular web page first.");
      }
      const [reading] = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["content.js"],
      });
      field("selection").value = reading.result ?? "";
      statusMessage.textContent = reading.result ? "Review the captured text before sending." : "No text selected.";
    } catch (error) {
      statusMessage.textContent = error.message;
    }
  });
}

document.querySelector("form").addEventListener("submit", async (event) => {
  event.preventDefault();
  if (send.disabled) return;
  send.disabled = true;
  answer.hidden = true;
  answer.textContent = "";
  statusMessage.textContent = "Sending…";
  try {
    const url = backendUrl(field("backend").value.trim());
    const token = field("token").value.trim();
    const prompt = field("prompt").value.trim();
    if (!token || !prompt) throw new Error("Enter an access token and prompt.");
    if (extension) {
      const granted = await chrome.permissions.request({
        origins: [url.protocol + "//" + url.hostname + "/*"],
      });
      if (!granted) throw new Error("Allow access to the selected backend to continue.");
    }
    const response = await fetch(new URL("/api/ask", url), {
      method: "POST",
      headers: { Authorization: "Bearer " + token, "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, context: field("selection").value }),
      credentials: "omit",
      redirect: "error",
      signal: AbortSignal.timeout(35000),
    });
    const payload = await response.json();
    if (!response.ok) throw new Error(payload.error ?? "Request failed.");
    answer.textContent = payload.answer;
    answer.hidden = false;
    statusMessage.textContent = "Response received.";
  } catch (error) {
    statusMessage.textContent = error.message;
  } finally {
    send.disabled = false;
  }
});
