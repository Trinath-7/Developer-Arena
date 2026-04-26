package library;

import java.time.LocalDate;

/**
 * Represents a Book in the library.
 * Encapsulates the properties and provides getters and setters.
 */
public class Book {
    private String isbn;
    private String title;
    private String author;
    private boolean isAvailable;
    private String borrowedBy; // "none" if not borrowed
    private LocalDate dueDate; // null if not borrowed
    private String reservedBy; // "none" if not reserved

    /**
     * Constructs a new Book with the given ISBN, title, and author.
     * Newly created books are available by default and have no borrower or reservation.
     *
     * @param isbn   The International Standard Book Number
     * @param title  The title of the book
     * @param author The author of the book
     */
    public Book(String isbn, String title, String author) {
        this.isbn = isbn;
        this.title = title;
        this.author = author;
        this.isAvailable = true;
        this.borrowedBy = "none";
        this.dueDate = null;
        this.reservedBy = "none";
    }

    /**
     * Constructs a Book using all properties.
     * This constructor is primarily used when loading book data from a persistent storage file.
     *
     * @param isbn        The International Standard Book Number
     * @param title       The title of the book
     * @param author      The author of the book
     * @param isAvailable The availability status of the book
     * @param borrowedBy  The ID of the member who borrowed the book, or "none"
     * @param dueDate     The date when the book is due, or null if not borrowed
     * @param reservedBy  The ID of the member who reserved the book, or "none"
     */
    public Book(String isbn, String title, String author, boolean isAvailable, String borrowedBy, LocalDate dueDate, String reservedBy) {
        this.isbn = isbn;
        this.title = title;
        this.author = author;
        this.isAvailable = isAvailable;
        this.borrowedBy = borrowedBy;
        this.dueDate = dueDate;
        this.reservedBy = reservedBy;
    }

    public String getIsbn() { return isbn; }
    public String getTitle() { return title; }
    public String getAuthor() { return author; }
    public boolean isAvailable() { return isAvailable; }
    public String getBorrowedBy() { return borrowedBy; }
    public LocalDate getDueDate() { return dueDate; }
    public String getReservedBy() { return reservedBy; }

    public void setAvailable(boolean available) { isAvailable = available; }
    public void setBorrowedBy(String borrowedBy) { this.borrowedBy = borrowedBy; }
    public void setDueDate(LocalDate dueDate) { this.dueDate = dueDate; }
    public void setReservedBy(String reservedBy) { this.reservedBy = reservedBy; }

    @Override
    public String toString() {
        String status = isAvailable ? "Available" : "Borrowed by " + borrowedBy + (dueDate != null ? " (Due: " + dueDate + ")" : "");
        String reservedStatus = !reservedBy.equals("none") ? " [Reserved by: " + reservedBy + "]" : "";
        return String.format("ISBN: %-13s | Title: %-20s | Author: %-20s | Status: %s%s", isbn, title, author, status, reservedStatus);
    }
}
