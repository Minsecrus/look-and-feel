import { Link } from "react-router";
import { Eye, Zap } from "lucide-react";
import { Minsecrus } from "~/components/Minsecrus";
import { type Part, topicPath, topics } from "~/content/topics";
import { isWritten } from "~/content/written";
import type { Route } from "./+types/home";
import "./home.css";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "顺眼顺手 · UI/UX 教程" },
    { name: "description", content: "UI/UX 教程：让界面看着顺眼，用着顺手。" },
  ];
}

const GROUPS: Part[] = ["look", "feel"];

export default function Home() {
  return (
    <div className="home">
      <h1 className="hero">
        <span className="hero-line-1">
          让界面看着
          <span className="hero-icon hero-eye" aria-hidden>
            <Eye />
          </span>
          顺眼<span className="hero-hang">，</span>
        </span>
        <span className="hero-by">
          <span className="hero-kind">UI/UX 教程</span>
          <span className="hero-credit">
            <span className="hero-by-text">by</span>
            <Minsecrus className="hero-mark" />
          </span>
        </span>
        <span className="hero-line-2">
          用着顺手
          <span className="hero-icon hero-bolt" aria-hidden>
            <Zap />
          </span>
          <span className="hero-hang">。</span>
        </span>
      </h1>

      <nav className="home-topics" aria-label="目录">
        {GROUPS.map((part) => (
          <ul key={part} role="list" className="home-group">
            {topics
              .filter((t) => t.part === part)
              .map((t) => (
                <li key={t.slug}>
                  {isWritten(t) ? <Link to={topicPath(t)}>{t.title}</Link> : <span>{t.title}</span>}
                </li>
              ))}
            <li className="home-aside">
              <span>{part === "look" ? "设计系统" : "参考资料"}</span>
            </li>
          </ul>
        ))}
      </nav>
    </div>
  );
}
