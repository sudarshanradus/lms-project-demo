export default function AttendancePanel({
  attendance,
  canMark = false,
  attendanceDraft,
  setAttendanceDraft,
  onMarkAttendance
}) {
  return (
    <div className="stack">
      {attendance && attendance.length > 0 ? (
        <div className="list">
          {attendance.map((entry) => (
            <div key={entry.courseId} className="list-row">
              <div>
                <strong>{entry.courseTitle}</strong>
                <p>{entry.present} of {entry.total} classes present</p>
              </div>
              <span className="badge">{Math.round(entry.rate * 100)}%</span>
            </div>
          ))}
        </div>
      ) : (
        <p>No attendance records yet.</p>
      )}

      {canMark && (
        <form onSubmit={onMarkAttendance} className="stack">
          <input
            placeholder="Course ID"
            value={attendanceDraft.courseId}
            onChange={(event) => setAttendanceDraft({ ...attendanceDraft, courseId: event.target.value })}
            required
          />
          <input
            placeholder="Student ID"
            value={attendanceDraft.studentId}
            onChange={(event) => setAttendanceDraft({ ...attendanceDraft, studentId: event.target.value })}
            required
          />
          <input
            type="date"
            value={attendanceDraft.date}
            onChange={(event) => setAttendanceDraft({ ...attendanceDraft, date: event.target.value })}
          />
          <select
            value={attendanceDraft.status}
            onChange={(event) => setAttendanceDraft({ ...attendanceDraft, status: event.target.value })}
          >
            <option value="PRESENT">Present</option>
            <option value="ABSENT">Absent</option>
            <option value="LATE">Late</option>
          </select>
          <button className="primary" type="submit">Mark Attendance</button>
        </form>
      )}
    </div>
  );
}
