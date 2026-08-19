"use client";
import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { evaluate } from '@mdx-js/mdx';
import * as runtime from 'react/jsx-runtime';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import CompareBar from './mdx/CompareBar';
import Callout from './mdx/Callout';
import Checklist from './mdx/Checklist';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

/**
 * MDX 에디터 + 실시간 미리보기
 *
 * Monaco Editor (VS Code 에디터)로 MDX를 작성하고
 * 오른쪽에서 실시간 미리보기를 확인할 수 있습니다.
 */
const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ value, onChange, placeholder }) => {
  const [showPreview, setShowPreview] = useState(false);
  const [PreviewComponent, setPreviewComponent] = useState<any>(null);
  const [previewError, setPreviewError] = useState<string | null>(null);

  // MDX 컴포넌트 매핑
  const components = {
    // 커스텀 컴포넌트
    CompareBar,
    Callout,
    Checklist,

    // 마크다운 스타일링
    h1: (props: any) => <h1 className="text-3xl text-gray-900 mt-8 mb-4" style={{ fontWeight: 600 }} {...props} />,
    h2: (props: any) => <h2 className="text-2xl text-gray-900 mt-6 mb-3" style={{ fontWeight: 600 }} {...props} />,
    h3: (props: any) => <h3 className="text-xl text-gray-900 mt-5 mb-2" style={{ fontWeight: 600 }} {...props} />,
    p: (props: any) => <p className="text-gray-800 text-base leading-relaxed mb-4" {...props} />,
    strong: (props: any) => <strong className="font-bold text-gray-900" {...props} />,
    em: (props: any) => <em className="italic text-gray-700" {...props} />,
    a: (props: any) => (
      <a className="text-blue-600 underline hover:text-blue-800" target="_blank" rel="noopener noreferrer" {...props} />
    ),
    ul: (props: any) => <ul className="list-disc list-inside space-y-2 mb-4 text-gray-800" {...props} />,
    ol: (props: any) => <ol className="list-decimal list-inside space-y-2 mb-4 text-gray-800" {...props} />,
    li: (props: any) => <li className="text-base" {...props} />,
    table: (props: any) => (
      <div className="overflow-x-auto my-6">
        <table className="min-w-full border-collapse" {...props} />
      </div>
    ),
    thead: (props: any) => <thead className="bg-blue-50 border-b-2 border-blue-600" {...props} />,
    tbody: (props: any) => <tbody className="bg-white" {...props} />,
    tr: (props: any) => <tr className="even:bg-gray-50 hover:bg-blue-50" {...props} />,
    th: (props: any) => (
      <th className="border-none border-b-2 border-blue-600 px-4 py-2 text-left text-blue-800 text-sm uppercase tracking-wide" style={{ fontWeight: 600 }} {...props} />
    ),
    td: (props: any) => (
      <td className="border-none border-b border-gray-200 px-4 py-2 text-gray-800" {...props} />
    ),
    pre: (props: any) => (
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-6 border border-gray-700" {...props} />
    ),
    code: (props: any) => {
      const { inline, className, ...rest } = props;
      return inline ? (
        <code className="bg-gray-100 text-red-600 px-1.5 py-0.5 rounded text-sm font-mono" {...rest} />
      ) : (
        <code className="font-mono text-sm" {...rest} />
      );
    },
    blockquote: (props: any) => (
      <blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-4 text-gray-700 italic bg-blue-50" {...props} />
    ),
    img: (props: any) => (
      <img className="rounded-lg my-4 max-w-full h-auto shadow-sm border border-gray-200" {...props} />
    ),
    hr: (props: any) => <hr className="my-6 border-gray-300" {...props} />,
  };

  // MDX 평가 및 컴포넌트 생성
  useEffect(() => {
    if (!showPreview || !value) {
      setPreviewComponent(null);
      setPreviewError(null);
      return;
    }

    const compileMDX = async () => {
      try {
        setPreviewError(null);

        // MDX를 평가하여 React 컴포넌트로 변환
        const { default: MDXContent } = await evaluate(value, {
          ...runtime,
          remarkPlugins: [remarkGfm, remarkBreaks],
          development: false,
        });

        // 컴포넌트를 래핑하여 저장
        setPreviewComponent(() => {
          const Wrapper = () => <MDXContent components={components} />;
          return Wrapper;
        });
      } catch (error: any) {
        console.error('MDX 컴파일 에러:', error);
        setPreviewError(error.message || 'MDX 문법 오류가 있습니다.');
        setPreviewComponent(null);
      }
    };

    compileMDX();
  }, [value, showPreview]);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      {/* 상단 탭 */}
      <div className="bg-gray-100 border-b border-gray-200 px-4 py-2 flex items-center justify-between">
        <div className="flex gap-2">
          <button
            onClick={() => setShowPreview(false)}
            className={`px-4 py-1.5 rounded text-sm font-medium transition ${
              !showPreview
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            편집
          </button>
          <button
            onClick={() => setShowPreview(true)}
            className={`px-4 py-1.5 rounded text-sm font-medium transition ${
              showPreview
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            미리보기
          </button>
        </div>
        <span className="text-xs text-gray-500">MDX 문법 지원 (마크다운 + React 컴포넌트)</span>
      </div>

      {/* 에디터/미리보기 영역 */}
      <div>
        {/* 편집 모드 */}
        {!showPreview && (
          <Editor
            height="500px"
            defaultLanguage="markdown"
            value={value}
            onChange={(newValue) => onChange(newValue || '')}
            theme="vs-light"
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: 'on',
              wordWrap: 'on',
              padding: { top: 16, bottom: 16 },
              scrollBeyondLastLine: false,
              automaticLayout: true,
            }}
          />
        )}

        {/* 미리보기 모드 */}
        {showPreview && (
          <div className="p-6 bg-white overflow-y-auto" style={{ minHeight: '500px', maxHeight: '500px' }}>
            {previewError ? (
              <div className="bg-red-50 border border-red-200 rounded p-4">
                <p className="text-red-800 font-bold mb-2">⚠️ MDX 문법 오류</p>
                <pre className="text-xs text-red-600 whitespace-pre-wrap">{previewError}</pre>
              </div>
            ) : PreviewComponent ? (
              <div className="prose prose-lg max-w-none">
                <PreviewComponent />
              </div>
            ) : (
              <p className="text-gray-400 text-sm">
                {placeholder || '여기에 MDX 문법으로 작성하세요...'}
              </p>
            )}
          </div>
        )}
      </div>

      {/* 하단 도움말 */}
      <div className="bg-gray-50 border-t border-gray-200 px-4 py-2">
        <details className="text-xs text-gray-600">
          <summary className="cursor-pointer font-medium">MDX 문법 도움말</summary>
          <div className="mt-2 space-y-1">
            <p><code className="bg-gray-200 px-1 rounded">## 제목</code> - 제목 (H2)</p>
            <p><code className="bg-gray-200 px-1 rounded">**굵게**</code> - 굵은 텍스트</p>
            <p><code className="bg-gray-200 px-1 rounded">| 열1 | 열2 |</code> - 표</p>
            <p><code className="bg-gray-200 px-1 rounded">&lt;CompareBar /&gt;</code> - 그래프</p>
            <p><code className="bg-gray-200 px-1 rounded">&lt;Callout type="tip"&gt;내용&lt;/Callout&gt;</code> - 알림박스</p>
            <p><code className="bg-gray-200 px-1 rounded">&lt;Checklist /&gt;</code> - 체크리스트</p>
          </div>
        </details>
      </div>
    </div>
  );
};

export default MarkdownEditor;
