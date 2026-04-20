package com.secforgtek.lms.attendance;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AttendanceRepository extends JpaRepository<AttendanceRecord, Long> {
  Optional<AttendanceRecord> findByCourseIdAndStudentIdAndAttendanceDate(Long courseId, Long studentId, LocalDate date);
  List<AttendanceRecord> findByStudentId(Long studentId);
}
