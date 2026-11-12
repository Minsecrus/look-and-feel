export type Style = "tech" | "print";
export type Mode = "light" | "dark";
export type ModePref = Mode | "system";

export interface ThemeState {
  style: Style;
  modePref: ModePref;
  mode: Mode;
}

export const DEFAULT_STYLE: Style = "print";
const KEY_STYLE = "syss:style";
const KEY_MODE = "syss:mode";
const DARK_QUERY = "(prefers-color-scheme: dark)";

const isStyle = (v: unknown): v is Style => v === "tech" || v === "print";
const isMode = (v: unknown): v is Mode => v === "light" || v === "dark";

export const themeInitScript = `(function(){var d=document.documentElement,s=null,m=null;try{s=localStorage.getItem("${KEY_STYLE}");m=localStorage.getItem("${KEY_MODE}")}catch(e){}if(s!=="tech"&&s!=="print")s="${DEFAULT_STYLE}";var p=(m==="light"||m==="dark")?m:"system";if(p==="system"){try{m=matchMedia("${DARK_QUERY}").matches?"dark":"light"}catch(e){m="light"}}d.setAttribute("data-style",s);d.setAttribute("data-mode",m);d.setAttribute("data-mode-pref",p)})();`;

const memory = new Map<string, string>();

function load(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return memory.get(key) ?? null;
  }
}

function save(key: string, value: string | null): void {
  if (value === null) memory.delete(key);
  else memory.set(key, value);
  try {
    if (value === null) localStorage.removeItem(key);
    else localStorage.setItem(key, value);
  } catch {
  }
}

export const serverSnapshot: ThemeState = {
  style: DEFAULT_STYLE,
  modePref: "system",
  mode: "light",
};

let snapshot: ThemeState | null = null;
const listeners = new Set<() => void>();

function systemMode(): Mode {
  return window.matchMedia(DARK_QUERY).matches ? "dark" : "light";
}

function read(): ThemeState {
  const s = load(KEY_STYLE);
  const m = load(KEY_MODE);
  const style = isStyle(s) ? s : DEFAULT_STYLE;
  const modePref: ModePref = isMode(m) ? m : "system";
  return { style, modePref, mode: modePref === "system" ? systemMode() : modePref };
}

function apply(state: ThemeState): void {
  const root = document.documentElement;
  root.setAttribute("data-style", state.style);
  root.setAttribute("data-mode", state.mode);
  root.setAttribute("data-mode-pref", state.modePref);
}

function refresh(): void {
  snapshot = read();
  apply(snapshot);
  listeners.forEach((l) => l());
}

export function getSnapshot(): ThemeState {
  return (snapshot ??= read());
}

export function subscribe(listener: () => void): () => void {
  if (listeners.size === 0) {
    window.matchMedia(DARK_QUERY).addEventListener("change", refresh);
    window.addEventListener("storage", onStorage);
  }
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) {
      window.matchMedia(DARK_QUERY).removeEventListener("change", refresh);
      window.removeEventListener("storage", onStorage);
    }
  };
}

function onStorage(e: StorageEvent): void {
  if (e.key === KEY_STYLE || e.key === KEY_MODE || e.key === null) refresh();
}

export function setStyle(style: Style): void {
  save(KEY_STYLE, style);
  refresh();
}

export function setModePref(pref: ModePref): void {
  save(KEY_MODE, pref === "system" ? null : pref);
  refresh();
}
