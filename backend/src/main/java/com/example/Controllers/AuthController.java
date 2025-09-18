package com.example.Controllers;


import com.example.Jwt.JwtUtil;
import com.example.Repositories.AdminRepository;
import org.springframework.security.authentication.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class AuthController {
    private final AuthenticationManager authManager;
    private final JwtUtil jwtUtil;
    private final AdminRepository repo;
    private final PasswordEncoder encoder;

    public AuthController(AuthenticationManager authManager, JwtUtil jwtUtil,
                          AdminRepository repo, PasswordEncoder encoder) {
        this.authManager = authManager;
        this.jwtUtil = jwtUtil;
        this.repo = repo;
        this.encoder = encoder;
    }

    @PostMapping("/signup")
    public String signup(@RequestBody com.example.Dto.SignupRequest req) {
        com.example.Models.Admin admin = new com.example.Models.Admin(req.getUsername(), encoder.encode(req.getPassword()));
        repo.save(admin);
        return "User created";
    }


    @PostMapping("/login")
    public com.example.Dto.LoginResponse login(@RequestBody com.example.Dto.LoginRequest req) {
        authManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.getUsername(), req.getPassword()));
        String token = jwtUtil.generateToken(req.getUsername());
        return new com.example.Dto.LoginResponse(token);
    }

    @GetMapping("/hello")
    public String hello() {
        return "Hello, secured world!";
    }
}

