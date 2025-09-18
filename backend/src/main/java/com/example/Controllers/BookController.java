package com.example.Controllers;

import com.example.Models.Book;
import com.example.Services.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// This marks the class as a REST controller
@RestController
// Base URL for all endpoints in this controller
@RequestMapping("/api/books")
// Allow requests from any origin (for React or other frontend)
@CrossOrigin(origins = "*")
public class BookController {

    @Autowired
    private BookService bookService;

    // 1️⃣ GET all books
    // GET http://localhost:8080/api/books
    @GetMapping
    public List<Book> getBooks() {
        return bookService.getBooks();
    }

    // 2️⃣ GET a single book by ID
    // GET http://localhost:8080/api/books/{id}
    @GetMapping("/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable String id) {
        Book book = bookService.getBookById(id);
        if (book == null) {
            // Return 404 if book not found
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(book);
    }

    // 3️⃣ POST a new book
    // POST http://localhost:8080/api/books
    @PostMapping
    public Book addBook(@RequestBody Book book) {
        return bookService.saveBook(book);
    }

    // 4️⃣ DELETE a book by ID
    // DELETE http://localhost:8080/api/books/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable String id) {
        boolean deleted = bookService.deleteBook(id);
        if (!deleted) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().build();
    }

    // 5️⃣   UPDATE a book by ID
    // PUT http://localhost:8080/api/books/{id}
    @PutMapping("/{id}")
    public ResponseEntity<Book> updateBook(@PathVariable String id, @RequestBody Book updatedBook) {
        Book book = bookService.updateBook(id, updatedBook);
        if (book == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(book);
    }
}
