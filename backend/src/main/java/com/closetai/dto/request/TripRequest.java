package com.closetai.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class TripRequest {
    @NotBlank
    private String destination;

    @Min(1)
    private int days;

    private String weather;
}
