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
var Book = /** @class */ (function () {
    function Book(id, title, author, isbn, category) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.isAvailable = true; // Initially, all books are available
        this.category = category;
    }
    // Mark book as borrowed
    Book.prototype.borrow = function () {
        console.log("Borrow called on book: ".concat(this.title, ", Available: ").concat(this.isAvailable));
        if (this.isAvailable) {
            this.isAvailable = false;
            return true;
        }
        return false;
    };
    // Mark book as returned
    Book.prototype.return = function () {
        console.log("Return called on book: ".concat(this.title));
        this.isAvailable = true;
    };
    return Book;
}());
exports.Book = Book;
// Member class implementation
var Member = /** @class */ (function () {
    function Member(id, name, contactInfo, maxBorrowLimit) {
        if (maxBorrowLimit === void 0) { maxBorrowLimit = 3; }
        this.id = id;
        this.name = name;
        this.contactInfo = contactInfo;
        this.borrowedBooks = [];
        this.maxBorrowLimit = maxBorrowLimit;
    }
    // Borrow a book
    Member.prototype.borrowBook = function (book) {
        console.log("".concat(this.name, " is attempting to borrow book: ").concat(book.title));
        if (this.borrowedBooks.length >= this.maxBorrowLimit) {
            console.log("Borrow limit reached");
            return false;
        }
        if (book.isAvailable) {
            var success = book.borrow();
            if (success) {
                this.borrowedBooks.push(book);
                console.log("".concat(book.title, " successfully borrowed by ").concat(this.name));
                return true;
            }
        }
        else {
            console.log("".concat(book.title, " is not available for borrowing."));
        }
        return false;
    };
    // Return a book
    Member.prototype.returnBook = function (book) {
        console.log("".concat(this.name, " is attempting to return book: ").concat(book.title));
        var bookIndex = -1;
        for (var i = 0; i < this.borrowedBooks.length; i++) {
            if (this.borrowedBooks[i].id === book.id) {
                bookIndex = i;
                break;
            }
        }
        if (bookIndex !== -1) {
            book.return();
            this.borrowedBooks.splice(bookIndex, 1);
            console.log("".concat(book.title, " successfully returned by ").concat(this.name));
            return true;
        }
        console.log("".concat(book.title, " is not in ").concat(this.name, "'s borrowed books."));
        return false;
    };
    return Member;
}());
exports.Member = Member;
// Library class to manage books and members
var Library = /** @class */ (function () {
    function Library() {
        this.books = [];
        this.members = [];
    }
    // Add a new book to the library
    Library.prototype.addBook = function (book) {
        this.books.push(book);
        console.log("Book added to library: ".concat(book.title));
    };
    // Remove a book from the library
    Library.prototype.removeBook = function (bookId) {
        var index = this.books.map(function (book) { return book.id; }).indexOf(bookId);
        if (index !== -1) {
            var removedBook = this.books.splice(index, 1);
            console.log("Book removed from library: ".concat(removedBook[0].title));
            return true;
        }
        console.log("Book with ID: ".concat(bookId, " not found in the library."));
        return false;
    };
    // Add a new member
    Library.prototype.addMember = function (member) {
        this.members.push(member);
        console.log("Member added: ".concat(member.name));
    };
    // Remove a member
    Library.prototype.removeMember = function (memberId) {
        var index = -1;
        for (var i = 0; i < this.members.length; i++) {
            if (this.members[i].id === memberId) {
                index = i;
                break;
            }
        }
        if (index !== -1) {
            var removedMember = this.members.splice(index, 1);
            console.log("Member removed: ".concat(removedMember[0].name));
            return true;
        }
        console.log("Member with ID: ".concat(memberId, " not found."));
        return false;
    };
    // Find a book by ID
    Library.prototype.findBookById = function (bookId) {
        return this.books.filter(function (book) { return book.id === bookId; })[0];
    };
    // Find a member by ID
    Library.prototype.findMemberById = function (memberId) {
        for (var _i = 0, _a = this.members; _i < _a.length; _i++) {
            var member = _a[_i];
            if (member.id === memberId) {
                return member;
            }
            var index = -1;
            for (var i = 0; i < this.members.length; i++) {
                if (this.members[i].id === memberId) {
                    index = i;
                    break;
                }
            }
        }
        return undefined;
    };
    // Get all available books
    Library.prototype.getAvailableBooks = function () {
        return this.books.filter(function (book) { return book.isAvailable; });
    };
    return Library;
}());
exports.Library = Library;
// Example usage
function main() {
    var library = new Library();
    // Create books
    var book1 = new Book("B001", "1984", "George Orwell", "9780451524935", BookCategory.Fiction);
    var book2 = new Book("B002", "Dune", "Frank Herbert", "9780441172719", BookCategory.SciFi);
    // Add books to library
    library.addBook(book1);
    library.addBook(book2);
    // Create members
    var member1 = new Member("M001", "John Doe", "john.doe@email.com");
    var member2 = new Member("M002", "Jane Smith", "jane.smith@email.com");
    // Add members to library
    library.addMember(member1);
    library.addMember(member2);
    // Borrow books
    var bookFromLibrary1 = library.findBookById("B001");
    var bookFromLibrary2 = library.findBookById("B002");
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
    var availableBooks = library.getAvailableBooks();
    console.log("Available books in the library:");
    availableBooks.forEach(function (book) { return console.log("".concat(book.title, " by ").concat(book.author)); });
}
main();
