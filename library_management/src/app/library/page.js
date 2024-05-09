"use client"
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from 'react';


export default function Page() {

    const router = useRouter();
    const [booksData, setBooksData] = useState(null);

    useEffect(() => {
        const fetchLibraryData = async () => {
            try {
                const response = await fetch('http://localhost:4000/getAuthorsAndBooks');
                if (!response.ok) {
                    throw new Error('Failed to fetch books');
                }
                const data = await response.json();
                setBooksData(data.booksData);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchLibraryData();
    }, []);

    return (
        <div className="container mx-auto">
            <table className="min-w-full mt-6">
                <thead>
                    <tr className="bg-[#53a139] text-lg text-gray-100">
                        <th className="py-2 border-r-2 border-r-[#326421] w-2/5">Book Name</th>
                        <th className="px-6 py-2 border-none w-3/5">Authors</th>
                    </tr>
                </thead>
                <tbody>
                    {booksData && booksData.map((book, index) => (
                        <tr key={book._id} className={index % 2 === 0 ? '' : 'bg-[#b8f7a3]'}>
                            {/* <tr key={book._id} className={index % 2 === 0 ? 'bg-gray-100' : ''}> */}
                            {/* <td className="border-b-[1px] border-b-black border-r-2 border-r-[#326421] px-4 py-2 text-center font-normal">{book.title}</td> */}
                            <td className="border-b-[1px] border-b-[#326421] border-r-2 border-r-[#326421] px-4 py-2 text-center font-normal">{book.title}</td>
                            <td className="border-b-[1px] border-b-[#326421] px-4 py-4 text-center font-normal">
                                <ul className='list-disc list-inside'>
                                    {book.AuthorsOfBook.map((author, index) => (
                                        <p key={index}>{author}</p>
                                    ))}
                                </ul>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button
                onClick={() => router.push("/")}
                className='text-xl border-none float-right mr-8 mt-10 bg-green-700 text-white w-40 h-12 rounded-lg transition-shadow shadow-green-400 shadow-lg hover:shadow-green-600 hover:shadow-xl'>
                Back
            </button>
        </div >
    );
}