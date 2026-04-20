export default function UpcomingAssignmentsPanel({ assignments }) {
  if (!assignments || assignments.length === 0) {
    return <p>No upcoming assignments.</p>;
  }

  const upcoming = [...assignments]
    .filter((assignment) => assignment.dueDate)
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

  if (upcoming.length === 0) {
    return <p>No due dates set yet.</p>;
  }

  return (
    <div className="list">
      {upcoming.map((assignment) => (
        <div key={assignment.id} className="list-row">
          <div>
            <strong>{assignment.title}</strong>
            <p>{assignment.description}</p>
          </div>
          <span className="badge">Due {assignment.dueDate}</span>
        </div>
      ))}
    </div>
  );
}
