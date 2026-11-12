import type { Route } from "./+types/specimen";
import "./specimen.css";

export function meta(_: Route.MetaArgs) {
  return [{ title: "样张 · 顺眼顺手" }, { name: "robots", content: "noindex" }];
}

const SURFACES = ["--bg", "--bg-subtle", "--bg-raised", "--bg-sunken", "--inverse-bg"];
const INKS = ["--text", "--text-2", "--text-3", "--accent-text"];

const SAMPLE = "“顺眼”‘顺手’——look and feel……padding 16px / 18px，2026 年。";

export default function Specimen() {
  return (
    <div className="specimen">
      <h1 className="specimen-title">样张</h1>
      <section className="specimen-card">
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

        <h2 className="specimen-heading">标题 Heading</h2>
        <p>{SAMPLE}</p>

        <div className="specimen-buttons">
          <button type="button" className="specimen-btn is-accent">主要操作</button>
          <button type="button" className="specimen-btn is-inverse">反色按钮</button>
          <button type="button" className="specimen-btn">次要</button>
        </div>

        <pre className="specimen-code">
          <code>{`.button {\n  padding: 0 var(--btn-px);\n}`}</code>
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
      </section>
    </div>
  );
}
