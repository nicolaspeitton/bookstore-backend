import express, { response } from "express";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js"
import cors from 'cors'
import dotenv from 'dotenv';

dotenv.config();


const app = express();

const PORT = process.env.PORT || 4000;
const mongoDBURL = process.env.mongoDBURL;

app.use(express.json());

app.use(cors());


app.get('/', (request,response) => {
    console.log(request)
    return response.status(234).send('Welcome')
});

app.use('/books', booksRoute);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });
