package com.secforgtek.lms.courses;

import com.secforgtek.lms.users.Role;
import com.secforgtek.lms.users.User;
import com.secforgtek.lms.users.UserContext;
import com.secforgtek.lms.users.UserRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/enrollments")
public class EnrollmentController {
  private final EnrollmentRepository enrollmentRepository;
  private final CourseRepository courseRepository;
  private final UserRepository userRepository;
  private final UserContext userContext;

  public EnrollmentController(EnrollmentRepository enrollmentRepository,
                              CourseRepository courseRepository,
                              UserRepository userRepository,
                              UserContext userContext) {
    this.enrollmentRepository = enrollmentRepository;
    this.courseRepository = courseRepository;
    this.userRepository = userRepository;
    this.userContext = userContext;
  }

  @PostMapping("/course/{courseId}")
  @PreAuthorize("hasRole('ADMIN') or hasRole('FACULTY') or hasRole('STUDENT')")
  public EnrollmentSummary enroll(@PathVariable Long courseId, @RequestBody EnrollmentRequest request) {
    User current = userContext.getCurrentUser();
    Long studentId = request.studentId;

    if (current.getRole() == Role.STUDENT) {
      studentId = current.getId();
    }

    if (studentId == null) {
      throw new IllegalArgumentException("studentId is required");
    }

    User student = userRepository.findById(studentId)
      .orElseThrow(() -> new IllegalArgumentException("Student not found"));
    Course course = courseRepository.findById(courseId)
      .orElseThrow(() -> new IllegalArgumentException("Course not found"));

    Enrollment enrollment = enrollmentRepository.findByCourseIdAndStudentId(courseId, studentId)
      .orElseGet(() -> {
        Enrollment created = new Enrollment();
        created.setCourse(course);
        created.setStudent(student);
        return enrollmentRepository.save(created);
      });

    return EnrollmentSummary.from(enrollment);
  }
}

class EnrollmentRequest {
  public Long studentId;
}

class EnrollmentSummary {
  public Long id;
  public Long courseId;
  public Long studentId;
  public String studentName;

  static EnrollmentSummary from(Enrollment enrollment) {
    EnrollmentSummary summary = new EnrollmentSummary();
    summary.id = enrollment.getId();
    summary.courseId = enrollment.getCourse().getId();
    summary.studentId = enrollment.getStudent().getId();
    summary.studentName = enrollment.getStudent().getFullName();
    return summary;
  }
}
