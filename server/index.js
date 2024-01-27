import express from "express";
import { PORT, mongoDBURL } from './config.js'
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";

const app = express();

// Middleware for passing request body
app.use(express.json());

app.get('/', (req, res) => {
    console.log("Hello Guys in console");
    return res.status(234).send('welcome to Mern Stack way');
})

app.post('/books', async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message: 'Send All Required field: title,author,publishYear',
            });
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };
        const book = await Book.create(newBook);
        return response.status(201).send(book);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for get all books from database
app.get('/books', async (request, response) => {
    try {
        const books = await Book.find({});

        return response.status(200).json({
            count: books.length,
            data: books
        })
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
})


// Gets book by id
app.get('/books/:id', async (request, response) => {
    try {

        const { id } = request.params;
        const book = await Book.findById(id);

        return response.status(200).json({
            count: book.length,
            data: book
        });

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message })
    }
})

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App coonected to database');
        app.listen(PORT, () => {
            console.log(`App is listening to port:${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    })
