const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    title: String,
    author: String,
    dop: String
});

let bookModel = mongoose.model('bookStore', bookSchema)

module.exports = bookModel;