"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from 'react'

export default function Page() {
    const router = useRouter();

    const booksData = [
        { id: "1", name: "Book1" },
        { id: "2", name: "Book2" },
        { id: "3", name: "Book3" },
        { id: "4", name: "Book4" },
    ];

    return (
        <div>
            <p className="text-4xl font-serif tracking-wider text-center mt-12 text-[#24584a]">List of Books</p>

            <div className="flex flex-col content-center items-center mr-12 mt-10 gap-5">
                {booksData.map((book) => (
                    <Link
                        key={book.id}
                        href={`/books/${book.id}`}
                        className="">
                        <span className="text-sm pr-4">{book.id})_</span>{book.name}
                    </Link>
                ))}

                <button
                    onClick={() => router.push("/")}
                    // className='text-xl border-none ml-6 mt-10 bg-[#5d5d5d] text-white w-40 h-12 rounded-lg transition-shadow shadow-[#6d6d6d] shadow-lg hover:shadow-[#454545] hover:shadow-xl'>
                    className='text-xl border-none ml-6 mt-10 bg-[#24584a] text-white w-40 h-12 rounded-lg transition-shadow shadow-[#44977d] shadow-lg hover:shadow-[#2d6e5b] hover:shadow-xl'>
                    Back
                </button>
            </div>
        </div>
    )
}
