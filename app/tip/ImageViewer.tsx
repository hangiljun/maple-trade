"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { X, ZoomIn, ZoomOut } from "lucide-react";

interface Props {
  src: string;
  alt: string;
}

export default function ImageViewer({ src, alt }: Props) {
  const [open, setOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef({ mx: 0, my: 0, px: 0, py: 0 });

  const close = useCallback(() => {
    setOpen(false);
    setZoom(1);
    setPos({ x: 0, y: 0 });
  }, []);

  // Escape 키 + 열릴 때 포커스
  useEffect(() => {
    if (!open) return;
    closeButtonRef.current?.focus();
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, close]);

  // 스크롤 줌 (passive: false 필수)
  useEffect(() => {
    const el = modalRef.current;
    if (!el || !open) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      setZoom(prev => Math.min(5, Math.max(1, prev - e.deltaY * 0.003)));
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [open]);

  // 줌 1x 복귀 시 위치 초기화
  useEffect(() => {
    if (zoom === 1) setPos({ x: 0, y: 0 });
  }, [zoom]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom <= 1) return;
    e.preventDefault();
    setDragging(true);
    dragStart.current = { mx: e.clientX, my: e.clientY, px: pos.x, py: pos.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return;
    setPos({
      x: dragStart.current.px + (e.clientX - dragStart.current.mx),
      y: dragStart.current.py + (e.clientY - dragStart.current.my),
    });
  };

  const handleMouseUp = () => setDragging(false);

  return (
    <>
      {/* 썸네일 */}
      <div
        role="button"
        tabIndex={0}
        aria-label={`${alt} 확대 보기`}
        className="relative group cursor-zoom-in"
        onClick={() => setOpen(true)}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setOpen(true); }}
      >
        <img
          src={src}
          alt={alt}
          className="max-w-full mx-auto rounded-xl border border-gray-100 block"
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition bg-black/20 rounded-xl">
          <div className="bg-white/90 rounded-full p-2 shadow">
            <ZoomIn size={20} className="text-gray-700" />
          </div>
        </div>
      </div>

      {/* 전체화면 모달 */}
      {open && (
        <div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center overflow-hidden"
          onClick={(e) => { if (e.target === e.currentTarget) close(); }}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <button
            ref={closeButtonRef}
            aria-label="이미지 닫기"
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 transition z-10"
            onClick={close}
          >
            <X size={24} />
          </button>

          <img
            src={src}
            alt={alt}
            style={{
              transform: `translate(${pos.x}px, ${pos.y}px) scale(${zoom})`,
              cursor: zoom > 1 ? (dragging ? "grabbing" : "grab") : "default",
              transition: dragging ? "none" : "transform 0.15s ease",
            }}
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl select-none"
            onMouseDown={handleMouseDown}
            draggable={false}
            onClick={(e) => e.stopPropagation()}
          />

          {/* 줌 컨트롤 바 */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 z-10">
            <button
              aria-label="축소"
              onClick={() => setZoom(z => Math.max(1, +(z - 0.5).toFixed(1)))}
              className="text-white/70 hover:text-white transition"
            >
              <ZoomOut size={18} />
            </button>
            <span className="text-white/80 text-sm min-w-[3.5rem] text-center tabular-nums">
              {Math.round(zoom * 100)}%
            </span>
            <button
              aria-label="확대"
              onClick={() => setZoom(z => Math.min(5, +(z + 0.5).toFixed(1)))}
              className="text-white/70 hover:text-white transition"
            >
              <ZoomIn size={18} />
            </button>
            <span className="text-white/40 text-xs hidden sm:inline ml-1">스크롤로 확대/축소</span>
          </div>
        </div>
      )}
    </>
  );
}
