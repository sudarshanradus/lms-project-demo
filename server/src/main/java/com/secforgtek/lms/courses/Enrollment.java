package com.secforgtek.lms.courses;

import com.secforgtek.lms.users.User;
import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "enrollments", uniqueConstraints = {
  @UniqueConstraint(columnNames = {"course_id", "student_id"})
})
public class Enrollment {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(optional = false)
  private Course course;

  @ManyToOne(optional = false)
  @JoinColumn(name = "student_id")
  private User student;

  private LocalDate enrolledOn = LocalDate.now();

  public Long getId() {
    return id;
  }

  public Course getCourse() {
    return course;
  }

  public void setCourse(Course course) {
    this.course = course;
  }

  public User getStudent() {
    return student;
  }

  public void setStudent(User student) {
    this.student = student;
  }

  public LocalDate getEnrolledOn() {
    return enrolledOn;
  }

  public void setEnrolledOn(LocalDate enrolledOn) {
    this.enrolledOn = enrolledOn;
  }
}
