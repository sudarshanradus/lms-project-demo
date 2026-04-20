package com.secforgtek.lms.assessments;

import com.secforgtek.lms.courses.Course;
import com.secforgtek.lms.courses.CourseRepository;
import java.util.List;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/assignments")
public class AssignmentController {
  private final AssignmentRepository assignmentRepository;
  private final CourseRepository courseRepository;

  public AssignmentController(AssignmentRepository assignmentRepository, CourseRepository courseRepository) {
    this.assignmentRepository = assignmentRepository;
    this.courseRepository = courseRepository;
  }

  @GetMapping("/course/{courseId}")
  public List<AssignmentSummary> listByCourse(@PathVariable Long courseId) {
    return assignmentRepository.findByCourseId(courseId).stream().map(AssignmentSummary::from).toList();
  }

  @PostMapping("/course/{courseId}")
  @PreAuthorize("hasRole('ADMIN') or hasRole('FACULTY')")
  public AssignmentSummary create(@PathVariable Long courseId, @RequestBody AssignmentRequest request) {
    Course course = courseRepository.findById(courseId).orElseThrow();
    Assignment assignment = new Assignment();
    assignment.setCourse(course);
    assignment.setTitle(request.title);
    assignment.setDescription(request.description);
    assignment.setDueDate(request.dueDate);
    assignment.setMaxScore(request.maxScore == null ? 100 : request.maxScore);
    return AssignmentSummary.from(assignmentRepository.save(assignment));
  }
}

class AssignmentRequest {
  public String title;
  public String description;
  public java.time.LocalDate dueDate;
  public Integer maxScore;
}

class AssignmentSummary {
  public Long id;
  public Long courseId;
  public String title;
  public String description;
  public java.time.LocalDate dueDate;
  public Integer maxScore;

  static AssignmentSummary from(Assignment assignment) {
    AssignmentSummary summary = new AssignmentSummary();
    summary.id = assignment.getId();
    summary.courseId = assignment.getCourse().getId();
    summary.title = assignment.getTitle();
    summary.description = assignment.getDescription();
    summary.dueDate = assignment.getDueDate();
    summary.maxScore = assignment.getMaxScore();
    return summary;
  }
}
