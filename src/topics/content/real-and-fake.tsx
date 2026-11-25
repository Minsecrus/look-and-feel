import { Article } from "~/components/prose";
import { requireTopic } from "~/content/topics";

const topic = requireTopic("content");

export function meta() {
  return [
    { title: "真内容和假内容 · 内容 · 顺眼顺手" },
    { name: "description", content: "怎样辨别界面中的假内容，并将其替换成真内容。" },
  ];
}

export default function ContentRealAndFake() {
  return <Article topic={topic} page="real-and-fake" />;
}
