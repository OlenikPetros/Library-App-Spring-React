package com.example.Service;

import java.util.List;

import com.example.Repositories.RentedBookRepository;
import com.example.Classes.RentedBooks;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RentedBookService {

    @Autowired
    private RentedBookRepository RentedBookRepository;

    public List<RentedBooks> getRents() {
        return RentedBookRepository.findAll();
    }

    public RentedBooks saveRent(RentedBooks rentedBook) {
        return RentedBookRepository.save(rentedBook);
    }
}
