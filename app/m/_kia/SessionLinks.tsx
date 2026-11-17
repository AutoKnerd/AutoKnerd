"use client";
import { useState } from "react";

// "Open" and "Copy link" buttons for a Wingspan class, same links as the vILT Live Tracker.
export const wingspanLink = (id: string) => `https://wingspan.kiauniversity.com/app/schedulo/events/event-details/${id}`;

export function SessionLinks({ id, className }: { id: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  const url = wingspanLink(id);
  return (
    <span className={className}>
      <a href={url} target="_blank" rel="noopener noreferrer">Open</a>
      <button type="button" onClick={() => navigator.clipboard.writeText(url).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1500); })}>
        {copied ? "Copied" : "Copy link"}
      </button>
    </span>
  );
}
