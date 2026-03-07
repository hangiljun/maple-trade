"use client";
import { useState } from "react";
import { X, ZoomIn } from "lucide-react";

interface Props {
  src: string;
  alt: string;
}

export default function ImageViewer({ src, alt }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* 썸네일 */}
      <div
        className="relative group cursor-zoom-in"
        onClick={() => setOpen(true)}
      >
        <img
          src={src}
          alt={alt}
          className="max-w-full mx-auto rounded-xl border border-gray-100 block"
        />
        {/* 확대 힌트 */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition bg-black/20 rounded-xl">
          <div className="bg-white/90 rounded-full p-2 shadow">
            <ZoomIn size={20} className="text-gray-700" />
          </div>
        </div>
      </div>

      {/* 전체화면 모달 */}
      {open && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          <button
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 transition"
            onClick={() => setOpen(false)}
          >
            <X size={24} />
          </button>
          <img
            src={src}
            alt={alt}
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          <p className="absolute bottom-4 text-white/50 text-sm">클릭하면 닫힙니다</p>
        </div>
      )}
    </>
  );
}
