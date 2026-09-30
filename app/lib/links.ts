// Shared outbound links for the AutoKnerd marketing site.
// Single source of truth so the nav, footer, and every page stay in sync.

// Interim: points at the new v3 demo (live on the Vercel app project) instead of the
// Railway app, which still runs the old classic demo. Switch to the branded Railway URL
// (https://autoknerdapp-production.up.railway.app/demo) once v3 is deployed there.
export const DEMO = "https://autoknerdappv2.vercel.app/demo";
export const BOOK = "https://calendar.app.google/JEqSARn8hvjPtvUy9";
export const LOGIN = "https://autoknerdapp-production.up.railway.app/";

export const ext = { target: "_blank", rel: "noopener noreferrer" } as const;
