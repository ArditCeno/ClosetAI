package com.closetai.service;

import com.closetai.model.Clothing;
import com.closetai.repository.ClothingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ClothingService {

    private final ClothingRepository clothingRepository;

    public List<Clothing> getUserClothes(UUID userId) {
        return clothingRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    public List<Clothing> getUserClothesByCategory(UUID userId, String category) {
        return clothingRepository.findByUserIdAndCategory(userId, category);
    }

    public Clothing getClothingById(UUID id) {
        return clothingRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Clothing not found: " + id));
    }

    public Clothing saveClothing(Clothing clothing) {
        return clothingRepository.save(clothing);
    }

    @Transactional
    public void deleteClothing(UUID id, UUID userId) {
        Clothing clothing = getClothingById(id);
        if (!clothing.getUserId().equals(userId)) {
            throw new RuntimeException("Unauthorized");
        }
        clothingRepository.delete(clothing);
    }

    public long getClothingCount(UUID userId) {
        return clothingRepository.countByUserId(userId);
    }
}
