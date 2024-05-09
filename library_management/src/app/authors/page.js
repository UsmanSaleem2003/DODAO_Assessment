"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from 'react'

export default function Page() {
    const router = useRouter();

    const [authorsData, setAuthorsData] = useState([]);

    useEffect(() => {
        const fetchAuthors = async () => {
            try {
                const response = await fetch('http://localhost:4000/getAuthors');
                if (!response.ok) {
                    throw new Error('Failed to fetch books');
                }
                const data = await response.json();
                console.log(data);
                setAuthorsData(data.authors);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchAuthors();
    }, []);

    return (
        <div>
            <p className="text-4xl font-serif tracking-wider text-center mt-12 text-[#725d36]">List of Authors</p>

            <div className="flex flex-col content-center items-center mt-10 gap-5">
                {authorsData.map((author) => (
                    <Link
                        key={author._id}
                        href={`/authors/${author._id}`}
                        className="">
                        <ul>
                            <li className="text-lg font-semibold tracking-wide list-inside list-disc hover:text-[#b39255]">{author.name}</li>
                        </ul>
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
