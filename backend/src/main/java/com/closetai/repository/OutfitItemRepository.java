package com.closetai.repository;

import com.closetai.model.OutfitItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface OutfitItemRepository extends JpaRepository<OutfitItem, UUID> {
    List<OutfitItem> findByOutfitId(UUID outfitId);
    void deleteByOutfitId(UUID outfitId);
}
