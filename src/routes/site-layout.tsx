import type { MouseEvent } from "react";
import { Info } from "lucide-react";
import { Link, Outlet, useLocation, useMatches } from "react-router";
import { TopicSidebar } from "~/components/TopicSidebar";
import { findWrittenEntry, topicEntryPath } from "~/content/written";

export interface SectionInfo {
  title: string;
  to: string;
}

interface SectionHandle {
  section?: SectionInfo;
}

function normalizePath(path: string): string {
  return path.replace(/\/+$/, "") || "/";
}

function useCurrentSection(activeTopic: ReturnType<typeof findWrittenEntry>): SectionInfo | undefined {
  const { pathname } = useLocation();
  const matches = useMatches();
  const clean = normalizePath(pathname);

  if (clean === "/") return undefined;

  for (let i = matches.length - 1; i >= 0; i--) {
    const handle = matches[i]?.handle as SectionHandle | undefined;
    if (handle?.section) return handle.section;
  }

  if (activeTopic) {
    return {
      title: activeTopic.topic.title,
      to: topicEntryPath(activeTopic.topic),
    };
  }

  return undefined;
}

export default function SiteLayout() {
  const { pathname } = useLocation();
  const activeEntry = findWrittenEntry(pathname);
  const section = useCurrentSection(activeEntry);

  function handleSectionClick(event: MouseEvent<HTMLAnchorElement>) {
    if (!section) return;
    if (normalizePath(pathname) === normalizePath(section.to)) {
      event.preventDefault();
      const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
      window.scrollTo({ top: 0, behavior });
    }
  }

  return (
    <div className="site">
      <header className="site-header">
        <nav className="site-nav" aria-label="导航">
          <Link to="/" className="site-brand">
            顺眼顺手
          </Link>
          {section && (
            <>
              <span className="site-sep" aria-hidden>
                /
              </span>
              <Link to={section.to} className="site-section" onClick={handleSectionClick}>
                {section.title}
              </Link>
            </>
          )}
        </nav>
        <span className="site-info">
          <Info aria-hidden />
        </span>
      </header>
      <main className={activeEntry ? "site-main site-main--topic" : "site-main"}>
        {activeEntry ? (
          <>
            <TopicSidebar topic={activeEntry.topic} />
            <div className="site-stage">
              <Outlet />
            </div>
          </>
        ) : (
          <Outlet />
        )}
      </main>
    </div>
  );
}
