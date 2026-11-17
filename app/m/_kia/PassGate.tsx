import s from "./gate.module.css";

// Passcode screen shown instead of a private Kia page. Nothing from the page's data is sent until it is passed.
export function Gate({ title, next, wrong }: { title: string; next: string; wrong?: boolean }) {
  const configured = !!process.env.KIA_PAGES_PASSCODE;
  return (
    <div className={s.page}>
      <form className={s.card} method="post" action="/m/kia-access">
        <h1 className={s.h1}>{title}</h1>
        <p className={s.sub}>This page is for the Kia University training team. Enter the shared passcode.</p>
        <input type="hidden" name="next" value={next} />
        <label className={s.label} htmlFor="passcode">Passcode</label>
        <input className={s.input} id="passcode" name="passcode" type="password" autoComplete="current-password" required autoFocus />
        {wrong && <p className={s.err} role="alert">That passcode didn&rsquo;t match. Try again.</p>}
        {!configured && <p className={s.err}>The passcode hasn&rsquo;t been set up yet.</p>}
        <button className={s.btn} type="submit">Open</button>
      </form>
    </div>
  );
}
