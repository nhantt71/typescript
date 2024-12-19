import React, { useState } from 'react';
import Book from '../types/Book';
import { BookService } from '../services/bookService';

interface BookFormProps {
    onBookAdded?: (book: Book) => void;
}

const BookForm: React.FC<BookFormProps> = ({ onBookAdded }) => {
    const [formData, setFormData] = useState<Omit<Book, 'id'>>({
        title: '',
        author: '',
        publishYear: new Date().getFullYear(),
        isbn: '',
        genre: ''
    });

    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'publishYear' ? parseInt(value) : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const newBook = await BookService.createBook(formData);
            onBookAdded?.(newBook);
            
            // Reset form
            setFormData({
                title: '',
                author: '',
                publishYear: new Date().getFullYear(),
                isbn: '',
                genre: ''
            });
            setError(null);
        } catch (err) {
            setError('Failed to create book');
        }
    };

    return (
        <div className="book-form">
            <h2>Add New Book</h2>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Book Title"
                    required
                />
                <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    placeholder="Author"
                    required
                />
                <input
                    type="number"
                    name="publishYear"
                    value={formData.publishYear}
                    onChange={handleChange}
                    placeholder="Publish Year"
                    required
                />
                <input
                    type="text"
                    name="isbn"
                    value={formData.isbn}
                    onChange={handleChange}
                    placeholder="ISBN"
                    required
                />
                <input
                    type="text"
                    name="genre"
                    value={formData.genre}
                    onChange={handleChange}
                    placeholder="Genre"
                    required
                />
                <button type="submit">Add Book</button>
            </form>
        </div>
    );
};

export default BookForm;