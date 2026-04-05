"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import CertificateCard from "@/components/ui/certificate-card";
import PageShell from "@/components/layout/PageShell";
import Footer from "@/components/layout/Footer";

/* ─────────────────────────────────────────────────────────────
   BRUTALIST CERTIFICATES PAGE — RAW CURATOR design system
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
     • Hover = instant #f4fd2f flash
───────────────────────────────────────────────────────────── */

function SkeletonCard({ index }) {
  return (
    <div
      className="w-full min-w-0"
      style={{
        backgroundColor: "#eeeeee",
        border: "4px solid #1a1c1c",
        boxShadow: "8px 8px 0 0 rgba(26,28,28,1)",
        padding: "clamp(20px, 5vw, 32px)",
        opacity: 0,
        animation: `revealUp 0.4s ${index * 0.07}s forwards`,
      }}
    >
      {/* Credential badge strip */}
      <div
        style={{
          width: "45%",
          height: 18,
          marginBottom: 28,
          background:
            "linear-gradient(90deg,#d4d4d4 25%,#c8c8c8 50%,#d4d4d4 75%)",
          backgroundSize: "400px 100%",
          animation: "shimmer 1.4s infinite linear",
        }}
      />
      {/* Title */}
      <div
        style={{
          width: "85%",
          height: 26,
          marginBottom: 12,
          background:
            "linear-gradient(90deg,#c8c8c8 25%,#bebebe 50%,#c8c8c8 75%)",
          backgroundSize: "400px 100%",
          animation: "shimmer 1.4s 0.1s infinite linear",
        }}
      />
      <div
        style={{
          width: "60%",
          height: 26,
          marginBottom: 24,
          background:
            "linear-gradient(90deg,#c8c8c8 25%,#bebebe 50%,#c8c8c8 75%)",
          backgroundSize: "400px 100%",
          animation: "shimmer 1.4s 0.15s infinite linear",
        }}
      />
      {/* Issuer line */}
      <div
        style={{
          width: "50%",
          height: 14,
          background:
            "linear-gradient(90deg,#d4d4d4 25%,#c8c8c8 50%,#d4d4d4 75%)",
          backgroundSize: "400px 100%",
          animation: "shimmer 1.4s 0.2s infinite linear",
        }}
      />
    </div>
  );
}

function EmptyState() {
  return (
    <div
      className="relative overflow-hidden px-5 py-14 text-left sm:px-8 sm:py-16 sm:text-center"
      style={{
        gridColumn: "1 / -1",
        border: "4px solid #1a1c1c",
        backgroundColor: "#f9f9f9",
        boxShadow: "8px 8px 0 0 rgba(26,28,28,1)",
      }}
    >
      {/* Acid stripe top */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 8,
          backgroundColor: "#f4fd2f",
        }}
      />
      {/* Decorative offset block */}
      <div
        style={{
          position: "absolute",
          bottom: -8,
          right: -8,
          width: 88,
          height: 88,
          backgroundColor: "#e2e2e2",
          border: "4px solid #1a1c1c",
          zIndex: 0,
        }}
        className="cert-empty-plate"
      />
      <div style={{ position: "relative", zIndex: 1 }}>
        <div
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(2.75rem, 14vw, 4rem)",
            fontWeight: 900,
            letterSpacing: "-0.04em",
            color: "#e2e2e2",
            lineHeight: 1,
            marginBottom: 16,
          }}
        >
          00
        </div>
        <p
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(1rem, 4vw, 1.25rem)",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            color: "#1a1c1c",
            marginBottom: 8,
          }}
        >
          No certificates yet
        </p>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.9rem",
            color: "rgba(26,28,28,0.45)",
          }}
        >
          Credentials will appear here once added.
        </p>
      </div>
    </div>
  );
}

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCertificates() {
      const { data, error } = await supabase
        .from("certificates")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error) setCertificates(data || []);
      setLoading(false);
    }
    fetchCertificates();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700;900&family=Inter:wght@400;700&display=swap');

        @keyframes revealUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0%   { background-position: -400px 0; }
          100% { background-position:  400px 0; }
        }
        .cert-grid-item {
          opacity: 0;
          animation: revealUp 0.5s forwards;
        }
        @media (min-width: 640px) {
          .cert-empty-plate {
            width: 120px;
            height: 120px;
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
            Credentials
          </div>

          {/* Headline + count */}
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
              Certi
              <span style={{ color: "#5f6300" }}>ficates</span>
            </h1>

            {!loading && certificates.length > 0 && (
              <div
                className="w-full text-center sm:w-auto sm:text-left"
                style={{
                  backgroundColor: "#1a1c1c",
                  color: "#f4fd2f",
                  padding: "12px 20px",
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "0.75rem",
                  fontWeight: 900,
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  boxShadow: "4px 4px 0 0 rgba(95,99,0,1)",
                  whiteSpace: "nowrap",
                  border: "2px solid #1a1c1c",
                }}
              >
                {String(certificates.length).padStart(2, "0")} Verified
              </div>
            )}
          </div>

          {/* Sub-descriptor */}
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
            Verified achievements, credentials, and milestones.
          </p>
        </div>

        {/* ── Loading skeletons ── */}
        {loading && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} index={i} />
            ))}
          </div>
        )}

        {/* ── Empty state ── */}
        {!loading && certificates.length === 0 && (
          <div style={{ display: "grid" }}>
            <EmptyState />
          </div>
        )}

        {/* ── Certificates grid ── */}
        {!loading && certificates.length > 0 && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {certificates.map((cert, i) => (
              <div
                key={cert.id}
                className="cert-grid-item"
                style={{ animationDelay: `${i * 0.07}s` }}
              >
                <CertificateCard certificate={cert} />
              </div>
            ))}
          </div>
        )}

        {/* ── Bottom identity bar ── */}
        {!loading && certificates.length > 0 && (
          <div
            className="mt-14 flex flex-col items-start gap-3 pt-5 sm:mt-20 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:pt-6"
            style={{
              borderTop: "4px solid #1a1c1c",
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
              {certificates.length} / {certificates.length} Loaded
            </span>
          </div>
        )}
      </PageShell>
      <Footer />
    </>
  );
}
