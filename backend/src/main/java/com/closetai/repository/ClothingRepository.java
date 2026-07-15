package com.closetai.repository;

import com.closetai.model.Clothing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ClothingRepository extends JpaRepository<Clothing, UUID> {
    List<Clothing> findByUserIdOrderByCreatedAtDesc(UUID userId);
    List<Clothing> findByUserIdAndCategory(UUID userId, String category);
    long countByUserId(UUID userId);
}
