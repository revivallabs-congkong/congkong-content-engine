"use client";

import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";

interface Content {
  id: string;
  title: string;
  summary: string;
  category: string;
  createdAt: any;
}

export default function BlogList() {
  const [posts, setPosts] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const q = query(
          collection(db, "contents"),
          where("type", "==", "blog"),
          where("published", "==", true)
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Content));
        
        data.sort((a, b) => {
          if(!a.createdAt || !b.createdAt) return 0;
          return b.createdAt.seconds - a.createdAt.seconds;
        });
        
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  if (loading) return <div className="min-h-screen flex text-xl items-center justify-center">Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-5xl font-extrabold mb-12 text-gray-900 tracking-tight">CongKong <span className="text-blue-600">B2B Insights</span></h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map(post => (
          <Link href={`/blog/${post.id}`} key={post.id} className="group h-full">
            <div className="border border-gray-100 shadow-sm rounded-3xl overflow-hidden hover:shadow-2xl hover:scale-[1.02] hover:border-blue-100 transition-all duration-300 bg-white flex flex-col h-full cursor-pointer">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 h-56 w-full flex items-center justify-center transform group-hover:scale-105 transition-transform duration-500">
                <span className="text-indigo-400 font-bold text-xl tracking-widest">{post.category?.toUpperCase() || "INSIGHT"}</span>
              </div>
              <div className="p-8 flex flex-col flex-1">
                <span className="text-xs font-bold text-blue-600 mb-3 tracking-wider uppercase">{post.category || "General"}</span>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors leading-tight">{post.title}</h2>
                <p className="text-gray-600 text-sm line-clamp-3 mb-6 leading-relaxed">{post.summary}</p>
                <div className="mt-auto text-sm font-medium text-gray-400 flex items-center">
                   <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                   {post.createdAt ? new Date(post.createdAt.seconds * 1000).toLocaleDateString() : "최근 발행"}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {posts.length === 0 && (
          <div className="text-center py-32 text-gray-500 bg-gray-50 rounded-3xl border border-gray-100 mt-8">
             <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l6 6v10a2 2 0 01-2 2z" /></svg>
             <p className="text-lg">아직 발행된 아티클이 없습니다.</p>
          </div>
      )}
    </div>
  );
}
