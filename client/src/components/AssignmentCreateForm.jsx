export default function AssignmentCreateForm({ assignmentDraft, setAssignmentDraft, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="stack">
      <input
        placeholder="Title"
        value={assignmentDraft.title}
        onChange={(event) => setAssignmentDraft({ ...assignmentDraft, title: event.target.value })}
        required
      />
      <textarea
        placeholder="Description"
        value={assignmentDraft.description}
        onChange={(event) => setAssignmentDraft({ ...assignmentDraft, description: event.target.value })}
      />
      <input
        type="date"
        value={assignmentDraft.dueDate}
        onChange={(event) => setAssignmentDraft({ ...assignmentDraft, dueDate: event.target.value })}
      />
      <button className="primary" type="submit">Add Assignment</button>
    </form>
  );
}
