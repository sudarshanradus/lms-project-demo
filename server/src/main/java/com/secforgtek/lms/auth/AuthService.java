package com.secforgtek.lms.auth;

import com.secforgtek.lms.users.Role;
import com.secforgtek.lms.users.User;
import com.secforgtek.lms.users.UserRepository;
import com.secforgtek.lms.users.UserService;
import java.util.HashMap;
import java.util.Map;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
  private final AuthenticationManager authenticationManager;
  private final JwtService jwtService;
  private final UserService userService;
  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;

  public AuthService(AuthenticationManager authenticationManager,
                     JwtService jwtService,
                     UserService userService,
                     UserRepository userRepository,
                     PasswordEncoder passwordEncoder) {
    this.authenticationManager = authenticationManager;
    this.jwtService = jwtService;
    this.userService = userService;
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
  }

  public AuthResponse login(AuthRequest request) {
    authenticationManager.authenticate(
      new UsernamePasswordAuthenticationToken(request.getEmail().toLowerCase(), request.getPassword())
    );

    User user = userRepository.findByEmail(request.getEmail().toLowerCase())
      .orElseThrow();

    Map<String, Object> claims = new HashMap<>();
    claims.put("role", user.getRole().name());
    claims.put("fullName", user.getFullName());

    UserDetails userDetails = org.springframework.security.core.userdetails.User
      .withUsername(user.getEmail())
      .password(user.getPasswordHash())
      .authorities("ROLE_" + user.getRole().name())
      .build();

    String token = jwtService.generateToken(userDetails, claims);
    return new AuthResponse(token, user.getRole().name(), user.getFullName(), user.getEmail());
  }

  public AuthResponse register(RegisterRequest request) {
    Role role = request.getRole() == null ? Role.STUDENT : request.getRole();
    if (userRepository.existsByEmail(request.getEmail().toLowerCase())) {
      throw new IllegalArgumentException("Email already exists");
    }

    User user = userService.createUser(
      request.getFullName(),
      request.getEmail(),
      request.getPassword(),
      role,
      request.getStudentId(),
      request.getFacultyId()
    );

    Map<String, Object> claims = new HashMap<>();
    claims.put("role", user.getRole().name());
    claims.put("fullName", user.getFullName());

    UserDetails userDetails = org.springframework.security.core.userdetails.User
      .withUsername(user.getEmail())
      .password(user.getPasswordHash())
      .authorities("ROLE_" + user.getRole().name())
      .build();

    String token = jwtService.generateToken(userDetails, claims);
    return new AuthResponse(token, user.getRole().name(), user.getFullName(), user.getEmail());
  }

  public void ensureAdminExists(String email, String password) {
    if (userRepository.existsByEmail(email.toLowerCase())) {
      return;
    }

    User admin = new User();
    admin.setFullName("System Admin");
    admin.setEmail(email.toLowerCase());
    admin.setPasswordHash(passwordEncoder.encode(password));
    admin.setRole(Role.ADMIN);
    userRepository.save(admin);
  }
}
