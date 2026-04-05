"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useToast } from "@/lib/use-toast";
import ToastContainer from "@/components/ui/toast-container";
import ProjectCard from "@/components/ui/project-card";
import Footer from "@/components/layout/Footer";
import PageShell from "@/components/layout/PageShell";

/* ─────────────────────────────────────────────────────────────
   BRUTALIST PROJECTS PAGE — RAW CURATOR design system
   Colors:
     surface:           #f9f9f9
     on-surface:        #1a1c1c
     primary:           #5f6300
     primary-container: #f4fd2f  (acid-yellow)
     surface-container: #eeeeee
   Rules:
     • 0px border-radius everywhere
     • Solid offset shadow plates — no blur
     • Heavy borders in #1a1c1c
     • Hover = instant #f4fd2f flash
───────────────────────────────────────────────────────────── */

/* ── Skeleton card shown while loading ── */
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
        animation: `skeletonFadeIn 0.4s ${index * 0.08}s forwards`,
      }}
    >
      {/* Number placeholder */}
      <div style={{ width: 40, height: 32, backgroundColor: "#d4d4d4", marginBottom: 40 }} />
      {/* Title placeholder */}
      <div style={{ width: "70%", height: 28, backgroundColor: "#c8c8c8", marginBottom: 16 }} />
      {/* Body lines */}
      <div style={{ width: "100%", height: 14, backgroundColor: "#d4d4d4", marginBottom: 8 }} />
      <div style={{ width: "80%",  height: 14, backgroundColor: "#d4d4d4", marginBottom: 32 }} />
      {/* Tag pills */}
      <div style={{ display: "flex", gap: 8 }}>
        <div style={{ width: 56, height: 22, backgroundColor: "#c8c8c8" }} />
        <div style={{ width: 72, height: 22, backgroundColor: "#c8c8c8" }} />
      </div>
    </div>
  );
}

/* ── Empty state ── */
function EmptyState() {
  return (
    <div
      className="relative px-5 py-14 text-left sm:px-8 sm:py-16 sm:text-center"
      style={{
        gridColumn: "1 / -1",
        border: "4px solid #1a1c1c",
        backgroundColor: "#f9f9f9",
        boxShadow: "8px 8px 0 0 rgba(26,28,28,1)",
      }}
    >
      {/* Acid-yellow decorative block */}
      <div
        style={{
          position: "absolute",
          top: -4,
          left: -4,
          right: -4,
          height: 8,
          backgroundColor: "#f4fd2f",
        }}
      />
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
        No projects yet
      </p>
      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.9rem",
          color: "rgba(26,28,28,0.5)",
        }}
      >
        Check back soon — work in progress.
      </p>
    </div>
  );
}

export default function ProjectsPage() {
  const { toast, showToast, clearToast } = useToast();
  const [projects, setProjects]         = useState([]);
  const [loading, setLoading]           = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) console.error("Error fetching projects:", error);
      else setProjects(data || []);
      setLoading(false);
    }
    fetchProjects();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700;900&family=Inter:wght@400;700&display=swap');

        @keyframes skeletonFadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pageReveal {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0%   { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }
        .skeleton-shimmer {
          background: linear-gradient(90deg, #e2e2e2 25%, #d4d4d4 50%, #e2e2e2 75%);
          background-size: 400px 100%;
          animation: shimmer 1.4s infinite linear;
        }
        .projects-grid-item {
          opacity: 0;
          animation: skeletonFadeIn 0.5s forwards;
        }
      `}</style>

      <PageShell>
        {/* ── Page header ── */}
        <div
          className="mb-12 sm:mb-16"
          style={{
            animation: "pageReveal 0.6s cubic-bezier(.22,1,.36,1) forwards",
          }}
        >
          {/* Label */}
          <div
            className="mb-5 inline-block"
            style={{
              backgroundColor: "#f4fd2f",
              color: "#6f7300",
              border: "2px solid #1a1c1c",
              padding: "4px 14px",
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "0.75rem",
              fontWeight: 900,
              textTransform: "uppercase",
              letterSpacing: "0.2em",
            }}
          >
            Portfolio
          </div>

          {/* Headline */}
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
              Selected<br />
              <span style={{ color: "#5f6300" }}>Works</span>
            </h1>

            {/* Project count badge */}
            {!loading && projects.length > 0 && (
              <div
                className="w-full text-center sm:w-auto sm:text-left"
                style={{
                  backgroundColor: "#1a1c1c",
                  color: "#f4fd2f",
                  border: "2px solid #1a1c1c",
                  padding: "12px 20px",
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "0.75rem",
                  fontWeight: 900,
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  boxShadow: "4px 4px 0 0 rgba(95,99,0,1)",
                  whiteSpace: "nowrap",
                }}
              >
                {String(projects.length).padStart(2, "0")} Projects
              </div>
            )}
          </div>

          {/* Subheading with left-border rule */}
          <p
            className="mt-6 max-w-xl pl-4 sm:pl-5"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(1rem, 3.5vw, 1.125rem)",
              fontWeight: 700,
              color: "rgba(26,28,28,0.6)",
              borderLeft: "6px solid #5f6300",
              lineHeight: 1.5,
            }}
          >
            Curated selection of architectural digital solutions.
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
        {!loading && projects.length === 0 && (
          <div style={{ display: "grid" }}>
            <EmptyState />
          </div>
        )}

        {/* ── Project grid ── */}
        {!loading && projects.length > 0 && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {projects.map((project, i) => (
              <div
                key={project.id}
                className="projects-grid-item"
                style={{ animationDelay: `${i * 0.07}s` }}
              >
                <ProjectCard
                  project={project}
                  onAction={(type) => {
                    if (type === "live")
                      showToast("Opening live project", "success");
                    if (type === "github")
                      showToast("Opening GitHub repo", "info");
                  }}
                />
              </div>
            ))}
          </div>
        )}

        {/* ── Bottom identity bar ── */}
        {!loading && projects.length > 0 && (
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
              {projects.length} / {projects.length} Loaded
            </span>
          </div>
        )}
      </PageShell>

      <ToastContainer toast={toast} clearToast={clearToast} />
      <Footer />
    </>
  );
}
