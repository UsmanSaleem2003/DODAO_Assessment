"use client"
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter();

  return (
    <div className="flex flex-col content-center items-center
    gap-16 mt-16 ">
      <p className="text-4xl font-serif tracking-wider">Welcome To Library</p>
      
      <button 
        onClick={() => router.push("/library")} 
        className="border-none bg-green-700 text-white w-60 h-16 rounded-lg transition-shadow shadow-green-400 shadow-lg hover:shadow-green-600 hover:shadow-xl text-xl">
          Library
      </button>
      
      <button 
        onClick={() => router.push("/books")} 
        className="border-none bg-[#24584a] text-white w-60 h-16 rounded-lg transition-shadow shadow-[#44977d] shadow-lg hover:shadow-[#2d6e5b] hover:shadow-xl text-xl">
          Books
      </button>
      
      <button 
        onClick={() => router.push("/authors")} 
        className="border-none bg-[#725d36] text-white w-60 h-16 rounded-lg transition-shadow shadow-[#866d3f] shadow-lg hover:shadow-[#68542f] hover:shadow-xl text-xl">
          Authors
      </button>
    </div>
  );
}
