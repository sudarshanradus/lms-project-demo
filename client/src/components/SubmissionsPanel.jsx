import { useMemo, useState } from 'react';

export default function SubmissionsPanel({
  assignments,
  selectedAssignment,
  onSelectAssignment,
  submissions,
  onGradeSubmission
}) {
  const [drafts, setDrafts] = useState({});

  const options = useMemo(() => assignments || [], [assignments]);

  function handleChange(submissionId, field, value) {
    setDrafts((prev) => ({
      ...prev,
      [submissionId]: {
        ...prev[submissionId],
        [field]: value
      }
    }));
  }

  return (
    <div className="stack">
      <select
        value={selectedAssignment?.id || ''}
        onChange={(event) => {
          const selected = options.find((assignment) => assignment.id === Number(event.target.value));
          onSelectAssignment(selected || null);
        }}
      >
        <option value="">Select assignment</option>
        {options.map((assignment) => (
          <option key={assignment.id} value={assignment.id}>
            {assignment.title}
          </option>
        ))}
      </select>

      {(!submissions || submissions.length === 0) && <p>No submissions yet.</p>}
      {submissions.map((submission) => (
        <div key={submission.id} className="submission">
          <div>
            <strong>{submission.studentName}</strong>
            <p>{submission.content}</p>
            <small>Submitted: {new Date(submission.submittedAt).toLocaleString()}</small>
          </div>
          <div className="inline-form">
            <input
              type="number"
              placeholder="Score"
              value={drafts[submission.id]?.score ?? submission.score ?? ''}
              onChange={(event) => handleChange(submission.id, 'score', event.target.value)}
            />
            <input
              placeholder="Feedback"
              value={drafts[submission.id]?.feedback ?? submission.feedback ?? ''}
              onChange={(event) => handleChange(submission.id, 'feedback', event.target.value)}
            />
            <button
              className="primary"
              type="button"
              onClick={() => onGradeSubmission(submission.id, drafts[submission.id] || {})}
            >
              Save Grade
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
