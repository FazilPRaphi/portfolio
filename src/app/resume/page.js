"use client";

import { Download } from "lucide-react";
import { useState } from "react";
import PageShell from "@/components/layout/PageShell";
import Footer from "@/components/layout/Footer";

/* ─────────────────────────────────────────────────────────────
   BRUTALIST RESUME PAGE — RAW CURATOR design system
   Colors:
     surface:           #f9f9f9
     on-surface:        #1a1c1c
     primary:           #5f6300
     primary-container: #f4fd2f  (acid-yellow)
     surface-container: #eeeeee
   Rules:
     • 0px border-radius everywhere
     • Solid offset shadow plates — no blur
     • Heavy 4px borders in #1a1c1c
     • Hover = instant #f4fd2f flash
───────────────────────────────────────────────────────────── */

export default function ResumePage() {
  const [btnHovered, setBtnHovered] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700;900&family=Inter:wght@400;700&display=swap');

        @keyframes revealUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <PageShell>
        {/* ── Page header ── */}
        <div
          className="mb-10 sm:mb-12"
          style={{
            opacity: 0,
            animation: "revealUp 0.6s cubic-bezier(.22,1,.36,1) 0.05s forwards",
          }}
        >
          {/* Eyebrow label */}
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
            Document
          </div>

          {/* Headline + CTA row */}
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between md:gap-6">
            <h1
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(3rem, 8vw, 6rem)",
                fontWeight: 900,
                lineHeight: 0.95,
                letterSpacing: "-0.04em",
                textTransform: "uppercase",
                color: "#1a1c1c",
                margin: 0,
              }}
            >
              My{" "}
              <span style={{ color: "#5f6300" }}>Resume</span>
            </h1>

            {/* Download button */}
            <a
              href="/FazilPRaphiResume.pdf"
              download
              className="w-full justify-center sm:w-auto"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "0.8rem",
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: btnHovered ? "#1a1c1c" : "#ffffff",
                backgroundColor: btnHovered ? "#f4fd2f" : "#5f6300",
                border: "2px solid #1a1c1c",
                padding: "12px 24px",
                textDecoration: "none",
                boxShadow: "4px 4px 0 0 rgba(26,28,28,1)",
                transition:
                  "background-color 0.1s, color 0.1s, box-shadow 0.1s, transform 0.1s",
                cursor: "pointer",
              }}
              onMouseEnter={() => setBtnHovered(true)}
              onMouseLeave={() => setBtnHovered(false)}
            >
              <Download size={16} />
              Download Resume
            </a>
          </div>

          {/* Descriptor */}
          <p
            className="mt-6 max-w-xl pl-4 sm:pl-5"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(1rem, 3.5vw, 1.125rem)",
              fontWeight: 700,
              color: "rgba(26,28,28,0.55)",
              borderLeft: "6px solid #5f6300",
              lineHeight: 1.5,
            }}
          >
            View my resume below or download a copy.
          </p>
        </div>

        {/* ── Resume viewer ── */}
        <div
          style={{
            border: "4px solid #1a1c1c",
            boxShadow: "8px 8px 0 0 rgba(26,28,28,1)",
            backgroundColor: "#ffffff",
            overflow: "hidden",
            opacity: 0,
            animation: "revealUp 0.6s cubic-bezier(.22,1,.36,1) 0.15s forwards",
          }}
        >
          {/* Top strip */}
          <div
            style={{
              height: 8,
              backgroundColor: "#f4fd2f",
              borderBottom: "2px solid #1a1c1c",
            }}
          />
          <iframe
            className="h-[65vh] sm:h-[70vh] lg:h-[75vh]"
            src="/FazilPRaphiResume.pdf"
            title="Resume Viewer"
            style={{
              width: "100%",
              border: "none",
              display: "block",
            }}
          />
        </div>

        {/* ── Bottom identity bar ── */}
        <div
          className="mt-14 flex flex-col items-start gap-3 pt-5 sm:mt-16 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:pt-6"
          style={{
            borderTop: "4px solid #1a1c1c",
            opacity: 0,
            animation: "revealUp 0.5s 0.3s forwards",
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
            Fazil P Raphi — Resume
          </span>
        </div>
      </PageShell>
      <Footer />
    </>
  );
}
