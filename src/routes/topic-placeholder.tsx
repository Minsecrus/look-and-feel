import { Article, P } from "~/components/prose";
import { findTopicByPath } from "~/content/topics";
import { useLocation } from "react-router";
import type { Route } from "./+types/topic-placeholder";

export function meta({ location }: Route.MetaArgs) {
  const topic = findTopicByPath(location.pathname);
  return [{ title: topic ? `${topic.title} · 顺眼顺手` : "顺眼顺手" }];
}

export default function TopicPlaceholder() {
  const topic = findTopicByPath(useLocation().pathname);
  if (!topic) return null;
  return (
    <Article topic={topic}>
      <P>这一篇还在写。</P>
    </Article>
  );
}
