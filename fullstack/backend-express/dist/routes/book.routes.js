"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("../controllers/book.controller");
class BookRoutes {
    constructor() {
        this.router = express_1.default.Router();
        this.bookController = new book_controller_1.BookController();
        this.initRoutes();
    }
    initRoutes() {
        this.router.get('/', this.bookController.getAllBooks);
        this.router.get('/:id', this.bookController.getBookById);
        this.router.post('/', this.bookController.createBook);
        this.router.put('/:id', this.bookController.updateBook);
        this.router.delete('/:id', this.bookController.deleteBook);
    }
}
exports.BookRoutes = BookRoutes;
