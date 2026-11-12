import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";
import { topicPath, topics } from "./content/topics";

const articleFile = (slug: string) => `topics/${slug}/index.tsx`;
const written = topics.filter((t) =>
  existsSync(fileURLToPath(new URL(`./${articleFile(t.slug)}`, import.meta.url))),
);

export default [
  layout("routes/site-layout.tsx", [
    index("routes/home.tsx"),
    ...written.map((t) => route(topicPath(t).slice(1), articleFile(t.slug))),
    route("specimen", "routes/specimen.tsx"),
    route("*", "routes/not-found.tsx"),
  ]),
] satisfies RouteConfig;
