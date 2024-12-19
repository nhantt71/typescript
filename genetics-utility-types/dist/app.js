"use strict";
// Generic List Manager Class
class ListManager {
    constructor() {
        this.items = [];
    }
    // Add item to the list
    add(item) {
        this.items.push(item);
    }
    // Remove item by ID
    remove(id) {
        this.items = this.items.filter(item => item.id !== id);
    }
    // Get item by ID
    getById(id) {
        return this.items.find(item => item.id === id);
    }
    // Get all items
    getAll() {
        return [...this.items];
    }
    // Update item
    update(id, updatedItem) {
        const index = this.items.map(item => item.id).indexOf(id);
        if (index !== -1) {
            this.items[index] = Object.assign(Object.assign({}, this.items[index]), updatedItem);
        }
    }
}
// Generic Form Handler
class FormHandler {
    constructor(listManager) {
        this.listManager = listManager;
    }
    // Create new item
    create(formData) {
        const newItem = Object.assign(Object.assign({}, formData), { id: Date.now() // Simple ID generation
         });
        this.listManager.add(newItem);
        return newItem;
    }
    // Update existing item
    update(id, formData) {
        this.listManager.update(id, formData);
        return this.listManager.getById(id);
    }
}
// Library Management System
class LibraryManagementSystem {
    constructor() {
        this.bookListManager = new ListManager();
        this.memberListManager = new ListManager();
        this.bookFormHandler = new FormHandler(this.bookListManager);
        this.memberFormHandler = new FormHandler(this.memberListManager);
    }
    // Book-related methods
    addBook(bookData) {
        return this.bookFormHandler.create(Object.assign(Object.assign({}, bookData), { isAvailable: true }));
    }
    // Member-related methods
    registerMember(memberData) {
        return this.memberFormHandler.create(Object.assign(Object.assign({}, memberData), { borrowedBooks: [] }));
    }
    // Borrow a book
    borrowBook(memberId, bookId) {
        const member = this.memberListManager.getById(memberId);
        const book = this.bookListManager.getById(bookId);
        if (member && book && book.isAvailable) {
            // Update book availability
            this.bookListManager.update(bookId, { isAvailable: false });
            // Add book to member's borrowed books
            member.borrowedBooks.push(bookId);
            return true;
        }
        return false;
    }
    // Return a book
    returnBook(memberId, bookId) {
        const member = this.memberListManager.getById(memberId);
        const book = this.bookListManager.getById(bookId);
        if (member && book && !book.isAvailable) {
            // Update book availability
            this.bookListManager.update(bookId, { isAvailable: true });
            // Remove book from member's borrowed books
            member.borrowedBooks = member.borrowedBooks.filter(id => id !== bookId);
            return true;
        }
        return false;
    }
}
// Example Usage
const library = new LibraryManagementSystem();
// Add a book
const newBook = library.addBook({
    title: "TypeScript Generics Mastery",
    author: "Jane Doe",
    isbn: "1234567890"
});
// Register a member
const newMember = library.registerMember({
    name: "John Smith",
    email: "john.smith@example.com"
});
// Borrow and return a book
library.borrowBook(newMember.id, newBook.id);
library.returnBook(newMember.id, newBook.id);
