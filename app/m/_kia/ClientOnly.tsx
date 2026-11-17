"use client";
import { useSyncExternalStore, type ReactNode } from "react";

// Renders its children only in the browser (never in the server HTML). Used for the per-trainer tracker tab,
// which starts hidden, so nothing is lost by skipping it on the server.
const noop = () => () => {};
export function ClientOnly({ children }: { children: ReactNode }) {
  const browser = useSyncExternalStore(noop, () => true, () => false);
  return browser ? <>{children}</> : null;
}
