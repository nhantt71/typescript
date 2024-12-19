import express from 'express';
import { BookController } from '../controllers/book.controller';

export class BookRoutes {
    router = express.Router();
    private bookController: BookController;

    constructor() {
        this.bookController = new BookController();
        this.initRoutes();
    }

    private initRoutes(): void {
        this.router.get('/', this.bookController.getAllBooks);
        this.router.get('/:id', this.bookController.getBookById);
        this.router.post('/', this.bookController.createBook);
        this.router.put('/:id', this.bookController.updateBook);
        this.router.delete('/:id', this.bookController.deleteBook);
    }
}