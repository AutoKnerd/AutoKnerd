"use client";

import { useState } from "react";

// A copyable value shown as monospace text with a Copy button. Deliberately not
// a link: this page carries no navigable links.
export function CopyField({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable; the text is still selectable */
    }
  }

  return (
    <div style={{ display: "flex", alignItems: "stretch", gap: 10, flexWrap: "wrap", marginTop: 14 }}>
      <code
        style={{
          flex: "1 1 320px",
          minWidth: 0,
          display: "flex",
          alignItems: "center",
          background: "#0C1512",
          color: "#CCFF00",
          borderRadius: 12,
          padding: "14px 16px",
          fontSize: 15,
          lineHeight: 1.4,
          fontFamily: "var(--font-jetbrains-mono), ui-monospace, monospace",
          wordBreak: "break-all",
        }}
      >
        {value}
      </code>
      <button
        type="button"
        onClick={copy}
        style={{
          flexShrink: 0,
          border: "none",
          cursor: "pointer",
          borderRadius: 12,
          padding: "0 24px",
          minHeight: 52,
          fontWeight: 800,
          fontSize: 15,
          fontFamily: "inherit",
          background: "#CCFF00",
          color: "#0C1512",
          boxShadow: "0 8px 20px rgba(160,214,0,0.35)",
        }}
      >
        {copied ? "Copied ✓" : "Copy link"}
      </button>
    </div>
  );
}
