package com.secforgtek.lms.users;

import java.util.List;
import java.util.Optional;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;

  public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
  }

  public List<User> findAll() {
    return userRepository.findAll();
  }

  public Optional<User> findByEmail(String email) {
    return userRepository.findByEmail(email);
  }

  public User createUser(String fullName, String email, String rawPassword, Role role, String studentId, String facultyId) {
    User user = new User();
    user.setFullName(fullName);
    user.setEmail(email.toLowerCase());
    user.setPasswordHash(passwordEncoder.encode(rawPassword));
    user.setRole(role);
    user.setStudentId(studentId);
    user.setFacultyId(facultyId);
    return userRepository.save(user);
  }
}
