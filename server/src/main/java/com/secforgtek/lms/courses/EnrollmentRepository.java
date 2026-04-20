package com.secforgtek.lms.courses;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {
  List<Enrollment> findByStudentId(Long studentId);
  List<Enrollment> findByCourseId(Long courseId);
  Optional<Enrollment> findByCourseIdAndStudentId(Long courseId, Long studentId);
  long countByCourseId(Long courseId);
}
