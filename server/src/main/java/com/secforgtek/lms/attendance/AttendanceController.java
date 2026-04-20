package com.secforgtek.lms.attendance;

import com.secforgtek.lms.courses.Course;
import com.secforgtek.lms.courses.CourseRepository;
import com.secforgtek.lms.users.Role;
import com.secforgtek.lms.users.User;
import com.secforgtek.lms.users.UserContext;
import com.secforgtek.lms.users.UserRepository;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/attendance")
public class AttendanceController {
  private final AttendanceRepository attendanceRepository;
  private final CourseRepository courseRepository;
  private final UserRepository userRepository;
  private final UserContext userContext;

  public AttendanceController(AttendanceRepository attendanceRepository,
                              CourseRepository courseRepository,
                              UserRepository userRepository,
                              UserContext userContext) {
    this.attendanceRepository = attendanceRepository;
    this.courseRepository = courseRepository;
    this.userRepository = userRepository;
    this.userContext = userContext;
  }

  @PostMapping("/mark")
  @PreAuthorize("hasRole('ADMIN') or hasRole('FACULTY')")
  public AttendanceSummary mark(@RequestBody AttendanceRequest request) {
    Course course = courseRepository.findById(request.courseId).orElseThrow();
    User student = userRepository.findById(request.studentId).orElseThrow();
    LocalDate date = request.date == null ? LocalDate.now() : request.date;

    AttendanceRecord record = attendanceRepository
      .findByCourseIdAndStudentIdAndAttendanceDate(request.courseId, request.studentId, date)
      .orElseGet(AttendanceRecord::new);

    record.setCourse(course);
    record.setStudent(student);
    record.setAttendanceDate(date);
    record.setStatus(request.status == null ? AttendanceStatus.PRESENT : request.status);

    return AttendanceSummary.from(attendanceRepository.save(record));
  }

  @GetMapping("/me")
  public List<AttendanceCourseSummary> myAttendance() {
    User current = userContext.getCurrentUser();
    if (current.getRole() != Role.STUDENT) {
      return List.of();
    }

    List<AttendanceRecord> records = attendanceRepository.findByStudentId(current.getId());
    Map<Long, List<AttendanceRecord>> grouped = records.stream()
      .collect(Collectors.groupingBy(record -> record.getCourse().getId()));

    return grouped.values().stream().map(courseRecords -> {
      AttendanceRecord first = courseRecords.get(0);
      long total = courseRecords.size();
      long present = courseRecords.stream().filter(r -> r.getStatus() == AttendanceStatus.PRESENT).count();
      double rate = total == 0 ? 0.0 : (double) present / total;
      return new AttendanceCourseSummary(
        first.getCourse().getId(),
        first.getCourse().getTitle(),
        total,
        present,
        rate
      );
    }).toList();
  }
}

class AttendanceRequest {
  public Long courseId;
  public Long studentId;
  public LocalDate date;
  public AttendanceStatus status;
}

class AttendanceSummary {
  public Long id;
  public Long courseId;
  public Long studentId;
  public LocalDate date;
  public String status;

  static AttendanceSummary from(AttendanceRecord record) {
    AttendanceSummary summary = new AttendanceSummary();
    summary.id = record.getId();
    summary.courseId = record.getCourse().getId();
    summary.studentId = record.getStudent().getId();
    summary.date = record.getAttendanceDate();
    summary.status = record.getStatus().name();
    return summary;
  }
}

record AttendanceCourseSummary(Long courseId, String courseTitle, long total, long present, double rate) {}
