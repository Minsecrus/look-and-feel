import { type Topic, topics } from "./topics";

const articles = import.meta.glob("../topics/*/index.tsx");

export const isWritten = (t: Topic) => `../topics/${t.slug}/index.tsx` in articles;

const written = topics.filter(isWritten);

export function neighbors(topic: Topic): { prev?: Topic; next?: Topic } {
  const i = written.indexOf(topic);
  return { prev: written[i - 1], next: written[i + 1] };
}
