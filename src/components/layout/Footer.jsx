"use client";

import { Github, Linkedin, Mail, Phone } from "lucide-react";
import Link from "next/link";

/* ─────────────────────────────────────────────────────────────
   BRUTALIST FOOTER — RAW CURATOR design system
   Colors:
     surface:           #f9f9f9
     on-surface:        #1a1c1c
     primary:           #5f6300
     primary-container: #f4fd2f  (acid-yellow)
     surface-container: #eeeeee
   Rules:
     • 0px border-radius everywhere
     • No blur shadows — solid offset plates only
     • Heavy 4-8px borders in #1a1c1c
     • Inverted dark zone for footer (bg-[#1a1c1c])
     • Hover = bg-[#f4fd2f] flash (instant, 100ms)
───────────────────────────────────────────────────────────── */

export default function Footer() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700;900&family=Inter:wght@400;700&display=swap');
        .footer-social-btn:hover { background-color: #f4fd2f !important; color: #1a1c1c !important; border-color: #f4fd2f !important; }
        .footer-social-btn:hover svg { color: #1a1c1c; }
        .footer-link:hover { color: #f4fd2f !important; font-style: italic; }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }
        @media (max-width: 639px) {
          .footer-back-to-top {
            width: 100%;
            justify-content: space-between;
          }
        }
      `}</style>

      <footer
        style={{
          backgroundColor: "#1a1c1c",
          borderTop: "8px solid #5f6300",
          fontFamily: "'Space Grotesk', sans-serif",
        }}
      >
        {/* ── Top accent stripe ── */}
        <div
          style={{
            backgroundColor: "#f4fd2f",
            height: 4,
            width: "100%",
          }}
        />

        <div className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 sm:pt-16 lg:px-8">
          {/* ── Main grid ── */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
            style={{
              borderTop: "4px solid rgba(244,253,47,0.15)",
            }}
          >

            {/* ── Brand column ── */}
            <div
              className="border-b px-0 py-8 sm:py-10 sm:pr-8 xl:border-b-0 xl:border-r"
              style={{
                borderColor: "rgba(244,253,47,0.1)",
              }}
            >
              {/* Wordmark */}
              <div
                style={{
                  fontSize: "1.75rem",
                  fontWeight: 900,
                  letterSpacing: "-0.04em",
                  color: "#f4fd2f",
                  lineHeight: 1,
                  marginBottom: 6,
                }}
              >
                FAZIL PORTFOLIO
              </div>
              <div
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  color: "rgba(244,253,47,0.5)",
                  marginBottom: 20,
                }}
              >
               
              </div>

              <p
                className="max-w-xs pr-2"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.9rem",
                  color: "rgba(249,249,249,0.55)",
                  lineHeight: 1.7,
                  marginBottom: 24,
                }}
              >
                Building clean interfaces, scalable systems, and full‑stack products with surgical precision.
              </p>

              {/* Availability badge — brutalist pill */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  backgroundColor: "transparent",
                  border: "2px solid #5f6300",
                  padding: "6px 14px",
                  boxShadow: "3px 3px 0 0 rgba(95,99,0,1)",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    width: 8,
                    height: 8,
                    backgroundColor: "#f4fd2f",
                    flexShrink: 0,
                    animation: "pulse 2s infinite",
                  }}
                />
                <span
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "#f4fd2f",
                  }}
                >
                  Available for work
                </span>
              </div>
            </div>

            {/* ── Contact column ── */}
            <div
              className="border-b px-0 py-8 sm:border-b-0 sm:px-8 sm:py-10 xl:border-r xl:px-8"
              style={{
                borderColor: "rgba(244,253,47,0.1)",
              }}
            >
              <div
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 900,
                  textTransform: "uppercase",
                  letterSpacing: "0.2em",
                  color: "rgba(244,253,47,0.5)",
                  marginBottom: 20,
                }}
              >
                Contact
              </div>

              <div className="flex flex-col gap-3">
                {[
                  { icon: Phone, text: "+91-6238206892" },
                  { icon: Mail, text: "fazilraphi14@gmail.com" },
                  { icon: Mail, text: "fazil.dev@outlook.com" },
                ].map(({ icon: Icon, text }) => (
                  <div
                    key={text}
                    className="min-w-0"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.875rem",
                      color: "rgba(249,249,249,0.6)",
                    }}
                  >
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 28,
                        height: 28,
                        backgroundColor: "rgba(244,253,47,0.08)",
                        border: "1px solid rgba(244,253,47,0.2)",
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={13} color="#f4fd2f" />
                    </span>
                    <span style={{ overflowWrap: "anywhere" }}>{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Connect column ── */}
            <div className="px-0 py-8 sm:col-span-2 sm:py-10 xl:col-span-1 xl:pl-10">
              <div
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 900,
                  textTransform: "uppercase",
                  letterSpacing: "0.2em",
                  color: "rgba(244,253,47,0.5)",
                  marginBottom: 20,
                }}
              >
                Connect
              </div>

              {/* Social icon buttons */}
              <div className="mb-6 flex flex-wrap gap-3">
                {[
                  {
                    href: "https://github.com/FazilPRaphi",
                    icon: Github,
                    label: "GitHub",
                  },
                  {
                    href: "https://www.linkedin.com/in/fazil-p-raphi/",
                    icon: Linkedin,
                    label: "LinkedIn",
                  },
                  {
                    href: "mailto:fazilraphi14@gmail.com",
                    icon: Mail,
                    label: "Email",
                  },
                ].map(({ href, icon: Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="footer-social-btn"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 48,
                      height: 48,
                      backgroundColor: "#2f3131",
                      border: "2px solid rgba(249,249,249,0.15)",
                      color: "rgba(249,249,249,0.7)",
                      boxShadow: "3px 3px 0 0 rgba(95,99,0,0.6)",
                      transition: "background-color 0.1s, border-color 0.1s, color 0.1s, box-shadow 0.1s, transform 0.1s",
                      textDecoration: "none",
                      cursor: "pointer",
                    }}
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>

              <div
                className="max-w-xl"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.875rem",
                  color: "rgba(249,249,249,0.45)",
                  lineHeight: 1.7,
                }}
              >
                Prefer email?{" "}
                <a
                  href="mailto:fazilraphi14@gmail.com"
                  className="footer-link break-all sm:break-normal"
                  style={{
                    color: "rgba(249,249,249,0.75)",
                    textDecoration: "underline",
                    textUnderlineOffset: 4,
                    textDecorationColor: "#5f6300",
                    transition: "color 0.1s",
                  }}
                >
                  fazilraphi14@gmail.com
                </a>
              </div>

              {/* Nav quick links */}
              <div className="mt-6 flex flex-col gap-2">
                {[
                  { label: "Projects", href: "/projects" },
                  { label: "Certificates", href: "/certificates" },
                  { label: "Contact", href: "/contact" },
                  { label: "Resume", href: "/resume" },
                ].map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="footer-link inline-flex items-center gap-2"
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      color: "rgba(249,249,249,0.4)",
                      textDecoration: "none",
                      transition: "color 0.1s",
                    }}
                  >
                    <span style={{ color: "#5f6300" }}>→</span> {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* ── Bottom bar ── */}
          <div
            className="flex flex-col items-start gap-3 py-6 sm:flex-row sm:items-center sm:justify-between"
            style={{
              borderTop: "4px solid rgba(244,253,47,0.12)",
              marginTop: 0,
            }}
          >


            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.75rem",
                color: "rgba(249,249,249,0.3)",
              }}
            >
              Crafted with Next.js + Supabase
            </div>

            {/* Back to top */}
            <button
              className="footer-back-to-top"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
            >
              <span
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "0.75rem",
                  fontWeight: 900,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "#f4fd2f",
                }}
              >
                BACK TO TOP
              </span>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 40,
                  height: 40,
                  backgroundColor: "#f4fd2f",
                  color: "#1a1c1c",
                  fontSize: "1rem",
                  fontWeight: 900,
                  transition: "transform 0.15s",
                  border: "2px solid #f4fd2f",
                  boxShadow: "3px 3px 0 0 rgba(95,99,0,1)",
                  flexShrink: 0,
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}
              >
                ↑
              </span>
            </button>
          </div>
        </div>
      </footer>
    </>
  );
}
