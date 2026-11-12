import { setModePref, setStyle, useGlobalTheme } from "~/theme";
import type { ModePref, Style } from "~/theme";
import "./theme-switcher.css";

const STYLES: { value: Style; label: string }[] = [
  { value: "tech", label: "科技" },
  { value: "print", label: "印刷" },
];

const MODES: { value: ModePref; label: string }[] = [
  { value: "light", label: "亮" },
  { value: "dark", label: "暗" },
  { value: "system", label: "自动" },
];

export function ThemeSwitcher() {
  const theme = useGlobalTheme();
  return (
    <div className="theme-switch">
      <div className="theme-switch-group" role="group" aria-label="风格">
        {STYLES.map((o) => (
          <button
            key={o.value}
            type="button"
            data-option={`style-${o.value}`}
            aria-pressed={theme.style === o.value}
            onClick={() => setStyle(o.value)}
          >
            {o.label}
          </button>
        ))}
      </div>
      <div className="theme-switch-group" role="group" aria-label="明暗">
        {MODES.map((o) => (
          <button
            key={o.value}
            type="button"
            data-option={`mode-${o.value}`}
            aria-pressed={theme.modePref === o.value}
            onClick={() => setModePref(o.value)}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}
