import React, { useState } from 'react';
import BookList from './components/BookList';
import BookForm from './components/BookForm';
import Book from './types/Book';

const App: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);

    const handleBookAdded = (newBook: Book) => {
        setBooks(prevBooks => [...prevBooks, newBook]);
        window.location.reload();
    };

    return (
        <div className="app">
            <h1>Book Management System</h1>
            <div className="container">
                <BookForm onBookAdded={handleBookAdded} />
                <BookList />
            </div>
        </div>
    );
};

export default App;