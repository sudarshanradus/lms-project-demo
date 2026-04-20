package com.secforgtek.lms.users;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class UserContext {
  private final UserRepository userRepository;

  public UserContext(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  public User getCurrentUser() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    if (authentication == null) {
      throw new IllegalStateException("No authentication context");
    }
    String email = authentication.getName();
    return userRepository.findByEmail(email)
      .orElseThrow(() -> new IllegalStateException("User not found"));
  }
}
