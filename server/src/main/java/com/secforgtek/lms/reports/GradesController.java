package com.secforgtek.lms.reports;

import com.secforgtek.lms.assessments.Submission;
import com.secforgtek.lms.assessments.SubmissionRepository;
import com.secforgtek.lms.users.Role;
import com.secforgtek.lms.users.User;
import com.secforgtek.lms.users.UserContext;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/grades")
public class GradesController {
  private final SubmissionRepository submissionRepository;
  private final UserContext userContext;

  public GradesController(SubmissionRepository submissionRepository, UserContext userContext) {
    this.submissionRepository = submissionRepository;
    this.userContext = userContext;
  }

  @GetMapping("/me")
  public List<CourseGrade> myGrades() {
    User current = userContext.getCurrentUser();
    if (current.getRole() != Role.STUDENT) {
      return List.of();
    }

    List<Submission> submissions = submissionRepository.findByStudentId(current.getId());
    Map<Long, List<Submission>> grouped = submissions.stream()
      .filter(submission -> submission.getScore() != null)
      .collect(Collectors.groupingBy(submission -> submission.getAssignment().getCourse().getId()));

    return grouped.values().stream().map(courseSubmissions -> {
      Submission first = courseSubmissions.get(0);
      double average = courseSubmissions.stream()
        .mapToInt(submission -> submission.getScore() == null ? 0 : submission.getScore())
        .average()
        .orElse(0.0);
      return new CourseGrade(
        first.getAssignment().getCourse().getId(),
        first.getAssignment().getCourse().getTitle(),
        average,
        courseSubmissions.size()
      );
    }).toList();
  }
}

record CourseGrade(Long courseId, String courseTitle, double averageScore, long gradedSubmissions) {}
