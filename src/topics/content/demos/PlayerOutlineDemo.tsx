import { useState } from "react";
import { ProseImage } from "~/components/ProseImage";
import playerLyrics from "../player-lyrics.jpg";
import "./player-outline.css";

interface PlayerRegion {
  id: string;
  label: string;
  detail: string;
  top: number;
  height: number;
}

const REGIONS: readonly PlayerRegion[] = [
  {
    id: "header",
    label: "顶部",
    detail: "收起、专辑封面、歌名与歌手、更多菜单",
    top: 5.2,
    height: 6.4,
  },
  {
    id: "lyrics",
    label: "歌词",
    detail: "逐字滚动的同步歌词，当前句高亮，前后句逐级虚化",
    top: 13.5,
    height: 55.5,
  },
  {
    id: "progress",
    label: "进度",
    detail: "播放进度条、已播时间、音质、剩余时间",
    top: 71.5,
    height: 7.2,
  },
  {
    id: "controls",
    label: "控制",
    detail: "随机播放、上一首、暂停 / 播放、下一首、循环模式",
    top: 79.5,
    height: 7.5,
  },
  {
    id: "footer",
    label: "底部",
    detail: "歌词开关、音频输出设备、播放列表",
    top: 87.5,
    height: 6.5,
  },
];

export function PlayerOutlineDemo() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [focused, setFocused] = useState<number | null>(null);
  const [pinned, setPinned] = useState<number | null>(null);
  const [lastIndex, setLastIndex] = useState(0);

  const active = hovered ?? focused ?? pinned;
  const shown = active !== null ? REGIONS[active] : REGIONS[lastIndex];

  function enter(index: number) {
    setLastIndex(index);
    setHovered(index);
  }

  function focus(index: number) {
    setLastIndex(index);
    setFocused(index);
  }

  function togglePin(index: number) {
    setLastIndex(index);
    setPinned((cur) => (cur === index ? null : index));
  }

  return (
    <figure className="prose-figure prose-figure--wide player-outline">
      <div className="player-outline-grid">
        <div className="player-outline-screen">
          <ProseImage
            bare
            src={playerLyrics}
            width={1280}
            height={2772}
            alt="手机音乐播放器歌词页截图：顶部是收起按钮、专辑封面和歌名、更多按钮；中间是同步滚动歌词；下方依次是进度条与时间音质、五个播放控制键、以及底部的歌词、输出设备与播放列表入口"
            overlay={
              shown && (
                <span
                  aria-hidden
                  className={
                    active !== null
                      ? "player-outline-spotlight is-visible"
                      : "player-outline-spotlight"
                  }
                  style={{
                    top: `${shown.top}%`,
                    height: `${shown.height}%`,
                  }}
                />
              )
            }
          />
        </div>

        <ol className="player-outline-list" role="list">
          {REGIONS.map((region, index) => {
            const isActive = active === index;
            return (
              <li key={region.id} className="player-outline-item">
                <button
                  type="button"
                  className={isActive ? "player-outline-row is-active" : "player-outline-row"}
                  aria-pressed={pinned === index}
                  onMouseEnter={() => enter(index)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => focus(index)}
                  onBlur={() => setFocused(null)}
                  onClick={() => togglePin(index)}
                >
                  <span className="player-outline-label">{region.label}</span>
                  <span className="player-outline-detail">{region.detail}</span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </figure>
  );
}
