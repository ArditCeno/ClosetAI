package com.closetai.controller;

import com.closetai.dto.request.OutfitRequest;
import com.closetai.dto.request.RatingRequest;
import com.closetai.model.Clothing;
import com.closetai.model.Outfit;
import com.closetai.service.OutfitService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/outfits")
@RequiredArgsConstructor
public class OutfitController {

    private final OutfitService outfitService;

    @GetMapping
    public ResponseEntity<List<Outfit>> getOutfits(@AuthenticationPrincipal Jwt jwt) {
        UUID userId = UUID.fromString(jwt.getSubject());
        return ResponseEntity.ok(outfitService.getUserOutfits(userId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Outfit> getOutfit(@PathVariable UUID id) {
        return ResponseEntity.ok(outfitService.getOutfitById(id));
    }

    @GetMapping("/{id}/items")
    public ResponseEntity<List<Clothing>> getOutfitItems(@PathVariable UUID id) {
        return ResponseEntity.ok(outfitService.getOutfitItems(id));
    }

    @PostMapping("/generate")
    public ResponseEntity<Outfit> generateOutfit(
            @AuthenticationPrincipal Jwt jwt,
            @RequestBody OutfitRequest request) {
        UUID userId = UUID.fromString(jwt.getSubject());
        return ResponseEntity.ok(outfitService.generateOutfit(userId, request.getOccasion()));
    }

    @PostMapping("/{id}/rate")
    public ResponseEntity<Outfit> rateOutfit(
            @AuthenticationPrincipal Jwt jwt,
            @PathVariable UUID id,
            @RequestBody RatingRequest request) {
        UUID userId = UUID.fromString(jwt.getSubject());
        return ResponseEntity.ok(outfitService.rateOutfit(id, userId, request.getRating()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOutfit(
            @AuthenticationPrincipal Jwt jwt,
            @PathVariable UUID id) {
        UUID userId = UUID.fromString(jwt.getSubject());
        outfitService.deleteOutfit(id, userId);
        return ResponseEntity.noContent().build();
    }
}
