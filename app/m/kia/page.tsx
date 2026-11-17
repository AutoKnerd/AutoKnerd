import type { Metadata } from "next";
import Link from "next/link";
import { hasAccess } from "../_kia/gate";
import { Gate } from "../_kia/PassGate";
import s from "./hub.module.css";

// One door for the Kia University pages: enter the passcode once, then every page is open (90-day cookie).
export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Kia University pages", robots: { index: false, follow: false } };

const PAGES = [
  { href: "/m/vilt-tracker", title: "vILT Live Tracker", text: "Upcoming virtual classes for Andrew, Anthony and Paul with registration links, and this year's results." },
  { href: "/m/enrollment-runway", title: "Enrollment Runway · Andrew Sardone", text: "Andrew's next 16 days: where each roster stands, where it should land, and whether the reminder emails went out. Plus past classes and what the emails are doing." },
  { href: "/m/runway/paul", title: "Enrollment Runway · Paul Reilly", text: "Paul's next 16 days: enrolled now, where each roster should land and how many to expect in the room, plus his past classes." },
  { href: "/m/runway/anthony", title: "Enrollment Runway · Anthony Burkhardt", text: "Anthony's next 16 days: enrolled now, where each roster should land and how many to expect in the room, plus his past classes." },
  { href: "/m/team-show-rate", title: "Team Show Rate", text: "How many enrolled dealer staff turn up, by instructor and course family, with the before-and-after test of the reminder emails." },
];

export default async function KiaHub({ searchParams }: { searchParams: Promise<{ wrong?: string }> }) {
  if (!(await hasAccess())) return <Gate title="Kia University pages" next="/m/kia" wrong={!!(await searchParams).wrong} />;
  return (
    <div className={s.page}>
      <div className={s.wrap}>
        <h1 className={s.h1}>Kia University pages</h1>
        <p className={s.sub}>Every page updates itself from Wingspan through the day. This browser stays unlocked for 90 days.</p>
        <ul className={s.list}>
          {PAGES.map((p) => (
            <li key={p.href}>
              <Link className={s.card} href={p.href}>
                <strong>{p.title}</strong>
                <span>{p.text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
