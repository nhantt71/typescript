"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const book_routes_1 = require("./routes/book.routes");
class App {
    constructor() {
        this.bookRoutes = new book_routes_1.BookRoutes();
        this.app = (0, express_1.default)();
        this.configureMiddleware();
        this.configureRoutes();
    }
    configureMiddleware() {
        this.app.use(body_parser_1.default.json());
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
    }
    configureRoutes() {
        this.bookRoutes = new book_routes_1.BookRoutes();
        this.app.use('/api/books', this.bookRoutes.router);
    }
    start(port) {
        this.app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    }
}
exports.App = App;
