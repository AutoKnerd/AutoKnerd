import { PDFDocument, PDFName, PDFString, StandardFonts, rgb, type PDFFont, type PDFPage } from "pdf-lib";
import { readFeed, isTrackerData } from "../../_kia/feed";
import type { TrackerData } from "../Tracker";

// Downloadable PDF of upcoming vILT classes with clickable Wingspan links.
//   /m/vilt-tracker/pdf              everyone (global tracker)
//   /m/vilt-tracker/pdf?who=Andrew   one trainer (runway pages, or the tracker filtered to one person)
// Same data the tracker page shows, which is link-only, so this needs no passcode either.
export const dynamic = "force-dynamic";

const FULL: Record<string, string> = { Andrew: "Andrew Sardone", Anthony: "Anthony Burkhardt", Paul: "Paul Reilly" };
const COLOR: Record<string, [number, number, number]> = { Andrew: [0.12, 0.37, 0.75], Anthony: [0.71, 0.33, 0.1], Paul: [0.17, 0.48, 0.29] };
const link = (id: string) => `https://wingspan.kiauniversity.com/app/schedulo/events/event-details/${id}`;
// Standard PDF fonts only cover basic Latin: swap the few typographic characters course titles use.
const plain = (t: string) => String(t).replace(/[–—]/g, "-").replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/[^\x20-\x7e\xa0-\xff]/g, "");

function etToday() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/New_York", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
}
const iso = (mdy: string) => `${mdy.slice(6, 10)}-${mdy.slice(0, 2)}-${mdy.slice(3, 5)}`;
const longDate = (isoDate: string) => new Date(isoDate + "T12:00:00Z").toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", timeZone: "UTC" });

function fit(text: string, font: PDFFont, size: number, max: number) {
  let t = text;
  if (font.widthOfTextAtSize(t, size) <= max) return t;
  while (t.length > 1 && font.widthOfTextAtSize(t + "...", size) > max) t = t.slice(0, -1);
  return t + "...";
}

function addLink(doc: PDFDocument, page: PDFPage, url: string, x: number, y: number, w: number, h: number) {
  const annot = doc.context.register(doc.context.obj({
    Type: "Annot", Subtype: "Link", Rect: [x, y, x + w, y + h], Border: [0, 0, 0],
    A: { Type: "Action", S: "URI", URI: PDFString.of(url) },
  }));
  const annots = page.node.lookup(PDFName.of("Annots"));
  if (annots && "push" in annots) (annots as unknown as { push: (r: unknown) => void }).push(annot);
  else page.node.set(PDFName.of("Annots"), doc.context.obj([annot]));
}

