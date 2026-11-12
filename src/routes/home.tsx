import type { Route } from "./+types/home";

export function meta(_: Route.MetaArgs) {
  return [{ title: "顺眼顺手" }];
}

export default function Home() {
  return null;
}
