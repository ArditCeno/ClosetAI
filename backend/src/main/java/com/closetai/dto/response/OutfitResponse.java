package com.closetai.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
@AllArgsConstructor
public class OutfitResponse {
    private String id;
    private String name;
    private String occasion;
    private List<Map<String, Object>> items;
    private Double rating;
}
