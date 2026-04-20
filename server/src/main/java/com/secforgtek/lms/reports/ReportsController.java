package com.secforgtek.lms.reports;

import com.secforgtek.lms.assessments.AssignmentRepository;
import com.secforgtek.lms.assessments.SubmissionRepository;
import com.secforgtek.lms.courses.CourseRepository;
import com.secforgtek.lms.courses.EnrollmentRepository;
import com.secforgtek.lms.courses.Course;
import com.secforgtek.lms.users.Role;
import com.secforgtek.lms.users.User;
import com.secforgtek.lms.users.UserContext;
import com.secforgtek.lms.users.UserRepository;
import java.util.List;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reports")
public class ReportsController {
  private final UserRepository userRepository;
  private final CourseRepository courseRepository;
  private final EnrollmentRepository enrollmentRepository;
  private final AssignmentRepository assignmentRepository;
  private final SubmissionRepository submissionRepository;
  private final UserContext userContext;

  public ReportsController(UserRepository userRepository,
                           CourseRepository courseRepository,
                           EnrollmentRepository enrollmentRepository,
                           AssignmentRepository assignmentRepository,
                           SubmissionRepository submissionRepository,
                           UserContext userContext) {
    this.userRepository = userRepository;
    this.courseRepository = courseRepository;
    this.enrollmentRepository = enrollmentRepository;
    this.assignmentRepository = assignmentRepository;
    this.submissionRepository = submissionRepository;
    this.userContext = userContext;
  }

  @GetMapping("/overview")
  @PreAuthorize("hasRole('ADMIN') or hasRole('FACULTY')")
  public OverviewReport overview() {
    long totalUsers = userRepository.count();
    long totalCourses = courseRepository.count();
    long totalEnrollments = enrollmentRepository.count();
    long totalAssignments = assignmentRepository.count();
    long totalSubmissions = submissionRepository.count();

    return new OverviewReport(totalUsers, totalCourses, totalEnrollments, totalAssignments, totalSubmissions);
  }

  @GetMapping("/course-stats")
  @PreAuthorize("hasRole('ADMIN') or hasRole('FACULTY')")
  public List<CourseStat> courseStats() {
    User current = userContext.getCurrentUser();
    List<Course> courses;

    if (current.getRole() == Role.FACULTY) {
      courses = courseRepository.findByFacultyId(current.getId());
    } else {
      courses = courseRepository.findAll();
    }

    return courses.stream()
      .map(course -> new CourseStat(
        course.getId(),
        course.getTitle(),
        enrollmentRepository.countByCourseId(course.getId())
      ))
      .toList();
  }
}

record OverviewReport(long totalUsers, long totalCourses, long totalEnrollments, long totalAssignments, long totalSubmissions) {}
record CourseStat(Long courseId, String courseTitle, long enrolledCount) {}
