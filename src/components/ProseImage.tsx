import {
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { Check, ChevronDown, Maximize2, Minus, Plus, RotateCcw, X } from "lucide-react";
import "./prose-image.css";

const MIN_SCALE = 0.5;
const MAX_SCALE = 3;
const STEP = 0.25;
const DOUBLE_CLICK_SCALE = 1.75;
const ZOOM_PRESETS = [50, 75, 100, 150, 200, 300] as const;

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export interface ProseImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  caption?: ReactNode;
  wide?: boolean;
  bare?: boolean;
  overlay?: ReactNode;
}

export function ProseImage({
  src,
  alt,
  width,
  height,
  caption,
  wide,
  bare,
  overlay,
}: ProseImageProps) {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [instant, setInstant] = useState(false);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const menuWrapRef = useRef<HTMLDivElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const dragRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    originX: number;
    originY: number;
    moved: boolean;
  } | null>(null);
  const suppressCloseRef = useRef(false);

  const clampOffset = useCallback((x: number, y: number, nextScale: number) => {
    if (nextScale <= 1) return { x: 0, y: 0 };
    const img = imgRef.current;
    const maxX = img ? (img.clientWidth * (nextScale - 1)) / 2 + 96 : 480;
    const maxY = img ? (img.clientHeight * (nextScale - 1)) / 2 + 96 : 360;
    return {
      x: clamp(x, -maxX, maxX),
      y: clamp(y, -maxY, maxY),
    };
  }, []);

  const updateScale = useCallback(
    (next: number, options?: { immediate?: boolean }) => {
      const clamped = Math.round(clamp(next, MIN_SCALE, MAX_SCALE) * 100) / 100;
      setInstant(Boolean(options?.immediate));
      setScale(clamped);
      setOffset((prev) => clampOffset(prev.x, prev.y, clamped));
    },
    [clampOffset],
  );

  const resetView = useCallback(() => {
    setInstant(false);
    setScale(1);
    setOffset({ x: 0, y: 0 });
  }, []);

  const openLightbox = useCallback(() => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
    setDragging(false);
    setInstant(false);
    setMenuOpen(false);
    setOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setOpen(false);
    setMenuOpen(false);
    setDragging(false);
    dragRef.current = null;
    queueMicrotask(() => triggerRef.current?.focus());
  }, []);

  // Lock background scroll & focus dialog controls when open
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();

    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  // Close zoom preset menu on outside pointerdown
  useEffect(() => {
    if (!menuOpen) return;

    function onPointerDownOutside(event: PointerEvent) {
      if (menuWrapRef.current && !menuWrapRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    window.addEventListener("pointerdown", onPointerDownOutside);
    return () => window.removeEventListener("pointerdown", onPointerDownOutside);
  }, [menuOpen]);

  // Keyboard shortcuts
  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        if (menuOpen) {
          setMenuOpen(false);
          menuBtnRef.current?.focus();
        } else {
          closeLightbox();
        }
      } else if (event.key === "+" || event.key === "=") {
        event.preventDefault();
        setMenuOpen(false);
        updateScale(scale + STEP);
      } else if (event.key === "-" || event.key === "_") {
        event.preventDefault();
        setMenuOpen(false);
        updateScale(scale - STEP);
      } else if (event.key === "0") {
        event.preventDefault();
        setMenuOpen(false);
        resetView();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, menuOpen, scale, closeLightbox, updateScale, resetView]);

  // Wheel zoom (non-passive so we can prevent page scroll)
  useEffect(() => {
    if (!open) return;
    const stage = stageRef.current;
    if (!stage) return;

    function onWheel(event: WheelEvent) {
      event.preventDefault();
      const factor = event.ctrlKey ? 0.006 : 0.0015;
      const delta = -event.deltaY * factor;
      setInstant(true);
      setScale((prev) => {
        const next = Math.round(clamp(prev + delta, MIN_SCALE, MAX_SCALE) * 100) / 100;
        setOffset((cur) => clampOffset(cur.x, cur.y, next));
        return next;
      });
    }

    stage.addEventListener("wheel", onWheel, { passive: false });
    return () => stage.removeEventListener("wheel", onWheel);
  }, [open, clampOffset]);

  function onPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.button !== 0 || scale <= 1) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: offset.x,
      originY: offset.y,
      moved: false,
    };
    setDragging(true);
    setInstant(true);
  }

  function onPointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    const dx = event.clientX - drag.startX;
    const dy = event.clientY - drag.startY;
    if (!drag.moved && Math.hypot(dx, dy) > 4) {
      drag.moved = true;
    }
    setOffset(clampOffset(drag.originX + dx, drag.originY + dy, scale));
  }

  function onPointerUp(event: ReactPointerEvent<HTMLDivElement>) {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    if (drag.moved) {
      suppressCloseRef.current = true;
      queueMicrotask(() => {
        suppressCloseRef.current = false;
      });
    }
    dragRef.current = null;
    setDragging(false);
  }

  function onStageClick(event: React.MouseEvent<HTMLDivElement>) {
    if (suppressCloseRef.current) return;
    if (event.target === event.currentTarget) {
      if (menuOpen) {
        setMenuOpen(false);
      } else {
        closeLightbox();
      }
    }
  }

  function onImageDoubleClick() {
    if (scale > 1.05) {
      resetView();
    } else {
      updateScale(DOUBLE_CLICK_SCALE);
    }
  }

  const isDefault = Math.abs(scale - 1) < 0.005 && offset.x === 0 && offset.y === 0;
  const percent = Math.round(scale * 100);

  const frame = (
    <div className="prose-figure-frame">
      <button
        ref={triggerRef}
        type="button"
        className="prose-image-trigger"
        onClick={openLightbox}
        aria-label={`全屏查看图片：${alt}`}
      >
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
        />
        <span className="prose-image-hint" aria-hidden>
          <Maximize2 />
        </span>
      </button>
      {overlay}
    </div>
  );

  return (
    <>
      {bare ? (
        frame
      ) : (
        <figure className={wide ? "prose-figure prose-figure--wide" : "prose-figure"}>
          {frame}
          {caption && <figcaption className="prose-figure-caption">{caption}</figcaption>}
        </figure>
      )}

      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                className="prose-lightbox"
                role="dialog"
                aria-modal="true"
                aria-label={alt}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
              >
                <button
                  ref={closeBtnRef}
                  type="button"
                  className="prose-lightbox-close"
                  onClick={closeLightbox}
                  aria-label="关闭全屏预览"
                  title="关闭 (Esc)"
                >
                  <X aria-hidden />
                </button>

                <div
                  ref={stageRef}
                  className={
                    scale > 1
                      ? dragging
                        ? "prose-lightbox-stage is-grabbing"
                        : "prose-lightbox-stage is-pannable"
                      : "prose-lightbox-stage"
                  }
                  onClick={onStageClick}
                  onPointerDown={onPointerDown}
                  onPointerMove={onPointerMove}
                  onPointerUp={onPointerUp}
                  onPointerCancel={onPointerUp}
                >
                  <motion.div
                    className="prose-lightbox-canvas"
                    initial={{ scale: 0.97, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.98, opacity: 0 }}
                    transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <img
                      ref={imgRef}
                      src={src}
                      alt={alt}
                      width={width}
                      height={height}
                      draggable={false}
                      onDoubleClick={onImageDoubleClick}
                      className={
                        instant || dragging
                          ? "prose-lightbox-img is-instant"
                          : "prose-lightbox-img"
                      }
                      style={{
                        transform: `translate3d(${offset.x}px, ${offset.y}px, 0) scale(${scale})`,
                      }}
                    />
                  </motion.div>
                </div>

                <div className="prose-lightbox-dock">
                  {caption && <p className="prose-lightbox-caption">{caption}</p>}
                  <div className="prose-lightbox-bar" role="toolbar" aria-label="图片缩放控制">
                    <button
                      type="button"
                      className="prose-lightbox-btn"
                      onClick={() => {
                        setMenuOpen(false);
                        updateScale(scale - STEP);
                      }}
                      disabled={scale <= MIN_SCALE}
                      aria-label="缩小"
                      title="缩小 (-)"
                    >
                      <Minus aria-hidden />
                    </button>

                    <div ref={menuWrapRef} className="prose-lightbox-zoom">
                      <button
                        ref={menuBtnRef}
                        type="button"
                        className={
                          menuOpen
                            ? "prose-lightbox-readout is-open"
                            : "prose-lightbox-readout"
                        }
                        aria-haspopup="menu"
                        aria-expanded={menuOpen}
                        aria-label={`当前缩放 ${percent}%，选择缩放比例`}
                        onClick={() => setMenuOpen((prev) => !prev)}
                      >
                        <span className="prose-lightbox-percent num">{percent}%</span>
                        <ChevronDown className="prose-lightbox-chevron" aria-hidden />
                      </button>

                      <AnimatePresence>
                        {menuOpen && (
                          <motion.ul
                            role="menu"
                            aria-label="缩放比例"
                            className="prose-lightbox-menu"
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 4 }}
                            transition={{ duration: 0.12, ease: [0.22, 1, 0.36, 1] }}
                          >
                            {ZOOM_PRESETS.map((preset) => {
                              const active = percent === preset;
                              return (
                                <li key={preset} role="none">
                                  <button
                                    type="button"
                                    role="menuitemradio"
                                    aria-checked={active}
                                    className={
                                      active
                                        ? "prose-lightbox-option is-active"
                                        : "prose-lightbox-option"
                                    }
                                    onClick={() => {
                                      updateScale(preset / 100);
                                      setMenuOpen(false);
                                      menuBtnRef.current?.focus();
                                    }}
                                  >
                                    <span className="num">{preset}%</span>
                                    <Check
                                      className="prose-lightbox-check"
                                      aria-hidden
                                    />
                                  </button>
                                </li>
                              );
                            })}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </div>

                    <button
                      type="button"
                      className="prose-lightbox-btn"
                      onClick={() => {
                        setMenuOpen(false);
                        updateScale(scale + STEP);
                      }}
                      disabled={scale >= MAX_SCALE}
                      aria-label="放大"
                      title="放大 (+)"
                    >
                      <Plus aria-hidden />
                    </button>

                    <span className="prose-lightbox-sep" aria-hidden />

                    <button
                      type="button"
                      className="prose-lightbox-btn"
                      onClick={() => {
                        setMenuOpen(false);
                        resetView();
                      }}
                      disabled={isDefault}
                      aria-label="重置视图"
                      title="重置视图 (0)"
                    >
                      <RotateCcw aria-hidden />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
