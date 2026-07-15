package com.closetai.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "clothes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Clothing {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "user_id", nullable = false)
    private UUID userId;

    @Column(name = "image_url", nullable = false)
    private String imageUrl;

    private String category;

    private String color;

    private String style;

    private String season;

    private String brand;

    @Column(name = "last_worn")
    private Instant lastWorn;

    @Column(name = "wear_count")
    private Integer wearCount = 0;

    @Column(name = "created_at")
    private Instant createdAt;
}
