package com.closetai.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class OutfitRequest {
    @NotBlank
    private String occasion;
    private String weather;
}
