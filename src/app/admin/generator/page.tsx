"use client";

import { useState } from "react";
import { httpsCallable } from "firebase/functions";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { functions, db } from "@/lib/firebase";

export default function AdminGenerator() {
  const [summary, setSummary] = useState("");
  const [status, setStatus] = useState<"idle" | "generating" | "saving" | "success" | "error">("idle");
  const [generated, setGenerated] = useState<{newsletter?: string, blog?: string, pdf?: string } | null>(null);
  const [blogTitle, setBlogTitle] = useState("새로 생성된 인사이트 아티클");

  const handleGenerate = async () => {
    if(!summary) return;
    setStatus("generating");
    try {
      // Firebase Cloud Functions의 'generateContent' 함수 호출
      const generateContent = httpsCallable(functions, "generateContent");
      const result = await generateContent({ summary });
      setGenerated(result.data as any);
      setStatus("idle");
    } catch (e: any) {
      console.error(e);
      setStatus("error");
    }
  }

  const handleSaveBlog = async () => {
    if(!generated?.blog) return;
    setStatus("saving");
    try {
      await addDoc(collection(db, "contents"), {
        type: "blog",
        title: blogTitle,
        category: "Best Practice",
        summary: generated.newsletter || summary.substring(0, 50) + "...",
        content: generated.blog,
        published: true,
        createdAt: serverTimestamp()
      });
      setStatus("success");
      setTimeout(() => setStatus("idle"), 3000);
    } catch(e) {
      console.error(e);
      setStatus("error");
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-10">
         <span className="bg-purple-100 text-purple-700 font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wider">Admin Only</span>
         <h1 className="text-4xl font-extrabold mt-4 text-gray-900 tracking-tight">콘텐츠 자동 생성 엔진</h1>
         <p className="text-gray-500 mt-2">NotebookLM 요약본을 바탕으로 리드 캡처용 에셋(뉴스레터/블로그/PDF 구조)을 일괄 생성합니다.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="flex flex-col">
           <label className="font-bold text-gray-800 mb-3 block">1. NotebookLM 데이터 요약 원본 입력</label>
           <textarea 
             value={summary}
             onChange={e => setSummary(e.target.value)}
             placeholder="세일즈용 마케팅 콘텐츠로 변환할 요약 텍스트를 입력하세요. (고객 Pain Point, 기능 도입 배경 등)"
             className="w-full h-80 p-5 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent mb-5 shadow-sm resize-none text-gray-700 leading-relaxed"
           />
           <button 
             onClick={handleGenerate}
             disabled={status === "generating" || !summary}
             className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-6 rounded-2xl disabled:opacity-50 transition-colors shadow-lg shadow-purple-200 flex justify-center items-center"
           >
             {status === "generating" ? (
                 <><span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></span>Gemini AI가 추론 중입니다...</>
             ) : "마케팅 OSMU 원고 자동 변환 (뉴스레터/블로그/PDF)"}
           </button>
           {status === "error" && <p className="text-red-500 mt-4 text-sm font-medium">서버 통신 에러가 발생했습니다. (Functions 로그 확인 필요)</p>}
        </div>

        <div className="flex flex-col bg-gray-50/50 border border-gray-100 rounded-3xl p-8 h-[700px] shadow-sm">
           <h2 className="text-xl font-bold mb-6 flex items-center text-gray-800">
             <svg className="w-5 h-5 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
             생성 결과 미리보기
           </h2>
           {!generated ? (
              <div className="text-gray-400 text-center mt-32 flex flex-col items-center">
                 <svg className="w-16 h-16 text-gray-200 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                 좌측에서 변환을 실행하면 이곳에 결과가 표시됩니다.
              </div>
           ) : (
              <div className="space-y-6 overflow-y-auto pr-4 pb-10">
                 <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <h3 className="font-bold text-purple-700 mb-3 border-b border-gray-50 pb-3 flex items-center">
                       <span className="bg-purple-100 text-purple-800 w-6 h-6 rounded-full flex items-center justify-center text-xs mr-2">1</span>
                       단문 뉴스레터 (Stibee 배포용)
                    </h3>
                    <p className="whitespace-pre-wrap text-sm text-gray-700 leading-relaxed">{generated.newsletter}</p>
                 </div>
                 
                 <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <h3 className="font-bold text-purple-700 mb-3 border-b border-gray-50 pb-3 flex items-center">
                       <span className="bg-purple-100 text-purple-800 w-6 h-6 rounded-full flex items-center justify-center text-xs mr-2">2</span>
                       블로그 아티클 (DB 퍼블리싱용)
                    </h3>
                    <div className="mb-4">
                        <label className="text-xs font-bold text-gray-500 mb-1 block uppercase">포스팅 발행 제목</label>
                        <input type="text" value={blogTitle} onChange={e => setBlogTitle(e.target.value)} className="w-full border-b border-gray-300 focus:border-purple-500 outline-none py-1 text-sm font-semibold"/>
                    </div>
                    <p className="whitespace-pre-wrap text-sm text-gray-700 leading-relaxed h-48 overflow-y-auto bg-gray-50 p-3 rounded-lg border border-gray-100 mb-4">{generated.blog}</p>
                    <button 
                       onClick={handleSaveBlog}
                       disabled={status === "saving" || status === "success"}
                       className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold px-4 py-3 rounded-xl text-sm disabled:opacity-50 transition-colors"
                    >
                      {status === "saving" ? "저장 중..." : status === "success" ? "발행 성공! ✨" : "이 본문으로 공식 블로그 즉시 발행"}
                    </button>
                 </div>

                 <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <h3 className="font-bold text-purple-700 mb-3 border-b border-gray-50 pb-3 flex items-center">
                       <span className="bg-purple-100 text-purple-800 w-6 h-6 rounded-full flex items-center justify-center text-xs mr-2">3</span>
                       PDF 자료 목차 구조 (Lead Capture 리워드용)
                    </h3>
                    <p className="whitespace-pre-wrap text-sm text-gray-700 leading-relaxed">{generated.pdf}</p>
                 </div>
              </div>
           )}
        </div>
      </div>
    </div>
  )
}