export async function GET(req: Request) {
  const who = new URL(req.url).searchParams.get("who") || "";
  const one = FULL[who] ? who : "";
  const data = await readFeed<TrackerData>("tracker", isTrackerData);
  if (!data) return new Response("The schedule couldn't be loaded right now. Try again in a few minutes.", { status: 503 });

  const today = etToday();
  const rows = data.D.filter((r) => iso(r[0]) >= today && (!one || r[4] === one))
    .sort((a, b) => (iso(a[0]) + mins(a[2])).localeCompare(iso(b[0]) + mins(b[2])) || a[4].localeCompare(b[4]));

  const doc = await PDFDocument.create();
  const reg = await doc.embedFont(StandardFonts.Helvetica), bold = await doc.embedFont(StandardFonts.HelveticaBold);
  const W = 612, H = 792, M = 48, ink = rgb(0.08, 0.09, 0.11), muted = rgb(0.36, 0.39, 0.44), line = rgb(0.85, 0.87, 0.9), blue = rgb(0.12, 0.37, 0.75);
  const title = one ? `vILT schedule - ${FULL[one]}` : "vILT schedule - Andrew Sardone, Anthony Burkhardt, Paul Reilly";
  doc.setTitle(plain(title)); doc.setAuthor("AutoKnerd"); doc.setSubject("Upcoming Kia University virtual classes");

  let page = doc.addPage([W, H]), y = H - M, pageNo = 1;
  const footer = () => page.drawText(plain(`Kia University virtual classes - upcoming from ${longDate(today)} - page ${pageNo}`), { x: M, y: 28, size: 8, font: reg, color: muted });
  const newPage = () => { footer(); page = doc.addPage([W, H]); pageNo++; y = H - M; };
  const need = (h: number) => { if (y - h < 48) newPage(); };

  page.drawText(plain(title), { x: M, y: y - 18, size: 18, font: bold, color: ink });
  y -= 36;
  page.drawText(plain(`${rows.length} upcoming class${rows.length === 1 ? "" : "es"} - schedule as of ${data.meta.asOf} - click a class or its link to open it in Wingspan`), { x: M, y, size: 9, font: reg, color: muted });
  y -= 22;

  let day = "";
  for (const r of rows) {
    const d = iso(r[0]);
    if (d !== day) {
      need(84); // keep a day heading with at least its first class
      day = d;
      y -= 8;
      page.drawText(plain(longDate(d)).toUpperCase(), { x: M, y, size: 9.5, font: bold, color: muted });
      y -= 6;
      page.drawLine({ start: { x: M, y }, end: { x: W - M, y }, thickness: 0.6, color: line });
      y -= 14;
    }
    need(40);
    const url = link(r[6]);
    const time = plain(`${r[2]} - ${r[3]}`);
    const course = fit(plain(r[5]), bold, 10.5, W - M - 150 - 70);
    const [cr, cg, cb] = COLOR[r[4]] || [0.3, 0.3, 0.3];
    page.drawRectangle({ x: M, y: one ? y - 16 : y - 26, width: 2.5, height: one ? 24 : 34, color: rgb(cr, cg, cb) });
    page.drawText(time, { x: M + 10, y, size: 9.5, font: reg, color: ink });
    page.drawText(course, { x: M + 140, y, size: 10.5, font: bold, color: ink });
    if (!one) page.drawText(plain(FULL[r[4]] || r[4]), { x: M + 140, y: y - 12, size: 8.5, font: reg, color: rgb(cr, cg, cb) });
    const urlText = fit(url, reg, 7, W - M - (M + 140));
    page.drawText(urlText, { x: M + 140, y: one ? y - 12 : y - 23, size: 7, font: reg, color: blue });
    const btn = "Open";
    const bw = bold.widthOfTextAtSize(btn, 9) + 16;
    page.drawRectangle({ x: W - M - bw, y: y - 5, width: bw, height: 17, borderColor: blue, borderWidth: 0.8, color: rgb(0.95, 0.97, 1) });
    page.drawText(btn, { x: W - M - bw + 8, y, size: 9, font: bold, color: blue });
    addLink(doc, page, url, W - M - bw, y - 5, bw, 17);                 // the Open button
    addLink(doc, page, url, M + 140, one ? y - 15 : y - 26, W - M - bw - (M + 150), one ? 26 : 37); // course name + link text
    y -= one ? 30 : 40;
  }
  if (!rows.length) page.drawText("No upcoming classes.", { x: M, y, size: 11, font: reg, color: ink });
  footer();

  const bytes = await doc.save();
  const name = `vILT-schedule-${one ? one.toLowerCase() + "-" : ""}${today}.pdf`;
  return new Response(Buffer.from(bytes), {
    headers: { "Content-Type": "application/pdf", "Content-Disposition": `attachment; filename="${name}"`, "Cache-Control": "no-store" },
  });
}

function mins(t: string) { const m = /(\d+):(\d+)\s*([AP])M/i.exec(t || ""); if (!m) return "0000"; let h = +m[1] % 12; if (/p/i.test(m[3])) h += 12; return String(h).padStart(2, "0") + m[2]; }
