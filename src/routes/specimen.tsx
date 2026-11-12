import { ThemeScope } from "~/theme";
import type { Mode, Style } from "~/theme";
import type { Route } from "./+types/specimen";
import "./specimen.css";

export function meta(_: Route.MetaArgs) {
  return [{ title: "样张 · 顺眼顺手" }, { name: "robots", content: "noindex" }];
}

const THEMES: { style: Style; mode: Mode; name: string }[] = [
  { style: "tech", mode: "light", name: "科技 · 亮" },
  { style: "tech", mode: "dark", name: "科技 · 暗" },
  { style: "print", mode: "light", name: "印刷 · 亮" },
  { style: "print", mode: "dark", name: "印刷 · 暗" },
];

const SURFACES = ["--bg", "--bg-subtle", "--bg-raised", "--bg-sunken", "--inverse-bg"];
const INKS = ["--text", "--text-2", "--text-3", "--accent-text"];

const SAMPLE = "“顺眼”‘顺手’——look and feel……padding 16px / 18px，2026 年。";

export default function Specimen() {
  return (
    <div className="specimen">
      <h1 className="specimen-title">样张</h1>

      <section className="specimen-grid">
        {THEMES.map((t) => (
          <ThemeScope key={t.name} style={t.style} mode={t.mode} className="specimen-card">
            <h2 className="specimen-card-name">{t.name}</h2>

            <div className="specimen-swatches">
              {SURFACES.map((v) => (
                <div key={v} className="specimen-swatch" style={{ background: `var(${v})` }}>
                  <code>{v}</code>
                </div>
              ))}
            </div>

            <div className="specimen-inks">
              {INKS.map((v) => (
                <p key={v} style={{ color: `var(${v})` }}>
                  <code>{v}</code> 文字 Text
                </p>
              ))}
            </div>

            <h3 className="specimen-heading">标题 Heading</h3>
            <p className="specimen-body">{SAMPLE}</p>

            <div className="specimen-buttons">
              <button type="button" className="specimen-btn is-accent">主要操作</button>
              <button type="button" className="specimen-btn is-inverse">反色按钮</button>
              <button type="button" className="specimen-btn">次要</button>
            </div>

            <pre className="specimen-code">
              <code>{`.button {\n  padding: 0 var(--btn-px); \n}`}</code>
            </pre>

            <table className="specimen-table">
              <tbody>
                {[["均价", "1,234.56"], ["最低", "987.10"], ["成交", "11,111"]].map(([k, n]) => (
                  <tr key={k}>
                    <th scope="row">{k}</th>
                    <td className="num">{n}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </ThemeScope>
        ))}
      </section>

      <h2 className="specimen-subtitle">Newsreader / Source Serif 4</h2>
      <section className="specimen-compare">
        {[
          { name: "Newsreader", stack: "var(--stack-serif)" },
          { name: "Source Serif 4", stack: "var(--stack-serif-alt)" },
        ].map((f) => (
          <ThemeScope key={f.name} style="print" className="specimen-card">
            <h3 className="specimen-card-name">{f.name}</h3>
            <p className="specimen-serif" style={{ fontFamily: f.stack }}>
              The quick brown fox jumps over 13 lazy dogs. 敏捷的棕色狐狸跳过了“13 只”懒狗。
            </p>
          </ThemeScope>
        ))}
      </section>

      <h2 className="specimen-subtitle">ThemeScope</h2>
      <section className="specimen-compare">
        <ThemeScope style="tech" className="specimen-card">
          <p className="specimen-body">style=tech，mode 跟随</p>
        </ThemeScope>
        <ThemeScope style="print" className="specimen-card">
          <p className="specimen-body">style=print，mode 跟随</p>
        </ThemeScope>
      </section>
    </div>
  );
}
