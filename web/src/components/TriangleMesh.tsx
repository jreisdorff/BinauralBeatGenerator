import "./TriangleMesh.css";

export function TriangleMesh() {
  return (
    <div className="tri-mesh" aria-hidden>
      <div className="tri tri--a" />
      <div className="tri tri--b" />
      <div className="tri tri--c" />
      <div className="tri tri--d" />
      <div className="tri tri--e" />
      <div className="tri-grid" />
    </div>
  );
}
