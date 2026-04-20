export default function ProgressPanel({ progress }) {
  if (!progress || progress.length === 0) {
    return <p>No progress yet.</p>;
  }

  return (
    <div>
      {progress.map((entry) => (
        <div className="progress-row" key={entry.courseId}>
          <span>{entry.courseTitle}</span>
          <div className="progress-bar">
            <div style={{ width: `${Math.round(entry.completionRate * 100)}%` }} />
          </div>
          <span>{Math.round(entry.completionRate * 100)}%</span>
        </div>
      ))}
    </div>
  );
}
