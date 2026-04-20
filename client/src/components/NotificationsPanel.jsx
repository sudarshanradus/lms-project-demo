export default function NotificationsPanel({ announcements }) {
  if (!announcements || announcements.length === 0) {
    return <p>No announcements yet.</p>;
  }

  return (
    <div className="notice-list">
      {announcements.map((notice) => (
        <div key={notice.id} className="notice">
          <strong>{notice.title}</strong>
          <p>{notice.message}</p>
          <small>{new Date(notice.createdAt).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
}
