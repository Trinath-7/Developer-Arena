package library;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Core Library Management Logic.
 */
public class Library {
    private List<Book> books;
    private List<Member> members;
    private static final double FINE_PER_DAY = 2.0;

    /**
     * Initializes the Library by loading existing books and members from data files.
     */
    public Library() {
        this.books = FileHandler.loadBooks();
        this.members = FileHandler.loadMembers();
    }

    /**
     * Adds a new book to the library.
     *
     * @param isbn   The ISBN of the new book
     * @param title  The title of the new book
     * @param author The author of the new book
     */
    public void addBook(String isbn, String title, String author) {
        for (Book b : books) {
            if (b.getIsbn().equals(isbn)) {
                System.out.println("Error: Book with this ISBN already exists.");
                return;
            }
        }
        books.add(new Book(isbn, title, author));
        saveData();
        System.out.println("Success: Book added successfully.");
    }

    /**
     * Removes a book from the library based on its ISBN.
     * Cannot remove a book if it is currently borrowed.
     *
     * @param isbn The ISBN of the book to remove
     */
    public void removeBook(String isbn) {
        Optional<Book> optionalBook = findBook(isbn);
        if (optionalBook.isPresent()) {
            Book bookToRemove = optionalBook.get();
            if (!bookToRemove.isAvailable()) {
                System.out.println("Error: Cannot remove book. It is currently borrowed.");
                return;
            }
            books.remove(bookToRemove);
            saveData();
            System.out.println("Success: Book removed successfully.");
        } else {
            System.out.println("Error: Book not found.");
        }
    }

    /**
     * Registers a new member in the library system.
     *
     * @param memberId The unique ID for the new member
     * @param name     The name of the new member
     */
    public void registerMember(String memberId, String name) {
        for (Member m : members) {
            if (m.getMemberId().equals(memberId)) {
                System.out.println("Error: Member ID already exists.");
                return;
            }
        }
        members.add(new Member(memberId, name));
        saveData();
        System.out.println("Success: Member registered successfully.");
    }

    /**
     * Searches for books by title or author and prints the results.
     *
     * @param query The search string to match against titles and authors
     */
    public void searchBooks(String query) {
        System.out.println("\n--- Search Results ---");
        List<Book> foundBooks = books.stream()
                .filter(b -> b.getTitle().toLowerCase().contains(query.toLowerCase()) || 
                             b.getAuthor().toLowerCase().contains(query.toLowerCase()))
                .collect(Collectors.toList());
        
        foundBooks.forEach(System.out::println);
        if (foundBooks.isEmpty()) System.out.println("No books found matching the query.");
    }

    /**
     * Processes a book borrowing request.
     * Checks availability and reservations before allowing the borrow.
     *
     * @param isbn     The ISBN of the book to borrow
     * @param memberId The ID of the member borrowing the book
     */
    public void borrowBook(String isbn, String memberId) {
        Optional<Book> optionalBook = findBook(isbn);
        Optional<Member> optionalMember = findMember(memberId);

        if (!optionalBook.isPresent()) {
            System.out.println("Error: Book not found.");
            return;
        }
        if (!optionalMember.isPresent()) {
            System.out.println("Error: Member not found.");
            return;
        }
        
        Book book = optionalBook.get();
        Member member = optionalMember.get();
        if (!book.isAvailable()) {
            System.out.println("Error: Book is currently unavailable.");
            return;
        }
        if (!book.getReservedBy().equals("none") && !book.getReservedBy().equals(memberId)) {
            System.out.println("Error: Book is reserved by another member.");
            return;
        }

        book.setAvailable(false);
        book.setBorrowedBy(memberId);
        book.setDueDate(LocalDate.now().plusWeeks(2));
        if (book.getReservedBy().equals(memberId)) {
            book.setReservedBy("none"); // clear reservation if reserved by the same member
        }
        member.borrowBook(isbn);
        saveData();
        System.out.println("Success: Book borrowed successfully. Due date is: " + book.getDueDate());
    }

    /**
     * Processes a book return request.
     * Calculates any overdue fines upon return.
     *
     * @param isbn     The ISBN of the returned book
     * @param memberId The ID of the member returning the book
     */
    public void returnBook(String isbn, String memberId) {
        Optional<Book> optionalBook = findBook(isbn);
        Optional<Member> optionalMember = findMember(memberId);

        if (!optionalBook.isPresent() || !optionalMember.isPresent() || !optionalMember.get().getBorrowedBooks().contains(isbn)) {
            System.out.println("Error: Invalid return request. Please check ISBN and Member ID.");
            return;
        }

        Book book = optionalBook.get();
        Member member = optionalMember.get();

        LocalDate today = LocalDate.now();
        if (book.getDueDate() != null && today.isAfter(book.getDueDate())) {
            long daysOverdue = ChronoUnit.DAYS.between(book.getDueDate(), today);
            double fine = daysOverdue * FINE_PER_DAY;
            System.out.println("Notice: Book is overdue by " + daysOverdue + " days. Fine: $" + String.format("%.2f", fine));
        }

        book.setAvailable(true);
        book.setBorrowedBy("none");
        book.setDueDate(null);
        member.returnBook(isbn);
        saveData();
        System.out.println("Success: Book returned successfully.");
    }

