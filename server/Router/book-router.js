const express = require('express');
const router = express.Router();
const booksCtlr = require('../controller/book-controller');



router.get('/', booksCtlr.getAllBooks)
router.post('/', booksCtlr.addBooks)
router.put('/:id', booksCtlr.updateBooks)
router.get('/:id', booksCtlr.getById)
router.delete('/:id', booksCtlr.deleteBook)
router.get('/search/:key', booksCtlr.searchBook)


module.exports = router