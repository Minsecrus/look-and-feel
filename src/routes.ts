import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";
import { topicPath, topics } from "./content/topics";

function topicModule(slug: string): string {
  const article = `topics/${slug}/index.tsx`;
  const exists = existsSync(fileURLToPath(new URL(`./${article}`, import.meta.url)));
  return exists ? article : "routes/topic-placeholder.tsx";
}

export default [
  layout("routes/site-layout.tsx", [
    index("routes/home.tsx"),
    ...topics.map((t) =>
      route(topicPath(t).slice(1), topicModule(t.slug), { id: `topic-${t.slug}` }),
    ),
    route("specimen", "routes/specimen.tsx"),
    route("*", "routes/not-found.tsx"),
  ]),
] satisfies RouteConfig;