    /**
     * Reserves a currently borrowed book for a specific member.
     *
     * @param isbn     The ISBN of the book to reserve
     * @param memberId The ID of the member reserving the book
     */
    public void reserveBook(String isbn, String memberId) {
        Optional<Book> optionalBook = findBook(isbn);
        Optional<Member> optionalMember = findMember(memberId);

        if (!optionalBook.isPresent() || !optionalMember.isPresent()) {
            System.out.println("Error: Invalid Book ISBN or Member ID.");
            return;
        }
        
        Book book = optionalBook.get();
        if (book.isAvailable()) {
            System.out.println("Notice: Book is available. You can borrow it directly.");
            return;
        }
        if (!book.getReservedBy().equals("none")) {
            System.out.println("Error: Book is already reserved by someone else.");
            return;
        }

        book.setReservedBy(memberId);
        saveData();
        System.out.println("Success: Book reserved successfully. You will have priority when it's returned.");
    }

    /**
     * Displays all books currently registered in the library system.
     */
    public void displayAllBooks() {
        System.out.println("\n--- Library Books ---");
        if (books.isEmpty()) {
            System.out.println("No books in the library.");
            return;
        }
        books.forEach(System.out::println);
    }

    /**
     * Displays only the books that are currently available for borrowing.
     */
    public void displayAvailableBooks() {
        System.out.println("\n--- Available Books ---");
        List<Book> availableBooks = books.stream()
                .filter(Book::isAvailable)
                .collect(Collectors.toList());
                
        availableBooks.forEach(System.out::println);
        if (availableBooks.isEmpty()) {
            System.out.println("No available books at the moment.");
        }
    }

    /**
     * Calculates and displays general library statistics, such as total books, 
     * available books, borrowed books, overdue books, and total members.
     */
    public void displayStatistics() {
        int totalBooks = books.size();
        LocalDate today = LocalDate.now();
        long borrowedBooks = books.stream().filter(b -> !b.isAvailable()).count();
        long overdueBooks = books.stream()
                .filter(b -> !b.isAvailable() && b.getDueDate() != null && today.isAfter(b.getDueDate()))
                .count();

        System.out.println("\n--- Library Statistics ---");
        System.out.println("Total Books: " + totalBooks);
        System.out.println("Available Books: " + (totalBooks - borrowedBooks));
        System.out.println("Borrowed Books: " + borrowedBooks);
        System.out.println("Overdue Books: " + overdueBooks);
        System.out.println("Total Members: " + members.size());
    }

    /**
     * Exports the current library inventory to a CSV file.
     */
    public void exportToCSV() {
        File dir = new File("data");
        if (!dir.exists()) dir.mkdirs();
        
        try (FileWriter fw = new FileWriter("data/library_export.csv")) {
            fw.write("ISBN,Title,Author,Status,BorrowedBy,DueDate,ReservedBy\n");
            for (Book b : books) {
                String status = b.isAvailable() ? "Available" : "Borrowed";
                fw.write(String.format("%s,%s,%s,%s,%s,%s,%s\n", 
                        b.getIsbn(), b.getTitle(), b.getAuthor(), status, 
                        b.getBorrowedBy(), b.getDueDate(), b.getReservedBy()));
            }
            System.out.println("Success: Data exported to data/library_export.csv successfully.");
        } catch (IOException e) {
            System.out.println("Error exporting data: " + e.getMessage());
        }
    }

    /**
     * Helper method to find a book by its ISBN.
     *
     * @param isbn The ISBN to search for
     * @return An Optional containing the Book if found, empty otherwise
     */
    private Optional<Book> findBook(String isbn) {
        return books.stream()
                .filter(b -> b.getIsbn().equals(isbn))
                .findFirst();
    }

    /**
     * Helper method to find a member by their ID.
     *
     * @param memberId The member ID to search for
     * @return An Optional containing the Member if found, empty otherwise
     */
    private Optional<Member> findMember(String memberId) {
        return members.stream()
                .filter(m -> m.getMemberId().equals(memberId))
                .findFirst();
    }

    /**
     * Helper method to save all current data (books and members) to persistent storage.
     */
    private void saveData() {
        FileHandler.saveBooks(books);
        FileHandler.saveMembers(members);
    }
}
