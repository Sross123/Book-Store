const express = require('express');
const mongoose = require('mongoose');
const ConnectDB = require('./connect/config')
const cors = require("cors");
const router = require('./Router/book-router')


const app = express();

app.use(cors())
app.use(express.json());

mongoose.set('strictQuery', false)

app.use('/books', router)

const start =async () =>{
    try {
        await ConnectDB()
        app.listen(5000, ()=>{
            console.log("Connected Server");
        })
    } catch (error) {
        console.log(error);
    }
}
start()
