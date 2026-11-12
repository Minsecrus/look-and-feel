import { cpSync, renameSync, rmSync } from "node:fs";

const out = "build/client";
const base = "look-and-feel";

renameSync(`${out}/index.html`, `${out}/404.html`);
cpSync(`${out}/${base}`, out, { recursive: true });
rmSync(`${out}/${base}`, { recursive: true });
