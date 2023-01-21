const Book = require("../model/book")


const getAllBooks = async (req, res, next) => {
    let books;
    try {

        let page = req.query.page ? parseInt(req.query.page): 1;
        let size = req.query.size ? parseInt(req.query.size): 5;

        let skip = (page - 1) * size

        let total = await Book.countDocuments();

        books = await Book.find().skip(skip).limit(size)
        res.status(200).send({
            books,
            total,
            page,
            size
        })
    } catch (error) {
        res.status(404).send({ message: "No Books found" })
    }

}

const addBooks = async (req, res, next) => {
    let books;
    try {
        books = new Book(req.body);
        books = await books.save()
        res.status(200).send(books)
    } catch (error) {
        res.status(404).send({ message: "No Books saved...!!!" })
    }
}

const getById = async (req, res, next) => {
    try {
        let result = await Book.findById(req.params.id);

        res.status(200).send(result);
    } catch (error) {
        res.status(400).send({ message: "No Books Found!!!" })
    }
}

const updateBooks = async (req, res, next) => {
    let { id } = req.params
    try {
        let result = await Book.findByIdAndUpdate(id, req.body)
        result = await result.save()
        res.status(200).send(result)
    } catch (error) {
        res.status(400).send({ message: "No Books update...!!!" })
    }
}

const deleteBook = async (req, res, next) => {
    try {
        let result = await Book.findByIdAndDelete(req.params.id);

        res.status(200).send(result)

    } catch (error) {
        res.status(400).send({ message: "No record found...!!!" })
    }
}

const searchBook = async (req, res, next) => {
    try {
        let result = await Book.find({
            "$or": [
                { title: { $regex: req.params.key, $options: "i" } },
                { author: { $regex: req.params.key, $options: "i" } },
            ]
        });
        console.log(result);
        res.status(200).send(result)
    } catch (error) {
        res.status(400).send("Record not found")
    }
}


exports.getAllBooks = getAllBooks
exports.addBooks = addBooks
exports.getById = getById
exports.updateBooks = updateBooks
exports.deleteBook = deleteBook
exports.searchBook = searchBook