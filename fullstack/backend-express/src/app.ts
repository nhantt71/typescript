import express from 'express';
import bodyParser from 'body-parser';
import { BookRoutes } from './routes/book.routes';
import cors from 'cors';

export class App {
    public app: express.Application;
    private bookRoutes: BookRoutes = new BookRoutes();

    constructor() {
        this.app = express();
        this.configureMiddleware();
        this.configureRoutes();
    }

    private configureMiddleware(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(cors({
            origin: 'http://localhost:3000', // Allow requests from your React app
            methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
            credentials: true // Allow cookies if needed
        }));
    }

    private configureRoutes(): void {
        this.bookRoutes = new BookRoutes();
        this.app.use('/api/books', this.bookRoutes.router);
    }

    public start(port: number): void {
        this.app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    }
}