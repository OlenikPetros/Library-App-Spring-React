package com.example.Repositories;

import com.example.Classes.User;
import org.springframework.data.mongodb.repository.MongoRepository;



public interface UserRepository extends MongoRepository<User, String> {
    // Basic CRUD methods are inherited
}
