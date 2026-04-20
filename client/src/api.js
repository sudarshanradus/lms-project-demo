const API_BASE = 'http://http://ec2-52-53-208-245.us-west-1.compute.amazonaws.com:8080/';

export async function apiRequest(path, options = {}) {
  const token = sessionStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(error.message || 'Request failed');
  }

  return response.json();
}

export async function login(email, password) {
  return apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });
}

export async function register(payload) {
  return apiRequest('/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
}

export async function fetchMe() {
  return apiRequest('/users/me');
}

export async function fetchUsers() {
  return apiRequest('/users');
}

export async function fetchCourses() {
  return apiRequest('/courses');
}

export async function fetchProgress() {
  return apiRequest('/progress/me');
}

export async function fetchReports() {
  return apiRequest('/reports/overview');
}

export async function fetchCourseStats() {
  return apiRequest('/reports/course-stats');
}

export async function fetchAssignments(courseId) {
  return apiRequest(`/assignments/course/${courseId}`);
}

export async function fetchAnnouncements(courseId) {
  return apiRequest(`/announcements/course/${courseId}`);
}

export async function createCourse(payload) {
  return apiRequest('/courses', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
}

export async function createAnnouncement(courseId, payload) {
  return apiRequest(`/announcements/course/${courseId}`, {
    method: 'POST',
    body: JSON.stringify(payload)
  });
}

export async function createAssignment(courseId, payload) {
  return apiRequest(`/assignments/course/${courseId}`, {
    method: 'POST',
    body: JSON.stringify(payload)
  });
}

export async function submitAssignment(assignmentId, payload) {
  return apiRequest(`/submissions/assignment/${assignmentId}`, {
    method: 'POST',
    body: JSON.stringify(payload)
  });
}

export async function fetchSubmissions(assignmentId) {
  return apiRequest(`/submissions/assignment/${assignmentId}`);
}

export async function gradeSubmission(submissionId, payload) {
  return apiRequest(`/submissions/${submissionId}/grade`, {
    method: 'PATCH',
    body: JSON.stringify(payload)
  });
}

export async function fetchAttendance() {
  return apiRequest('/attendance/me');
}

export async function markAttendance(payload) {
  return apiRequest('/attendance/mark', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
}

export async function fetchGrades() {
  return apiRequest('/grades/me');
}

export async function enrollStudent(courseId, studentId) {
  return apiRequest(`/enrollments/course/${courseId}`, {
    method: 'POST',
    body: JSON.stringify({ studentId })
  });
}
