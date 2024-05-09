"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from 'react'

export default function Page() {
    const router = useRouter();

    const [booksData, setBooksData] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch('http://localhost:4000/getBooks');
                if (!response.ok) {
                    throw new Error('Failed to fetch books');
                }
                const data = await response.json();
                setBooksData(data.books);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBooks();
    }, []);

    return (
        <div>
            <p className="text-4xl font-serif tracking-wider text-center mt-12 text-[#24584a]">List of Books</p>

            <div className="flex flex-col content-center items-center text-center mt-10 gap-5">
                {booksData.map((book) => (
                    <Link
                        key={book.id}
                        href={`/books/${book._id}`}
                        className="">
                        <ul>
                            <li className="text-lg font-semibold tracking-wide list-inside list-disc hover:text-[#3da589]">{book.title}</li>
                        </ul>
                    </Link>
                ))}

                <button
                    onClick={() => router.push("/")}
                    className='text-xl border-none ml-6 mt-10 bg-[#24584a] text-white w-40 h-12 rounded-lg transition-shadow shadow-[#44977d] shadow-lg hover:shadow-[#2d6e5b] hover:shadow-xl'>
                    Back
                </button>
            </div>
        </div>
    )
}
