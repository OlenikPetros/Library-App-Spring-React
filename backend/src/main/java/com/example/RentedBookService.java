package com.example;

import java.util.List;

import org.apache.catalina.util.ErrorPageSupport;
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
