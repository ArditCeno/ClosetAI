package com.closetai.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.UUID;

@Entity
@Table(name = "outfit_items")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class OutfitItem {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "outfit_id", nullable = false)
    private UUID outfitId;

    @Column(name = "clothing_id", nullable = false)
    private UUID clothingId;
}
