export default function SecurityPanel() {
  return (
    <div className="stack">
      <label className="toggle">
        <input type="checkbox" defaultChecked />
        <span>Require strong passwords</span>
      </label>
      <label className="toggle">
        <input type="checkbox" />
        <span>Enable MFA prompts</span>
      </label>
      <label className="toggle">
        <input type="checkbox" defaultChecked />
        <span>Audit log retention</span>
      </label>
      <p className="helper">These settings are UI-only for now.</p>
    </div>
  );
}
