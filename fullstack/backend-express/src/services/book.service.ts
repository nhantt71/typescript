import { Book } from "../models/book.model";

export class BookService {
    private books: Book[] = [];
    private nextId = 1;

    getAllBooks(): Book[] {
        return this.books;
    }

    getBookById(id: number): Book | undefined {
        return this.books.find(book => book.id === id);
    }

    createBook(bookData: Omit<Book, 'id'>): Book {
        const newBook: Book = {
            id: this.nextId++,
            ...bookData
        };
        this.books.push(newBook);
        return newBook;
    }

    updateBook(id: number, bookData: Partial<Omit<Book, 'id'>>): Book | undefined {
        const index = this.books.findIndex(book => book.id === id);
        if (index !== -1) {
            this.books[index] = { ...this.books[index], ...bookData };
            return this.books[index];
        }
        return undefined;
    }

    deleteBook(id: number): boolean {
        const initialLength = this.books.length;
        this.books = this.books.filter(book => book.id !== id);
        return this.books.length < initialLength;
    }
}