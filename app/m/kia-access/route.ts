import { NextResponse } from "next/server";
import { GATE_COOKIE, GATE_MAX_AGE, passMatches, passToken, safeNext } from "../_kia/gate";

// Receives the passcode form on the private Kia pages, sets the access cookie and sends the reader back.
export async function POST(req: Request) {
  const form = await req.formData();
  const pass = String(form.get("passcode") || "");
  const next = safeNext(String(form.get("next") || ""));
  const base = new URL(req.url);
  if (!passMatches(pass)) {
    await new Promise((r) => setTimeout(r, 800)); // slow down guessing
    return NextResponse.redirect(new URL(next + (next.includes("?") ? "&" : "?") + "wrong=1", base), 303);
  }
  const res = NextResponse.redirect(new URL(next, base), 303);
  res.cookies.set(GATE_COOKIE, passToken(pass), { httpOnly: true, secure: base.protocol === "https:", sameSite: "lax", path: "/m", maxAge: GATE_MAX_AGE });
  return res;
}
