import {
  type Topic,
  type TopicPage,
  topicPageFile,
  topicPagePath,
  topicPages,
  topicPath,
  topics,
} from "./topics";

const pageModules = import.meta.glob("../topics/*/*.tsx");

export const isPageWritten = (topic: Topic, page: TopicPage): boolean =>
  `../${topicPageFile(topic, page)}` in pageModules;

export const isWritten = (topic: Topic): boolean =>
  topicPages(topic).some((page) => isPageWritten(topic, page));

export function topicEntryPath(topic: Topic): string {
  const first = topicPages(topic).find((page) => isPageWritten(topic, page));
  return first ? topicPagePath(topic, first) : topicPath(topic);
}

export interface WrittenEntry {
  topic: Topic;
  page: TopicPage;
  to: string;
}

const writtenEntries: readonly WrittenEntry[] = topics.flatMap((topic) =>
  topicPages(topic)
    .filter((page) => isPageWritten(topic, page))
    .map((page) => ({
      topic,
      page,
      to: topicPagePath(topic, page),
    })),
);

export function findWrittenEntry(pathname: string): WrittenEntry | undefined {
  const clean = pathname.replace(/\/+$/, "") || "/";
  return writtenEntries.find((entry) => entry.to === clean);
}

export function neighbors(
  topic: Topic,
  pageSlug = "",
): { prev?: WrittenEntry; next?: WrittenEntry } {
  const i = writtenEntries.findIndex(
    (entry) => entry.topic.slug === topic.slug && entry.page.slug === pageSlug,
  );
  if (i === -1) return {};
  return { prev: writtenEntries[i - 1], next: writtenEntries[i + 1] };
}
