"use client";

import Footer from "@/components/layout/Footer";
import PageShell from "@/components/layout/PageShell";
import {
  Github,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   BRUTALIST CONTACT PAGE — RAW CURATOR design system
   Colors:
     surface:           #f9f9f9
     on-surface:        #1a1c1c
     primary:           #5f6300
     primary-container: #f4fd2f  (acid-yellow)
     surface-container: #eeeeee
     surface-container-highest: #e2e2e2
   Rules:
     • 0px border-radius everywhere
     • Solid offset shadow plates — no blur
     • Heavy 4px borders in #1a1c1c
     • Hover = instant #f4fd2f fill + color invert
───────────────────────────────────────────────────────────── */

const CONTACT_ROWS = [
  {
    icon: Phone,
    label: "Phone",
    value: "+91 6238206892",
    href: "tel:+916238206892",
  },
  {
    icon: Mail,
    label: "Email",
    value: "fazilraphi14@gmail.com",
    href: "mailto:fazilraphi14@gmail.com",
  },
  {
    icon: Mail,
    label: "Alt Email",
    value: "fazil.dev@outlook.com",
    href: "mailto:fazil.dev@outlook.com",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Kerala, India",
    href: null,
  },
  {
    icon: GraduationCap,
    label: "Institution",
    value: "College Of Engineering Kallooppara",
    href: "https://www.cek.ac.in/",
    external: true,
  },
];

const SOCIALS = [
  {
    icon: Github,
    label: "GitHub",
    sub: "fazilraphi",
    href: "https://github.com/FazilPRaphi",
    num: "01",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    sub: "fazil-p-raphi",
    href: "https://www.linkedin.com/in/fazil-p-raphi/",
    num: "02",
  },
  {
    icon: Instagram,
    label: "Instagram",
    sub: "_faz_i_z_w",
    href: "https://instagram.com/_faz_i_z_w",
    num: "03",
  },
];

function ContactRow({ icon: Icon, label, value, href, external, index }) {
  const content = (
    <div
      style={{
        display: "flex",
        alignItems: "stretch",
        gap: 0,
        borderBottom: "2px solid #e2e2e2",
        transition: "background-color 0.1s",
        cursor: href ? "pointer" : "default",
        opacity: 0,
        animation: `revealUp 0.45s ${0.1 + index * 0.07}s forwards`,
      }}
      className="contact-row"
    >
      {/* Icon cell */}
      <div
        style={{
          width: 56,
          minHeight: 64,
          backgroundColor: "#1a1c1c",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          borderRight: "2px solid #1a1c1c",
          transition: "background-color 0.1s",
        }}
        className="contact-row-icon"
      >
        <Icon size={20} color="#f4fd2f" />
      </div>

      {/* Label cell */}
      <div
        className="contact-row-label"
        style={{
          width: 88,
          minHeight: 64,
          padding: "0 12px",
          display: "flex",
          alignItems: "center",
          borderRight: "2px solid #e2e2e2",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "0.65rem",
            fontWeight: 900,
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            color: "rgba(26,28,28,0.4)",
          }}
        >
          {label}
        </span>
      </div>

      {/* Value cell */}
      <div
        className="contact-row-value"
        style={{
          flex: 1,
          minHeight: 64,
          minWidth: 0,
          padding: "14px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <span
          className="contact-row-text"
          style={{
            fontFamily: href
              ? "'Space Grotesk', sans-serif"
              : "'Inter', sans-serif",
            fontSize: "clamp(0.88rem, 3vw, 0.95rem)",
            fontWeight: href ? 700 : 400,
            color: "#1a1c1c",
            textDecoration: "none",
            overflowWrap: "anywhere",
            minWidth: 0,
          }}
        >
          {value}
        </span>
        {href && (
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "1rem",
              fontWeight: 900,
              color: "rgba(26,28,28,0.3)",
              transition: "color 0.1s, transform 0.1s",
            }}
            className="contact-row-arrow"
          >
            →
          </span>
        )}
      </div>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        style={{ textDecoration: "none", display: "block" }}
        className="contact-row-link"
      >
        {content}
      </a>
    );
  }
  return content;
}

