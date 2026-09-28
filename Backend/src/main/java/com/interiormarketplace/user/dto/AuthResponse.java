package com.interiormarketplace.user.dto;

import com.interiormarketplace.user.entity.UserRole;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.UUID;

@Getter
@AllArgsConstructor
public class AuthResponse {

    private String token;
    private UUID userId;
    private String name;
    private String email;
    private UserRole role;
}