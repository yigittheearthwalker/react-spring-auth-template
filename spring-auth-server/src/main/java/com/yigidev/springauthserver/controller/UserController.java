package com.yigidev.springauthserver.controller;

import com.yigidev.springauthserver.exception.ResourceNotFoundException;
import com.yigidev.springauthserver.entity.User;
import com.yigidev.springauthserver.repository.UserRepository;
import com.yigidev.springauthserver.security.CurrentUser;
import com.yigidev.springauthserver.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/user/me")
    @PreAuthorize("hasRole('USER')")
    public User getCurrentUser(@CurrentUser UserPrincipal userPrincipal) {
        return userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));
    }
}
