export default function AnnouncementForm({
  selectedCourse,
  announcementDraft,
  setAnnouncementDraft,
  onSubmit
}) {
  return (
    <form onSubmit={onSubmit} className="stack">
      <input
        placeholder="Title"
        value={announcementDraft.title}
        onChange={(event) => setAnnouncementDraft({ ...announcementDraft, title: event.target.value })}
        required
      />
      <textarea
        placeholder="Message"
        value={announcementDraft.message}
        onChange={(event) => setAnnouncementDraft({ ...announcementDraft, message: event.target.value })}
        required
      />
      <p className="helper">Posting to: {selectedCourse ? selectedCourse.title : 'Select a course first'}</p>
      <button className="primary" type="submit" disabled={!selectedCourse}>
        Post Announcement
      </button>
    </form>
  );
}