function SocialCard({ icon: Icon, label, sub, href, num, index }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        border: "4px solid #1a1c1c",
        padding: "clamp(20px, 5vw, 28px)",
        backgroundColor: "#f9f9f9",
        textDecoration: "none",
        boxShadow: "6px 6px 0 0 rgba(26,28,28,1)",
        transition: "background-color 0.1s, box-shadow 0.1s, transform 0.1s",
        cursor: "pointer",
        opacity: 0,
        animation: `revealUp 0.45s ${0.35 + index * 0.1}s forwards`,
        minHeight: 152,
      }}
      className="social-card"
    >
      {/* Top row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <span
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "1.5rem",
            fontWeight: 900,
            color: "#e2e2e2",
            lineHeight: 1,
            transition: "color 0.1s",
          }}
          className="social-num"
        >
          {num}
        </span>
        <span
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 36,
            height: 36,
            backgroundColor: "#eeeeee",
            border: "2px solid #1a1c1c",
            transition: "background-color 0.1s, transform 0.15s",
            color: "#1a1c1c",
          }}
          className="social-icon-box"
        >
          <Icon size={16} />
        </span>
      </div>

      {/* Bottom */}
      <div style={{ marginTop: 24 }}>
        <div
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "1.1rem",
            fontWeight: 900,
            textTransform: "uppercase",
            letterSpacing: "-0.02em",
            color: "#1a1c1c",
            marginBottom: 4,
            transition: "color 0.1s",
          }}
          className="social-label"
        >
          {label}
        </div>
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.8rem",
            color: "rgba(26,28,28,0.45)",
            transition: "color 0.1s",
          }}
          className="social-sub"
        >
          @{sub}
        </div>
      </div>
    </a>
  );
}

