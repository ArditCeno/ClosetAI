package com.closetai.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "outfits")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Outfit {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "user_id", nullable = false)
    private UUID userId;

    private String name;

    private String occasion;

    private BigDecimal rating;

    @Column(name = "is_favorite")
    private Boolean isFavorite = false;

    @Column(name = "created_at")
    private Instant createdAt;
}
