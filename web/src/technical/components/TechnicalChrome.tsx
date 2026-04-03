"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/technical", label: "Overview", match: "exact" as const },
  { href: "/technical/ancient", label: "Ancient tuning", match: "prefix" as const },
  { href: "/technical/binaural", label: "Binaural", match: "prefix" as const },
  { href: "/technical/calm", label: "Calm sound", match: "prefix" as const },
  { href: "/technical/acoustics", label: "Acoustics", match: "prefix" as const },
  { href: "/technical/pyramids", label: "Pyramids", match: "prefix" as const },
  { href: "/technical/reference", label: "Reference", match: "prefix" as const },
];

function pathIsActive(pathname: string, item: (typeof NAV)[number]): boolean {
  if (item.match === "exact") {
    return pathname === item.href || pathname === `${item.href}/`;
  }
  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}

export function TechnicalChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname() ?? "";

  return (
    <div className="doc-root">
      <header className="site-header">
        <div className="brand">SOUNDWORLD — TECHNICAL WALKTHROUGH</div>
        <nav className="site-nav" aria-label="Primary">
          {NAV.map((item, i) => (
            <span key={item.href} className="nav-item">
              {i > 0 ? (
                <span className="nav-sep" aria-hidden="true">
                  {" "}
                  |{" "}
                </span>
              ) : null}
              <Link
                href={item.href}
                className={
                  pathIsActive(pathname, item) ? "nav-link active" : "nav-link"
                }
              >
                {item.label}
              </Link>
            </span>
          ))}
        </nav>
      </header>
      <main className="doc-main">{children}</main>
    </div>
  );
}
