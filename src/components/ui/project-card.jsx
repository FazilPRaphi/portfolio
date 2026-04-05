"use client";

import { useState } from "react";
import { ExternalLink, Github } from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   BRUTALIST PROJECT CARD — RAW CURATOR design system
   • 0px border-radius
   • 4px border #1a1c1c
   • Solid 8px offset shadow plate
   • Hover = acid-yellow (#f4fd2f) flash
───────────────────────────────────────────────────────────── */

export default function ProjectCard({ project, onAction }) {
  const [hovered, setHovered] = useState(false);

  const image = project?.image;
  const title = project?.title || "Untitled Project";
  const description = project?.description || "No description provided.";
  const liveUrl = project?.live_url;
  const githubUrl = project?.github_url;

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
      {image && (
        <div
          style={{
            backgroundColor: "#e2e2e2",
            borderBottom: "4px solid #1a1c1c",
            overflow: "hidden",
          }}
        >
          <img
            src={image}
            alt={title}
            style={{
              width: "100%",
              height: "auto",
              maxHeight: 220,
              objectFit: "cover",
              display: "block",
              filter: "grayscale(30%) contrast(110%)",
              transition: "filter 0.2s",
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
        <h3
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(1.1rem, 4vw, 1.35rem)",
            fontWeight: 900,
            textTransform: "uppercase",
            letterSpacing: "-0.02em",
            color: "#1a1c1c",
            marginBottom: 10,
            lineHeight: 1.2,
            overflowWrap: "anywhere",
          }}
        >
          {title}
        </h3>

        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(0.85rem, 3vw, 0.9rem)",
            color: "rgba(26,28,28,0.6)",
            lineHeight: 1.6,
            marginBottom: 20,
            overflowWrap: "anywhere",
          }}
        >
          {description}
        </p>

        <div
          className="flex flex-wrap gap-3"
          style={{ minWidth: 0 }}
        >
          {liveUrl && (
            <a
              className="w-full justify-center sm:w-auto"
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => onAction?.("live")}
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
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#1a1c1c";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#5f6300";
              }}
            >
              Live Demo
              <ExternalLink size={13} />
            </a>
          )}

          {githubUrl && (
            <a
              className="w-full justify-center sm:w-auto"
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => onAction?.("github")}
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
                color: "#1a1c1c",
                backgroundColor: "transparent",
                border: "2px solid #1a1c1c",
                padding: "10px 16px",
                textDecoration: "none",
                boxShadow: "3px 3px 0 0 rgba(26,28,28,1)",
                transition: "background-color 0.1s, color 0.1s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#1a1c1c";
                e.currentTarget.style.color = "#f4fd2f";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#1a1c1c";
              }}
            >
              GitHub
              <Github size={13} />
            </a>
          )}
        </div>
      </div>

      {/* Bottom accent bar — animates on hover */}
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
