//package com.example;
//
//import org.springframework.http.ResponseEntity;
//
//import java.util.Map;
//
//public class TEST {
//    public static void main(String[] args) {
//        LoginRequest request = new LoginRequest();
//        request.setUsername("admin");
//        request.setPassword("1234");
//
//        LoginEndpoint endpoint = new LoginEndpoint() {
//            @Override
//            public ResponseEntity<String> login(Map<String, String> credentials) {
//                return null;
//            }
//        };
//        LoginResponse response = endpoint.login(request);
//
//        System.out.println("Status: " + response.getStatus());
//        System.out.println("Token: " + response.getToken());
//    }
//}
