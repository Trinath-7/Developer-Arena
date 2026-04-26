# Console Library Management System

A complete Java-based Library Management System that runs in the console. The project uses fundamental Object-Oriented Programming (OOP) concepts, generic collections like ArrayLists, and built-in Java standard libraries for Date handling and File I/O. 

## Project Structure
```text
Week-3-Library Management/
│
├── src/
│   ├── Book.java          # Book entity class with properties and methods
│   ├── Member.java        # Library member entity class
│   ├── FileHandler.java   # Utility for saving/loading data to text files
│   ├── Library.java       # Core logic class handling all library operations
│   └── Main.java          # Entry point for the application, contains the console UI
│
├── data/
│   ├── books.txt          # Auto-generated database file storing books
│   ├── members.txt        # Auto-generated database file storing members
│   └── library_export.csv # Generated when exporting data
│
└── README.md              # Project documentation
```

## Step-by-Step Explanation of How the System Works

1. **Initialization**: When the program starts, the `Library` class uses the `FileHandler` to read any existing data from `data/books.txt` and `data/members.txt`. If the folder or files do not exist, they are automatically created.
2. **User Interface**: The `Main` class launches a console-based menu using `Scanner`. The user sees 10 distinct options to interact with the system.
3. **Core Operations**: 
   - Operations like adding/removing books and registering members manipulate standard `ArrayList`s storing `Book` and `Member` objects.
   - For borrowing, the system checks availability, reservations, and assigns a 2-week `LocalDate` due date.
   - For returning, the system calculates date differences. If the book is returned past the due date, an overdue fine is calculated.
4. **Persistence**: Every time a modification occurs (e.g., adding a book, borrowing, returning, reserving), `saveData()` is called in the `Library` class. The `FileHandler` overwrites the respective `.txt` files to ensure no data is lost between sessions.
5. **Data Export**: At any point, the user can export the current system state into a formatted `library_export.csv` file for external viewing.

## Flow of Execution

1. **Start `Main.main()`**: The application creates a `Library` instance.
2. **Load Data**: The `Library` constructor calls `FileHandler.loadBooks()` and `FileHandler.loadMembers()`.
3. **Display Menu Loop**: A `while` loop continuously displays the menu and awaits input.
4. **Capture User Input**: Switch statement interprets the user's choice.
5. **Execute Action**: The corresponding method in `Library.java` is invoked (e.g., `library.borrowBook(...)`).
6. **Save State**: After the state changes, `FileHandler.saveBooks(...)` and `FileHandler.saveMembers(...)` securely write the text format to the disk.
7. **Exit**: The loop breaks when the user selects "0". Data is already safely persisted.

## Class and Method Breakdown

### 1. `Book`
Encapsulates a library book. 
- **Properties**: `isbn`, `title`, `author`, `isAvailable`, `borrowedBy`, `dueDate`, `reservedBy`.
- **Methods**: Standard getters and setters. Custom `toString()` method for beautifully formatting book status in the console.

### 2. `Member`
Encapsulates a library patron.
- **Properties**: `memberId`, `name`, `borrowedBooks` (List of borrowed ISBNs).
- **Methods**: `borrowBook()` adds an ISBN to their list, `returnBook()` removes it. 

### 3. `FileHandler`
Utility class for File I/O.
- **`loadBooks()` / `loadMembers()`**: Reads comma-separated lines from `.txt` files and reconstructs objects.
- **`saveBooks()` / `saveMembers()`**: Converts lists of objects into strings and writes them to the files. 

### 4. `Library`
The Brains of the application. Contains the business logic.
- **`addBook()` / `removeBook()`**: Manages the `books` collection.
- **`registerMember()`**: Registers a new member.
- **`searchBooks()`**: Matches title/author queries.
- **`borrowBook()`**: Validates if the book is available or reserved by someone else, updates availability, sets `borrowedBy` and a 2-week `dueDate`.
- **`returnBook()`**: Calculates days overdue using `java.time.temporal.ChronoUnit` and dynamically generates a fine if applicable. Clears the borrowing flags.
- **`reserveBook()`**: Prevents anyone other than the reserver from borrowing it next.
- **`displayStatistics()`**: Calculates and shows counts of total, available, borrowed, and overdue books.

### 5. `Main`
- **`main(String[] args)`**: Scanner loop implementing the CLI interface. Wraps execution in a try-catch to avoid crashing on unexpected inputs.

## Sample Output

```text
======================================
 Welcome to Library Management System 
======================================

Select an option:
1. Add a New Book
2. Remove a Book
3. Register a New Member
4. Search for a Book
5. Borrow a Book
6. Return a Book
7. Reserve a Book
8. Display All Books
9. View Library Statistics
10. Export Data to CSV
0. Exit
Enter choice: 1
Enter ISBN: 978-0134685991
Enter Title: Effective Java
Enter Author: Joshua Bloch
Success: Book added successfully.

Select an option:
...
Enter choice: 3
Enter Member ID: M001
Enter Name: John Doe
Success: Member registered successfully.

...
Enter choice: 5
Enter Book ISBN: 978-0134685991
Enter Member ID: M001
Success: Book borrowed successfully. Due date is: 2026-05-05

...
Enter choice: 8

--- Library Books ---
ISBN: 978-0134685991 | Title: Effective Java       | Author: Joshua Bloch         | Status: Borrowed by M001 (Due: 2026-05-05)

...
Enter choice: 9

--- Library Statistics ---
Total Books: 1
Available Books: 0
Borrowed Books: 1
Overdue Books: 0
Total Members: 1
```

## How to Compile and Run
1. Navigate to the project root folder.
2. Compile the classes:
   ```bash
   javac src/*.java
   ```
3. Run the application:
   ```bash
   java -cp src Main
   ```
