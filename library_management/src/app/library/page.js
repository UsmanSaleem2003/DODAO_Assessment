"use client"
import { useRouter } from "next/navigation";
import React from 'react';

const booksData = [
    { name: 'Book 1', authors: ['Author 1', 'Author 2'] },
    { name: 'Book 2', authors: ['Author 3', 'Author 4'] },
    { name: 'Book 3', authors: ['Author 4', 'Author 5', 'Author 6'] },

];

export default function Page() {

    const router = useRouter();

    return (
        <div className="container mx-auto">
            <table className="min-w-full mt-6">
                <thead>
                    <tr className="bg-gray-400 text-lg">
                        <th className="py-2 border border-gray-600 w-2/5">Book Name</th>
                        <th className="px-6 py-2 border border-gray-600 w-3/5">Authors</th>
                    </tr>
                </thead>
                <tbody>
                    {booksData.map((book, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                            <td className="border font-medium px-4 py-2 border-gray-600">{book.name}</td>
                            <td className="border font-medium px-4 py-2 border-gray-600">
                                <ul className='list-disc list-inside'>
                                    {book.authors.map((author, index) => (
                                        <li key={index}>{author}</li>
                                    ))}
                                </ul>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button
                onClick={() => router.push("/")}
                className='text-xl border-none float-right mr-8 mt-10 bg-[#5d5d5d] text-white w-40 h-12 rounded-lg transition-shadow shadow-[#6d6d6d] shadow-lg hover:shadow-[#454545] hover:shadow-xl'>
                Back
            </button>
        </div >
    );
}
