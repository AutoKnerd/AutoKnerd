// Shared passcode for the private Kia pages (Team Show Rate, Enrollment Runway).
// The passcode lives only in the Vercel env var KIA_PAGES_PASSCODE. After a correct entry the browser keeps a
// cookie holding a hash of it (never the passcode itself) for 90 days; changing the passcode signs everyone out.
import { createHash, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const GATE_COOKIE = "kia_pages";
export const GATE_MAX_AGE = 90 * 24 * 3600;

export function passToken(pass: string) {
  return createHash("sha256").update("kia-pages-v1:" + pass).digest("hex");
}

export function passMatches(given: string) {
  const want = process.env.KIA_PAGES_PASSCODE;
  if (!want) return false;
  const a = Buffer.from(passToken(given)), b = Buffer.from(passToken(want));
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function hasAccess() {
  const want = process.env.KIA_PAGES_PASSCODE;
  if (!want) return false;
  const c = (await cookies()).get(GATE_COOKIE)?.value || "";
  const a = Buffer.from(c), b = Buffer.from(passToken(want));
  return a.length === b.length && timingSafeEqual(a, b);
}

/** Only allow redirects back to the private Kia pages. */
export function safeNext(next: string | null | undefined) {
  return next && /^\/m\/(kia|enrollment-runway|team-show-rate)(\/|$|\?|#)/.test(next) ? next : "/m/kia";
}
