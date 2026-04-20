export default function StatusMessage({ status }) {
  if (!status) {
    return null;
  }
  return <p className="status">{status}</p>;
}
