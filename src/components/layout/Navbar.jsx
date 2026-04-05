"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

/* ─────────────────────────────────────────────────────────────
   BRUTALIST NAVBAR — RAW CURATOR design system
   Colors:
     surface:          #f9f9f9
     on-surface:       #1a1c1c
     primary:          #5f6300
     primary-container:#f4fd2f  (acid-yellow)
     outline:          #787960
   Rules:
     • 0px border-radius everywhere
     • No box-shadow blur — solid offset plates only
     • Active link = thick bottom border in primary
     • Hover = bg-[#f4fd2f] flash (instant, 100ms)
     • Buttons = solid fill + solid shadow plate
───────────────────────────────────────────────────────────── */

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isAdminRoute =
    pathname === "/login" || pathname?.startsWith("/dashboard");

  const links = useMemo(
    () => [
      { href: "/", label: "Home" },
      { href: "/projects", label: "Projects" },
      { href: "/certificates", label: "Certificates" },
      { href: "/contact", label: "Contact" },
    ],
    [],
  );

  /* Escape key closes drawer */
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  /* Lock body scroll while drawer is open */
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700;900&display=swap');
        .nav-link-hover:hover { background-color: #f4fd2f; color: #1a1c1c; }
        .hire-btn:active       { transform: translate(4px, 4px); box-shadow: none !important; }
        .drawer-link:hover     { background-color: #f4fd2f; color: #1a1c1c; }
      `}</style>

      <header
        className="fixed top-0 left-0 w-full z-50"
        style={{
          backgroundColor: "#f9f9f9",
          borderBottom: "4px solid #1a1c1c",
          boxShadow: "0 8px 0 0 rgba(26,28,28,1)",
          fontFamily: "'Space Grotesk', sans-serif",
        }}
      >
        <nav className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">

          {/* ── Logo ── */}
          <Link
            href="/"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "1.5rem",
              fontWeight: 900,
              letterSpacing: "-0.04em",
              color: "#1a1c1c",
              textDecoration: "none",
              lineHeight: 1,
            }}
          >
            FAZIL PORTFOLIO
          </Link>

          {/* ── Desktop links ── */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => {
              const active =
                l.href === "/" ? pathname === "/" : pathname?.startsWith(l.href);

              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className="nav-link-hover"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "0.8125rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    color: active ? "#1a1c1c" : "rgba(26,28,28,0.65)",
                    textDecoration: "none",
                    padding: "4px 8px",
                    paddingBottom: active ? "2px" : "4px",
                    borderBottom: active ? "4px solid #5f6300" : "4px solid transparent",
                    transition: "background-color 0.1s, color 0.1s",
                  }}
                >
                  {l.label}
                </Link>
              );
            })}
          </div>

          {/* ── Desktop CTA ── */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/resume"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "0.8125rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: "#1a1c1c",
                textDecoration: "none",
                paddingBottom: "2px",
                borderBottom: "4px solid #1a1c1c",
                transition: "color 0.1s",
              }}
              className="nav-link-hover"
              onMouseEnter={e => { e.currentTarget.style.borderBottomColor = "#f4fd2f"; }}
              onMouseLeave={e => { e.currentTarget.style.borderBottomColor = "#1a1c1c"; }}
            >
              Resume
            </Link>

            <a
              href="mailto:fazilraphi14@gmail.com"
              className="hire-btn"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "0.8125rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                backgroundColor: "#5f6300",
                color: "#ffffff",
                border: "2px solid #1a1c1c",
                padding: "8px 20px",
                cursor: "pointer",
                textDecoration: "none",
                display: "inline-block",
                boxShadow: "4px 4px 0 0 rgba(26,28,28,1)",
                transition: "box-shadow 0.1s, transform 0.1s, background-color 0.1s",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = "#f4fd2f";
                e.currentTarget.style.color = "#1a1c1c";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = "#5f6300";
                e.currentTarget.style.color = "#ffffff";
              }}
            >
              Hire Me
            </a>
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="flex md:hidden flex-col items-center justify-center"
            style={{
              width: 44,
              height: 44,
              backgroundColor: open ? "#f4fd2f" : "#eeeeee",
              border: "2px solid #1a1c1c",
              boxShadow: open ? "none" : "3px 3px 0 0 rgba(26,28,28,1)",
              transform: open ? "translate(3px,3px)" : "none",
              cursor: "pointer",
              gap: 5,
              transition: "all 0.15s",
              padding: 0,
            }}
          >
            {/* Three lines → X morph */}
            <span
              style={{
                display: "block",
                width: 20,
                height: 2.5,
                backgroundColor: "#1a1c1c",
                transform: open ? "translateY(7.5px) rotate(45deg)" : "none",
                transition: "transform 0.2s",
              }}
            />
            <span
              style={{
                display: "block",
                width: 20,
                height: 2.5,
                backgroundColor: "#1a1c1c",
                opacity: open ? 0 : 1,
                transition: "opacity 0.15s",
              }}
            />
            <span
              style={{
                display: "block",
                width: 20,
                height: 2.5,
                backgroundColor: "#1a1c1c",
                transform: open ? "translateY(-7.5px) rotate(-45deg)" : "none",
                transition: "transform 0.2s",
              }}
            />
          </button>
        </nav>
      </header>

      {/* ─────────────────────────────────────────────
          Mobile Drawer
      ───────────────────────────────────────────── */}
      {/* Backdrop */}
      <div
        className="md:hidden fixed inset-0 z-40"
        style={{
          backgroundColor: "rgba(26,28,28,0.6)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.2s",
        }}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* Panel — slides in from the RIGHT, brutalist style */}
      <aside
        className="md:hidden fixed top-0 right-0 z-50 h-full"
        style={{
          width: "85%",
          maxWidth: 340,
          backgroundColor: "#f9f9f9",
          borderLeft: "4px solid #1a1c1c",
          boxShadow: open ? "-8px 0 0 0 rgba(26,28,28,1)" : "none",
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.22s cubic-bezier(.22,1,.36,1), box-shadow 0.22s",
          fontFamily: "'Space Grotesk', sans-serif",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Drawer header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 24px",
            height: 80,
            borderBottom: "4px solid #1a1c1c",
            backgroundColor: "#1a1c1c",
          }}
        >
          <span
            style={{
              fontWeight: 900,
              fontSize: "1.125rem",
              letterSpacing: "-0.04em",
              color: "#f4fd2f",
            }}
          >
            MENU
          </span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            style={{
              width: 40,
              height: 40,
              backgroundColor: "#f4fd2f",
              border: "2px solid #f4fd2f",
              color: "#1a1c1c",
              fontWeight: 900,
              fontSize: "1rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "transform 0.1s",
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "rotate(90deg)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "rotate(0deg)"; }}
          >
            ✕
          </button>
        </div>

        {/* Drawer links */}
        <div style={{ flex: 1, padding: "16px 0", display: "flex", flexDirection: "column" }}>
          {links.map((l, i) => {
            const active =
              l.href === "/" ? pathname === "/" : pathname?.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="drawer-link"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "16px 24px",
                  fontWeight: 700,
                  fontSize: "1rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  textDecoration: "none",
                  color: active ? "#1a1c1c" : "rgba(26,28,28,0.65)",
                  backgroundColor: active ? "#f4fd2f" : "transparent",
                  borderBottom: "2px solid #eeeeee",
                  borderLeft: active ? "6px solid #5f6300" : "6px solid transparent",
                  transition: "background-color 0.1s, color 0.1s, border-left-color 0.1s",
                }}
              >
                <span>{l.label}</span>
                <span style={{ fontSize: "1.25rem", fontWeight: 900 }}>→</span>
              </Link>
            );
          })}
        </div>

        {/* Drawer footer CTAs */}
        <div
          style={{
            padding: 24,
            borderTop: "4px solid #1a1c1c",
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          <Link
            href="/resume"
            onClick={() => setOpen(false)}
            style={{
              display: "block",
              textAlign: "center",
              padding: "14px 24px",
              fontWeight: 700,
              fontSize: "0.875rem",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              textDecoration: "none",
              color: "#1a1c1c",
              backgroundColor: "#eeeeee",
              border: "2px solid #1a1c1c",
              boxShadow: "4px 4px 0 0 rgba(26,28,28,1)",
              transition: "all 0.1s",
            }}
          >
            Resume ↓
          </Link>

          <a
            href="mailto:fazilraphi14@gmail.com"
            onClick={() => setOpen(false)}
            style={{
              display: "block",
              width: "100%",
              textAlign: "center",
              padding: "14px 24px",
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 900,
              fontSize: "0.875rem",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              cursor: "pointer",
              color: "#ffffff",
              textDecoration: "none",
              backgroundColor: "#5f6300",
              border: "2px solid #1a1c1c",
              boxShadow: "4px 4px 0 0 rgba(244,253,47,1)",
              transition: "all 0.1s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = "#f4fd2f";
              e.currentTarget.style.color = "#1a1c1c";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = "#5f6300";
              e.currentTarget.style.color = "#ffffff";
            }}
          >
            Hire Me →
          </a>
        </div>
      </aside>
    </>
  );
}
