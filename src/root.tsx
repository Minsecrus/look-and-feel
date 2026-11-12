import type { ReactNode } from "react";
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import { MotionConfig } from "motion/react";

import "~/styles/index.css";

import "@fontsource-variable/quicksand";
import "@fontsource-variable/noto-sans-sc";
import "@fontsource/monaspace-argon/400.css";
import "@fontsource/monaspace-argon/600.css";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-CN">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Outlet />
    </MotionConfig>
  );
}
