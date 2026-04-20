package com.secforgtek.lms.courses;

import com.secforgtek.lms.users.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "courses")
public class Course {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotBlank
  private String title;

  @NotBlank
  @Column(unique = true)
  private String code;

  @Column(length = 2000)
  private String description;

  @ManyToOne(optional = false)
  private User faculty;

  public Long getId() {
    return id;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getCode() {
    return code;
  }

  public void setCode(String code) {
    this.code = code;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public User getFaculty() {
    return faculty;
  }

  public void setFaculty(User faculty) {
    this.faculty = faculty;
  }
}
