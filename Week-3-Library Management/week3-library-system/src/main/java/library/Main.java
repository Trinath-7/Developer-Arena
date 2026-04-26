package library;

import java.util.Scanner;

/**
 * Main application class providing a Console User Interface.
 */
public class Main {
    /**
     * Main entry point for the Library Management System.
     * Initializes the library and starts the interactive menu.
     *
     * @param args Command line arguments (not used)
     */
    public static void main(String[] args) {
        Library library = new Library();
        Scanner scanner = new Scanner(System.in);
        boolean exit = false;

        System.out.println("======================================");
        System.out.println(" Welcome to Library Management System ");
        System.out.println("======================================");

        while (!exit) {
            System.out.println("\nSelect an option:");
            System.out.println("1. Add a New Book");
            System.out.println("2. Remove a Book");
            System.out.println("3. Register a New Member");
            System.out.println("4. Search for a Book");
            System.out.println("5. Borrow a Book");
            System.out.println("6. Return a Book");
            System.out.println("7. Reserve a Book");
            System.out.println("8. Display All Books");
            System.out.println("9. Display Available Books");
            System.out.println("10. View Library Statistics");
            System.out.println("11. Export Data to CSV");
            System.out.println("0. Exit");
            System.out.print("Enter choice: ");

            if (!scanner.hasNextLine()) {
                break; // Exit gracefully if input stream is closed
            }
            String choice = scanner.nextLine().trim();

            try {
                switch (choice) {
                    case "1": // Add a New Book
                        System.out.print("Enter ISBN: ");
                        String isbn = scanner.nextLine().trim();
                        System.out.print("Enter Title: ");
                        String title = scanner.nextLine().trim();
                        System.out.print("Enter Author: ");
                        String author = scanner.nextLine().trim();
                        if (isbn.isEmpty() || title.isEmpty() || author.isEmpty()) {
                            System.out.println("Error: Fields cannot be empty.");
                        } else {
                            library.addBook(isbn, title, author);
                        }
                        break;
                    case "2": // Remove a Book
                        System.out.print("Enter ISBN to remove: ");
                        library.removeBook(scanner.nextLine().trim());
                        break;
                    case "3": // Register a New Member
                        System.out.print("Enter Member ID: ");
                        String memberId = scanner.nextLine().trim();
                        System.out.print("Enter Name: ");
                        String name = scanner.nextLine().trim();
                        if (memberId.isEmpty() || name.isEmpty()) {
                            System.out.println("Error: Fields cannot be empty.");
                        } else {
                            library.registerMember(memberId, name);
                        }
                        break;
                    case "4": // Search for a Book
                        System.out.print("Enter search query (Title or Author): ");
                        library.searchBooks(scanner.nextLine().trim());
                        break;
                    case "5": // Borrow a Book
                        System.out.print("Enter Book ISBN: ");
                        String bIsbn = scanner.nextLine().trim();
                        System.out.print("Enter Member ID: ");
                        String bMemberId = scanner.nextLine().trim();
                        library.borrowBook(bIsbn, bMemberId);
                        break;
                    case "6": // Return a Book
                        System.out.print("Enter Book ISBN: ");
                        String rIsbn = scanner.nextLine().trim();
                        System.out.print("Enter Member ID: ");
                        String rMemberId = scanner.nextLine().trim();
                        library.returnBook(rIsbn, rMemberId);
                        break;
                    case "7": // Reserve a Book
                        System.out.print("Enter Book ISBN: ");
                        String resIsbn = scanner.nextLine().trim();
                        System.out.print("Enter Member ID: ");
                        String resMemberId = scanner.nextLine().trim();
                        library.reserveBook(resIsbn, resMemberId);
                        break;
                    case "8": // Display All Books
                        library.displayAllBooks();
                        break;
                    case "9": // Display Available Books
                        library.displayAvailableBooks();
                        break;
                    case "10": // View Library Statistics
                        library.displayStatistics();
                        break;
                    case "11": // Export Data to CSV
                        library.exportToCSV();
                        break;
                    case "0": // Exit
                        exit = true;
                        System.out.println("Exiting the system. Goodbye!");
                        break;
                    default:
                        System.out.println("Invalid choice. Please try again.");
                        break;
                }
            } catch (Exception e) {
                System.out.println("An unexpected error occurred: " + e.getMessage());
            }
        }
        scanner.close();
    }
}
