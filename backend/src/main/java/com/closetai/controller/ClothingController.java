package com.closetai.controller;

import com.closetai.dto.request.ClothingRequest;
import com.closetai.model.Clothing;
import com.closetai.service.ClothingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/clothes")
@RequiredArgsConstructor
public class ClothingController {

    private final ClothingService clothingService;

    @GetMapping
    public ResponseEntity<List<Clothing>> getClothes(@AuthenticationPrincipal Jwt jwt) {
        UUID userId = UUID.fromString(jwt.getSubject());
        return ResponseEntity.ok(clothingService.getUserClothes(userId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Clothing> getClothing(@PathVariable UUID id) {
        return ResponseEntity.ok(clothingService.getClothingById(id));
    }

    @PostMapping
    public ResponseEntity<Clothing> createClothing(
            @AuthenticationPrincipal Jwt jwt,
            @RequestBody ClothingRequest request) {
        Clothing clothing = new Clothing();
        clothing.setUserId(UUID.fromString(jwt.getSubject()));
        clothing.setImageUrl(request.getImageUrl());
        clothing.setCategory(request.getCategory());
        clothing.setColor(request.getColor());
        clothing.setStyle(request.getStyle());
        clothing.setSeason(request.getSeason());
        clothing.setBrand(request.getBrand());
        return ResponseEntity.ok(clothingService.saveClothing(clothing));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Clothing> updateClothing(
            @PathVariable UUID id,
            @RequestBody ClothingRequest request) {
        Clothing clothing = clothingService.getClothingById(id);
        if (request.getCategory() != null) clothing.setCategory(request.getCategory());
        if (request.getColor() != null) clothing.setColor(request.getColor());
        if (request.getStyle() != null) clothing.setStyle(request.getStyle());
        if (request.getSeason() != null) clothing.setSeason(request.getSeason());
        if (request.getBrand() != null) clothing.setBrand(request.getBrand());
        return ResponseEntity.ok(clothingService.saveClothing(clothing));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteClothing(
            @AuthenticationPrincipal Jwt jwt,
            @PathVariable UUID id) {
        clothingService.deleteClothing(id, UUID.fromString(jwt.getSubject()));
        return ResponseEntity.noContent().build();
    }
}
