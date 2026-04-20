import StatusMessage from '../components/StatusMessage.jsx';

export default function LandingPage({
  authMode,
  setAuthMode,
  loginForm,
  setLoginForm,
  registerForm,
  setRegisterForm,
  onLogin,
  onRegister,
  status
}) {
  return (
    <div className="page">
      <header className="hero">
        <div className="hero-copy">
          <p className="eyebrow">SecForgTek Learning Suite</p>
          <h1>Build skills. Track mastery. Lead learning.</h1>
          <p className="lead">
            An all-in-one LMS for students, faculty, and admins with clean dashboards, rich
            analytics, and fast workflows.
          </p>
          <div className="hero-actions">
            <button className="primary" onClick={() => setAuthMode('login')}>Login</button>
            <button className="ghost" onClick={() => setAuthMode('register')}>Create account</button>
          </div>
        </div>
        <div className="hero-card">
          <div className="card-header">Role Access</div>
          <ul>
            <li>Admin control center</li>
            <li>Faculty course studio</li>
            <li>Student progress hub</li>
          </ul>
        </div>
      </header>

      <section className="auth-panel">
        <div className="auth-tabs">
          <button className={authMode === 'login' ? 'tab active' : 'tab'} onClick={() => setAuthMode('login')}>Login</button>
          <button className={authMode === 'register' ? 'tab active' : 'tab'} onClick={() => setAuthMode('register')}>Sign up</button>
        </div>

        {authMode === 'login' ? (
          <form onSubmit={onLogin} className="auth-form">
            <label>
              Email
              <input
                type="email"
                value={loginForm.email}
                onChange={(event) => setLoginForm({ ...loginForm, email: event.target.value })}
                required
              />
            </label>
            <label>
              Password
              <input
                type="password"
                value={loginForm.password}
                onChange={(event) => setLoginForm({ ...loginForm, password: event.target.value })}
                required
              />
            </label>
            <button className="primary" type="submit">Sign in</button>
          </form>
        ) : (
          <form onSubmit={onRegister} className="auth-form">
            <label>
              Full name
              <input
                value={registerForm.fullName}
                onChange={(event) => setRegisterForm({ ...registerForm, fullName: event.target.value })}
                required
              />
            </label>
            <label>
              Email
              <input
                type="email"
                value={registerForm.email}
                onChange={(event) => setRegisterForm({ ...registerForm, email: event.target.value })}
                required
              />
            </label>
            <label>
              Password
              <input
                type="password"
                value={registerForm.password}
                onChange={(event) => setRegisterForm({ ...registerForm, password: event.target.value })}
                required
              />
            </label>
            <label>
              Role
              <select value={registerForm.role} onChange={(event) => setRegisterForm({ ...registerForm, role: event.target.value })}>
                <option value="STUDENT">Student</option>
                <option value="FACULTY">Faculty</option>
              </select>
            </label>
            {registerForm.role === 'STUDENT' && (
              <label>
                Student ID
                <input
                  value={registerForm.studentId}
                  onChange={(event) => setRegisterForm({ ...registerForm, studentId: event.target.value })}
                />
              </label>
            )}
            {registerForm.role === 'FACULTY' && (
              <label>
                Faculty ID
                <input
                  value={registerForm.facultyId}
                  onChange={(event) => setRegisterForm({ ...registerForm, facultyId: event.target.value })}
                />
              </label>
            )}
            <button className="primary" type="submit">Create account</button>
          </form>
        )}
        <StatusMessage status={status} />
      </section>
    </div>
  );
}
