package com.example.Repositories;

import com.example.Models.RentedBooks;
import org.springframework.data.mongodb.repository.MongoRepository;



public interface RentedBookRepository extends MongoRepository<RentedBooks, String> {

}

