"use client"
import { useRouter } from "next/navigation";

export default function BookDetails({ params }) {
    const router = useRouter();

    const { specificBook } = params;

    // Fetch book details based on bookId and display them

    return (
        <div>
            <h1>Book Details</h1>
            <p>Book ID: {specificBook}</p>
            {/* Display other details of the book */}

            <button
                onClick={() => router.push("/books")}
                className='text-xl border-none ml-6 mt-10 bg-[#5d5d5d] text-white w-40 h-12 rounded-lg transition-shadow shadow-[#6d6d6d] shadow-lg hover:shadow-[#454545] hover:shadow-xl'>
                Back
            </button>
        </div>
    );
}
