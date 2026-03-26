import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-50">
      <div className="mb-4">
         <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-md tracking-wider">v1.0 MVP Active</span>
      </div>
      <h1 className="text-6xl font-black mb-6 text-gray-900 tracking-tight text-center">
        CongKong <br/>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Sales Engine</span> 완성
      </h1>
      <p className="text-xl text-gray-500 mb-12 max-w-2xl text-center leading-relaxed font-medium">
        NotebookLM, Gemini AI, Firebase, Stibee 연동 기반의<br/>B2B 콘텐츠 ↔ 리드 생성 플라이휠이 준비되었습니다.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-6">
        <Link href="/blog" className="group flex items-center justify-center px-8 py-4 bg-white border-2 border-blue-100 text-blue-700 rounded-2xl font-bold hover:bg-blue-50 hover:border-blue-200 transition-all shadow-sm">
          <svg className="w-5 h-5 mr-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l6 6v10a2 2 0 01-2 2z" /></svg>
          블로그 / 리드 캡처 뷰어
        </Link>
        <Link href="/admin/generator" className="group flex items-center justify-center px-8 py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-gray-800 transition-all shadow-xl shadow-gray-200/50 hover:-translate-y-0.5">
          <svg className="w-5 h-5 mr-3 text-gray-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          관리자 (콘텐츠 자동 생성)
        </Link>
      </div>
    </main>
  )
}
