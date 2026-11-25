import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";
import { topicPageFile, topicPagePath, topicPages, topics } from "./content/topics";

function hasFile(file: string): boolean {
  return existsSync(fileURLToPath(new URL(`./${file}`, import.meta.url)));
}

const topicRoutes = topics.flatMap((topic) =>
  topicPages(topic)
    .map((page) => ({
      path: topicPagePath(topic, page).slice(1),
      file: topicPageFile(topic, page),
    }))
    .filter(({ file }) => hasFile(file))
    .map(({ path, file }) => route(path, file)),
);

export default [
  layout("routes/site-layout.tsx", [
    index("routes/home.tsx"),
    ...topicRoutes,
    route("references", "routes/references.tsx"),
    route("specimen", "routes/specimen.tsx"),
    route("*", "routes/not-found.tsx"),
  ]),
] satisfies RouteConfig;
