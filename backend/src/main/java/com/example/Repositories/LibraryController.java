package com.example.Repositories;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class LibraryController {

    private final BookRepository bookRepository;
    private final UserRepository userRepository;
    private final RentedBookRepository rentedBookRepository;

     public LibraryController(BookRepository bookRepository,
                             UserRepository userRepository,
                             RentedBookRepository rentedBookRepository) {
        this.bookRepository = bookRepository;
        this.userRepository = userRepository;
        this.rentedBookRepository = rentedBookRepository;
    }

    @GetMapping("/libraryData")
    public Map<String, Object> getLibraryData() {
        Map<String, Object> response = new HashMap<>();
        response.put("books", bookRepository.findAll());
        response.put("users", userRepository.findAll());
        response.put("rentedBooks", rentedBookRepository.findAll());
        return response;
    }
}
