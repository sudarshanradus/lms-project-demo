import Topbar from '../components/Topbar.jsx';
import CourseList from '../components/CourseList.jsx';
import AssignmentList from '../components/AssignmentList.jsx';
import ProgressPanel from '../components/ProgressPanel.jsx';
import ReportsPanel from '../components/ReportsPanel.jsx';
import CourseCreateForm from '../components/CourseCreateForm.jsx';
import AssignmentCreateForm from '../components/AssignmentCreateForm.jsx';
import StatusMessage from '../components/StatusMessage.jsx';
import ProfileSummary from '../components/ProfileSummary.jsx';
import NotificationsPanel from '../components/NotificationsPanel.jsx';
import UpcomingAssignmentsPanel from '../components/UpcomingAssignmentsPanel.jsx';
import AttendancePanel from '../components/AttendancePanel.jsx';
import GradesPanel from '../components/GradesPanel.jsx';
import CourseStatsPanel from '../components/CourseStatsPanel.jsx';
import UserManagement from '../components/UserManagement.jsx';
import MaterialUpload from '../components/MaterialUpload.jsx';
import SubmissionsPanel from '../components/SubmissionsPanel.jsx';
import AnnouncementForm from '../components/AnnouncementForm.jsx';
import SecurityPanel from '../components/SecurityPanel.jsx';
import EnrollStudentPanel from '../components/EnrollStudentPanel.jsx';

export default function DashboardPage({
  profile,
  courses,
  selectedCourse,
  assignments,
  progress,
  reports,
  courseStats,
  announcements,
  attendance,
  grades,
  users,
  submissions,
  selectedAssignment,
  onLogout,
  onSelectCourse,
  onSelectAssignment,
  submissionDraft,
  setSubmissionDraft,
  onSubmitAssignment,
  courseDraft,
  setCourseDraft,
  assignmentDraft,
  setAssignmentDraft,
  onCreateCourse,
  onCreateAssignment,
  announcementDraft,
  setAnnouncementDraft,
  onCreateAnnouncement,
  onCreateUser,
  userDraft,
  setUserDraft,
  enrollDraft,
  setEnrollDraft,
  onEnrollStudent,
  attendanceDraft,
  setAttendanceDraft,
  onMarkAttendance,
  onGradeSubmission,
  status
}) {
  return (
    <div className="dashboard">
      <Topbar profile={profile} onLogout={onLogout} />

      <section className="grid">
        <div className="panel">
          <h3>Profile Summary</h3>
          <ProfileSummary profile={profile} />
        </div>
        <div className="panel">
          <h3>Courses</h3>
          <CourseList
            courses={courses}
            selectedCourseId={selectedCourse?.id}
            onSelect={onSelectCourse}
          />
        </div>
        <div className="panel">
          <h3>Assignments</h3>
          <AssignmentList
            selectedCourse={selectedCourse}
            assignments={assignments}
            role={profile?.role}
            submissionDraft={submissionDraft}
            setSubmissionDraft={setSubmissionDraft}
            onSubmitAssignment={onSubmitAssignment}
          />
        </div>
      </section>

      {profile?.role === 'STUDENT' && (
        <section className="grid">
          <div className="panel">
            <h3>Progress Tracking</h3>
            <ProgressPanel progress={progress} />
          </div>
          <div className="panel">
            <h3>Upcoming Assignments</h3>
            <UpcomingAssignmentsPanel assignments={assignments} />
          </div>
          <div className="panel">
            <h3>Notifications</h3>
            <NotificationsPanel announcements={announcements} />
          </div>
          <div className="panel">
            <h3>Attendance</h3>
            <AttendancePanel attendance={attendance} />
          </div>
          <div className="panel">
            <h3>Grades</h3>
            <GradesPanel grades={grades} />
          </div>
        </section>
      )}

      {profile?.role === 'FACULTY' && (
        <section className="grid">
          <div className="panel">
            <h3>Course Creation & Management</h3>
            <CourseCreateForm
              courseDraft={courseDraft}
              setCourseDraft={setCourseDraft}
              onSubmit={onCreateCourse}
              isAdmin={false}
            />
          </div>
          <div className="panel">
            <h3>Create Assignment</h3>
            <AssignmentCreateForm
              assignmentDraft={assignmentDraft}
              setAssignmentDraft={setAssignmentDraft}
              onSubmit={onCreateAssignment}
            />
          </div>
          <div className="panel">
            <h3>Post Announcement</h3>
            <AnnouncementForm
              selectedCourse={selectedCourse}
              announcementDraft={announcementDraft}
              setAnnouncementDraft={setAnnouncementDraft}
              onSubmit={onCreateAnnouncement}
            />
          </div>
          <div className="panel">
            <h3>Student Progress Tracking</h3>
            <CourseStatsPanel stats={courseStats} />
          </div>
          <div className="panel">
            <h3>Upload Materials</h3>
            <MaterialUpload />
          </div>
          <div className="panel">
            <h3>Grade Submissions</h3>
            <SubmissionsPanel
              assignments={assignments}
              selectedAssignment={selectedAssignment}
              onSelectAssignment={onSelectAssignment}
              submissions={submissions}
              onGradeSubmission={onGradeSubmission}
            />
          </div>
          <div className="panel">
            <h3>Attendance (Mark Students)</h3>
            <AttendancePanel
              attendance={attendance}
              canMark
              attendanceDraft={attendanceDraft}
              setAttendanceDraft={setAttendanceDraft}
              onMarkAttendance={onMarkAttendance}
            />
          </div>
          <div className="panel">
            <h3>Enroll Students</h3>
            <EnrollStudentPanel
              enrollDraft={enrollDraft}
              setEnrollDraft={setEnrollDraft}
              onEnroll={onEnrollStudent}
              selectedCourse={selectedCourse}
            />
          </div>
        </section>
      )}

      {profile?.role === 'ADMIN' && (
        <section className="grid">
          <div className="panel">
            <h3>Manage Users</h3>
            <UserManagement
              users={users}
              onCreateUser={onCreateUser}
              userDraft={userDraft}
              setUserDraft={setUserDraft}
            />
          </div>
          <div className="panel">
            <h3>System Analytics</h3>
            {reports && <ReportsPanel reports={reports} />}
          </div>
          <div className="panel">
            <h3>Course Stats</h3>
            <CourseStatsPanel stats={courseStats} />
          </div>
          <div className="panel">
            <h3>Create Course</h3>
            <CourseCreateForm
              courseDraft={courseDraft}
              setCourseDraft={setCourseDraft}
              onSubmit={onCreateCourse}
              isAdmin
            />
          </div>
          <div className="panel">
            <h3>Create Assignment</h3>
            <AssignmentCreateForm
              assignmentDraft={assignmentDraft}
              setAssignmentDraft={setAssignmentDraft}
              onSubmit={onCreateAssignment}
            />
          </div>
          <div className="panel">
            <h3>Security & Compliance</h3>
            <SecurityPanel />
          </div>
          <div className="panel">
            <h3>Enroll Students</h3>
            <EnrollStudentPanel
              enrollDraft={enrollDraft}
              setEnrollDraft={setEnrollDraft}
              onEnroll={onEnrollStudent}
              selectedCourse={selectedCourse}
            />
          </div>
        </section>
      )}

      <StatusMessage status={status} />
    </div>
  );
}
