"use client";

import { useState } from "react";
import { ExternalLink } from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   BRUTALIST CERTIFICATE CARD — RAW CURATOR design system
   • 0px border-radius
   • 4px border #1a1c1c
   • Solid 8px offset shadow plate
   • Hover = acid-yellow (#f4fd2f) flash
───────────────────────────────────────────────────────────── */

export default function CertificateCard({ certificate }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="w-full min-w-0"
      style={{
        border: "4px solid #1a1c1c",
        backgroundColor: hovered ? "#f4fd2f" : "#f9f9f9",
        boxShadow: hovered
          ? "12px 12px 0 0 rgba(244,253,47,1)"
          : "8px 8px 0 0 rgba(26,28,28,1)",
        transform: hovered ? "translate(-4px, -4px)" : "translate(0, 0)",
        transition:
          "background-color 0.1s, box-shadow 0.15s, transform 0.15s",
        cursor: "pointer",
        overflow: "hidden",
        position: "relative",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      {certificate.image && (
        <div
          style={{
            backgroundColor: "#e2e2e2",
            borderBottom: "4px solid #1a1c1c",
            overflow: "hidden",
            padding: "clamp(16px, 4vw, 24px)",
          }}
        >
          <img
            src={certificate.image}
            alt={certificate.title}
            style={{
              width: "100%",
              height: "auto",
              maxHeight: 180,
              objectFit: "contain",
              display: "block",
              filter: "grayscale(20%) contrast(105%)",
            }}
          />
        </div>
      )}

      {/* Content */}
      <div
        style={{
          padding: "clamp(18px, 5vw, 28px)",
          minWidth: 0,
        }}
      >
        {/* Credential tag */}
        <div
          style={{
            display: "inline-block",
            backgroundColor: hovered ? "#1a1c1c" : "#eeeeee",
            color: hovered ? "#f4fd2f" : "rgba(26,28,28,0.5)",
            padding: "4px 10px",
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(0.58rem, 2.4vw, 0.6rem)",
            fontWeight: 900,
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            marginBottom: 14,
            transition: "background-color 0.1s, color 0.1s",
          }}
        >
          Credential
        </div>

        <h3
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(1.05rem, 4vw, 1.2rem)",
            fontWeight: 900,
            textTransform: "uppercase",
            letterSpacing: "-0.02em",
            color: "#1a1c1c",
            marginBottom: 8,
            lineHeight: 1.2,
            overflowWrap: "anywhere",
          }}
        >
          {certificate.title}
        </h3>

        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(0.8rem, 3vw, 0.85rem)",
            color: "rgba(26,28,28,0.5)",
            marginBottom: 20,
            overflowWrap: "anywhere",
          }}
        >
          Issued by {certificate.issuer || "Unknown"}
        </p>

        {certificate.certificate_url && (
          <a
            className="w-full sm:w-auto"
            href={certificate.certificate_url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(0.72rem, 2.8vw, 0.75rem)",
              fontWeight: 900,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: "#ffffff",
              backgroundColor: "#5f6300",
              border: "2px solid #1a1c1c",
              padding: "10px 16px",
              textDecoration: "none",
              boxShadow: "3px 3px 0 0 rgba(26,28,28,1)",
              transition: "background-color 0.1s",
              overflowWrap: "anywhere",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#1a1c1c";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#5f6300";
            }}
          >
            View Certificate
            <ExternalLink size={13} />
          </a>
        )}
      </div>

      {/* Bottom accent bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: 4,
          backgroundColor: "#5f6300",
          transition: "width 0.2s",
          width: hovered ? "100%" : "0%",
        }}
      />
    </div>
  );
}
