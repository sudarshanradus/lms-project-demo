export default function CourseStatsPanel({ stats }) {
  if (!stats || stats.length === 0) {
    return <p>No course stats yet.</p>;
  }

  return (
    <div className="list">
      {stats.map((stat) => (
        <div key={stat.courseId} className="list-row">
          <div>
            <strong>{stat.courseTitle}</strong>
            <p>Enrolled students</p>
          </div>
          <span className="badge">{stat.enrolledCount}</span>
        </div>
      ))}
    </div>
  );
}
