"use client";

import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Database, 
  BrainCircuit, 
  PenTool, 
  Users, 
  BarChart3, 
  Search, 
  Bell, 
  ArrowRight,
  ArrowDown,
  CheckCircle2,
  Clock,
  TrendingUp,
  Filter,
  Network,
  Globe,
  Mail,
  FileDown,
  PlaySquare,
  Link,
  Target,
  Box,
  Layers,
  Cpu,
  ShieldCheck,
  Zap,
  MessageSquare,
  BookOpen,
  Workflow,
  Info,
  ChevronRight,
  X,
  Rss
} from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('intake'); 

  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: '오버뷰 (Dashboard)' },
    { id: 'architecture', icon: Network, label: '시스템 아키텍처' },
    { id: 'intake', icon: Database, label: '1. 수집 파이프라인 (Sources)' },
    { id: 'knowledge', icon: BrainCircuit, label: '2. Multi-Notebook (Context)' },
    { id: 'ai-engine', icon: PenTool, label: '3. 캠페인 팩토리 (Mon/Wed/Fri)' },
    { id: 'crm', icon: Users, label: '4. 리드 라우팅 (CRM)' },
    { id: 'analytics', icon: BarChart3, label: '5. MVP 트래킹' },
  ];

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-800">
      {/* Sidebar */}
      <div className="w-72 bg-slate-900 text-white flex flex-col z-20">
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center font-bold text-xl shadow-lg shadow-blue-500/30">C</div>
            <div>
              <h1 className="font-bold text-lg tracking-wide">CongKong OS</h1>
              <p className="text-[10px] text-slate-400 font-medium tracking-wider">SALES AUTOMATION MVP</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium
                ${activeTab === item.id 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-800 bg-slate-800/50 m-4 rounded-xl">
          <p className="text-xs text-slate-400 mb-2 font-medium">API Cost Control</p>
          <div className="flex items-center gap-2 text-sm text-emerald-400 font-bold">
            <ShieldCheck size={16} /> Hybrid Mode (UI+API)
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Header */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0 z-10">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            {navItems.find(i => i.id === activeTab)?.icon && React.createElement(navItems.find(i => i.id === activeTab)!.icon, { size: 24, className: "text-blue-600" })}
            {navItems.find(i => i.id === activeTab)?.label}
          </h2>
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2 bg-amber-50 text-amber-700 px-3 py-1.5 rounded-full text-xs font-bold border border-amber-200">
              <Zap size={14} /> MVP 개발 순위 1: Lead Capture DB 활성화
            </div>
            <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
          </div>
        </header>

        {/* Dynamic View Content */}
        <main className="flex-1 overflow-y-auto p-8 bg-slate-50/50">
          {activeTab === 'dashboard' && <DashboardView />}
          {activeTab === 'architecture' && <ArchitectureView />}
          {activeTab === 'intake' && <IntakeView />}
          {activeTab === 'knowledge' && <KnowledgeView />}
          {activeTab === 'ai-engine' && <AIEngineView />}
          {activeTab === 'crm' && <CRMView />}
          {activeTab === 'analytics' && <AnalyticsView />}
        </main>
      </div>
    </div>
  );
};

