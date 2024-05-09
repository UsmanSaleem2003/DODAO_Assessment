"use client"
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

export default function AuthorDetails({ params }) {
    const router = useRouter();

    const { specificAuthor } = params;

    const [authorsData, setAuthorsData] = useState([]);

    useEffect(() => {
        const fetchAuthors = async () => {
            try {
                const response = await fetch(`http://localhost:4000/getAuthors/${specificAuthor}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch authors');
                }
                const data = await response.json();
                // console.log(data.authorDetails);
                setAuthorsData(data.authorDetails);
            } catch (error) {
                console.error('Error fetching authors:', error);
            }
        };

        fetchAuthors();
    }, []);


    return (
        <div className="flex flex-col justify-center gap-3 text-lg ml-20 mt-20">

            <h1 className="font-bold text-2xl text-[#b6914d]">Author Details : </h1>

            <p>Author ID: <span className="font-semibold text-gray-800">{specificAuthor}</span></p>

            {authorsData && (
                <>
                    <p><span className="font-normal">Author Name : </span> <span className="font-semibold text-gray-800">{authorsData.name} </span></p>
                    <p><span className="font-normal">Author Age : </span> <span className=" font-semibold text-gray-800">{authorsData.age}</span></p>
                    <p><span className="font-normal">Author Country : </span> <span className="font-semibold text-gray-800">{authorsData.country}</span></p>
                    <h3>Books written by author are below : </h3>
                    {authorsData.booksByAuthor && authorsData.booksByAuthor.map((book, index) => (
                        <p className="ml-20" key={book._id}>({index + 1})_ <span className="font-semibold text-gray-800">{book.title} </span></p>
                    ))}
                </>
            )
            }

            <button
                onClick={() => router.push("/authors")}
                className='text-xl border-none mt-10 bg-[#725d36] text-white w-40 h-12 rounded-lg transition-shadow shadow-[#866d3f] shadow-lg hover:shadow-[#68542f] hover:shadow-xl'>
                Back
            </button>
        </div >
    );
}
