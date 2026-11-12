import type { ReactNode } from "react";
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import { MotionConfig } from "motion/react";
import { DEFAULT_STYLE, themeInitScript } from "~/theme/store";

import "~/styles/index.css";

import "@fontsource-variable/quicksand";
import "@fontsource-variable/noto-sans-sc";
import "@fontsource-variable/noto-serif-sc";
import "@fontsource-variable/newsreader/opsz.css";
import "@fontsource-variable/source-serif-4/opsz.css";
import "@fontsource/monaspace-argon/400.css";
import "@fontsource/monaspace-argon/600.css";
import "@fontsource/monaspace-xenon/400.css";
import "@fontsource/monaspace-xenon/600.css";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-CN" data-style={DEFAULT_STYLE} data-mode="light" data-mode-pref="system" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
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
