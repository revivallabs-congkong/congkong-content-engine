'use client';

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { auth, googleProvider } from '@/lib/firebase';
import { signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { ShieldCheck, LogIn } from 'lucide-react';

export default function LoginPage() {
  const { user, loading, isAdmin } = useAuth();
  const router = useRouter();

  if (!loading && user && isAdmin) {
    router.push('/dashboard');
  }

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const email = result.user.email;
      
      if (email === 'yangkeun@congkong.net') {
        router.push('/dashboard');
      } else {
        alert('관리자 권한이 없습니다.');
        await auth.signOut();
      }
    } catch (error: any) {
      console.error('로그인 실패:', error);
      alert(`로그인 중 오류가 발생했습니다: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="bg-indigo-600 p-8 text-center">
          <ShieldCheck className="w-16 h-16 text-white mx-auto mb-4" />
          <h1 className="text-2xl font-black text-white mb-2">CongKong OS</h1>
          <p className="text-indigo-200">콘텐츠 마케팅 엔진 마스터 어드민</p>
        </div>
        <div className="p-8">
          <p className="text-slate-600 text-center mb-8">
            관리자 계정으로 로그인하여 전체 시스템 현황을 모니터링하고 제어하세요.
          </p>
          <button
            onClick={handleGoogleSignIn}
            className="w-full bg-white border-2 border-slate-200 hover:border-indigo-600 hover:bg-slate-50 text-slate-800 font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition-colors"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-6 h-6" />
            <span>Google 계정으로 로그인</span>
          </button>
        </div>
      </div>
    </div>
  );
}