/* --- 0. Architecture View (비용 효율 + 실행 중심) --- */
const ArchitectureView = () => (
  <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500 pb-12">
    <div className="text-center mb-10">
      <h2 className="text-3xl font-black text-slate-800 tracking-tight">AI Cost-Optimized Architecture</h2>
      <p className="text-slate-500 mt-3 font-medium text-lg">
        100% 자동화는 비용 낭비입니다. NotebookLM(UI)과 Gemini API를 혼합한 2단계 압축 구조입니다.
      </p>
    </div>

    <div className="relative p-8 bg-white border border-slate-200 rounded-3xl shadow-sm">
      {/* Top Layer: Cost Control Strategy */}
      <div className="grid grid-cols-2 gap-8 mb-8">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 relative">
          <div className="absolute -top-3 left-6 bg-slate-700 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">Phase 1. UI / Manual (비용 0)</div>
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><BrainCircuit size={20} className="text-slate-600"/> NotebookLM 기반 대용량 처리</h3>
          <p className="text-sm text-slate-600 mb-4">
            유튜브, 블로그, 내부 제안서 등 긴 컨텍스트의 Raw Data는 <strong>API로 직접 보내지 않고</strong> NotebookLM UI를 통해 요약 및 인사이트만 추출합니다.
          </p>
          <div className="flex gap-2">
            <span className="bg-white border border-slate-200 px-2 py-1 rounded text-xs font-bold text-slate-600">5개 Notebook 분리</span>
            <span className="bg-white border border-slate-200 px-2 py-1 rounded text-xs font-bold text-slate-600">내부 제안서 업로드</span>
          </div>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 relative">
          <div className="absolute -top-3 left-6 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">Phase 2. API / Automation (최소 비용)</div>
          <h3 className="font-bold text-emerald-900 mb-4 flex items-center gap-2"><Cpu size={20} className="text-emerald-600"/> Gemini API (1 Request &rarr; 3 Outputs)</h3>
          <p className="text-sm text-emerald-800 mb-4">
            정제된 요약본(Insight)만 API로 전송하여 비용을 차단합니다. 1번의 호출로 Newsletter, Blog, PDF 구조를 동시 생성합니다.
          </p>
          <div className="flex gap-2">
            <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded text-xs font-bold">모델: 1.5 Flash 위주</span>
            <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded text-xs font-bold">캐싱 구조 적용</span>
          </div>
        </div>
      </div>

      <div className="flex justify-center text-slate-300 mb-8"><ArrowDown size={28} /></div>

      {/* Middle Layer: Weekly Campaign & Quality */}
      <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 relative mb-8">
        <div className="absolute -top-3 left-6 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">Phase 3. Campaign & Distribution</div>
        <h3 className="font-bold text-indigo-900 mb-4 flex items-center gap-2"><Layers size={20} className="text-indigo-500"/> 주 3회 캠페인 (Mon/Wed/Fri) & 자동 검증</h3>
        
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-indigo-100 text-center shadow-sm">
            <ShieldCheck size={24} className="mx-auto text-slate-700 mb-2" />
            <h4 className="font-bold text-sm">품질 자동 검증</h4>
            <p className="text-[10px] text-slate-500 mt-1">B2B 적합성, 문제, 수치, 구조, CTA가 모두 포함되었는지 사전 평가.</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-indigo-100 text-center shadow-sm">
            <h4 className="font-bold text-sm text-blue-600">월요일 (공감)</h4>
            <p className="text-xs text-slate-600 mt-2 font-bold">"문제 터뜨리기"</p>
            <p className="text-[10px] text-slate-500 mt-1">예: 행사 시작 전에 망하는 이유. Blog 유도.</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-indigo-100 text-center shadow-sm">
            <h4 className="font-bold text-sm text-indigo-600">수요일 (신뢰)</h4>
            <p className="text-xs text-slate-600 mt-2 font-bold">"해결 + 사례"</p>
            <p className="text-[10px] text-slate-500 mt-1">예: 대기시간 40% 줄인 방법. PDF 유도.</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-indigo-100 text-center shadow-sm">
            <h4 className="font-bold text-sm text-emerald-600">금요일 (행동)</h4>
            <p className="text-xs text-slate-600 mt-2 font-bold">"리드 수집 (CTA)"</p>
            <p className="text-[10px] text-slate-500 mt-1">예: 무료 진단 폼 작성 유도. Landing Page.</p>
          </div>
        </div>
      </div>

      <div className="flex justify-center text-slate-300 mb-8"><ArrowDown size={28} /></div>

      {/* Bottom Layer: Firebase & Rapid CRM */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 relative">
        <div className="absolute -top-3 left-6 bg-amber-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">Phase 4. MVP First: Lead Routing</div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-amber-900 flex items-center gap-2"><Zap size={20} className="text-amber-600"/> 폼 입력 즉시 (5초) 반응형 CRM</h3>
        </div>
        
        <div className="flex gap-4">
          <div className="flex-1 bg-white p-4 rounded-xl border border-amber-200 flex flex-col justify-center items-center text-center">
            <FileDown size={24} className="text-red-500 mb-2"/>
            <p className="font-bold text-sm">리드 발생 (PDF/데모)</p>
            <p className="text-[10px] text-slate-500">Firebase leads DB 저장</p>
          </div>
          <div className="flex items-center text-amber-300"><ArrowRight size={20}/></div>
          <div className="flex-1 bg-white p-4 rounded-xl border border-amber-200 flex flex-col justify-center items-center text-center">
            <MessageSquare size={24} className="text-blue-500 mb-2"/>
            <p className="font-bold text-sm">5초 이내 자동 반응</p>
            <p className="text-[10px] text-slate-500">자료 전달 + 추가 질문 자동 메일</p>
          </div>
          <div className="flex items-center text-amber-300"><ArrowRight size={20}/></div>
          <div className="flex-1 bg-white p-4 rounded-xl border border-amber-200">
            <p className="font-bold text-sm mb-2 text-center">스코어링 후 분기</p>
            <ul className="text-[10px] space-y-1 font-bold text-slate-600">
              <li className="flex justify-between"><span>A급 (500명+):</span> <span className="text-emerald-600">Slack 즉시 배정</span></li>
              <li className="flex justify-between"><span>B급 (관심):</span> <span className="text-blue-600">3일 후 사례 메일</span></li>
              <li className="flex justify-between"><span>C급 (정보):</span> <span className="text-slate-500">뉴스레터 유지</span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
);

/* --- 2. Intake View (정확한 소스 리스트 타겟팅 + 매뉴얼 추가) --- */
const IntakeView = () => {
  const [showManual, setShowManual] = useState(false);

  return (
    <div className="space-y-6 animate-in fade-in duration-500 h-full flex flex-col relative">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">정밀 타겟 소스 수집 (Phase 1)</h2>
          <p className="text-slate-500 mt-1">글로벌 Event Tech와 내부 자산 중심으로 고품질 데이터를 선별 수집하여 NotebookLM으로 보냅니다.</p>
        </div>
        <button 
          onClick={() => setShowManual(!showManual)}
          className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors shadow-sm
            ${showManual ? 'bg-slate-800 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
        >
          {showManual ? <><X size={16}/> 매뉴얼 닫기</> : <><BookOpen size={16}/> 📖 채널별 수집 매뉴얼 보기</>}
        </button>
      </div>
      
      {/* Manual Overlay Mode */}
      {showManual ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-lg flex-1 overflow-y-auto animate-in slide-in-from-bottom-4">
          <div className="flex items-center gap-3 mb-8 border-b border-slate-100 pb-4">
            <div className="p-3 bg-blue-50 rounded-xl text-blue-600"><Globe size={28}/></div>
            <div>
              <h3 className="text-xl font-black text-slate-800">Chrome Extension 기반 수집 매뉴얼</h3>
              <p className="text-sm text-slate-500">NotebookLM Tools & AI Sidebar를 활용한 실무자용 단계별 데이터 수집 가이드</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            {/* Left Column: Extension Steps */}
            <div className="space-y-8">
              {/* YouTube Guide */}
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
                <h4 className="font-bold text-lg text-slate-800 flex items-center gap-2 mb-4"><PlaySquare className="text-red-500"/> YouTube 수집 (AI Sidebar)</h4>
                <div className="space-y-4">
                  <div className="flex gap-3 items-start">
                    <span className="w-6 h-6 rounded-full bg-red-100 text-red-600 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">1</span>
                    <div>
                      <p className="text-sm font-bold text-slate-700">타겟 채널/영상 접속</p>
                      <p className="text-xs text-slate-500 mt-1">Cvent, Bizzabo 등에서 'event check-in system' 관련 최신 영상(Demo, Case Study) 실행</p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <span className="w-6 h-6 rounded-full bg-red-100 text-red-600 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">2</span>
                    <div>
                      <p className="text-sm font-bold text-slate-700">NotebookLM AI Sidebar 실행</p>
                      <p className="text-xs text-slate-500 mt-1">우측 상단 확장 프로그램 아이콘 클릭하여 Sidebar 활성화</p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <span className="w-6 h-6 rounded-full bg-red-100 text-red-600 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">3</span>
                    <div className="w-full">
                      <p className="text-sm font-bold text-slate-700">고정 프롬프트 입력 (정제)</p>
                      <div className="bg-slate-800 text-slate-300 p-2.5 rounded text-[11px] font-mono mt-2 w-full">
                        "이 영상에서 고객의 핵심 문제, 해결책, B2B 이벤트에 적용할 포인트를 3줄 요약해줘."
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <span className="w-6 h-6 rounded-full bg-red-100 text-red-600 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">4</span>
                    <div>
                      <p className="text-sm font-bold text-slate-700">Save to Notebook</p>
                      <p className="text-xs text-slate-500 mt-1">결과물을 <span className="font-bold text-blue-600">[Notebook 4. 경쟁사 & 글로벌]</span>로 전송 및 저장</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Web Clipping Guide */}
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
                <h4 className="font-bold text-lg text-slate-800 flex items-center gap-2 mb-4"><Globe className="text-blue-500"/> 블로그/리포트 수집 (NotebookLM Tools)</h4>
                <div className="space-y-4">
                  <div className="flex gap-3 items-start">
                    <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">1</span>
                    <div>
                      <p className="text-sm font-bold text-slate-700">전문 미디어/리포트 접속</p>
                      <p className="text-xs text-slate-500 mt-1">Gartner, HubSpot 등에서 'Event Marketing 2026' 검색 후 아티클 열기</p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">2</span>
                    <div>
                      <p className="text-sm font-bold text-slate-700">NotebookLM Tools (Web Clipper) 클릭</p>
                      <p className="text-xs text-slate-500 mt-1">전체 페이지 텍스트 긁기(Full Article) 또는 핵심 통계치 드래그 후 우클릭 추가</p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">3</span>
                    <div>
                      <p className="text-sm font-bold text-slate-700">Tagging 및 Notebook 지정</p>
                      <p className="text-xs text-slate-500 mt-1">태그(#Trend, #Stat) 입력 후 <span className="font-bold text-blue-600">[Notebook 1. 한국 시장 & 트렌드]</span>로 다이렉트 전송</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Advanced Tips */}
            <div className="space-y-6">
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 relative">
                <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg rounded-tr-xl">LEVEL UP</div>
                <h4 className="font-bold text-lg text-emerald-900 flex items-center gap-2 mb-3"><Workflow className="text-emerald-600"/> 🚀 더 좋은 방법: 자동화 고도화 팁</h4>
                <p className="text-xs text-emerald-800 mb-5 leading-relaxed">
                  크롬 익스텐션 수동 클릭의 한계를 넘어, 데이터 파이프라인을 완전히 자동화하여 실무자의 시간을 0으로 만드는 방법입니다.
                </p>

                <div className="space-y-4">
                  {/* Tip 1 */}
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-emerald-100 group">
                    <h5 className="font-bold text-sm text-slate-800 flex items-center gap-2 mb-2">
                      <Rss size={16} className="text-orange-500"/> RSS + Zapier 연동 (블로그 완전 자동화)
                    </h5>
                    <p className="text-[11px] text-slate-600 mb-3">경쟁사 블로그의 새 글이 올라오면 사람이 클릭하지 않아도 즉시 DB화 합니다.</p>
                    <div className="bg-slate-50 p-2.5 rounded text-[10px] text-slate-500 flex items-center justify-between border border-slate-200">
                      <span>Cvent RSS Feed</span>
                      <ChevronRight size={12}/>
                      <span className="font-bold text-amber-600">Zapier / Make</span>
                      <ChevronRight size={12}/>
                      <span className="font-bold text-blue-600">Notebook 4 전송</span>
                    </div>
                  </div>

                  {/* Tip 2 */}
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-emerald-100 group">
                    <h5 className="font-bold text-sm text-slate-800 flex items-center gap-2 mb-2">
                      <Cpu size={16} className="text-purple-500"/> YouTube Transcript API 스크래핑
                    </h5>
                    <p className="text-[11px] text-slate-600 mb-3">1시간짜리 기조연설 영상을 보지 않고, Python/GitHub Actions로 자막만 추출하여 요약합니다.</p>
                    <div className="bg-slate-50 p-2.5 rounded text-[10px] text-slate-500 flex items-center justify-between border border-slate-200">
                      <span>YouTube URL</span>
                      <ChevronRight size={12}/>
                      <span className="font-bold text-purple-600">YouTube API (자막)</span>
                      <ChevronRight size={12}/>
                      <span className="font-bold text-blue-600">Notebook 1 전송</span>
                    </div>
                  </div>

                  {/* Pro Tip Callout */}
                  <div className="mt-4 flex gap-3 p-4 bg-amber-50 rounded-lg border border-amber-200">
                    <Info size={20} className="text-amber-500 shrink-0"/>
                    <div>
                      <p className="text-xs font-bold text-amber-800 mb-1">MVP 단계 추천 운영법</p>
                      <p className="text-[10px] text-amber-700 leading-relaxed">
                        초기 1개월은 <strong>크롬 익스텐션(수동)</strong>으로 어떤 소스와 프롬프트가 고품질 결과를 내는지 검증하세요. 검증이 끝난 채널(예: Bizzabo 블로그)만 <strong>Zapier 자동화</strong>로 넘기는 것이 비용과 시간을 아끼는 가장 현실적인 전략입니다.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-6 flex-1 animate-in fade-in">
          {/* YouTube */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col relative group">
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="bg-slate-800 text-white text-[10px] px-2 py-1 rounded shadow">AI Sidebar 활용 권장</div>
            </div>
            <h3 className="font-bold flex items-center gap-2 text-red-600 mb-4"><PlaySquare size={18}/> 필수 구독 YouTube</h3>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 mb-4">
              <p className="text-[10px] font-bold text-slate-500 mb-1">모니터링 대상</p>
              <div className="flex flex-wrap gap-1">
                {['Cvent', 'Bizzabo', 'Eventbrite', 'Web Summit', 'CES'].map(t => <span key={t} className="text-[10px] bg-white border px-1.5 py-0.5 rounded text-slate-700 hover:border-red-300 cursor-pointer transition-colors">{t}</span>)}
              </div>
            </div>
            <div className="space-y-3 overflow-y-auto">
              {[
                { title: "Cvent Event Management Software Demo", keyword: "event check-in system", dest: "Notebook 4" },
                { title: "대규모 전시회 입장 대기 관리 방법", keyword: "전시회 운영 노하우", dest: "Notebook 2" }
              ].map((item, idx) => (
                <div key={idx} className="p-3 bg-white rounded-xl border border-slate-200 shadow-sm hover:border-red-300 transition-colors cursor-pointer">
                  <p className="font-medium text-xs text-slate-800 line-clamp-2">{item.title}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-[9px] text-slate-400">검색: {item.keyword}</span>
                    <span className={`text-[9px] font-bold text-slate-600`}>&rarr; {item.dest}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Blogs & Reports */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col relative group">
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="bg-slate-800 text-white text-[10px] px-2 py-1 rounded shadow">Web Clipper 연동됨</div>
            </div>
            <h3 className="font-bold flex items-center gap-2 text-blue-600 mb-4"><Globe size={18}/> 글로벌 Blog & Report</h3>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 mb-4">
              <p className="text-[10px] font-bold text-slate-500 mb-1">필수 사이트 (RSS 대상)</p>
              <div className="flex flex-wrap gap-1">
                {['Bizzabo Blog', 'Cvent Blog', 'HubSpot Blog'].map(t => <span key={t} className="text-[10px] bg-white border px-1.5 py-0.5 rounded text-slate-700 hover:border-blue-300 cursor-pointer transition-colors">{t}</span>)}
              </div>
            </div>
            <div className="space-y-3 overflow-y-auto">
              {[
                { title: "The 2026 Event Industry Trends Report", type: "Report", dest: "Notebook 1" },
                { title: "5 Event Management Problems to Avoid", type: "Blog", dest: "Notebook 2" }
              ].map((item, idx) => (
                <div key={idx} className="p-3 bg-white rounded-xl border border-slate-200 shadow-sm hover:border-blue-300 transition-colors cursor-pointer">
                  <div className="flex gap-1 mb-1">
                    <span className="text-[9px] bg-slate-100 px-1.5 rounded text-slate-500 font-bold">{item.type}</span>
                  </div>
                  <p className="font-medium text-xs text-slate-800 line-clamp-2">{item.title}</p>
                  <div className="flex justify-end mt-2">
                    <span className={`text-[9px] font-bold text-slate-600`}>&rarr; {item.dest}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Internal Assets (Most Important) */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 shadow-sm flex flex-col ring-1 ring-emerald-500/20 relative">
            <h3 className="font-bold flex items-center gap-2 text-emerald-800 mb-4"><Database size={18}/> 내부 소스 (가장 중요)</h3>
            <p className="text-xs text-emerald-700 mb-4">내부의 제안서, 보고서, 견적서를 업로드하여 CongKong 만의 독보적인 Case DB를 구축합니다.</p>
            
            <button className="w-full bg-emerald-600 text-white py-2 rounded-lg text-sm font-bold shadow-sm hover:bg-emerald-700 transition-colors mb-4 flex items-center justify-center gap-2 relative overflow-hidden group">
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform"></div>
              <FileDown size={16}/> 내부 파일 수동 업로드 (PDF, PPT)
            </button>

            <div className="space-y-3 overflow-y-auto">
              {[
                { title: "2025 A컨퍼런스 운영 결과 보고서.pdf", status: "Notebook 3 분석 완료" },
                { title: "B기관 스마트 체크인 도입 제안서.pptx", status: "AI 파싱 중..." }
              ].map((item, idx) => (
                <div key={idx} className="p-3 bg-white rounded-xl border border-emerald-100 shadow-sm">
                  <p className="font-medium text-xs text-slate-800 line-clamp-2">{item.title}</p>
                  <p className={`text-[10px] font-bold mt-2 ${item.status.includes('완료') ? 'text-emerald-600' : 'text-amber-500'}`}>{item.status}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* --- 3. Knowledge Base View --- */
const KnowledgeView = () => {
  const [activeNotebook, setActiveNotebook] = useState(5);

  const notebooks = [
    { id: 1, title: "🇰🇷 1. 한국 Event 시장 & 트렌드", type: "RAW/정제" },
    { id: 2, title: "🚨 2. 고객 Pain & 문제", type: "RAW/정제" },
    { id: 3, title: "💎 3. CongKong Case (자산)", type: "RAW/정제" },
    { id: 4, title: "🔍 4. 경쟁사 & 글로벌", type: "RAW/정제" },
    { id: 5, title: "🏭 5. 콘텐츠 생성용 (Final)", type: "생성용" }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500 h-full flex flex-col">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Multi-Notebook 체계 (생각하는 두뇌)</h2>
        <p className="text-slate-500 mt-1">NotebookLM UI에서 1차 정제된 데이터 기반으로 퀄리티 높은 프롬프트를 세팅합니다.</p>
      </div>
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm flex-1 flex overflow-hidden">
        <div className="w-72 bg-slate-50 border-r border-slate-200 p-4 flex flex-col">
          <ul className="space-y-2 text-sm flex-1">
            {notebooks.map((nb) => (
              <li 
                key={nb.id} 
                onClick={() => setActiveNotebook(nb.id)}
                className={`p-3 rounded-lg cursor-pointer border transition-all ${activeNotebook === nb.id ? 'bg-blue-600 text-white border-blue-600 shadow-md' : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300'}`}
              >
                <div className="font-bold">{nb.title}</div>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="flex-1 p-8 overflow-y-auto bg-white">
          <div className="flex justify-between items-start border-b border-slate-100 pb-4 mb-6">
            <div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full mb-3 inline-block bg-indigo-100 text-indigo-700">생성용 Notebook</span>
              <h3 className="font-black text-2xl text-slate-800">5. 콘텐츠 생성용 (Final)</h3>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-slate-800 rounded-xl p-5 text-white shadow-inner flex flex-col">
              <h4 className="text-sm font-bold flex items-center gap-2 mb-3 text-emerald-400">
                <Box size={16}/> Master 구조 생성 프롬프트
              </h4>
              <pre className="text-[11px] font-mono text-slate-300 whitespace-pre-wrap leading-relaxed bg-slate-900 p-3 rounded flex-1">
                다음 정보를 기반으로 B2B 콘텐츠를 만들어줘{'\n\n'}
                - 고객 문제 (Notebook 2){'\n'}
                - 시장 트렌드 (Notebook 1){'\n'}
                - 실제 사례 (Notebook 3){'\n\n'}
                구조:{'\n'}
                [Hook] 문제 제기 (3줄){'\n'}
                [문제] 고객이 겪는 실제 상황{'\n'}
                [리스크] 이 문제로 인한 손실{'\n'}
                [해결] 구조 중심 설명 (기능X){'\n'}
                [사례] 실제 적용 결과{'\n'}
                [결론] 핵심 메시지{'\n'}
                [CTA] 행동 유도
              </pre>
            </div>

            <div className="bg-red-50 rounded-xl p-5 border border-red-200 flex flex-col relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-red-400"></div>
              <h4 className="text-sm font-bold flex items-center gap-2 mb-3 text-red-800">
                <ShieldCheck size={16}/> 자동 품질 검증 기준 (Validation)
              </h4>
              <p className="text-xs text-red-600 mb-3 font-medium">API 생성 후 아래 5가지 기준으로 점수를 매겨 3점 이하 시 반려합니다.</p>
              <ul className="space-y-2 text-xs font-bold text-slate-700">
                <li className="flex items-center gap-2 bg-white p-2 rounded border border-red-100"><CheckCircle2 size={14} className="text-red-500"/> 1. B2B 대상이 명확한가</li>
                <li className="flex items-center gap-2 bg-white p-2 rounded border border-red-100"><CheckCircle2 size={14} className="text-red-500"/> 2. 설명이 아닌 '문제+손실' 중심인가</li>
                <li className="flex items-center gap-2 bg-white p-2 rounded border border-red-100"><CheckCircle2 size={14} className="text-red-500"/> 3. 수치가 반드시 포함되었는가</li>
                <li className="flex items-center gap-2 bg-white p-2 rounded border border-red-100"><CheckCircle2 size={14} className="text-red-500"/> 4. 구조가 완전한가</li>
                <li className="flex items-center gap-2 bg-white p-2 rounded border border-red-100"><CheckCircle2 size={14} className="text-red-500"/> 5. 세일즈 연결이 있는가</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* --- 4. AI Content Engine View --- */
const AIEngineView = () => (
  <div className="h-full flex flex-col space-y-6 animate-in fade-in duration-500">
    <div className="flex justify-between items-end">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">주간 캠페인 팩토리 (Mon/Wed/Fri)</h2>
        <p className="text-slate-500 mt-1">"돈이 되는 문제"를 주제로 월(공감), 수(신뢰), 금(행동) 흐름의 3종 콘텐츠를 자동 생성 및 검증합니다.</p>
      </div>
      <div className="bg-slate-800 text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 shadow-sm">
        <Cpu size={16} className="text-emerald-400"/> API Token Cost: $0.12 (Optimized)
      </div>
    </div>

    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col flex-1">
      <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
        <h3 className="font-black text-lg text-slate-800">이번 주 테마: 행사 체크인 대기 문제</h3>
        <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold">진행 중 (주차 42)</span>
      </div>

      <div className="grid grid-cols-3 gap-6 h-full">
        <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <span className="font-black text-blue-600 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500"></div>월요일 (공감)</span>
            <span className="text-[10px] bg-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded">발송 완료</span>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-100 flex-1">
            <p className="text-[10px] text-slate-400 font-bold mb-1">Newsletter</p>
            <p className="font-bold text-sm text-slate-800 mb-2">제목: 행사 시작 전에 이미 망하는 이유</p>
            <div className="text-xs text-slate-600 space-y-2 bg-slate-50 p-2 rounded">
              <p><strong>[Hook]</strong> 행사장에서 가장 많은 컴플레인은 '입장'입니다.</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <span className="font-black text-indigo-600 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-indigo-500"></div>수요일 (신뢰)</span>
            <span className="text-[10px] bg-emerald-100 text-emerald-700 font-bold px-2 py-0.5 rounded flex items-center gap-1"><ShieldCheck size={10}/> 검증 통과</span>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-indigo-100 flex-1 ring-1 ring-indigo-500/10">
            <p className="text-[10px] text-slate-400 font-bold mb-1">Blog + PDF 배포용</p>
            <p className="font-bold text-sm text-slate-800 mb-2">제목: 체크인 대기시간 40% 줄인 실제 방법</p>
            <div className="text-xs text-slate-600 space-y-2 bg-slate-50 p-2 rounded">
              <p><strong>[사례]</strong> 1000명 행사, 대기 40% 감소</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <span className="font-black text-emerald-600 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500"></div>금요일 (리드)</span>
            <span className="text-[10px] bg-amber-100 text-amber-700 font-bold px-2 py-0.5 rounded">생성 중</span>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-100 flex-1 opacity-70">
            <p className="text-[10px] text-slate-400 font-bold mb-1">Landing (Form)</p>
            <p className="font-bold text-sm text-slate-800 mb-2">제목: 우리 행사, 몇 분 대기 예상되나요?</p>
            <div className="text-xs text-slate-600 space-y-2 bg-slate-50 p-2 rounded">
              <p className="text-emerald-600 font-bold"><strong>[CTA]</strong> 무료 진단 신청 폼으로 유도</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

/* --- 5. CRM & Lead Qualification View --- */
const CRMView = () => (
  <div className="space-y-6 animate-in fade-in duration-500 h-full flex flex-col">
    <div className="flex justify-between items-end">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">즉각 반응형 리드 라우팅 (CRM)</h2>
        <p className="text-slate-500 mt-1">폼 입력 후 5초 이내 자동 반응 및 스코어링 기반 자동 분기 현황입니다.</p>
      </div>
    </div>
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex-1">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider border-b border-slate-200">
            <th className="p-4 font-bold">고객 정보 (DB)</th>
            <th className="p-4 font-bold">등급 (Scoring)</th>
            <th className="p-4 font-bold">라우팅 액션</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-sm">
          <tr className="hover:bg-slate-50 transition-colors">
            <td className="p-4">
              <p className="font-bold text-slate-800">(주)글로벌네트웍스</p>
              <span className="text-xs text-slate-500">1000명+ 규모</span>
            </td>
            <td className="p-4">
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 font-bold text-xs">A</span>
                <span className="text-[10px] font-bold text-slate-500">즉시 영업</span>
              </div>
            </td>
            <td className="p-4">
              <span className="text-xs font-bold flex items-center gap-1.5 text-slate-800">
                영업팀 Slack 알림 발송됨
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

/* --- 6. Analytics View --- */
const AnalyticsView = () => (
  <div className="space-y-6 animate-in fade-in duration-500 h-full flex flex-col">
    <div className="flex justify-between items-end">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">MVP Tracking: Lead Generation 중심</h2>
        <p className="text-slate-500 mt-1">가장 먼저 구현된 리드 획득 및 전환 지표입니다.</p>
      </div>
    </div>
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <h3 className="font-bold text-lg mb-4 text-slate-800 border-b border-slate-100 pb-2">돈이 되는 콘텐츠 (매출 직결)</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
          <div className="flex-1 mr-4">
            <span className="text-sm font-bold text-slate-800 line-clamp-1">행사 체크인 대기시간 40% 줄이는 방법</span>
          </div>
          <div className="text-right">
            <p className="text-lg font-black text-emerald-600">45</p>
            <p className="text-[10px] text-slate-500 font-bold">수집 리드</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

/* --- 1. Dashboard View --- */
const DashboardView = () => (
  <div className="space-y-8 animate-in fade-in duration-500">
    <div className="grid grid-cols-4 gap-6">
      <StatCard title="주간 캠페인 전환율" value="4.2%" change="+1.1%" subtitle="이번 주: 대기시간 단축" icon={Target} color="bg-indigo-50 text-indigo-600" />
      <StatCard title="확보된 폼 리드" value="45" change="+12" subtitle="무료 진단 / 리포트 다운" icon={Database} color="bg-amber-50 text-amber-600" />
      <StatCard title="5초 즉시 반응률" value="98%" change="+5%" subtitle="자동화 메일 발송 성공" icon={Zap} color="bg-blue-50 text-blue-600" />
      <StatCard title="Sales 예약" value="8" change="+3" subtitle="A급 리드 직접 예약 성사" icon={CheckCircle2} color="bg-emerald-50 text-emerald-600" />
    </div>

    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
        <TrendingUp size={20} className="text-blue-500" />
        Content to Deal 파이프라인 (Firebase Analytics)
      </h3>
      <div className="space-y-4">
        <FunnelBar stage="1. 콘텐츠 도달 (Newsletter + SEO)" count="8,620" percentage="100%" color="bg-slate-100" barColor="bg-slate-300" />
        <FunnelBar stage="2. 상세 콘텐츠 소비 (Blog / Landing)" count="2,840" percentage="32.9%" color="bg-blue-50" barColor="bg-blue-300" width="32.9%" />
        <FunnelBar stage="3. Lead Magnet 전환" count="340" percentage="3.9%" color="bg-amber-50" barColor="bg-amber-400" width="16.1%" />
        <FunnelBar stage="4. Sales 퀄리피케이션 (A급)" count="124" percentage="1.4%" color="bg-emerald-50" barColor="bg-emerald-400" width="6%" />
        <FunnelBar stage="5. 미팅 성사" count="12" percentage="0.13%" color="bg-slate-800" text="text-white" barColor="bg-slate-600" width="2%" />
      </div>
    </div>
  </div>
);

/* --- UI Helper Components --- */
const StatCard = ({ title, value, change, subtitle, icon: Icon, color }: any) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between relative overflow-hidden">
    <div className={`absolute -right-4 -top-4 opacity-5 ${color.split(' ')[0]}`}><Icon size={100}/></div>
    <div className="flex justify-between items-start mb-4 relative z-10">
      <div className={`p-3 rounded-xl ${color}`}>
        <Icon size={24} />
      </div>
      <span className={`text-sm font-bold bg-white/80 px-2 py-1 rounded backdrop-blur-sm ${change.includes('+') ? 'text-emerald-500' : 'text-amber-500'}`}>
        {change}
      </span>
    </div>
    <div className="relative z-10">
      <h4 className="text-slate-500 text-sm font-bold mb-1">{title}</h4>
      <p className="text-3xl font-black text-slate-800 tracking-tight">{value}</p>
      <p className="text-[10px] text-slate-400 mt-2 font-medium">{subtitle}</p>
    </div>
  </div>
);

const FunnelBar = ({ stage, count, percentage, color, barColor, width = "100%", text="text-slate-700" }: any) => (
  <div className={`p-4 rounded-xl ${color} flex items-center justify-between relative overflow-hidden group border border-black/5`}>
    <div className={`absolute left-0 top-0 bottom-0 ${barColor} opacity-20 transition-all duration-1000`} style={{ width }}></div>
    <div className={`relative z-10 font-bold text-sm ${text}`}>{stage}</div>
    <div className="relative z-10 flex items-center gap-4">
      <span className={`font-black ${text}`}>{count}</span>
      <span className={`text-xs w-12 text-right font-medium opacity-70 ${text}`}>{percentage}</span>
    </div>
  </div>
);

export default App;
