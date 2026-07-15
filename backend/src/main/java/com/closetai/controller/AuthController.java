package com.closetai.controller;

import com.closetai.dto.request.LoginRequest;
import com.closetai.dto.request.RegisterRequest;
import com.closetai.dto.response.AuthResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        // Auth handled by Supabase client-side
        return ResponseEntity.ok(new AuthResponse("", "", request.getEmail(), request.getName()));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        // Auth handled by Supabase client-side
        return ResponseEntity.ok(new AuthResponse("", "", request.getEmail(), ""));
    }
}
