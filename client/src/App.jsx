import { useEffect, useState } from 'react';
import {
  login,
  register,
  fetchMe,
  fetchUsers,
  fetchCourses,
  fetchProgress,
  fetchReports,
  fetchCourseStats,
  fetchAssignments,
  fetchAnnouncements,
  createCourse,
  createAnnouncement,
  createAssignment,
  submitAssignment,
  fetchSubmissions,
  gradeSubmission,
  fetchAttendance,
  markAttendance,
  fetchGrades,
  enrollStudent
} from './api.js';
import LandingPage from './pages/LandingPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';

const emptyForm = {
  fullName: '',
  email: '',
  password: '',
  role: 'STUDENT',
  studentId: '',
  facultyId: ''
};

export default function App() {
  const [mode, setMode] = useState('landing');
  const [authMode, setAuthMode] = useState('login');
  const [form, setForm] = useState(emptyForm);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [profile, setProfile] = useState(null);
  const [courses, setCourses] = useState([]);
  const [progress, setProgress] = useState([]);
  const [reports, setReports] = useState(null);
  const [courseStats, setCourseStats] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [grades, setGrades] = useState([]);
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [courseDraft, setCourseDraft] = useState({ title: '', code: '', description: '', facultyId: '' });
  const [assignmentDraft, setAssignmentDraft] = useState({ title: '', description: '', dueDate: '' });
  const [announcementDraft, setAnnouncementDraft] = useState({ title: '', message: '' });
  const [submissionDraft, setSubmissionDraft] = useState({ content: '' });
  const [userDraft, setUserDraft] = useState({
    fullName: '',
    email: '',
    password: '',
    role: 'STUDENT',
    studentId: '',
    facultyId: ''
  });
  const [enrollDraft, setEnrollDraft] = useState({ courseId: '', studentId: '' });
  const [attendanceDraft, setAttendanceDraft] = useState({
    courseId: '',
    studentId: '',
    date: '',
    status: 'PRESENT'
  });

  const [token, setToken] = useState(() => sessionStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      initialize();
    }
  }, [token]);

  async function initialize() {
    try {
      const me = await fetchMe();
      setProfile(me);
      setMode('dashboard');
      await loadDashboard(me.role);
    } catch (error) {
      setStatus(error.message);
    }
  }

  async function loadDashboard(role) {
    try {
      const courseData = await fetchCourses();
      setCourses(courseData);

      if (courseData.length > 0) {
        const initialCourse = selectedCourse || courseData[0];
        setSelectedCourse(initialCourse);
        await loadCourseData(initialCourse.id, role);
      } else {
        setAssignments([]);
        setAnnouncements([]);
      }

      if (role === 'STUDENT') {
        const [progressData, attendanceData, gradeData] = await Promise.all([
          fetchProgress(),
          fetchAttendance(),
          fetchGrades()
        ]);
        setProgress(progressData);
        setAttendance(attendanceData);
        setGrades(gradeData);
      }

      if (role === 'ADMIN' || role === 'FACULTY') {
        const [reportsData, statsData] = await Promise.all([
          fetchReports(),
          fetchCourseStats()
        ]);
        setReports(reportsData);
        setCourseStats(statsData);
      }

      if (role === 'ADMIN') {
        const userData = await fetchUsers();
        setUsers(userData);
      }
    } catch (error) {
      setStatus(error.message);
    }
  }

  async function loadCourseData(courseId, role) {
    try {
      const [assignmentData, announcementData] = await Promise.all([
        fetchAssignments(courseId),
        fetchAnnouncements(courseId)
      ]);
      setAssignments(assignmentData);
      setAnnouncements(announcementData);

      if ((role === 'ADMIN' || role === 'FACULTY') && assignmentData.length > 0) {
        const initialAssignment = selectedAssignment || assignmentData[0];
        setSelectedAssignment(initialAssignment);
        const submissionData = await fetchSubmissions(initialAssignment.id);
        setSubmissions(submissionData);
      } else {
        setSubmissions([]);
      }
    } catch (error) {
      setStatus(error.message);
    }
  }

  async function handleLogin(event) {
    event.preventDefault();
    setStatus('');
    try {
      const response = await login(loginForm.email, loginForm.password);
      sessionStorage.setItem('token', response.token);
      setToken(response.token);
      await initialize();
    } catch (error) {
      setStatus(error.message);
    }
  }

  async function handleRegister(event) {
    event.preventDefault();
    setStatus('');
    try {
      const payload = {
        fullName: form.fullName,
        email: form.email,
        password: form.password,
        role: form.role,
        studentId: form.studentId || null,
        facultyId: form.facultyId || null
      };
      const response = await register(payload);
      sessionStorage.setItem('token', response.token);
      setToken(response.token);
      await initialize();
    } catch (error) {
      setStatus(error.message);
    }
  }

  async function handleCourseCreate(event) {
    event.preventDefault();
    setStatus('');
    try {
      const payload = {
        title: courseDraft.title,
        code: courseDraft.code,
        description: courseDraft.description,
        facultyId: courseDraft.facultyId ? Number(courseDraft.facultyId) : null
      };
      await createCourse(payload);
      setCourseDraft({ title: '', code: '', description: '', facultyId: '' });
      await loadDashboard(profile?.role);
    } catch (error) {
      setStatus(error.message);
    }
  }

  async function handleAssignmentCreate(event) {
    event.preventDefault();
    if (!selectedCourse) {
      setStatus('Select a course first.');
      return;
    }
    setStatus('');
    try {
      await createAssignment(selectedCourse.id, {
        title: assignmentDraft.title,
        description: assignmentDraft.description,
        dueDate: assignmentDraft.dueDate || null
      });
      setAssignmentDraft({ title: '', description: '', dueDate: '' });
      await loadCourseData(selectedCourse.id, profile?.role);
    } catch (error) {
      setStatus(error.message);
    }
  }

  async function handleAnnouncementCreate(event) {
    event.preventDefault();
    if (!selectedCourse) {
      setStatus('Select a course first.');
      return;
    }
    setStatus('');
    try {
      await createAnnouncement(selectedCourse.id, {
        title: announcementDraft.title,
        message: announcementDraft.message
      });
      setAnnouncementDraft({ title: '', message: '' });
      await loadCourseData(selectedCourse.id, profile?.role);
    } catch (error) {
      setStatus(error.message);
    }
  }

  async function handleSelectCourse(course) {
    setSelectedCourse(course);
    await loadCourseData(course.id, profile?.role);
  }

  async function handleSelectAssignment(assignment) {
    setSelectedAssignment(assignment);
    if (assignment && (profile?.role === 'ADMIN' || profile?.role === 'FACULTY')) {
      try {
        const submissionData = await fetchSubmissions(assignment.id);
        setSubmissions(submissionData);
      } catch (error) {
        setStatus(error.message);
      }
    }
  }

  async function handleSubmitAssignment(event, assignmentId) {
    event.preventDefault();
    setStatus('');
    try {
      await submitAssignment(assignmentId, { content: submissionDraft.content });
      setSubmissionDraft({ content: '' });
      await loadCourseData(selectedCourse.id, profile?.role);
    } catch (error) {
      setStatus(error.message);
    }
  }

  async function handleGradeSubmission(submissionId, payload) {
    setStatus('');
    try {
      await gradeSubmission(submissionId, {
        score: payload.score ? Number(payload.score) : null,
        feedback: payload.feedback || null
      });
      if (selectedAssignment) {
        const submissionData = await fetchSubmissions(selectedAssignment.id);
        setSubmissions(submissionData);
      }
    } catch (error) {
      setStatus(error.message);
    }
  }

  async function handleCreateUser(event) {
    event.preventDefault();
    setStatus('');
    try {
      await register({
        fullName: userDraft.fullName,
        email: userDraft.email,
        password: userDraft.password,
        role: userDraft.role,
        studentId: userDraft.studentId || null,
        facultyId: userDraft.facultyId || null
      });
      setUserDraft({ fullName: '', email: '', password: '', role: 'STUDENT', studentId: '', facultyId: '' });
      const userData = await fetchUsers();
      setUsers(userData);
    } catch (error) {
      setStatus(error.message);
    }
  }

  async function handleMarkAttendance(event) {
    event.preventDefault();
    setStatus('');
    try {
      await markAttendance({
        courseId: Number(attendanceDraft.courseId),
        studentId: Number(attendanceDraft.studentId),
        date: attendanceDraft.date || null,
        status: attendanceDraft.status
      });
      setAttendanceDraft({ courseId: '', studentId: '', date: '', status: 'PRESENT' });
      const attendanceData = await fetchAttendance();
      setAttendance(attendanceData);
    } catch (error) {
      setStatus(error.message);
    }
  }

  async function handleEnrollStudent(event) {
    event.preventDefault();
    setStatus('');
    try {
      await enrollStudent(Number(enrollDraft.courseId), Number(enrollDraft.studentId));
      setEnrollDraft({ courseId: '', studentId: '' });
      await loadDashboard(profile?.role);
    } catch (error) {
      setStatus(error.message);
    }
  }

  function logout() {
    sessionStorage.removeItem('token');
    setToken(null);
    setProfile(null);
    setMode('landing');
  }

  if (mode === 'landing') {
    return (
      <LandingPage
        authMode={authMode}
        setAuthMode={setAuthMode}
        loginForm={loginForm}
        setLoginForm={setLoginForm}
        registerForm={form}
        setRegisterForm={setForm}
        onLogin={handleLogin}
        onRegister={handleRegister}
        status={status}
      />
    );
  }

  return (
    <DashboardPage
      profile={profile}
      courses={courses}
      selectedCourse={selectedCourse}
      assignments={assignments}
      progress={progress}
      reports={reports}
      courseStats={courseStats}
      announcements={announcements}
      attendance={attendance}
      grades={grades}
      users={users}
      submissions={submissions}
      selectedAssignment={selectedAssignment}
      onLogout={logout}
      onSelectCourse={handleSelectCourse}
      onSelectAssignment={handleSelectAssignment}
      submissionDraft={submissionDraft}
      setSubmissionDraft={setSubmissionDraft}
      onSubmitAssignment={handleSubmitAssignment}
      courseDraft={courseDraft}
      setCourseDraft={setCourseDraft}
      assignmentDraft={assignmentDraft}
      setAssignmentDraft={setAssignmentDraft}
      onCreateCourse={handleCourseCreate}
      onCreateAssignment={handleAssignmentCreate}
      announcementDraft={announcementDraft}
      setAnnouncementDraft={setAnnouncementDraft}
      onCreateAnnouncement={handleAnnouncementCreate}
      userDraft={userDraft}
      setUserDraft={setUserDraft}
      onCreateUser={handleCreateUser}
      enrollDraft={enrollDraft}
      setEnrollDraft={setEnrollDraft}
      onEnrollStudent={handleEnrollStudent}
      attendanceDraft={attendanceDraft}
      setAttendanceDraft={setAttendanceDraft}
      onMarkAttendance={handleMarkAttendance}
      onGradeSubmission={handleGradeSubmission}
      status={status}
    />
  );
}
