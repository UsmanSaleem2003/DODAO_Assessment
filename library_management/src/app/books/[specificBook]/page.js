"use client"
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

export default function BookDetails({ params }) {
    const router = useRouter();

    const { specificBook } = params;

    const [booksData, setbooksData] = useState(null);


    useEffect(() => {
        const fetchSpecificBook = async () => {
            try {
                // console.log("2");
                const response = await fetch(`http://localhost:4000/getBooks/${specificBook}`);
                console.log(response);
                if (!response.ok) {
                    throw new Error('Failed to fetch books');
                }
                const data = await response.json();
                setbooksData(data.bookDetails);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchSpecificBook();
    }, []);

    function formatDate(releaseData) {
        const date = new Date(releaseData);
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };
        return date.toLocaleDateString('en-US', options);
    }


    return (
        <div className="flex flex-col justify-center gap-3 text-lg ml-20 mt-20">

            {/* <h1 className="font-bold text-2xl text-[#33816c]">Book Details</h1> */}
            <h1 className="font-bold text-2xl text-[#4cb397]">Book Details</h1>

            <p><span className="font-normal">Book ID: </span> <span className="font-semibold text-gray-800">{specificBook}</span></p>

            {booksData && (
                <>
                    <p><span className="font-normal">Book Name : </span> <span className="font-semibold text-gray-800">{booksData.title}</span></p>
                    <p><span className="font-normal">Number of Pages of Book : </span><span className="font-semibold text-gray-800">{booksData.number_of_pages}</span></p>
                    <p><span className="font-normal">Release Date : </span> <span className="font-semibold text-gray-800">{formatDate(booksData.release_data)}</span></p>
                    <h3>Book written by authors are below : </h3>
                    {booksData.AuthorsOfBook && booksData.AuthorsOfBook.map((author, index) => (
                        <p className="ml-20" key={author._id}><span> ({(index + 1)})_ </span> <span className="font-semibold text-gray-800">{author.name}</span></p>
                    ))}
                </>
            )}

            <button
                onClick={() => router.push("/books")}
                className='text-xl border-none mt-10 bg-[#24584a] text-white w-40 h-12 rounded-lg transition-shadow shadow-[#6d6d6d] shadow-lg hover:shadow-[#454545] hover:shadow-xl'>
                Back
            </button>
        </div>
    );
}
