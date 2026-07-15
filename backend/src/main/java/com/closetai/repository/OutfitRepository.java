package com.closetai.repository;

import com.closetai.model.Outfit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface OutfitRepository extends JpaRepository<Outfit, UUID> {
    List<Outfit> findByUserIdOrderByCreatedAtDesc(UUID userId);
    List<Outfit> findByUserIdAndOccasion(UUID userId, String occasion);
    long countByUserId(UUID userId);
}
