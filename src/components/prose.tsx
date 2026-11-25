import type { ReactNode } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router";
import { type Topic, topicPages } from "~/content/topics";
import { type WrittenEntry, neighbors } from "~/content/written";

function pagerLabel(current: Topic, target: WrittenEntry): string {
  if (target.topic.slug === current.slug || target.page.title === target.topic.title) {
    return target.page.title;
  }
  return `${target.topic.title} · ${target.page.title}`;
}

export function Article({
  topic,
  page = "",
  title,
  children,
}: {
  topic: Topic;
  page?: string;
  title?: string;
  children?: ReactNode;
}) {
  const currentPage = topicPages(topic).find((p) => p.slug === page);
  const heading = title ?? currentPage?.title ?? topic.title;
  const { prev, next } = neighbors(topic, page);
  return (
    <article className="prose">
      <h1 className="prose-title">{heading}</h1>
      {children}
      {(prev || next) && (
        <nav className="prose-pager" aria-label="上下页">
          {prev && (
            <Link to={prev.to} rel="prev">
              <ArrowLeft className="prose-pager-icon" aria-hidden />
              <span>{pagerLabel(topic, prev)}</span>
            </Link>
          )}
          {next && (
            <Link to={next.to} rel="next">
              <span>{pagerLabel(topic, next)}</span>
              <ArrowRight className="prose-pager-icon" aria-hidden />
            </Link>
          )}
        </nav>
      )}
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

export function ExtLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="prose-ext">
      {children}
      <ArrowUpRight className="prose-ext-icon" aria-hidden />
    </a>
  );
}

export function Aside({ children }: { children: ReactNode }) {
  return <span className="prose-aside">{children}</span>;
}

export function Note({ children }: { children: ReactNode }) {
  return <aside className="prose-note">{children}</aside>;
}

export function Figure({
  wide,
  caption,
  children,
}: {
  wide?: boolean;
  caption?: ReactNode;
  children: ReactNode;
}) {
  return (
    <figure className={wide ? "prose-figure prose-figure--wide" : "prose-figure"}>
      <div className="prose-figure-frame">{children}</div>
      {caption && <figcaption className="prose-figure-caption">{caption}</figcaption>}
    </figure>
  );
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
