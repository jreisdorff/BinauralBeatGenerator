import { NavLink, Outlet } from "react-router-dom";

const NAV = [
  { to: "/", label: "Overview" },
  { to: "/hero", label: "Hero" },
  { to: "/ancient", label: "Ancient tuning" },
  { to: "/binaural", label: "Binaural" },
  { to: "/calm", label: "Calm sound" },
  { to: "/acoustics", label: "Acoustics" },
  { to: "/pyramids", label: "Pyramids" },
  { to: "/reference", label: "Reference" },
] as const;

export function DocLayout() {
  return (
    <div className="doc-root">
      <header className="site-header">
        <div className="brand">SOUNDWORLD — TECHNICAL WALKTHROUGH</div>
        <nav className="site-nav" aria-label="Primary">
          {NAV.map((item, i) => (
            <span key={item.to} className="nav-item">
              {i > 0 ? (
                <span className="nav-sep" aria-hidden="true">
                  {" "}
                  |{" "}
                </span>
              ) : null}
              <NavLink
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                {item.label}
              </NavLink>
            </span>
          ))}
        </nav>
      </header>
      <main className="doc-main">
        <Outlet />
      </main>
    </div>
  );
}
