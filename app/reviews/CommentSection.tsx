"use client";
import React, { useState } from "react";
import { db } from '../../firebase';
import { doc, updateDoc, arrayUnion, increment } from 'firebase/firestore';
import { useEffect } from "react";

interface Comment {
  author: string;
  content: string;
  date: string;
}

interface Props {
  reviewId: string;
  initialComments: Comment[];
}

export default function CommentSection({ reviewId, initialComments }: Props) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");

  // 조회수 증가 (마운트 시 1회)
  useEffect(() => {
    updateDoc(doc(db, "reviews", reviewId), { views: increment(1) }).catch(() => {});
  }, [reviewId]);

  const handleSubmit = async () => {
    if (!author || !content) return alert("내용을 입력해주세요.");
    const newComment: Comment = {
      author,
      content,
      date: new Date().toLocaleDateString('ko-KR', { month: '2-digit', day: '2-digit' }),
    };
    try {
      await updateDoc(doc(db, "reviews", reviewId), { comments: arrayUnion(newComment) });
      setComments(prev => [...prev, newComment]);
      setContent("");
    } catch {
      alert("댓글 등록 실패");
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-8 mt-6">
      <h3 className="font-bold text-xl mb-6">💬 댓글 {comments.length}</h3>

      <div className="space-y-4 mb-6">
        {comments.length === 0 && (
          <p className="text-gray-400 text-sm text-center py-4">첫 번째 댓글을 남겨보세요.</p>
        )}
        {comments.map((c, i) => (
          <div key={i} className="bg-gray-50 p-4 rounded-xl border border-gray-100">
            <div className="flex justify-between mb-2">
              <span className="font-bold text-gray-900">{c.author}</span>
              <span className="text-xs text-gray-400">{c.date}</span>
            </div>
            <p className="text-gray-700">{c.content}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="닉네임"
          className="w-1/4 bg-gray-50 p-3 rounded-lg border border-gray-300 outline-none text-sm focus:ring-2 focus:ring-blue-500"
        />
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="댓글 내용"
          className="flex-1 bg-gray-50 p-3 rounded-lg border border-gray-300 outline-none text-sm focus:ring-2 focus:ring-blue-500"
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-6 rounded-lg font-bold hover:bg-blue-700 transition"
        >
          등록
        </button>
      </div>
    </div>
  );
}
