package com.example.Service;

import java.util.List;
import java.util.Optional;

import com.example.Classes.Book;
import com.example.Repositories.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    // Get all books
    public List<Book> getBooks() {
        return bookRepository.findAll();
    }

    // Save a book
    public Book saveBook(Book book) {
        return bookRepository.save(book);
    }

    //  Get a book by ID
    public Book getBookById(String id) {
        Optional<Book> optionalBook = bookRepository.findById(id);
        // Return the book if found, otherwise return null
        return optionalBook.orElse(null);
    }

    //  Delete a book by ID
    public boolean deleteBook(String id) {
        Optional<Book> optionalBook = bookRepository.findById(id);
        if (optionalBook.isPresent()) {
            bookRepository.deleteById(id);
            return true; // deleted successfully
        } else {
            return false; // book not found
        }
    }

    // Update a book by ID
    public Book updateBook(String id, Book updatedBook) {
        Optional<Book> optionalBook = bookRepository.findById(id);
        if (optionalBook.isPresent()) {
            Book existingBook = optionalBook.get();
            existingBook.setTitle(updatedBook.getTitle());
            existingBook.setAuthors(updatedBook.getAuthors());
            existingBook.setCategories(updatedBook.getCategories());
            existingBook.setThumbnailUrl(updatedBook.getThumbnailUrl());
            existingBook.setLongDescription(updatedBook.getLongDescription());
            return bookRepository.save(existingBook);
        } else {
            return null; // book not found
        }
    
    }
}
