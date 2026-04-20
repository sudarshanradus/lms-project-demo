package com.secforgtek.lms.assessments;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubmissionRepository extends JpaRepository<Submission, Long> {
  List<Submission> findByStudentId(Long studentId);
  List<Submission> findByAssignmentId(Long assignmentId);
}