export default function ContactPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700;900&family=Inter:wght@400;700&display=swap');

        @keyframes revealUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Contact row hover */
        .contact-row-link:hover .contact-row { background-color: #f4fd2f; }
        .contact-row-link:hover .contact-row-icon { background-color: #1a1c1c; }
        .contact-row-link:hover .contact-row-arrow { color: #1a1c1c; transform: translateX(4px); }

        /* Social card hover */
        .social-card:hover {
          background-color: #f4fd2f !important;
          box-shadow: 10px 10px 0 0 rgba(26,28,28,1) !important;
          transform: translate(-2px, -2px);
        }
        .social-card:hover .social-num   { color: rgba(26,28,28,0.2); }
        .social-card:hover .social-label { color: #1a1c1c; }
        .social-card:hover .social-sub   { color: rgba(26,28,28,0.6); }
        .social-card:hover .social-icon-box {
          background-color: #1a1c1c;
          color: #f4fd2f;
          transform: rotate(45deg);
        }
        .social-card:hover .social-icon-box svg { color: #f4fd2f; }
        @media (min-width: 640px) {
          .contact-row-icon {
            width: 64px;
          }
          .contact-row-label {
            width: 110px;
            padding: 0 16px;
          }
          .contact-row-value {
            padding: 16px 24px;
          }
          .social-card {
            min-height: 160px;
          }
        }
      `}</style>

      <PageShell>
        {/* ── Page header ── */}
        <div
          className="mb-12 sm:mb-16"
          style={{
            opacity: 0,
            animation: "revealUp 0.6s cubic-bezier(.22,1,.36,1) 0.05s forwards",
          }}
        >
          {/* Eyebrow */}
          <div
            className="mb-5 inline-block"
            style={{
              backgroundColor: "#f4fd2f",
              color: "#6f7300",
              border: "2px solid #1a1c1c",
              padding: "4px 14px",
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "0.7rem",
              fontWeight: 900,
              textTransform: "uppercase",
              letterSpacing: "0.2em",
            }}
          >
            Reach Out
          </div>

          {/* Headline */}
          <h1
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(3rem, 8vw, 6rem)",
              fontWeight: 900,
              lineHeight: 0.95,
              letterSpacing: "-0.04em",
              textTransform: "uppercase",
              color: "#1a1c1c",
              margin: "0 0 24px",
            }}
          >
            Let&apos;s <span style={{ color: "#5f6300" }}>Build</span>
            <br />
            Something
            <br />
            <span
              style={{
                backgroundColor: "#f4fd2f",
                color: "#1a1c1c",
                padding: "0 12px",
                display: "inline-block",
              }}
            >
              Bold.
            </span>
          </h1>

          {/* Descriptor */}
          <p
            className="max-w-xl pl-4 sm:pl-5"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(1rem, 3.5vw, 1.125rem)",
              fontWeight: 700,
              color: "rgba(26,28,28,0.55)",
              borderLeft: "6px solid #5f6300",
              maxWidth: 500,
              lineHeight: 1.5,
            }}
          >
            Reach out for collaborations, freelance work, or opportunities.
          </p>
        </div>

        {/* ── Two-column layout ── */}
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2">
          {/* ── Left: Contact info table ── */}
          <div>
            {/* Section label */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 0,
                opacity: 0,
                animation: "revealUp 0.45s 0.08s forwards",
              }}
            >
              <span
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "0.65rem",
                  fontWeight: 900,
                  textTransform: "uppercase",
                  letterSpacing: "0.2em",
                  color: "rgba(26,28,28,0.4)",
                  display: "block",
                  padding: "8px 0 8px 0",
                  borderBottom: "none",
                }}
              >
                Direct Contact
              </span>
            </div>

            {/* Table container */}
            <div
              style={{
                border: "4px solid #1a1c1c",
                boxShadow: "8px 8px 0 0 rgba(26,28,28,1)",
                overflow: "hidden",
              }}
            >
              {CONTACT_ROWS.map((row, i) => (
                <ContactRow key={row.label} {...row} index={i} />
              ))}
            </div>

            {/* Availability chip */}
            <div
              className="max-w-full"
              style={{
                marginTop: 20,
                display: "inline-flex",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 10,
                border: "2px solid #5f6300",
                padding: "8px 14px",
                boxShadow: "3px 3px 0 0 rgba(95,99,0,1)",
                opacity: 0,
                animation: "revealUp 0.45s 0.5s forwards",
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  backgroundColor: "#f4fd2f",
                  display: "inline-block",
                  flexShrink: 0,
                  animation: "blink 2s infinite",
                }}
              />
              <span
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "0.7rem",
                  fontWeight: 900,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "#5f6300",
                }}
              >
                Available for freelance &amp; collaborations
              </span>
            </div>
          </div>

          {/* ── Right: Socials ── */}
          <div>
            {/* Section label */}
            <div
              style={{
                opacity: 0,
                animation: "revealUp 0.45s 0.12s forwards",
              }}
            >
              <span
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "0.65rem",
                  fontWeight: 900,
                  textTransform: "uppercase",
                  letterSpacing: "0.2em",
                  color: "rgba(26,28,28,0.4)",
                  display: "block",
                  padding: "8px 0",
                }}
              >
                Find Me Online
              </span>
            </div>

            {/* Social cards grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {SOCIALS.map((s, i) => (
                <SocialCard key={s.label} {...s} index={i} />
              ))}
            </div>

            {/* CTA block */}
            <div
              className="mt-5"
              style={{
                border: "4px solid #1a1c1c",
                backgroundColor: "#1a1c1c",
                padding: "clamp(20px, 5vw, 28px)",
                boxShadow: "8px 8px 0 0 rgba(95,99,0,1)",
                opacity: 0,
                animation: "revealUp 0.5s 0.6s forwards",
              }}
            >
              <p
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "rgba(244,253,47,0.6)",
                  marginBottom: 12,
                }}
              >
                Prefer email?
              </p>
              <a
                className="break-all sm:break-normal"
                href="mailto:fazilraphi14@gmail.com"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "1rem",
                  fontWeight: 900,
                  color: "#f4fd2f",
                  textDecoration: "underline",
                  textUnderlineOffset: 5,
                  textDecorationColor: "#5f6300",
                  display: "block",
                  marginBottom: 20,
                  transition: "color 0.1s",
                }}
              >
                fazilraphi14@gmail.com →
              </a>
              <a
                className="inline-flex w-full justify-center sm:w-auto"
                href="mailto:fazilraphi14@gmail.com"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#f4fd2f",
                  color: "#1a1c1c",
                  padding: "12px 24px",
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "0.8rem",
                  fontWeight: 900,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  textDecoration: "none",
                  border: "2px solid #f4fd2f",
                  boxShadow: "4px 4px 0 0 rgba(244,253,47,0.3)",
                  transition: "all 0.1s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#f9f9f9";
                  e.currentTarget.style.borderColor = "#f9f9f9";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#f4fd2f";
                  e.currentTarget.style.borderColor = "#f4fd2f";
                }}
              >
                Send a Message
              </a>
            </div>
          </div>
        </div>

        {/* ── Bottom identity bar ── */}
        <div
          className="mt-14 flex flex-col items-start gap-3 pt-5 sm:mt-20 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:pt-6"
          style={{
            borderTop: "4px solid #1a1c1c",
            opacity: 0,
            animation: "revealUp 0.5s 0.7s forwards",
          }}
        >

          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "0.7rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              color: "#5f6300",
            }}
          >
            Kerala, India — Available Now
          </span>
        </div>

        <style>{`
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50%       { opacity: 0.2; }
          }
        `}</style>
      </PageShell>
      <Footer />
    </>
  );
}
