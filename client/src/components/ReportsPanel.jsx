export default function ReportsPanel({ reports }) {
  return (
    <div className="stats">
      <div>
        <span>Users</span>
        <strong>{reports.totalUsers}</strong>
      </div>
      <div>
        <span>Courses</span>
        <strong>{reports.totalCourses}</strong>
      </div>
      <div>
        <span>Enrollments</span>
        <strong>{reports.totalEnrollments}</strong>
      </div>
      <div>
        <span>Assignments</span>
        <strong>{reports.totalAssignments}</strong>
      </div>
      <div>
        <span>Submissions</span>
        <strong>{reports.totalSubmissions}</strong>
      </div>
    </div>
  );
}
