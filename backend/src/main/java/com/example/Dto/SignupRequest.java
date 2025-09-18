package com.example.Dto;

public class SignupRequest {
    private String username;  // ✅ field to hold the value

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    private String password;  // ✅ field to hold the value

    // Getter
    public String getUsername() {
        return username;
    }

    // Setter
    public void setUsername(String username) {
        this.username = username;
    }
}
