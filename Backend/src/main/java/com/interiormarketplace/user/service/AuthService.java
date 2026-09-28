package com.interiormarketplace.user.service;

import com.interiormarketplace.user.dto.RegisterRequest;
import com.interiormarketplace.user.entity.User;
import com.interiormarketplace.user.entity.UserRole;
import com.interiormarketplace.user.entity.UserStatus;
import com.interiormarketplace.user.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public User register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email is already registered");
        }

        if (!request.getPassword().equals(request.getConfirmPassword())) {
            throw new IllegalArgumentException("Passwords do not match");
        }

        String fullName = request.getName().trim();

        String firstName;
        String lastName;

        int firstSpace = fullName.indexOf(" ");

        if (firstSpace > 0) {
            firstName = fullName.substring(0, firstSpace);
            lastName = fullName.substring(firstSpace + 1).trim();
        } else {
            firstName = fullName;
            lastName = "";
        }

        User user = new User();

        user.setEmail(request.getEmail().trim().toLowerCase());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setRole(UserRole.CUSTOMER);
        user.setStatus(UserStatus.ACTIVE);

        return userRepository.save(user);
    }
}