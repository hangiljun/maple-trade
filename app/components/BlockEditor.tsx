"use client";
import React, { useCallback, memo } from 'react';
import { X, MoveUp, MoveDown } from 'lucide-react';
import MarkdownEditor from './MarkdownEditor';

interface ContentBlock {
  id: string;
  type: 'text' | 'image';
  content?: string;
  url?: string;
  file?: File | null;
}

interface BlockEditorProps {
  block: ContentBlock;
  index: number;
  totalBlocks: number;
  onContentChange: (id: string, content: string) => void;
  onFileChange: (id: string, file: File | null) => void;
  onRemove: (id: string) => void;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
}

// ✅ 각 블록을 별도 컴포넌트로 분리 + React.memo
const BlockEditor = memo(({
  block,
  index,
  totalBlocks,
  onContentChange,
  onFileChange,
  onRemove,
  onMoveUp,
  onMoveDown
}: BlockEditorProps) => {

  // ✅ 각 블록의 onChange를 useCallback으로 안정화
  const handleContentChange = useCallback((value: string) => {
    onContentChange(block.id, value);
  }, [block.id, onContentChange]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onFileChange(block.id, e.target.files?.[0] || null);
  }, [block.id, onFileChange]);

  const handleRemove = useCallback(() => {
    onRemove(block.id);
  }, [block.id, onRemove]);

  const handleMoveUp = useCallback(() => {
    onMoveUp(index);
  }, [index, onMoveUp]);

  const handleMoveDown = useCallback(() => {
    onMoveDown(index);
  }, [index, onMoveDown]);

  return (
    <div className="border border-gray-200 rounded-lg p-3 bg-gray-50">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-bold text-gray-500">
          {block.type === 'text' ? '📝 텍스트' : '🖼️ 이미지'}
        </span>
        <div className="flex gap-1">
          {index > 0 && (
            <button
              type="button"
              onClick={handleMoveUp}
              className="text-gray-400 hover:text-blue-600 p-1"
              title="위로"
            >
              <MoveUp size={16} />
            </button>
          )}
          {index < totalBlocks - 1 && (
            <button
              type="button"
              onClick={handleMoveDown}
              className="text-gray-400 hover:text-blue-600 p-1"
              title="아래로"
            >
              <MoveDown size={16} />
            </button>
          )}
          <button
            type="button"
            onClick={handleRemove}
            className="text-gray-400 hover:text-red-600 p-1"
            title="삭제"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {block.type === 'text' ? (
        <MarkdownEditor
          value={block.content || ''}
          onChange={handleContentChange}
          placeholder="MDX 문법으로 작성하세요 (마크다운 + 커스텀 컴포넌트)"
        />
      ) : (
        <div>
          {block.url && !block.file ? (
            <div className="mb-2">
              <img src={block.url} alt="기존 이미지" className="w-full h-32 object-cover rounded border" />
              <p className="text-xs text-gray-400 mt-1">기존 이미지 (변경하려면 새 파일 선택)</p>
            </div>
          ) : null}
          <input
            type="file"
            accept="image/*,video/*"
            onChange={handleFileChange}
            className="text-sm"
          />
          {block.file && (
            <p className="text-xs text-blue-600 mt-1">✓ {block.file.name}</p>
          )}
        </div>
      )}
    </div>
  );
});

BlockEditor.displayName = 'BlockEditor';

export default BlockEditor;
