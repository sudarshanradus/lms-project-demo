package com.secforgtek.lms.assessments;

import com.secforgtek.lms.users.User;
import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "submissions", uniqueConstraints = {
  @UniqueConstraint(columnNames = {"assignment_id", "student_id"})
})
public class Submission {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(optional = false)
  private Assignment assignment;

  @ManyToOne(optional = false)
  @JoinColumn(name = "student_id")
  private User student;

  @Column(length = 4000)
  private String content;

  private Instant submittedAt = Instant.now();

  private Integer score;

  @Column(length = 2000)
  private String feedback;

  public Long getId() {
    return id;
  }

  public Assignment getAssignment() {
    return assignment;
  }

  public void setAssignment(Assignment assignment) {
    this.assignment = assignment;
  }

  public User getStudent() {
    return student;
  }

  public void setStudent(User student) {
    this.student = student;
  }

  public String getContent() {
    return content;
  }

  public void setContent(String content) {
    this.content = content;
  }

  public Instant getSubmittedAt() {
    return submittedAt;
  }

  public void setSubmittedAt(Instant submittedAt) {
    this.submittedAt = submittedAt;
  }

  public Integer getScore() {
    return score;
  }

  public void setScore(Integer score) {
    this.score = score;
  }

  public String getFeedback() {
    return feedback;
  }

  public void setFeedback(String feedback) {
    this.feedback = feedback;
  }
}
