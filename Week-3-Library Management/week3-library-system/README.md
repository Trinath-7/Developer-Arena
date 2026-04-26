# Console Library Management System

A complete Java-based Library Management System that runs in the console, structured as a Maven project. The project uses fundamental Object-Oriented Programming (OOP) concepts, generic collections like ArrayLists, and built-in Java standard libraries for Date handling and File I/O. 

## Project Structure
```text
week3-library-system/
│
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── library/
│   │   │       ├── Book.java          # Book entity class with properties and methods
│   │   │       ├── Member.java        # Library member entity class
│   │   │       ├── FileHandler.java   # Utility for saving/loading data to text files
│   │   │       ├── Library.java       # Core logic class handling all library operations
│   │   │       └── Main.java          # Entry point for the application, contains the console UI
│   │   └── resources/                 # Resource files (if any)
│
├── data/
│   ├── books.txt          # Auto-generated database file storing books
│   ├── members.txt        # Auto-generated database file storing members
│   └── library_export.csv # Generated when exporting data
│
├── .gitignore             # Git ignore file
├── pom.xml                # Maven configuration file
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

## How to Compile and Run (Maven)

1. Navigate to the project root folder (`week3-library-system`).
2. Compile the project using Maven:
   ```bash
   mvn clean compile
   ```
3. Run the application:
   ```bash
   mvn exec:java -Dexec.mainClass="library.Main"
   ```
   
Alternatively, compile using plain `javac`:
```bash
javac -d target src/main/java/library/*.java
java -cp target library.Main
```
