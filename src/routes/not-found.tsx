import { Link } from "react-router";
import type { Route } from "./+types/not-found";

export function meta(_: Route.MetaArgs) {
  return [{ title: "没找到这一页 · 顺眼顺手" }, { name: "robots", content: "noindex" }];
}

export default function NotFound() {
  return (
    <div className="prose">
      <h1 className="prose-title">没找到这一页</h1>
      <p>
        <Link to="/">回首页</Link>
      </p>
    </div>
  );
}
