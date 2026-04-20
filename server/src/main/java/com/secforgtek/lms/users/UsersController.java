package com.secforgtek.lms.users;

import java.util.List;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UsersController {
  private final UserService userService;
  private final UserContext userContext;

  public UsersController(UserService userService, UserContext userContext) {
    this.userService = userService;
    this.userContext = userContext;
  }

  @GetMapping("/me")
  public UserProfile me() {
    User user = userContext.getCurrentUser();
    return UserProfile.from(user);
  }

  @GetMapping
  @PreAuthorize("hasRole('ADMIN')")
  public List<UserProfile> all() {
    return userService.findAll().stream().map(UserProfile::from).toList();
  }
}

class UserProfile {
  public Long id;
  public String fullName;
  public String email;
  public String role;
  public String studentId;
  public String facultyId;
  public boolean active;

  static UserProfile from(User user) {
    UserProfile profile = new UserProfile();
    profile.id = user.getId();
    profile.fullName = user.getFullName();
    profile.email = user.getEmail();
    profile.role = user.getRole().name();
    profile.studentId = user.getStudentId();
    profile.facultyId = user.getFacultyId();
    profile.active = user.isActive();
    return profile;
  }
}
