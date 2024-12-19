"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormHandler = exports.ListManager = exports.LibraryManagementSystem = void 0;
// Generic List Manager Class
var ListManager = /** @class */ (function () {
    function ListManager() {
        this.items = [];
    }
    // Add item to the list
    ListManager.prototype.add = function (item) {
        this.items.push(item);
    };
    // Remove item by ID
    ListManager.prototype.remove = function (id) {
        this.items = this.items.filter(function (item) { return item.id !== id; });
    };
    // Get item by ID - using manual loop instead of .find()
    ListManager.prototype.getById = function (id) {
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].id === id) {
                return this.items[i];
            }
        }
        return undefined;
    };
    // Get all items
    ListManager.prototype.getAll = function () {
        return __spreadArray([], this.items, true);
    };
    // Update item - using manual loop instead of .findIndex()
    ListManager.prototype.update = function (id, updatedItem) {
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].id === id) {
                this.items[i] = __assign(__assign({}, this.items[i]), updatedItem);
                break;
            }
        }
    };
    return ListManager;
}());
exports.ListManager = ListManager;
// Generic Form Handler
var FormHandler = /** @class */ (function () {
    function FormHandler(listManager) {
        this.listManager = listManager;
    }
    // Create new item
    FormHandler.prototype.create = function (formData) {
        var newItem = __assign(__assign({}, formData), { id: Date.now() // Simple ID generation
         });
        this.listManager.add(newItem);
        return newItem;
    };
    // Update existing item
    FormHandler.prototype.update = function (id, formData) {
        this.listManager.update(id, formData);
        return this.listManager.getById(id);
    };
    return FormHandler;
}());
exports.FormHandler = FormHandler;
// Library Management System
var LibraryManagementSystem = /** @class */ (function () {
    function LibraryManagementSystem() {
        this.bookListManager = new ListManager();
        this.memberListManager = new ListManager();
        this.bookFormHandler = new FormHandler(this.bookListManager);
        this.memberFormHandler = new FormHandler(this.memberListManager);
    }
    // Book-related methods
    LibraryManagementSystem.prototype.addBook = function (bookData) {
        return this.bookFormHandler.create(__assign(__assign({}, bookData), { isAvailable: true }));
    };
    // Member-related methods
    LibraryManagementSystem.prototype.registerMember = function (memberData) {
        return this.memberFormHandler.create(__assign(__assign({}, memberData), { borrowedBooks: [] }));
    };
    // Borrow a book
    LibraryManagementSystem.prototype.borrowBook = function (memberId, bookId) {
        var member = this.memberListManager.getById(memberId);
        var book = this.bookListManager.getById(bookId);
        if (member && book && book.isAvailable) {
            // Update book availability
            this.bookListManager.update(bookId, { isAvailable: false });
            // Add book to member's borrowed books
            member.borrowedBooks.push(bookId);
            return true;
        }
        return false;
    };
    // Return a book
    LibraryManagementSystem.prototype.returnBook = function (memberId, bookId) {
        var member = this.memberListManager.getById(memberId);
        var book = this.bookListManager.getById(bookId);
        if (member && book && !book.isAvailable) {
            // Update book availability
            this.bookListManager.update(bookId, { isAvailable: true });
            // Remove book from member's borrowed books
            member.borrowedBooks = member.borrowedBooks.filter(function (id) { return id !== bookId; });
            return true;
        }
        return false;
    };
    // Additional Utility Methods
    LibraryManagementSystem.prototype.getAllBooks = function () {
        return this.bookListManager.getAll();
    };
    LibraryManagementSystem.prototype.getAllMembers = function () {
        return this.memberListManager.getAll();
    };
    LibraryManagementSystem.prototype.getBookById = function (bookId) {
        return this.bookListManager.getById(bookId);
    };
    LibraryManagementSystem.prototype.getMemberById = function (memberId) {
        return this.memberListManager.getById(memberId);
    };
    return LibraryManagementSystem;
}());
exports.LibraryManagementSystem = LibraryManagementSystem;
// Example Usage and Demonstration
function demonstrateLibraryManagement() {
    var library = new LibraryManagementSystem();
    // Add books
    var book1 = library.addBook({
        title: "TypeScript Generics Mastery",
        author: "Jane Doe",
        isbn: "1234567890"
    });
    var book2 = library.addBook({
        title: "Advanced JavaScript",
        author: "John Smith",
        isbn: "0987654321"
    });
    // Register members
    var member1 = library.registerMember({
        name: "Alice Johnson",
        email: "alice@example.com"
    });
    var member2 = library.registerMember({
        name: "Bob Williams",
        email: "bob@example.com"
    });
    // Borrow and return books
    console.log("Borrow Book:", library.borrowBook(member1.id, book1.id));
    console.log("Borrow Book:", library.borrowBook(member2.id, book2.id));
    // Return books
    console.log("Return Book:", library.returnBook(member1.id, book1.id));
    // Get all books and members
    console.log("All Books:", library.getAllBooks());
    console.log("All Members:", library.getAllMembers());
}
// Run the demonstration
demonstrateLibraryManagement();
