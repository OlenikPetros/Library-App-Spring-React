package com.example.Services;

import java.util.List;
import java.util.Optional;

import com.example.Models.Book;
import com.example.Models.User;
import com.example.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> getUsers() {
        return userRepository.findAll();
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public boolean deleteUser(String id) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            userRepository.deleteById(id);
            return true; // deleted successfully
        } else {
            return false; // User not found
        }
    }
    public User getUserById(String id) {
        Optional<User> optionalUser = userRepository.findById(id);
        // Return the book if found, otherwise return null
         return optionalUser.orElse(null);
    }
    //  Delete a User by ID

    public User updateUser(String id, User updatedUser) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            User existingUser = optionalUser.get();
            existingUser.setName(updatedUser.getName());
            existingUser.setPhone(updatedUser.getPhone());
            existingUser.setEmail(updatedUser.getEmail());

            return userRepository.save(existingUser);
        } else {
            return null; // User not found
        }

    }
}
