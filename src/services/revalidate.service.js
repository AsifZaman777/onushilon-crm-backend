import { ENV } from "../config/env.js";

let timer = null;

/**
 * Tells the Next.js website to drop its cached public content so CRM edits show
 * up on the very next page view. Debounced so bulk edits cause one refresh.
 */
export function notifyWebsiteContentChanged() {
  if (!ENV.WEBSITE_URL) return;
  clearTimeout(timer);
  timer = setTimeout(async () => {
    try {
      const res = await fetch(`${ENV.WEBSITE_URL.replace(/\/+$/, "")}/api/revalidate`, {
        method: "POST",
        headers: { "x-revalidate-secret": ENV.REVALIDATE_SECRET },
        signal: AbortSignal.timeout(8000),
      });
      if (!res.ok) console.warn(`Website revalidation responded ${res.status}`);
    } catch (err) {
      console.warn("Website revalidation skipped:", err.message);
    }
  }, 150);
}
