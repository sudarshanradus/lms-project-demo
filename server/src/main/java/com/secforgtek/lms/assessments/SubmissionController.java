package com.secforgtek.lms.assessments;

import com.secforgtek.lms.users.Role;
import com.secforgtek.lms.users.User;
import com.secforgtek.lms.users.UserContext;
import java.util.List;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/submissions")
public class SubmissionController {
  private final SubmissionRepository submissionRepository;
  private final AssignmentRepository assignmentRepository;
  private final UserContext userContext;

  public SubmissionController(SubmissionRepository submissionRepository,
                              AssignmentRepository assignmentRepository,
                              UserContext userContext) {
    this.submissionRepository = submissionRepository;
    this.assignmentRepository = assignmentRepository;
    this.userContext = userContext;
  }

  @PostMapping("/assignment/{assignmentId}")
  @PreAuthorize("hasRole('STUDENT')")
  public SubmissionSummary submit(@PathVariable Long assignmentId, @RequestBody SubmissionRequest request) {
    User student = userContext.getCurrentUser();
    Assignment assignment = assignmentRepository.findById(assignmentId).orElseThrow();

    Submission submission = new Submission();
    submission.setAssignment(assignment);
    submission.setStudent(student);
    submission.setContent(request.content);

    return SubmissionSummary.from(submissionRepository.save(submission));
  }

  @GetMapping("/assignment/{assignmentId}")
  @PreAuthorize("hasRole('ADMIN') or hasRole('FACULTY')")
  public List<SubmissionSummary> list(@PathVariable Long assignmentId) {
    return submissionRepository.findByAssignmentId(assignmentId).stream().map(SubmissionSummary::from).toList();
  }

  @PatchMapping("/{submissionId}/grade")
  @PreAuthorize("hasRole('ADMIN') or hasRole('FACULTY')")
  public SubmissionSummary grade(@PathVariable Long submissionId, @RequestBody GradeRequest request) {
    Submission submission = submissionRepository.findById(submissionId).orElseThrow();
    submission.setScore(request.score);
    submission.setFeedback(request.feedback);
    return SubmissionSummary.from(submissionRepository.save(submission));
  }

  @GetMapping("/me")
  public List<SubmissionSummary> mySubmissions() {
    User current = userContext.getCurrentUser();
    if (current.getRole() == Role.STUDENT) {
      return submissionRepository.findByStudentId(current.getId()).stream().map(SubmissionSummary::from).toList();
    }
    return List.of();
  }
}

class SubmissionRequest {
  public String content;
}

class GradeRequest {
  public Integer score;
  public String feedback;
}

class SubmissionSummary {
  public Long id;
  public Long assignmentId;
  public Long studentId;
  public String studentName;
  public String content;
  public java.time.Instant submittedAt;
  public Integer score;
  public String feedback;

  static SubmissionSummary from(Submission submission) {
    SubmissionSummary summary = new SubmissionSummary();
    summary.id = submission.getId();
    summary.assignmentId = submission.getAssignment().getId();
    summary.studentId = submission.getStudent().getId();
    summary.studentName = submission.getStudent().getFullName();
    summary.content = submission.getContent();
    summary.submittedAt = submission.getSubmittedAt();
    summary.score = submission.getScore();
    summary.feedback = submission.getFeedback();
    return summary;
  }
}
