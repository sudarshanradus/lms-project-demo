export default function UserManagement({ users, onCreateUser, userDraft, setUserDraft }) {
  return (
    <div className="stack">
      <form onSubmit={onCreateUser} className="stack">
        <input
          placeholder="Full Name"
          value={userDraft.fullName}
          onChange={(event) => setUserDraft({ ...userDraft, fullName: event.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={userDraft.email}
          onChange={(event) => setUserDraft({ ...userDraft, email: event.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={userDraft.password}
          onChange={(event) => setUserDraft({ ...userDraft, password: event.target.value })}
          required
        />
        <select
          value={userDraft.role}
          onChange={(event) => setUserDraft({ ...userDraft, role: event.target.value })}
        >
          <option value="STUDENT">Student</option>
          <option value="FACULTY">Faculty</option>
          <option value="ADMIN">Admin</option>
        </select>
        <input
          placeholder="Student ID (optional)"
          value={userDraft.studentId}
          onChange={(event) => setUserDraft({ ...userDraft, studentId: event.target.value })}
        />
        <input
          placeholder="Faculty ID (optional)"
          value={userDraft.facultyId}
          onChange={(event) => setUserDraft({ ...userDraft, facultyId: event.target.value })}
        />
        <button className="primary" type="submit">Create User</button>
      </form>

      <div className="list">
        {users.map((user) => (
          <div key={user.id} className="list-row">
            <div>
              <strong>{user.fullName}</strong>
              <p>{user.email}</p>
            </div>
            <span className="badge">{user.role}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
