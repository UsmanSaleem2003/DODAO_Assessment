"use client"
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

export default function BookDetails({ params }) {
    const router = useRouter();

    const { specificBook } = params;
    // console.log(specificBook);

    // const [booksData, setbooksData] = useState([]);
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
                console.log(data.bookDetails);
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
        <div>
            <h1>Book Details</h1>
            <p>Book ID: {specificBook}</p>
            {booksData && (
                <>
                    <p>Book Name : {booksData.title}</p>
                    <p>Number of Pages of Book : {booksData.number_of_pages}</p>
                    <p>Release Date : {formatDate(booksData.release_data)}</p>
                    {booksData.AuthorsOfBook && booksData.AuthorsOfBook.map((author, index) => (
                        <p key={author._id}>Author No. {(index + 1)} : {author.name}</p>
                    ))}
                </>
            )}
            <button
                onClick={() => router.push("/books")}
                className='text-xl border-none ml-6 mt-10 bg-[#24584a] text-white w-40 h-12 rounded-lg transition-shadow shadow-[#6d6d6d] shadow-lg hover:shadow-[#454545] hover:shadow-xl'>
                Back
            </button>
        </div>
    );
}
