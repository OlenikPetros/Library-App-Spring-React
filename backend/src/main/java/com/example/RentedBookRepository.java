package com.example;

import org.springframework.data.mongodb.repository.MongoRepository;



public interface RentedBookRepository extends MongoRepository<RentedBooks, String> {
    //

}

