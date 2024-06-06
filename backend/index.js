import express from 'express';
import { PORT, mongodbURL } from './config.js';
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js';

const app = express();
//middleware for parsing body
app.use(express.json());

app.get('/', (req, res)=>{
    // console.log(req);
    return res.status(234).send("Welcome to mern stack!");
})

app.post('/books', async(req, res)=>{
    try{
        if(
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ){
            return res.status(400).send({
                message: "Send all required field: title, author and publish year"
            })
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        }
        const book  = await Book.create(newBook);
        return res.status(201).send(book);
    }
    catch(error){
        console.log(error.message);
        return res.status(500).send({message: error.message})
    }
})

app.get('/books', async(req, res)=>{
    try {
        const books = await Book.find({});
        return res.status(200).json({
            count: books.length,
            data: books
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
})

mongoose.connect(mongodbURL)
.then(
    ()=>{
        console.log("Database is connected");
        app.listen(PORT, ()=>{
            console.log(`Server is running on ${PORT}`)
        })
    }
)
.catch(
    (error)=>{
        console.log(error);
    }
)