package com.secforgtek.lms.reports;

import com.secforgtek.lms.assessments.AssignmentRepository;
import com.secforgtek.lms.assessments.SubmissionRepository;
import com.secforgtek.lms.courses.EnrollmentRepository;
import com.secforgtek.lms.users.Role;
import com.secforgtek.lms.users.User;
import com.secforgtek.lms.users.UserContext;
import java.util.List;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/progress")
public class ProgressController {
  private final EnrollmentRepository enrollmentRepository;
  private final AssignmentRepository assignmentRepository;
  private final SubmissionRepository submissionRepository;
  private final UserContext userContext;

  public ProgressController(EnrollmentRepository enrollmentRepository,
                            AssignmentRepository assignmentRepository,
                            SubmissionRepository submissionRepository,
                            UserContext userContext) {
    this.enrollmentRepository = enrollmentRepository;
    this.assignmentRepository = assignmentRepository;
    this.submissionRepository = submissionRepository;
    this.userContext = userContext;
  }

  @GetMapping("/me")
  public List<CourseProgress> myProgress() {
    User current = userContext.getCurrentUser();
    if (current.getRole() != Role.STUDENT) {
      return List.of();
    }

    return enrollmentRepository.findByStudentId(current.getId()).stream().map(enrollment -> {
      long assignments = assignmentRepository.findByCourseId(enrollment.getCourse().getId()).size();
      long submissions = submissionRepository.findByStudentId(current.getId()).stream()
        .filter(submission -> submission.getAssignment().getCourse().getId().equals(enrollment.getCourse().getId()))
        .count();
      double completionRate = assignments == 0 ? 0.0 : (double) submissions / assignments;
      return new CourseProgress(
        enrollment.getCourse().getId(),
        enrollment.getCourse().getTitle(),
        assignments,
        submissions,
        completionRate
      );
    }).toList();
  }
}

record CourseProgress(Long courseId, String courseTitle, long totalAssignments, long submitted, double completionRate) {}
