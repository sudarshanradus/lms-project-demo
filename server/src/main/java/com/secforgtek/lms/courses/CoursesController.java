package com.secforgtek.lms.courses;

import com.secforgtek.lms.users.Role;
import com.secforgtek.lms.users.User;
import com.secforgtek.lms.users.UserContext;
import com.secforgtek.lms.users.UserRepository;
import jakarta.validation.constraints.NotBlank;
import java.util.List;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/courses")
public class CoursesController {
  private final CourseRepository courseRepository;
  private final EnrollmentRepository enrollmentRepository;
  private final UserContext userContext;
  private final UserRepository userRepository;

  public CoursesController(CourseRepository courseRepository,
                           EnrollmentRepository enrollmentRepository,
                           UserContext userContext,
                           UserRepository userRepository) {
    this.courseRepository = courseRepository;
    this.enrollmentRepository = enrollmentRepository;
    this.userContext = userContext;
    this.userRepository = userRepository;
  }

  @GetMapping
  public List<CourseSummary> list() {
      User current = userContext.getCurrentUser();
      
      if (current.getRole() == Role.ADMIN) {
          return courseRepository.findAll().stream().map(CourseSummary::from).toList();
      }
      if (current.getRole() == Role.FACULTY) {
          return courseRepository.findByFacultyId(current.getId()).stream().map(CourseSummary::from).toList();
      }
      
      // ADD THIS: Allows students to see all courses
      if (current.getRole() == Role.STUDENT) {
          return courseRepository.findAll().stream().map(CourseSummary::from).toList();
          
      }

      return List.of(); 
  }

  @GetMapping("/{id}")
  public CourseSummary get(@PathVariable Long id) {
    Course course = courseRepository.findById(id).orElseThrow();
    return CourseSummary.from(course);
  }

  @PostMapping
  @PreAuthorize("hasRole('ADMIN') or hasRole('FACULTY')")
  public CourseSummary create(@RequestBody CourseCreateRequest request) {
    User current = userContext.getCurrentUser();
    Course course = new Course();
    course.setTitle(request.title);
    course.setCode(request.code);
    course.setDescription(request.description);

    if (current.getRole() == Role.FACULTY) {
      course.setFaculty(current);
    } else {
      if (request.facultyId == null) {
        throw new IllegalArgumentException("facultyId is required for admin");
      }
      User faculty = userRepository.findById(request.facultyId).orElseThrow();
      course.setFaculty(faculty);
    }

    return CourseSummary.from(courseRepository.save(course));
  }
}

class CourseCreateRequest {
  @NotBlank
  public String title;
  @NotBlank
  public String code;
  public String description;
  public Long facultyId;
}

class CourseSummary {
  public Long id;
  public String title;
  public String code;
  public String description;
  public Long facultyId;
  public String facultyName;

  static CourseSummary from(Course course) {
    CourseSummary summary = new CourseSummary();
    summary.id = course.getId();
    summary.title = course.getTitle();
    summary.code = course.getCode();
    summary.description = course.getDescription();
    summary.facultyId = course.getFaculty().getId();
    summary.facultyName = course.getFaculty().getFullName();
    return summary;
  }
}
