"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from 'react'

export default function Page() {
    const router = useRouter();

    const authorsData = [
        { id: "1", name: "Author1" },
        { id: "2", name: "Author2" },
        { id: "3", name: "Author3" },
        { id: "4", name: "Author4" },
    ];

    return (
        <div>
            <p className="text-4xl font-serif tracking-wider text-center mt-12 text-[#725d36]">List of Authors</p>

            <div className="flex flex-col content-center items-center mr-12 mt-10 gap-5">
                {authorsData.map((author) => (
                    <Link
                        key={author.id}
                        href={`/authors/${author.id}`}
                        className="">
                        <span className="text-sm pr-4">{author.id})_</span>{author.name}
                    </Link>
                ))}

                <button
                    onClick={() => router.push("/")}
                    className='text-xl border-none ml-6 mt-10 bg-[#725d36] text-white w-40 h-12 rounded-lg transition-shadow shadow-[#866d3f] shadow-lg hover:shadow-[#68542f] hover:shadow-xl'>
                    Back
                </button>
            </div>
        </div>
    )
}
