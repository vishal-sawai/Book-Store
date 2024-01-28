/**
 * @file This file contains the server code for a book store application.
 * It includes routes for creating, reading, updating, and deleting books from a MongoDB database.
 */

import express from "express";
import mongoose from "mongoose";
import { PORT, mongoDBURL } from './config.js';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';

const app = express();

// Middleware for passing request body
app.use(express.json());

/**
 * Route for the home page.
 * @name GET /
 * @function
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object with a status code of 234 and a message.
 */

// Middleware for handling Cors policy
// Options 1: Allow All Origins with default of cors(*)
// app.use(cors());
// Options 2: Allow Custom Origins 
app.use(
    cors({
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type'],
    })
);


app.get('/', (req, res) => {
    console.log(req);
    return res.status(234).send('welcome to Mern Stack way');
});

app.use('/books', booksRoute);

/**
 * Connect to the MongoDB database and start the server.
 */
mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`App is listening to port:${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
