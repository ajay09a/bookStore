import express from 'express';
import { PORT, mongodbURL } from './config.js';
import mongoose from 'mongoose';

const app = express();

app.get('/', (req, res)=>{
    console.log(req);
    return res.status(234).send("Welcome to mern stack!");
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