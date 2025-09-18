package com.example.Controllers;

import java.util.List;

import com.example.Services.RentedBookService;
import com.example.Models.RentedBooks;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/rentedbooks")
@CrossOrigin(origins = "*")
public class RentedBookController {

    @Autowired
    private RentedBookService rentedbookService;

    @GetMapping
    public List<RentedBooks> getRent() {
        return rentedbookService.getRents();
    }

    @PostMapping
    public RentedBooks addRent(@RequestBody RentedBooks rentbook) {
        return rentedbookService.saveRent(rentbook);
    }
}
