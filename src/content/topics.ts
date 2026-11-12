export type Part = "look" | "feel";

export interface Topic {
  slug: string;
  part: Part;
  title: string;
}

export const parts: Record<Part, { title: string; en: string }> = {
  look: { title: "顺眼", en: "Look" },
  feel: { title: "顺手", en: "Feel" },
};

export const topics: readonly Topic[] = [
  { part: "look", slug: "scale", title: "尺度" },
  { part: "look", slug: "style", title: "风格" },
  { part: "look", slug: "density", title: "密度" },
  { part: "look", slug: "adapt", title: "适配" },

  { part: "feel", slug: "hide", title: "隐藏" },
  { part: "feel", slug: "group", title: "分组" },
  { part: "feel", slug: "order", title: "排序" },
  { part: "feel", slug: "filter", title: "筛选" },
  { part: "feel", slug: "empty", title: "空白" },
  { part: "feel", slug: "input", title: "输入" },
  { part: "feel", slug: "wait", title: "等待" },
  { part: "feel", slug: "forgive", title: "容错" },
  { part: "feel", slug: "copy", title: "文案" },
];

export function topicPath(topic: Topic): string {
  return `/${topic.part}/${topic.slug}`;
}

export function findTopicByPath(pathname: string): Topic | undefined {
  const clean = pathname.replace(/\/+$/, "");
  return topics.find((t) => topicPath(t) === clean);
}

export function neighbors(topic: Topic): { prev?: Topic; next?: Topic } {
  const i = topics.indexOf(topic);
  return { prev: topics[i - 1], next: topics[i + 1] };
}
