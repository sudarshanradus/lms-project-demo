package com.secforgtek.lms.auth;

import com.secforgtek.lms.users.User;
import com.secforgtek.lms.users.UserRepository;
import java.util.Collections;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class LmsUserDetailsService implements UserDetailsService {
  private final UserRepository userRepository;

  public LmsUserDetailsService(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    User user = userRepository.findByEmail(username.toLowerCase())
      .orElseThrow(() -> new UsernameNotFoundException("User not found"));

    return org.springframework.security.core.userdetails.User
      .withUsername(user.getEmail())
      .password(user.getPasswordHash())
      .authorities(Collections.singletonList(() -> "ROLE_" + user.getRole().name()))
      .accountLocked(!user.isActive())
      .build();
  }
}
