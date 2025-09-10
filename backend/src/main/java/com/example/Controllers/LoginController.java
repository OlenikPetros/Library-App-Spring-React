package com.example.Controllers;

import com.example.Login.LoginRequest;
import com.example.Login.LoginResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000") // React app URL

public class LoginController {

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        LoginResponse response = new LoginResponse();
        if ("admin".equals(request.getUsername()) && "1234".equals(request.getPassword())) {
            response.setStatus("SUCCESS");
            response.setToken(UUID.randomUUID().toString()); // Generate token

        } else {
            response.setStatus("FAILURE");
        }
        return ResponseEntity.ok(response);
    }
}

