import { type ReactNode, createContext, useContext, useSyncExternalStore } from "react";
import {
  type Mode,
  type Style,
  type ThemeState,
  getSnapshot,
  serverSnapshot,
  subscribe,
} from "./store";

export { setModePref, setStyle } from "./store";
export type { Mode, ModePref, Style, ThemeState } from "./store";

export function useGlobalTheme(): ThemeState {
  return useSyncExternalStore(subscribe, getSnapshot, () => serverSnapshot);
}

const ScopeContext = createContext<{ style?: Style; mode?: Mode }>({});

export function useTheme(): { style: Style; mode: Mode } {
  const global = useGlobalTheme();
  const scope = useContext(ScopeContext);
  return { style: scope.style ?? global.style, mode: scope.mode ?? global.mode };
}

interface ThemeScopeProps {
  style?: Style;
  mode?: Mode;
  className?: string;
  children: ReactNode;
}

export function ThemeScope({ style, mode, className, children }: ThemeScopeProps) {
  const outer = useContext(ScopeContext);
  return (
    <ScopeContext value={{ style: style ?? outer.style, mode: mode ?? outer.mode }}>
      <div className={className} data-style={style} data-mode={mode}>
        {children}
      </div>
    </ScopeContext>
  );
}
