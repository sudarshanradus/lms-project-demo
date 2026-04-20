export default function CourseCreateForm({ courseDraft, setCourseDraft, onSubmit, isAdmin }) {
  return (
    <form onSubmit={onSubmit} className="stack">
      <input
        placeholder="Title"
        value={courseDraft.title}
        onChange={(event) => setCourseDraft({ ...courseDraft, title: event.target.value })}
        required
      />
      <input
        placeholder="Course Code"
        value={courseDraft.code}
        onChange={(event) => setCourseDraft({ ...courseDraft, code: event.target.value })}
        required
      />
      <textarea
        placeholder="Description"
        value={courseDraft.description}
        onChange={(event) => setCourseDraft({ ...courseDraft, description: event.target.value })}
      />
      {isAdmin && (
        <input
          placeholder="Faculty ID"
          value={courseDraft.facultyId}
          onChange={(event) => setCourseDraft({ ...courseDraft, facultyId: event.target.value })}
        />
      )}
      <button className="primary" type="submit">Add Course</button>
    </form>
  );
}
