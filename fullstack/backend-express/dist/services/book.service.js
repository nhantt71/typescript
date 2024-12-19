"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
class BookService {
    constructor() {
        this.books = [];
        this.nextId = 1;
    }
    getAllBooks() {
        return this.books;
    }
    getBookById(id) {
        return this.books.find(book => book.id === id);
    }
    createBook(bookData) {
        const newBook = {
            id: this.nextId++,
            ...bookData
        };
        this.books.push(newBook);
        return newBook;
    }
    updateBook(id, bookData) {
        const index = this.books.findIndex(book => book.id === id);
        if (index !== -1) {
            this.books[index] = { ...this.books[index], ...bookData };
            return this.books[index];
        }
        return undefined;
    }
    deleteBook(id) {
        const initialLength = this.books.length;
        this.books = this.books.filter(book => book.id !== id);
        return this.books.length < initialLength;
    }
}
exports.BookService = BookService;
