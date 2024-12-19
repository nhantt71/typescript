import { Request, Response } from 'express';
import { BookService } from '../services/book.service';
import { Book } from '../models/book.model';

export class BookController {
    private bookService: BookService;

    constructor() {
        this.bookService = new BookService();
    }

    getAllBooks = (req: Request, res: Response): void => {
        const books = this.bookService.getAllBooks();
        res.json(books);
    }

    getBookById = (req: Request, res: Response): void => {
        const id = parseInt(req.params.id);
        const book = this.bookService.getBookById(id);
        
        if (book) {
            res.json(book);
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    }

    createBook = (req: Request, res: Response): void => {
        const bookData: Omit<Book, 'id'> = req.body;
        
        // Validate input
        if (!bookData.title || !bookData.author || !bookData.publishYear || !bookData.isbn || !bookData.genre) {
            res.status(400).json({ message: 'Missing required fields' });
            return;
        }

        const newBook = this.bookService.createBook(bookData);
        res.status(201).json(newBook);
    }

    updateBook = (req: Request, res: Response): void => {
        const id = parseInt(req.params.id);
        const bookData: Partial<Omit<Book, 'id'>> = req.body;

        const updatedBook = this.bookService.updateBook(id, bookData);
        
        if (updatedBook) {
            res.json(updatedBook);
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    }

    deleteBook = (req: Request, res: Response): void => {
        const id = parseInt(req.params.id);
        
        const deleted = this.bookService.deleteBook(id);
        
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    }
}