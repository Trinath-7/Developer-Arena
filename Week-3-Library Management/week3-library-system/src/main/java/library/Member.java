package library;

import java.util.ArrayList;
import java.util.List;

/**
 * Represents a Library Member.
 */
public class Member {
    private String memberId;
    private String name;
    private List<String> borrowedBooks; // List of ISBNs

    /**
     * Constructs a new Member with a given ID and name.
     * Initializes an empty list of borrowed books.
     *
     * @param memberId The unique identifier for the member
     * @param name     The name of the member
     */
    public Member(String memberId, String name) {
        this.memberId = memberId;
        this.name = name;
        this.borrowedBooks = new ArrayList<>();
    }

    /**
     * Constructs a Member with all properties, including their current borrowed books.
     * Used primarily when loading members from persistent storage.
     *
     * @param memberId      The unique identifier for the member
     * @param name          The name of the member
     * @param borrowedBooks The list of ISBNs of the books currently borrowed by the member
     */
    public Member(String memberId, String name, List<String> borrowedBooks) {
        this.memberId = memberId;
        this.name = name;
        this.borrowedBooks = borrowedBooks;
    }

    public String getMemberId() { return memberId; }
    public String getName() { return name; }
    public List<String> getBorrowedBooks() { return borrowedBooks; }

    /**
     * Adds a book's ISBN to the member's list of borrowed books.
     *
     * @param isbn The ISBN of the book to be borrowed
     */
    public void borrowBook(String isbn) {
        if (!borrowedBooks.contains(isbn)) {
            borrowedBooks.add(isbn);
        }
    }

    /**
     * Removes a book's ISBN from the member's list of borrowed books upon return.
     *
     * @param isbn The ISBN of the book being returned
     */
    public void returnBook(String isbn) {
        borrowedBooks.remove(isbn);
    }

    @Override
    public String toString() {
        return String.format("ID: %-10s | Name: %-20s | Borrowed Books: %d", memberId, name, borrowedBooks.size());
    }
}
