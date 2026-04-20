package com.secforgtek.lms.auth;

import com.secforgtek.lms.users.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class AuthRequest {
  @Email
  @NotBlank
  private String email;

  @NotBlank
  private String password;

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }
}

class RegisterRequest {
  @NotBlank
  private String fullName;

  @Email
  @NotBlank
  private String email;

  @NotBlank
  private String password;

  private Role role;
  private String studentId;
  private String facultyId;

  public String getFullName() {
    return fullName;
  }

  public void setFullName(String fullName) {
    this.fullName = fullName;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public Role getRole() {
    return role;
  }

  public void setRole(Role role) {
    this.role = role;
  }

  public String getStudentId() {
    return studentId;
  }

  public void setStudentId(String studentId) {
    this.studentId = studentId;
  }

  public String getFacultyId() {
    return facultyId;
  }

  public void setFacultyId(String facultyId) {
    this.facultyId = facultyId;
  }
}

class AuthResponse {
  private String token;
  private String role;
  private String fullName;
  private String email;

  public AuthResponse(String token, String role, String fullName, String email) {
    this.token = token;
    this.role = role;
    this.fullName = fullName;
    this.email = email;
  }

  public String getToken() {
    return token;
  }

  public String getRole() {
    return role;
  }

  public String getFullName() {
    return fullName;
  }

  public String getEmail() {
    return email;
  }
}
