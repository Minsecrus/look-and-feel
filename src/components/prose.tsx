import type { ReactNode } from "react";
import { Link } from "react-router";
import { type Topic, topicPath } from "~/content/topics";
import { neighbors } from "~/content/written";

export function Article({ topic, children }: { topic: Topic; children?: ReactNode }) {
  const { prev, next } = neighbors(topic);
  return (
    <article className="prose">
      <h1 className="prose-title">{topic.title}</h1>
      {children}
      <nav className="prose-pager" aria-label="上下篇">
        {prev && (
          <Link to={topicPath(prev)} rel="prev">
            {prev.title}
          </Link>
        )}
        {next && (
          <Link to={topicPath(next)} rel="next">
            {next.title}
          </Link>
        )}
      </nav>
    </article>
  );
}

export function H2({ id, children }: { id: string; children: ReactNode }) {
  return <h2 id={id}>{children}</h2>;
}

export function H3({ id, children }: { id: string; children: ReactNode }) {
  return <h3 id={id}>{children}</h3>;
}

export function P({ children }: { children: ReactNode }) {
  return <p>{children}</p>;
}

export function Code({ children }: { children: string }) {
  return <code>{children}</code>;
}

export function CodeBlock({ lang, children }: { lang?: string; children: string }) {
  return (
    <pre data-lang={lang}>
      <code>{dedent(children)}</code>
    </pre>
  );
}

function dedent(text: string): string {
  const lines = text.replace(/^\n+|\s+$/g, "").split("\n");
  const indent = Math.min(
    ...lines.filter((l) => l.trim()).map((l) => l.match(/^ */)?.[0].length ?? 0),
  );
  return lines.map((l) => l.slice(indent)).join("\n");
}
