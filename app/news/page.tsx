"use client";
import React from 'react';
import Link from 'next/link';

export default function NewsPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa', fontFamily: 'sans-serif', color: '#333' }}>
      <nav style={{ backgroundColor: '#fff', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '70px', padding: '0 20px' }}>
          <Link href="/" style={{ fontSize: '26px', fontWeight: '900', color: '#2563eb', textDecoration: 'none', letterSpacing: '-1px' }}>메이플 아이템</Link>
          <div style={{ display: 'flex', gap: '30px' }}>
            <Link href="/" style={{ fontSize: '18px', fontWeight: 'bold', color: '#555', textDecoration: 'none', padding: '19px 0' }}>Home</Link>
            <Link href="/tip" style={{ fontSize: '18px', fontWeight: 'bold', color: '#555', textDecoration: 'none', padding: '19px 0' }}>Tip</Link>
            <Link href="/reviews" style={{ fontSize: '18px', fontWeight: 'bold', color: '#555', textDecoration: 'none', padding: '19px 0' }}>Reviews</Link>
            <Link href="/news" style={{ fontSize: '18px', fontWeight: 'bold', color: '#2563eb', textDecoration: 'none', borderBottom: '3px solid #2563eb', padding: '19px 0' }}>News</Link>
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: '1100px', margin: '40px auto', padding: '0 20px', textAlign: 'center' }}>
        <div style={{ fontSize: '60px', marginBottom: '20px' }}>📰</div>
        <h2 style={{ fontSize: '28px', color: '#718096', fontWeight: 'bold' }}>최신 소식을 준비 중입니다.</h2>
      </div>
    </div>
  );
}