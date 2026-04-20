package com.secforgtek.lms.courses;

import java.util.List;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/announcements")
public class AnnouncementController {
  private final AnnouncementRepository announcementRepository;
  private final CourseRepository courseRepository;

  public AnnouncementController(AnnouncementRepository announcementRepository, CourseRepository courseRepository) {
    this.announcementRepository = announcementRepository;
    this.courseRepository = courseRepository;
  }

  @GetMapping("/course/{courseId}")
  public List<AnnouncementSummary> list(@PathVariable Long courseId) {
    return announcementRepository.findByCourseId(courseId).stream().map(AnnouncementSummary::from).toList();
  }

  @PostMapping("/course/{courseId}")
  @PreAuthorize("hasRole('ADMIN') or hasRole('FACULTY')")
  public AnnouncementSummary create(@PathVariable Long courseId, @RequestBody AnnouncementRequest request) {
    Course course = courseRepository.findById(courseId).orElseThrow();
    Announcement announcement = new Announcement();
    announcement.setCourse(course);
    announcement.setTitle(request.title);
    announcement.setMessage(request.message);
    return AnnouncementSummary.from(announcementRepository.save(announcement));
  }
}

class AnnouncementRequest {
  public String title;
  public String message;
}

class AnnouncementSummary {
  public Long id;
  public Long courseId;
  public String title;
  public String message;
  public java.time.Instant createdAt;

  static AnnouncementSummary from(Announcement announcement) {
    AnnouncementSummary summary = new AnnouncementSummary();
    summary.id = announcement.getId();
    summary.courseId = announcement.getCourse().getId();
    summary.title = announcement.getTitle();
    summary.message = announcement.getMessage();
    summary.createdAt = announcement.getCreatedAt();
    return summary;
  }
}
