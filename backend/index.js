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
//route to get all the books
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
//route to get the book by id
app.get('/books/:id', async(req, res)=>{
    try {
        const {id} = req.params;
        const book = await Book.findById(id);
        return res.status(200).json(book)
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
})
//update a book by id
app.put('/books/:id', async(req, res)=>{
    try {
        if(
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ){
            return res.status(400).send({
                message: "Send all required field: title, author and publish year"
            })
        }
        const {id} = req.params;
        const result = await Book.findByIdAndUpdate(id, req.body);
        if(!result){
            return res.status(404).json({message: "book not found"})
        }
        return res.status(200).send({message: "Book updated successfully"})
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
})
//delete a book from records
app.delete('/books/:id', async(req, res)=>{
    try {
        const {id} = req.params;
        const book = await Book.findByIdAndDelete(id);
        if(!book){
            return res.status(404).send({message: "No book found"})
        }
        return res.status(200).send({message: "Book is deleted from record"})
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