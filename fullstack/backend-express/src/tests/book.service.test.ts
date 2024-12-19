import { BookService } from "../services/book.service";
import { Book } from "../models/book.model";

describe('BookService', () => {
    let bookService: BookService;

    beforeEach(() => {
        bookService = new BookService();
    });

    test('createBook should add a new book', () => {
        const bookData: Omit<Book, 'id'> = {
            title: 'Test Book',
            author: 'Test Author',
            publishYear: 2023,
            isbn: '1234567890',
            genre: 'Test Genre'
        };

        const createdBook = bookService.createBook(bookData);

        expect(createdBook).toBeDefined();
        expect(createdBook.id).toBeDefined();
        expect(createdBook.title).toBe(bookData.title);
    });

    test('getAllBooks should return all books', () => {
        const bookData1: Omit<Book, 'id'> = {
            title: 'Book 1',
            author: 'Author 1',
            publishYear: 2022,
            isbn: '1111111111',
            genre: 'Genre 1'
        };

        const bookData2: Omit<Book, 'id'> = {
            title: 'Book 2',
            author: 'Author 2',
            publishYear: 2023,
            isbn: '2222222222',
            genre: 'Genre 2'
        };

        bookService.createBook(bookData1);
        bookService.createBook(bookData2);

        const books = bookService.getAllBooks();

        expect(books.length).toBe(2);
    });

    test('getBookById should return the correct book', () => {
        const bookData: Omit<Book, 'id'> = {
            title: 'Specific Book',
            author: 'Specific Author',
            publishYear: 2023,
            isbn: '3333333333',
            genre: 'Specific Genre'
        };

        const createdBook = bookService.createBook(bookData);
        const foundBook = bookService.getBookById(createdBook.id!);

        expect(foundBook).toBeDefined();
        expect(foundBook?.title).toBe(createdBook.title);
    });

    test('updateBook should modify book details', () => {
        const bookData: Omit<Book, 'id'> = {
            title: 'Original Book',
            author: 'Original Author',
            publishYear: 2022,
            isbn: '4444444444',
            genre: 'Original Genre'
        };

        const createdBook = bookService.createBook(bookData);
        const updatedBook = bookService.updateBook(createdBook.id!, { 
            title: 'Updated Book Title' 
        });

        expect(updatedBook).toBeDefined();
        expect(updatedBook?.title).toBe('Updated Book Title');
    });

    test('deleteBook should remove the book', () => {
        const bookData: Omit<Book, 'id'> = {
            title: 'Book to Delete',
            author: 'Delete Author',
            publishYear: 2023,
            isbn: '5555555555',
            genre: 'Delete Genre'
        };

        const createdBook = bookService.createBook(bookData);
        const deleteResult = bookService.deleteBook(createdBook.id!);

        expect(deleteResult).toBe(true);
        expect(bookService.getBookById(createdBook.id!)).toBeUndefined();
    });
});