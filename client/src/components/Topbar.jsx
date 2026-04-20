export default function Topbar({ profile, onLogout }) {
  return (
    <header className="topbar">
      <div>
        <p className="eyebrow">SecForgTek LMS</p>
        <h2>Welcome back, {profile?.fullName}</h2>
      </div>
      <div className="topbar-actions">
        <span className="chip">{profile?.role}</span>
        <button className="ghost" onClick={onLogout}>Logout</button>
      </div>
    </header>
  );
}
