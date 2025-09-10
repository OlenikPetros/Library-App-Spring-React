package com.example;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class LoginEndpoint {

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        LoginResponse response = new LoginResponse();

        if ("admin".equals(request.getUsername()) && "1234".equals(request.getPassword())) {
            response.setStatus("SUCCESS");
            response.setToken(UUID.randomUUID().toString()); // Generate token
        } else {
            response.setStatus("FAILURE");
            response.setToken(null);
        }

        return ResponseEntity.ok(response);
    }
}
