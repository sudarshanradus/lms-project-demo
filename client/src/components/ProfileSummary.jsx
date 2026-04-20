export default function ProfileSummary({ profile }) {
  if (!profile) {
    return <p>Profile loading...</p>;
  }

  return (
    <div className="profile-grid">
      <div>
        <span>Name</span>
        <strong>{profile.fullName}</strong>
      </div>
      <div>
        <span>Email</span>
        <strong>{profile.email}</strong>
      </div>
      <div>
        <span>Role</span>
        <strong>{profile.role}</strong>
      </div>
      {profile.studentId && (
        <div>
          <span>Student ID</span>
          <strong>{profile.studentId}</strong>
        </div>
      )}
      {profile.facultyId && (
        <div>
          <span>Faculty ID</span>
          <strong>{profile.facultyId}</strong>
        </div>
      )}
    </div>
  );
}
