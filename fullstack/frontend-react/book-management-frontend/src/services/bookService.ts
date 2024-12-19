import axios from 'axios';
import Book from '../types/Book';

const API_URL = 'http://localhost:3001/api/books';

export class BookService {
    static async getAllBooks(): Promise<Book[]> {
        try {
            const response = await axios.get<Book[]>(`${API_URL}/`);
            return response.data;
        } catch (error) {
            console.error('Error fetching books:', error);
            throw error;
        }
    }

    static async getBookById(id: number): Promise<Book> {
        try {
            const response = await axios.get<Book>(`${API_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching book with id ${id}:`, error);
            throw error;
        }
    }

    static async createBook(book: Omit<Book, 'id'>): Promise<Book> {
        try {
            const response = await axios.post<Book>(`${API_URL}/`, book);
            return response.data;
        } catch (error) {
            console.error('Error creating book:', error);
            throw error;
        }
    }

    static async updateBook(id: number, book: Partial<Omit<Book, 'id'>>): Promise<Book> {
        try {
            const response = await axios.put<Book>(`${API_URL}/${id}`, book);
            return response.data;
        } catch (error) {
            console.error(`Error updating book with id ${id}:`, error);
            throw error;
        }
    }

    static async deleteBook(id: number): Promise<void> {
        try {
            await axios.delete(`${API_URL}/${id}`);
        } catch (error) {
            console.error(`Error deleting book with id ${id}:`, error);
            throw error;
        }
    }
}