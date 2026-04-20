export default function GradesPanel({ grades }) {
  if (!grades || grades.length === 0) {
    return <p>No graded submissions yet.</p>;
  }

  return (
    <div className="list">
      {grades.map((grade) => (
        <div key={grade.courseId} className="list-row">
          <div>
            <strong>{grade.courseTitle}</strong>
            <p>{grade.gradedSubmissions} graded submissions</p>
          </div>
          <span className="badge">Avg {grade.averageScore.toFixed(1)}</span>
        </div>
      ))}
    </div>
  );
}
