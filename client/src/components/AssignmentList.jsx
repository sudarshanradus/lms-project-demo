export default function AssignmentList({
  selectedCourse,
  assignments,
  role,
  submissionDraft,
  setSubmissionDraft,
  onSubmitAssignment
}) {
  if (!selectedCourse) {
    return <p>Select a course to see assignments.</p>;
  }

  return (
    <div className="assignment-list">
      {assignments.length === 0 && <p>No assignments yet.</p>}
      {assignments.map((assignment) => (
        <div key={assignment.id} className="assignment">
          <div>
            <strong>{assignment.title}</strong>
            <p>{assignment.description}</p>
            {assignment.dueDate && <small>Due: {assignment.dueDate}</small>}
          </div>
          {role === 'STUDENT' && (
            <form onSubmit={(event) => onSubmitAssignment(event, assignment.id)} className="inline-form">
              <input
                placeholder="Paste submission notes"
                value={submissionDraft.content}
                onChange={(event) => setSubmissionDraft({ content: event.target.value })}
              />
              <button className="primary" type="submit">Submit</button>
            </form>
          )}
        </div>
      ))}
    </div>
  );
}
