package com.secforgtek.lms.attendance;

import com.secforgtek.lms.courses.Course;
import com.secforgtek.lms.users.User;
import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "attendance_records", uniqueConstraints = {
  @UniqueConstraint(columnNames = {"course_id", "student_id", "attendance_date"})
})
public class AttendanceRecord {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(optional = false)
  private Course course;

  @ManyToOne(optional = false)
  @JoinColumn(name = "student_id")
  private User student;

  @Column(name = "attendance_date", nullable = false)
  private LocalDate attendanceDate;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private AttendanceStatus status = AttendanceStatus.PRESENT;

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

  public LocalDate getAttendanceDate() {
    return attendanceDate;
  }

  public void setAttendanceDate(LocalDate attendanceDate) {
    this.attendanceDate = attendanceDate;
  }

  public AttendanceStatus getStatus() {
    return status;
  }

  public void setStatus(AttendanceStatus status) {
    this.status = status;
  }
}
