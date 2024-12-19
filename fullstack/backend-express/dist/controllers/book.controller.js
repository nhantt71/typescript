"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookController = void 0;
const book_service_1 = require("../services/book.service");
class BookController {
    constructor() {
        this.getAllBooks = (req, res) => {
            const books = this.bookService.getAllBooks();
            res.json(books);
        };
        this.getBookById = (req, res) => {
            const id = parseInt(req.params.id);
            const book = this.bookService.getBookById(id);
            if (book) {
                res.json(book);
            }
            else {
                res.status(404).json({ message: 'Book not found' });
            }
        };
        this.createBook = (req, res) => {
            const bookData = req.body;
            // Validate input
            if (!bookData.title || !bookData.author || !bookData.publishYear || !bookData.isbn || !bookData.genre) {
                res.status(400).json({ message: 'Missing required fields' });
                return;
            }
            const newBook = this.bookService.createBook(bookData);
            res.status(201).json(newBook);
        };
        this.updateBook = (req, res) => {
            const id = parseInt(req.params.id);
            const bookData = req.body;
            const updatedBook = this.bookService.updateBook(id, bookData);
            if (updatedBook) {
                res.json(updatedBook);
            }
            else {
                res.status(404).json({ message: 'Book not found' });
            }
        };
        this.deleteBook = (req, res) => {
            const id = parseInt(req.params.id);
            const deleted = this.bookService.deleteBook(id);
            if (deleted) {
                res.status(204).send();
            }
            else {
                res.status(404).json({ message: 'Book not found' });
            }
        };
        this.bookService = new book_service_1.BookService();
    }
}
exports.BookController = BookController;
