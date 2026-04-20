package com.secforgtek.lms.assessments;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AssignmentRepository extends JpaRepository<Assignment, Long> {
  List<Assignment> findByCourseId(Long courseId);
}
