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
        <div>
            <h1>Author Details</h1>
            <p>Author ID: {specificAuthor}</p>
            {authorsData && (
                <>
                    <p>Author Name : {authorsData.name}</p>
                    <p>Author Age : {authorsData.age}</p>
                    <p>Author Country : {authorsData.country}</p>
                    {authorsData.booksByAuthor && authorsData.booksByAuthor.map((book) => (
                        <p key={book._id}>Book Title: {book.title}</p>
                    ))}
                </>
            )}
            <button
                onClick={() => router.push("/authors")}
                className='text-xl border-none ml-6 mt-10 bg-[#725d36] text-white w-40 h-12 rounded-lg transition-shadow shadow-[#866d3f] shadow-lg hover:shadow-[#68542f] hover:shadow-xl'>
                Back
            </button>
        </div>
    );
}
