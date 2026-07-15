package com.closetai.dto.request;

import lombok.Data;

@Data
public class ClothingRequest {
    private String imageUrl;
    private String category;
    private String color;
    private String style;
    private String season;
    private String brand;
}
