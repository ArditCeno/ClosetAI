package com.closetai.service;

import com.closetai.model.Clothing;
import com.closetai.model.Outfit;
import com.closetai.model.OutfitItem;
import com.closetai.repository.ClothingRepository;
import com.closetai.repository.OutfitItemRepository;
import com.closetai.repository.OutfitRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.*;

@Service
@RequiredArgsConstructor
public class OutfitService {

    private final OutfitRepository outfitRepository;
    private final OutfitItemRepository outfitItemRepository;
    private final ClothingRepository clothingRepository;

    public List<Outfit> getUserOutfits(UUID userId) {
        return outfitRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    public Outfit getOutfitById(UUID id) {
        return outfitRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Outfit not found: " + id));
    }

    public List<Clothing> getOutfitItems(UUID outfitId) {
        List<OutfitItem> items = outfitItemRepository.findByOutfitId(outfitId);
        List<Clothing> clothes = new ArrayList<>();
        for (OutfitItem item : items) {
            clothingRepository.findById(item.getClothingId()).ifPresent(clothes::add);
        }
        return clothes;
    }

    public Outfit generateOutfit(UUID userId, String occasion) {
        List<Clothing> userClothes = clothingRepository.findByUserIdOrderByCreatedAtDesc(userId);
        if (userClothes.isEmpty()) {
            throw new RuntimeException("No clothes in closet. Add some clothes first.");
        }

        List<Clothing> selected = selectOutfitItems(userClothes, occasion);

        Outfit outfit = new Outfit();
        outfit.setUserId(userId);
        outfit.setOccasion(occasion);
        outfit.setName(generateOutfitName(occasion));
        outfit.setIsFavorite(false);
        outfit = outfitRepository.save(outfit);

        for (Clothing item : selected) {
            OutfitItem outfitItem = new OutfitItem();
            outfitItem.setOutfitId(outfit.getId());
            outfitItem.setClothingId(item.getId());
            outfitItemRepository.save(outfitItem);
        }

        return outfit;
    }

    @Transactional
    public Outfit rateOutfit(UUID id, UUID userId, double rating) {
        Outfit outfit = getOutfitById(id);
        if (!outfit.getUserId().equals(userId)) {
            throw new RuntimeException("Unauthorized");
        }
        outfit.setRating(BigDecimal.valueOf(rating));
        return outfitRepository.save(outfit);
    }

    @Transactional
    public void deleteOutfit(UUID id, UUID userId) {
        Outfit outfit = getOutfitById(id);
        if (!outfit.getUserId().equals(userId)) {
            throw new RuntimeException("Unauthorized");
        }
        outfitItemRepository.deleteByOutfitId(id);
        outfitRepository.delete(outfit);
    }

    private List<Clothing> selectOutfitItems(List<Clothing> clothes, String occasion) {
        Map<String, List<Clothing>> categorized = new HashMap<>();
        for (Clothing c : clothes) {
            categorized.computeIfAbsent(c.getCategory(), k -> new ArrayList<>()).add(c);
        }

        List<Clothing> selected = new ArrayList<>();

        String[] topCategories = {"tshirt", "shirt", "blouse", "sweater", "hoodie"};
        for (String cat : topCategories) {
            List<Clothing> items = categorized.get(cat);
            if (items != null && !items.isEmpty()) {
                selected.add(items.get(new Random().nextInt(items.size())));
                break;
            }
        }

        String[] bottomCategories = {"jeans", "pants", "shorts", "skirt"};
        for (String cat : bottomCategories) {
            List<Clothing> items = categorized.get(cat);
            if (items != null && !items.isEmpty()) {
                selected.add(items.get(new Random().nextInt(items.size())));
                break;
            }
        }

        String[] shoeCategories = {"sneakers", "shoes", "boots", "sandals"};
        for (String cat : shoeCategories) {
            List<Clothing> items = categorized.get(cat);
            if (items != null && !items.isEmpty()) {
                selected.add(items.get(new Random().nextInt(items.size())));
                break;
            }
        }

        String[] outerCategories = {"jacket", "coat", "blazer", "hoodie"};
        if (occasion.equals("formal") || occasion.equals("work") || occasion.equals("interview")) {
            for (String cat : outerCategories) {
                List<Clothing> items = categorized.get(cat);
                if (items != null && !items.isEmpty()) {
                    selected.add(items.get(new Random().nextInt(items.size())));
                    break;
                }
            }
        }

        return selected;
    }

    private String generateOutfitName(String occasion) {
        Map<String, String> names = Map.of(
            "work", "Office Ready",
            "casual", "Everyday Look",
            "date", "Date Night",
            "formal", "Elegant Style",
            "sport", "Active Wear",
            "interview", "Interview Ready",
            "party", "Party Look",
            "travel", "Travel Comfort"
        );
        return names.getOrDefault(occasion, "Custom Outfit");
    }
}
