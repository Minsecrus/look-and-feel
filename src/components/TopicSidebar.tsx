import { NavLink } from "react-router";
import { type Topic, topicPagePath, topicPages } from "~/content/topics";
import { isPageWritten } from "~/content/written";
import "./topic-sidebar.css";

export function TopicSidebar({ topic }: { topic: Topic }) {
  const pages = topicPages(topic);

  return (
    <aside className="topic-sidebar">
      <nav aria-label={`${topic.title}目录`}>
        <ol className="topic-sidebar-list" role="list">
          {pages.map((page) => {
            const to = topicPagePath(topic, page);
            return (
              <li key={page.slug || "__index"} className="topic-sidebar-item">
                {isPageWritten(topic, page) ? (
                  <NavLink to={to} end className="topic-sidebar-link">
                    {page.title}
                  </NavLink>
                ) : (
                  <span className="topic-sidebar-label">{page.title}</span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </aside>
  );
}
