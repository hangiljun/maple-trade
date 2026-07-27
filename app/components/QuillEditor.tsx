"use client";
import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

// Quill 에디터 동적 import (SSR 방지)
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

// ✅ modules 설정을 컴포넌트 밖으로 분리 (매 렌더마다 재생성 방지)
const QUILL_MODULES = {
  toolbar: [
    [{ 'header': [1, 2, 3, false] }],
    [{ 'size': ['small', false, 'large', 'huge'] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'align': [] }],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    ['link'],
    ['clean']
  ]
};

interface QuillEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

// ✅ React.memo로 불필요한 리렌더 방지
const QuillEditor = React.memo(({ value, onChange, placeholder }: QuillEditorProps) => {
  return (
    <div className="quill-wrapper">
      <ReactQuill
        value={value}
        onChange={onChange}
        theme="snow"
        placeholder={placeholder || "내용을 입력하세요"}
        modules={QUILL_MODULES}
      />
    </div>
  );
});

QuillEditor.displayName = 'QuillEditor';

export default QuillEditor;
