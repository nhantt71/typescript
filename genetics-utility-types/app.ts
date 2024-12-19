// Declare global interface to ensure find method is recognized
declare global {
    interface Array<T> {
        find(predicate: (value: T, index: number, array: T[]) => boolean): T | undefined;
    }
}

// Interfaces for Book and Member
interface Book {
    id: number;
    title: string;
    author: string;
    isbn: string;
    isAvailable: boolean;
}

interface Member {
    id: number;
    name: string;
    email: string;
    borrowedBooks: number[];
}

// Generic List Manager Class
class ListManager<T extends { id: number }> {
    private items: T[] = [];

    // Add item to the list
    add(item: T): void {
        this.items.push(item);
    }

    // Remove item by ID
    remove(id: number): void {
        this.items = this.items.filter((item: T) => item.id !== id);
    }

    // Get item by ID - using manual loop instead of .find()
    getById(id: number): T | undefined {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].id === id) {
                return this.items[i];
            }
        }
        return undefined;
    }

    // Get all items
    getAll(): T[] {
        return [...this.items];
    }

    // Update item - using manual loop instead of .findIndex()
    update(id: number, updatedItem: Partial<T>): void {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].id === id) {
                this.items[i] = { ...this.items[i], ...updatedItem };
                break;
            }
        }
    }
}

// Generic Form Handler
class FormHandler<T extends { id: number }> {
    constructor(private listManager: ListManager<T>) {}

    // Create new item
    create(formData: Omit<T, 'id'>): T {
        const newItem = {
            ...formData,
            id: Date.now() // Simple ID generation
        } as T;
        this.listManager.add(newItem);
        return newItem;
    }

    // Update existing item
    update(id: number, formData: Partial<T>): T | undefined {
        this.listManager.update(id, formData);
        return this.listManager.getById(id);
    }
}

// Utility Type Usage Example
type BookFormData = Omit<Book, 'id' | 'isAvailable'>;
type MemberFormData = Omit<Member, 'id' | 'borrowedBooks'>;

// Library Management System
class LibraryManagementSystem {
    private bookListManager = new ListManager<Book>();
    private memberListManager = new ListManager<Member>();

    private bookFormHandler = new FormHandler<Book>(this.bookListManager);
    private memberFormHandler = new FormHandler<Member>(this.memberListManager);

    // Book-related methods
    addBook(bookData: BookFormData): Book {
        return this.bookFormHandler.create({
            ...bookData,
            isAvailable: true
        });
    }

    // Member-related methods
    registerMember(memberData: MemberFormData): Member {
        return this.memberFormHandler.create({
            ...memberData,
            borrowedBooks: []
        });
    }

    // Borrow a book
    borrowBook(memberId: number, bookId: number): boolean {
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
    returnBook(memberId: number, bookId: number): boolean {
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

    // Additional Utility Methods
    getAllBooks(): Book[] {
        return this.bookListManager.getAll();
    }

    getAllMembers(): Member[] {
        return this.memberListManager.getAll();
    }

    getBookById(bookId: number): Book | undefined {
        return this.bookListManager.getById(bookId);
    }

    getMemberById(memberId: number): Member | undefined {
        return this.memberListManager.getById(memberId);
    }
}

// Example Usage and Demonstration
function demonstrateLibraryManagement() {
    const library = new LibraryManagementSystem();

    // Add books
    const book1 = library.addBook({
        title: "TypeScript Generics Mastery",
        author: "Jane Doe",
        isbn: "1234567890"
    });

    const book2 = library.addBook({
        title: "Advanced JavaScript",
        author: "John Smith",
        isbn: "0987654321"
    });

    // Register members
    const member1 = library.registerMember({
        name: "Alice Johnson",
        email: "alice@example.com"
    });

    const member2 = library.registerMember({
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

// Export for potential module usage
export { 
    LibraryManagementSystem, 
    ListManager, 
    FormHandler,
    Book,
    Member
};