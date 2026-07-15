package com.closetai.controller;

import com.closetai.dto.request.ChatRequest;
import com.closetai.dto.request.TripRequest;
import com.closetai.service.AIService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.util.Map;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
public class AIController {

    private final AIService aiService;

    @PostMapping("/recognize")
    public Mono<ResponseEntity<Map>> recognize(@RequestBody Map<String, String> request) {
        return aiService.recognizeClothing(request.get("image_url"))
            .map(ResponseEntity::ok);
    }

    @PostMapping("/generate")
    public Mono<ResponseEntity<Map>> generate(
            @AuthenticationPrincipal Jwt jwt,
            @RequestBody Map<String, String> request) {
        return aiService.generateOutfit(
                request.get("occasion"),
                request.get("weather"),
                jwt.getSubject()
            )
            .map(ResponseEntity::ok);
    }

    @PostMapping("/chat")
    public Mono<ResponseEntity<Map>> chat(
            @AuthenticationPrincipal Jwt jwt,
            @RequestBody ChatRequest request) {
        return aiService.chatWithAI(request.getMessage(), jwt.getSubject())
            .map(ResponseEntity::ok);
    }

    @PostMapping("/analyze")
    public Mono<ResponseEntity<Map>> analyze(@AuthenticationPrincipal Jwt jwt) {
        return aiService.analyzeCloset(jwt.getSubject())
            .map(ResponseEntity::ok);
    }

    @PostMapping("/pack")
    public Mono<ResponseEntity<Map>> pack(
            @AuthenticationPrincipal Jwt jwt,
            @RequestBody TripRequest request) {
        return aiService.packForTrip(
                request.getDestination(),
                request.getDays(),
                request.getWeather(),
                jwt.getSubject()
            )
            .map(ResponseEntity::ok);
    }
}
