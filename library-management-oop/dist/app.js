"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookCategory = exports.Member = exports.Book = exports.Library = void 0;
// Enum for book categories
var BookCategory;
(function (BookCategory) {
    BookCategory["Fiction"] = "Fiction";
    BookCategory["NonFiction"] = "Non-Fiction";
    BookCategory["Reference"] = "Reference";
    BookCategory["SciFi"] = "Science Fiction";
})(BookCategory || (exports.BookCategory = BookCategory = {}));
// Book class implementation
class Book {
    constructor(id, title, author, isbn, category) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.isAvailable = true; // Initially, all books are available
        this.category = category;
    }
    // Mark book as borrowed
    borrow() {
        console.log(`Borrow called on book: ${this.title}, Available: ${this.isAvailable}`);
        if (this.isAvailable) {
            this.isAvailable = false;
            return true;
        }
        return false;
    }
    // Mark book as returned
    return() {
        console.log(`Return called on book: ${this.title}`);
        this.isAvailable = true;
    }
}
exports.Book = Book;
// Member class implementation
class Member {
    constructor(id, name, contactInfo, maxBorrowLimit = 3) {
        this.id = id;
        this.name = name;
        this.contactInfo = contactInfo;
        this.borrowedBooks = [];
        this.maxBorrowLimit = maxBorrowLimit;
    }
    // Borrow a book
    borrowBook(book) {
        console.log(`${this.name} is attempting to borrow book: ${book.title}`);
        if (this.borrowedBooks.length >= this.maxBorrowLimit) {
            console.log("Borrow limit reached");
            return false;
        }
        if (book.isAvailable) {
            const success = book.borrow();
            if (success) {
                this.borrowedBooks.push(book);
                console.log(`${book.title} successfully borrowed by ${this.name}`);
                return true;
            }
        }
        else {
            console.log(`${book.title} is not available for borrowing.`);
        }
        return false;
    }
    // Return a book
    returnBook(book) {
        console.log(`${this.name} is attempting to return book: ${book.title}`);
        let bookIndex = -1;
        for (let i = 0; i < this.borrowedBooks.length; i++) {
            if (this.borrowedBooks[i].id === book.id) {
                bookIndex = i;
                break;
            }
        }
        if (bookIndex !== -1) {
            book.return();
            this.borrowedBooks.splice(bookIndex, 1);
            console.log(`${book.title} successfully returned by ${this.name}`);
            return true;
        }
        console.log(`${book.title} is not in ${this.name}'s borrowed books.`);
        return false;
    }
}
exports.Member = Member;
// Library class to manage books and members
class Library {
    constructor() {
        this.books = [];
        this.members = [];
    }
    // Add a new book to the library
    addBook(book) {
        this.books.push(book);
        console.log(`Book added to library: ${book.title}`);
    }
    // Remove a book from the library
    removeBook(bookId) {
        const index = this.books.map(book => book.id).indexOf(bookId);
        if (index !== -1) {
            const removedBook = this.books.splice(index, 1);
            console.log(`Book removed from library: ${removedBook[0].title}`);
            return true;
        }
        console.log(`Book with ID: ${bookId} not found in the library.`);
        return false;
    }
    // Add a new member
    addMember(member) {
        this.members.push(member);
        console.log(`Member added: ${member.name}`);
    }
    // Remove a member
    removeMember(memberId) {
        const index = this.members.findIndex(member => member.id === memberId);
        if (index !== -1) {
            const removedMember = this.members.splice(index, 1);
            console.log(`Member removed: ${removedMember[0].name}`);
            return true;
        }
        console.log(`Member with ID: ${memberId} not found.`);
        return false;
    }
    // Find a book by ID
    findBookById(bookId) {
        return this.books.filter(book => book.id === bookId)[0];
    }
    // Find a member by ID
    findMemberById(memberId) {
        for (const member of this.members) {
            if (member.id === memberId) {
                return member;
            }
        }
        return undefined;
    }
    // Get all available books
    getAvailableBooks() {
        return this.books.filter(book => book.isAvailable);
    }
}
exports.Library = Library;
// Example usage
function main() {
    const library = new Library();
    // Create books
    const book1 = new Book("B001", "1984", "George Orwell", "9780451524935", BookCategory.Fiction);
    const book2 = new Book("B002", "Dune", "Frank Herbert", "9780441172719", BookCategory.SciFi);
    // Add books to library
    library.addBook(book1);
    library.addBook(book2);
    // Create members
    const member1 = new Member("M001", "John Doe", "john.doe@email.com");
    const member2 = new Member("M002", "Jane Smith", "jane.smith@email.com");
    // Add members to library
    library.addMember(member1);
    library.addMember(member2);
    // Borrow books
    const bookFromLibrary1 = library.findBookById("B001");
    const bookFromLibrary2 = library.findBookById("B002");
    if (bookFromLibrary1) {
        member1.borrowBook(bookFromLibrary1);
    }
    if (bookFromLibrary2) {
        member2.borrowBook(bookFromLibrary2);
    }
    // Return books
    if (bookFromLibrary1) {
        member1.returnBook(bookFromLibrary1);
    }
    // Check available books
    const availableBooks = library.getAvailableBooks();
    console.log("Available books in the library:");
    availableBooks.forEach(book => console.log(`${book.title} by ${book.author}`));
}
main();
