const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");


const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
}));
app.use(express.json({ limit: '150mb' }));
app.use(express.urlencoded({ extended: true, limit: '150mb' }));

mongoose.connect("mongodb://127.0.0.1:27017/Library_Management")
    .then(() => {
        // populateCollections();
        console.log("Connected to mongodb://127.0.0.1:27017/Library_Management");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    number_of_pages: { type: Number },
    release_data: Date,
    AuthorsOfBook: [{ type: mongoose.Schema.Types.ObjectId, ref: "Author" }],
});

const authorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number },
    country: { type: String },
    booksByAuthor: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }]
});

const Book = mongoose.model("Book", bookSchema);
const Author = mongoose.model("Author", authorSchema);

app.get("/", function (req, res) {
    res.send("Server is up and running on port 4000");
});

app.get("/getBooks", async (req, res) => {
    try {
        const booksData = await Book.find();
        res.status(200).json({ books: booksData, msg: "All Books Fetched" });
    } catch (e) {
        res.status(400).json({ msg: "Server Error in Fetching Books", error: e });
    }
});

app.get("/getAuthors", async (req, res) => {
    try {
        const authorsData = await Author.find();
        res.status(200).json({ authors: authorsData, msg: "All Authors Fetched" });
    } catch (e) {
        res.status(400).json({ msg: "Server Error in Fetching Authors", error: e });
    }
});

app.get("/getAuthors/:id", async (req, res) => {
    try {
        const specificAuthorId = req.params.id;
        const specificAuthor = await Author.findById(specificAuthorId).populate('booksByAuthor', 'title');
        res.status(200).json({ authorDetails: specificAuthor });

    } catch (error) {
        res.status(400).json({ msg: "Server Error in Fetching Authors and Books", error: error });
    }
})

app.get("/getBooks/:id", async (req, res) => {
    try {
        const specificBookId = req.params.id;
        const specificBook = await Book.findById(specificBookId).populate('AuthorsOfBook', 'name');
        res.status(200).json({ bookDetails: specificBook, msg: "Specific Author Details Fetched" });

    } catch (error) {
        res.status(400).json({ msg: "Server Error in Fetching Authors and Books", error: error });
    }
})

app.get("/getAuthorsAndBooks", async (req, res) => {
    try {
        const booksData = await Book.find().populate('AuthorsOfBook', 'name');
        const formattedBooksData = booksData.map(book => ({
            _id: book._id,
            title: book.title,
            number_of_pages: book.number_of_pages,
            release_data: book.release_data,
            AuthorsOfBook: book.AuthorsOfBook.map(author => author.name),
            __v: book.__v
        }));

        res.status(200).json({ booksData: formattedBooksData, msg: "Books Data Fetched Successfully" });
    } catch (error) {
        res.status(400).json({ msg: "Server Error in Fetching Authors Data and Books Data", error: error });
    }
});


async function populateCollections() {
    try {
        const authors = await Author.create([
            { name: 'J.K. Rowling', age: 55, country: 'UK', booksByAuthor: [] },
            { name: 'Stephen King', age: 74, country: 'USA', booksByAuthor: [] },
            { name: 'Agatha Christie', age: 85, country: 'UK', booksByAuthor: [] },
            { name: 'Haruki Murakami', age: 72, country: 'Japan', booksByAuthor: [] },
            { name: 'Gabriel García Márquez', age: 87, country: 'Colombia', booksByAuthor: [] }
        ]);

        const books = await Book.create([
            { title: 'Harry Potter and the Philosopher\'s Stone', number_of_pages: 320, release_data: new Date(), AuthorsOfBook: [authors[0]._id] },
            { title: 'The Shining', number_of_pages: 447, release_data: new Date(), AuthorsOfBook: [authors[1]._id, authors[2]._id, authors[3]._id] },
            { title: 'Murder on the Orient Express', number_of_pages: 265, release_data: new Date(), AuthorsOfBook: [authors[2]._id] },
            { title: 'Norwegian Wood', number_of_pages: 296, release_data: new Date(), AuthorsOfBook: [authors[3]._id, authors[2]._id] },
            { title: 'One Hundred Years of Solitude', number_of_pages: 417, release_data: new Date(), AuthorsOfBook: [authors[4]._id, authors[1]._id] }
        ]);

        books.forEach(book => {
            book.AuthorsOfBook.forEach(authorId => {
                const author = authors.find(author => author._id.equals(authorId));
                if (author) {
                    author.booksByAuthor.push(book._id);
                }
            });
        });

        await Promise.all(authors.map(author => author.save()));

        console.log('Collections populated successfully.');
    } catch (error) {
        console.error('Error populating collections:', error);
    }
}



app.listen("4000", (req, res) => {
    console.log("Server is up and running on port 4000");
})
