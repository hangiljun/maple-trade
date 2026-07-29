"use client";
import React, { useMemo, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

// Quill 에디터 동적 import (SSR 방지)
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface QuillEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

// 전역 Quill 인스턴스 저장용
let globalQuillInstance: any = null;

// ✅ React.memo로 불필요한 리렌더 방지
const QuillEditor = React.memo(({ value, onChange, placeholder }: QuillEditorProps) => {
  // ✅ 표 삽입 핸들러
  const insertTable = () => {
    const rows = prompt('행 수를 입력하세요 (헤더 포함):', '3');
    const cols = prompt('열 수를 입력하세요:', '3');

    if (!rows || !cols) return;

    const rowCount = parseInt(rows, 10);
    const colCount = parseInt(cols, 10);

    if (isNaN(rowCount) || isNaN(colCount) || rowCount < 1 || colCount < 1) {
      alert('올바른 숫자를 입력해주세요.');
      return;
    }

    // HTML 테이블 생성
    let tableHTML = '<table style="border-collapse: collapse; width: 100%; margin: 1rem 0;">\n';

    // 첫 행은 헤더 (th)
    tableHTML += '  <thead>\n    <tr>\n';
    for (let j = 0; j < colCount; j++) {
      tableHTML += `      <th style="border: 1px solid #ddd; padding: 8px; background-color: #f3f4f6; font-weight: bold;">제목${j + 1}</th>\n`;
    }
    tableHTML += '    </tr>\n  </thead>\n';

    // 나머지 행은 데이터 (td)
    tableHTML += '  <tbody>\n';
    for (let i = 1; i < rowCount; i++) {
      tableHTML += '    <tr>\n';
      for (let j = 0; j < colCount; j++) {
        tableHTML += `      <td style="border: 1px solid #ddd; padding: 8px;">내용</td>\n`;
      }
      tableHTML += '    </tr>\n';
    }
    tableHTML += '  </tbody>\n';
    tableHTML += '</table>\n<p><br></p>';

    // Quill 에디터에 삽입
    if (globalQuillInstance) {
      const range = globalQuillInstance.getSelection(true);
      globalQuillInstance.clipboard.dangerouslyPasteHTML(range.index, tableHTML);
      globalQuillInstance.setSelection(range.index + tableHTML.length);
    }
  };

  // ✅ modules 설정 (useMemo로 안정화)
  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, false] }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'align': [] }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['link', 'image'],
        ['insertTable'],  // 표 삽입 버튼
        ['clean']
      ],
      handlers: {
        insertTable: insertTable
      }
    }
  }), []);

  // Quill 인스턴스 저장
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).Quill) {
      const quillInstances = document.querySelectorAll('.ql-container');
      if (quillInstances.length > 0) {
        const lastInstance = quillInstances[quillInstances.length - 1];
        globalQuillInstance = (lastInstance as any).__quill;
      }
    }
  }, []);

  return (
    <div className="quill-wrapper">
      <ReactQuill
        value={value}
        onChange={(content, delta, source, editor) => {
          globalQuillInstance = editor;
          onChange(content);
        }}
        theme="snow"
        placeholder={placeholder || "내용을 입력하세요"}
        modules={modules}
      />
      <style jsx global>{`
        .ql-insertTable::before {
          content: '⊞';
          font-size: 18px;
          font-weight: bold;
        }
        .ql-insertTable {
          width: auto !important;
        }
      `}</style>
    </div>
  );
});

QuillEditor.displayName = 'QuillEditor';

export default QuillEditor;
