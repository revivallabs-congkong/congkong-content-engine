"use client";

import { useEffect, useState } from "react";
import { doc, getDoc, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useParams } from "next/navigation";
import Link from "next/link";

interface Content {
  title: string;
  content: string;
  summary: string;
  category: string;
  createdAt: any;
}

export default function BlogPost() {
  const params = useParams();
  const slug = params.slug as string;
  const [post, setPost] = useState<Content | null>(null);
  const [loading, setLoading] = useState(true);

  // Lead Form State
  const [formData, setFormData] = useState({ name: "", email: "", company: "", eventSize: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  useEffect(() => {
    async function fetchPost() {
      if (!slug) return;
      try {
        const docRef = doc(db, "contents", slug);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPost(docSnap.data() as Content);
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [slug]);

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");
    try {
      await addDoc(collection(db, "leads"), {
        ...formData,
        contentId: slug,
        source: "blog_sidebar",
        createdAt: serverTimestamp()
      });
      setFormStatus("success");
    } catch (error) {
      console.error("리드 저장중 오류:", error);
      setFormStatus("error");
    }
  };

  if (loading) return <div className="min-h-screen flex text-xl items-center justify-center">Loading...</div>;
  if (!post) return <div className="min-h-screen flex flex-col items-center justify-center p-6"><svg className="w-16 h-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg><h1 className="text-2xl font-bold mb-4 text-gray-800">포스트를 찾을 수 없습니다</h1><Link href="/blog" className="text-blue-600 hover:underline">목록으로 돌아가기</Link></div>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col xl:flex-row gap-16">
      <article className="xl:w-2/3">
        <Link href="/blog" className="group flex items-center text-sm text-gray-500 hover:text-blue-600 font-medium mb-10 transition-colors">
          <svg className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          뒤로 가기
        </Link>
        <div className="mb-6 flex items-center space-x-4">
           <span className="bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">{post.category || "Insight"}</span>
           <span className="text-gray-400 text-sm">{post.createdAt ? new Date(post.createdAt.seconds * 1000).toLocaleDateString() : ""}</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-8 leading-[1.15] tracking-tight">{post.title}</h1>
        <p className="text-xl text-gray-600 mb-12 pb-12 border-b border-gray-100 leading-relaxed font-light">{post.summary}</p>
        
        <div className="prose prose-lg prose-blue max-w-none text-gray-800 leading-loose" dangerouslySetInnerHTML={{ __html: post.content?.replace(/\n/g, "<br/>") }} />
      </article>

      <aside className="xl:w-1/3">
        <div className="sticky top-12 bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8 lg:p-10">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
          </div>
          <h3 className="text-2xl font-extrabold text-gray-900 mb-3 tracking-tight">VIP 자료집 신청</h3>
          <p className="text-gray-500 mb-8 text-sm leading-relaxed">연락처를 남겨주시면 당사 세일즈 팀에서 이메일로 상세 레퍼런스와 도입 제안서를 보내드립니다.</p>
          
          {formStatus === "success" ? (
             <div className="bg-emerald-50 border border-emerald-100 text-emerald-800 px-6 py-10 rounded-2xl text-center">
                 <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                 </div>
                 <p className="font-extrabold text-xl mb-2">신청이 접수되었습니다</p>
                 <p className="text-sm text-emerald-600">입력하신 이메일로 곧 자료가 발송됩니다.</p>
             </div>
          ) : (
            <form onSubmit={handleLeadSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">성함</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none" placeholder="홍길동" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">업무용 이메일</label>
                <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none" placeholder="work@company.com" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">회사명</label>
                <input required type="text" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none" placeholder="회사명 입력" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">예상 행사 규모 (명)</label>
                <input required type="number" value={formData.eventSize} onChange={e => setFormData({...formData, eventSize: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none" placeholder="예: 300" />
              </div>
              
              {formStatus === "error" && <p className="text-red-500 text-sm font-medium pt-2">서버 통신 중 오류가 발생했습니다. 다시 시도해주세요.</p>}
              
              <div className="pt-4">
                <button disabled={formStatus === "submitting"} type="submit" className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-4 px-6 rounded-xl transition-colors flex justify-center items-center shadow-lg shadow-gray-200">
                  {formStatus === "submitting" ? (
                    <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                  ) : "자료 신청하기"}
                </button>
              </div>
              <p className="text-xs text-center text-gray-400 mt-6 leading-relaxed">
                제출 시 당사의 <a href="#" className="underline hover:text-gray-600">개인정보처리방침</a>에 동의한 것으로 간주합니다.
              </p>
            </form>
          )}
        </div>
      </aside>
    </div>
  );
}
