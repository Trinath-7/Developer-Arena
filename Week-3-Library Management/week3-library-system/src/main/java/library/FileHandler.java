package library;

import java.io.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Handles all File I/O operations for reading and writing library data.
 */
public class FileHandler {
    private static final String DATA_DIR = "data";
    private static final String BOOKS_FILE = DATA_DIR + "/books.txt";
    private static final String MEMBERS_FILE = DATA_DIR + "/members.txt";

    static {
        File dir = new File(DATA_DIR);
        if (!dir.exists()) {
            dir.mkdirs();
        }
    }

    /**
     * Loads the list of books from the books.txt file.
     *
     * @return A List of Book objects read from the file.
     */
    public static List<Book> loadBooks() {
        List<Book> books = new ArrayList<>();
        File file = new File(BOOKS_FILE);
        if (!file.exists()) return books;

        try (BufferedReader br = new BufferedReader(new FileReader(file))) {
            String line;
            while ((line = br.readLine()) != null) {
                String[] data = line.split(",");
                if (data.length >= 7) {
                    LocalDate dueDate = data[5].equals("null") ? null : LocalDate.parse(data[5]);
                    books.add(new Book(data[0], data[1], data[2], Boolean.parseBoolean(data[3]), data[4], dueDate, data[6]));
                }
            }
        } catch (IOException e) {
            System.out.println("Error loading books: " + e.getMessage());
        }
        return books;
    }

    /**
     * Saves the current list of books to the books.txt file.
     *
     * @param books The list of books to be saved.
     */
    public static void saveBooks(List<Book> books) {
        try (BufferedWriter bw = new BufferedWriter(new FileWriter(BOOKS_FILE))) {
            for (Book book : books) {
                String dueDateStr = book.getDueDate() == null ? "null" : book.getDueDate().toString();
                bw.write(String.join(",", book.getIsbn(), book.getTitle(), book.getAuthor(), 
                        String.valueOf(book.isAvailable()), book.getBorrowedBy(), dueDateStr, book.getReservedBy()));
                bw.newLine();
            }
        } catch (IOException e) {
            System.out.println("Error saving books: " + e.getMessage());
        }
    }

    /**
     * Loads the list of members from the members.txt file.
     *
     * @return A List of Member objects read from the file.
     */
    public static List<Member> loadMembers() {
        List<Member> members = new ArrayList<>();
        File file = new File(MEMBERS_FILE);
        if (!file.exists()) return members;

        try (BufferedReader br = new BufferedReader(new FileReader(file))) {
            String line;
            while ((line = br.readLine()) != null) {
                String[] data = line.split(",");
                List<String> borrowedBooks = new ArrayList<>();
                if (data.length > 2 && !data[2].isEmpty()) {
                    borrowedBooks.addAll(Arrays.asList(data[2].split(";")));
                }
                members.add(new Member(data[0], data[1], borrowedBooks));
            }
        } catch (IOException e) {
            System.out.println("Error loading members: " + e.getMessage());
        }
        return members;
    }

    /**
     * Saves the current list of members to the members.txt file.
     *
     * @param members The list of members to be saved.
     */
    public static void saveMembers(List<Member> members) {
        try (BufferedWriter bw = new BufferedWriter(new FileWriter(MEMBERS_FILE))) {
            for (Member member : members) {
                String borrowed = String.join(";", member.getBorrowedBooks());
                bw.write(String.join(",", member.getMemberId(), member.getName(), borrowed));
                bw.newLine();
            }
        } catch (IOException e) {
            System.out.println("Error saving members: " + e.getMessage());
        }
    }
}
