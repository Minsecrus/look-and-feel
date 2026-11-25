export type Part = "look" | "feel";

export interface TopicPage {
  /** Relative slug under the topic; use "" for the chapter index page (index.tsx). */
  slug: string;
  title: string;
}

export interface Topic {
  slug: string;
  part: Part;
  title: string;
  pages?: readonly TopicPage[];
}

export const topics: readonly Topic[] = [
  {
    part: "look",
    slug: "content",
    title: "内容",
    pages: [
      { slug: "", title: "第一个网站" },
      { slug: "real-and-fake", title: "真内容和假内容" },
    ],
  },
  { part: "look", slug: "layout", title: "划分" },
  { part: "look", slug: "scale", title: "尺度" },
  { part: "look", slug: "style", title: "风格" },
  { part: "look", slug: "density", title: "密度" },
  { part: "look", slug: "adapt", title: "适配" },

  { part: "feel", slug: "hide", title: "隐藏" },
  { part: "feel", slug: "group", title: "分组" },
  { part: "feel", slug: "order", title: "排序" },
  { part: "feel", slug: "filter", title: "筛选" },
  { part: "feel", slug: "empty", title: "空白" },
  { part: "feel", slug: "click", title: "点击" },
  { part: "feel", slug: "input", title: "输入" },
  { part: "feel", slug: "wait", title: "等待" },
  { part: "feel", slug: "forgive", title: "容错" },
  { part: "feel", slug: "copy", title: "文案" },
];

export function requireTopic(slug: string): Topic {
  const topic = topics.find((t) => t.slug === slug);
  if (!topic) throw new Error(`Unknown topic: ${slug}`);
  return topic;
}

export function topicPath(topic: Topic): string {
  return `/${topic.part}/${topic.slug}`;
}

export function topicPages(topic: Topic): readonly TopicPage[] {
  return topic.pages && topic.pages.length > 0
    ? topic.pages
    : [{ slug: "", title: topic.title }];
}

export function topicPagePath(topic: Topic, page: TopicPage): string {
  return page.slug ? `${topicPath(topic)}/${page.slug}` : topicPath(topic);
}

export function topicPageFile(topic: Topic, page: TopicPage): string {
  return page.slug ? `topics/${topic.slug}/${page.slug}.tsx` : `topics/${topic.slug}/index.tsx`;
}
