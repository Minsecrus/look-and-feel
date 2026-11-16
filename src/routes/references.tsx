import { ArrowUpRight } from "lucide-react";
import type { Route } from "./+types/references";
import "./references.css";

interface ReferenceItem {
  title: string;
  href: string;
}

interface ReferenceGroup {
  id: string;
  heading: string;
  items: ReferenceItem[];
}

const GROUPS: ReferenceGroup[] = [
  {
    id: "guides",
    heading: "手册与书刊",
    items: [
      { title: "Refactoring UI", href: "https://refactoringui.com" },
      { title: "Practical UI", href: "https://www.practical-ui.com" },
      { title: "Practical Typography", href: "https://practicaltypography.com" },
      {
        title: "Visual Design Rules You Can Safely Follow",
        href: "https://anthonyhobday.com/sideprojects/saferules/",
      },
      { title: "Every Layout", href: "https://every-layout.dev" },
      { title: "Don't Make Me Think", href: "https://sensible.com" },
      {
        title: "Designing Interfaces",
        href: "https://www.oreilly.com/library/view/designing-interfaces-3rd/9781492051954/",
      },
    ],
  },
  {
    id: "interaction",
    heading: "交互与规律",
    items: [
      { title: "Web Interface Guidelines", href: "https://interfaces.rauno.me" },
      { title: "Laws of UX", href: "https://lawsofux.com" },
    ],
  },
  {
    id: "systems",
    heading: "平台规范",
    items: [
      {
        title: "Apple Human Interface Guidelines",
        href: "https://developer.apple.com/design/human-interface-guidelines",
      },
      { title: "Material Design 3", href: "https://m3.material.io/" },
    ],
  },
  {
    id: "blogs",
    heading: "设计师站点",
    items: [
      { title: "Paco Coursey", href: "https://paco.me" },
      { title: "Rauno Freiberg", href: "https://rauno.me/craft" },
      { title: "Emil Kowalski", href: "https://emilkowal.ski" },
      { title: "Josh W. Comeau", href: "https://www.joshwcomeau.com" },
      { title: "Brian Lovin", href: "https://brianlovin.com" },
      { title: "Steph Ango", href: "https://stephango.com" },
      { title: "Frank Chimero", href: "https://frankchimero.com" },
      { title: "Andy Matuschak", href: "https://notes.andymatuschak.org" },
      { title: "Maggie Appleton", href: "https://maggieappleton.com" },
    ],
  },
];

function formatHost(href: string): string {
  return new URL(href).hostname.replace(/^www\./, "");
}

export const handle = {
  section: { title: "参考资料", to: "/references" },
};

export function meta(_: Route.MetaArgs) {
  return [
    { title: "参考资料 · 顺眼顺手" },
    { name: "description", content: "UI/UX 参考资料索引。" },
  ];
}

export default function References() {
  return (
    <article className="references">
      <h1 className="references-title">参考资料</h1>

      {GROUPS.map((group) => (
        <section key={group.id} className="references-section" aria-labelledby={group.id}>
          <h2 id={group.id} className="references-heading">
            {group.heading}
          </h2>
          <ul className="references-list" role="list">
            {group.items.map((item) => (
              <li key={item.href} className="references-item">
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="references-link"
                >
                  <span className="references-name">{item.title}</span>
                  <span className="references-host">
                    <span>{formatHost(item.href)}</span>
                    <ArrowUpRight aria-hidden />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </article>
  );
}
