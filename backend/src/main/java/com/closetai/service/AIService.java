package com.closetai.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.Map;

@Service
public class AIService {

    private final WebClient webClient;

    public AIService(@Value("${ai-service.url}") String aiServiceUrl) {
        this.webClient = WebClient.builder()
            .baseUrl(aiServiceUrl)
            .build();
    }

    public Mono<Map> recognizeClothing(String imageUrl) {
        return webClient.post()
            .uri("/recognize")
            .bodyValue(Map.of("image_url", imageUrl))
            .retrieve()
            .bodyToMono(Map.class);
    }

    public Mono<Map> generateOutfit(String occasion, String weather, String userId) {
        return webClient.post()
            .uri("/generate")
            .bodyValue(Map.of(
                "occasion", occasion,
                "weather", weather,
                "user_id", userId
            ))
            .retrieve()
            .bodyToMono(Map.class);
    }

    public Mono<Map> chatWithAI(String message, String userId) {
        return webClient.post()
            .uri("/chat")
            .bodyValue(Map.of(
                "message", message,
                "user_id", userId
            ))
            .retrieve()
            .bodyToMono(Map.class);
    }

    public Mono<Map> analyzeCloset(String userId) {
        return webClient.post()
            .uri("/analyze-usage")
            .bodyValue(Map.of("user_id", userId))
            .retrieve()
            .bodyToMono(Map.class);
    }

    public Mono<Map> packForTrip(String destination, int days, String weather, String userId) {
        return webClient.post()
            .uri("/pack")
            .bodyValue(Map.of(
                "destination", destination,
                "days", days,
                "weather", weather,
                "user_id", userId
            ))
            .retrieve()
            .bodyToMono(Map.class);
    }
}
