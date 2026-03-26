'use client';

import React, { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        // 비회원이면 로그인 페이지로 리다이렉트
        router.push('/login');
      } else if (!isAdmin) {
        // 회원이지만 관리자가 아니면 대시보드 리다이렉트 (이후 접근 불가 메시지 등으로 처리 가능)
        alert('관리자 권한(yangkeun@congkong.net)이 없습니다.');
        router.push('/');
      }
    }
  }, [user, loading, isAdmin, router]);

  if (loading || !user || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return <>{children}</>;
}
