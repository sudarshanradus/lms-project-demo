export default function EnrollStudentPanel({ enrollDraft, setEnrollDraft, onEnroll, selectedCourse }) {
  return (
    <form onSubmit={onEnroll} className="stack">
      <input
        placeholder="Course ID"
        value={enrollDraft.courseId}
        onChange={(event) => setEnrollDraft({ ...enrollDraft, courseId: event.target.value })}
        required
      />
      <button
        className="ghost"
        type="button"
        onClick={() => {
          if (selectedCourse) {
            setEnrollDraft({ ...enrollDraft, courseId: String(selectedCourse.id) });
          }
        }}
        disabled={!selectedCourse}
      >
        Use Selected Course
      </button>
      <input
        placeholder="Student ID"
        value={enrollDraft.studentId}
        onChange={(event) => setEnrollDraft({ ...enrollDraft, studentId: event.target.value })}
        required
      />
      <p className="helper">Course ID is shown in the Courses list.</p>
      <button className="primary" type="submit">Enroll Student</button>
    </form>
  );
}
