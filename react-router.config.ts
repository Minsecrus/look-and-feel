import type { Config } from "@react-router/dev/config";
import { topicPath, topics } from "./src/content/topics";

export default {
  appDirectory: "src",
  basename: "/look-and-feel/",
  ssr: false,
  prerender: ["/", "/specimen", ...topics.map(topicPath)],
} satisfies Config;
