package com.example;

import org.springframework.data.mongodb.repository.MongoRepository;

 
 
public interface BookRepository extends MongoRepository<Book, String> {
    // Basic CRUD methods are inherited
}
    