"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

/* ─────────────────────────────────────────────────────────────
   DESIGN TOKENS  (exact match from source)
───────────────────────────────────────────────────────────── */
// Primary:           #5f6300   (olive-black)
// Primary-container: #f4fd2f   (acid-yellow)
// On-surface:        #1a1c1c   (near-black)
// Surface:           #f9f9f9   (near-white)
// Surface-container: #eeeeee
// Surface-container-highest: #e2e2e2
// Shadow plate:      solid 8px offset in #1a1c1c

/* ─────────────────────────────────────────────────────────────
   EXPERTISE DATA
───────────────────────────────────────────────────────────── */
const EXPERTISE = [
  {
    name: "React+vite",
    category: "Frontend",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        <ellipse cx="24" cy="24" rx="4" ry="4" fill="#1a1c1c" />
        <ellipse cx="24" cy="24" rx="20" ry="7.5" stroke="#1a1c1c" strokeWidth="2.5" fill="none" />
        <ellipse cx="24" cy="24" rx="20" ry="7.5" stroke="#1a1c1c" strokeWidth="2.5" fill="none" transform="rotate(60 24 24)" />
        <ellipse cx="24" cy="24" rx="20" ry="7.5" stroke="#1a1c1c" strokeWidth="2.5" fill="none" transform="rotate(120 24 24)" />
      </svg>
    ),
  },

  {
    name: "Next.js",
    category: "Framework",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        <circle cx="24" cy="24" r="18" stroke="#1a1c1c" strokeWidth="2.5" />
        <path d="M18 32V16l16 20" stroke="#1a1c1c" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter" />
        <line x1="30" y1="16" x2="30" y2="28" stroke="#1a1c1c" strokeWidth="2.5" />
      </svg>
    ),
  },
  {
    name: "MongoDB",
    category: "Database",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        <path d="M24 6 C24 6 36 18 36 28 C36 38 24 44 24 44 C24 44 12 38 12 28 C12 18 24 6 24 6Z" stroke="#1a1c1c" strokeWidth="2.5" fill="none" />
        <line x1="24" y1="28" x2="24" y2="44" stroke="#1a1c1c" strokeWidth="2.5" />
      </svg>
    ),
  },
  {
    name: "PostgreSQL",
    category: "Database",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        <ellipse cx="24" cy="14" rx="14" ry="6" stroke="#1a1c1c" strokeWidth="2.5" fill="none" />
        <line x1="10" y1="14" x2="10" y2="32" stroke="#1a1c1c" strokeWidth="2.5" />
        <line x1="38" y1="14" x2="38" y2="32" stroke="#1a1c1c" strokeWidth="2.5" />
        <ellipse cx="24" cy="32" rx="14" ry="6" stroke="#1a1c1c" strokeWidth="2.5" fill="none" />
        <ellipse cx="24" cy="23" rx="14" ry="6" stroke="#1a1c1c" strokeWidth="2.5" fill="none" />
      </svg>
    ),
  },
  {
    name: "Express",
    category: "Backend",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        <rect x="6" y="10" width="36" height="6" fill="#1a1c1c" />
        <rect x="6" y="21" width="24" height="6" fill="#1a1c1c" />
        <rect x="6" y="32" width="30" height="6" fill="#1a1c1c" />
      </svg>
    ),
  },
  {
    name: "Mongoose",
    category: "Backend",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        <path d="M8 24 Q16 8 24 24 Q32 40 40 24" stroke="#1a1c1c" strokeWidth="2.5" fill="none" strokeLinecap="square" />
        <circle cx="8" cy="24" r="3" fill="#1a1c1c" />
        <circle cx="40" cy="24" r="3" fill="#1a1c1c" />
        <circle cx="24" cy="24" r="3" fill="#1a1c1c" />
      </svg>
    ),
  },
  {
    name: "Flask",
    category: "Backend",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        <path d="M20 6 L20 22 L10 38 Q10 44 24 44 Q38 44 38 38 L28 22 L28 6Z" stroke="#1a1c1c" strokeWidth="2.5" fill="none" strokeLinejoin="miter" />
        <line x1="18" y1="6" x2="30" y2="6" stroke="#1a1c1c" strokeWidth="2.5" />
        <circle cx="16" cy="34" r="2.5" fill="#1a1c1c" />
        <circle cx="24" cy="38" r="2" fill="#1a1c1c" />
      </svg>
    ),
  },
  {
    name: "FastAPI",
    category: "Backend",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        <circle cx="24" cy="24" r="18" stroke="#1a1c1c" strokeWidth="2.5" fill="none" />
        <polygon points="20,14 20,34 36,24" fill="#1a1c1c" />
        <line x1="14" y1="14" x2="14" y2="34" stroke="#1a1c1c" strokeWidth="3" />
      </svg>
    ),
  },
  {
    name: "Machine Learning",
    category: "AI/ML",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        <circle cx="24" cy="12" r="4" stroke="#1a1c1c" strokeWidth="2" fill="none" />
        <circle cx="10" cy="32" r="4" stroke="#1a1c1c" strokeWidth="2" fill="none" />
        <circle cx="38" cy="32" r="4" stroke="#1a1c1c" strokeWidth="2" fill="none" />
        <circle cx="24" cy="36" r="4" stroke="#1a1c1c" strokeWidth="2" fill="none" />
        <line x1="24" y1="16" x2="10" y2="28" stroke="#1a1c1c" strokeWidth="2" />
        <line x1="24" y1="16" x2="38" y2="28" stroke="#1a1c1c" strokeWidth="2" />
        <line x1="24" y1="16" x2="24" y2="32" stroke="#1a1c1c" strokeWidth="2" />
        <line x1="14" y1="32" x2="20" y2="36" stroke="#1a1c1c" strokeWidth="2" />
        <line x1="34" y1="32" x2="28" y2="36" stroke="#1a1c1c" strokeWidth="2" />
      </svg>
    ),
  },
  {
    name: "HTML",
    category: "Frontend",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        <polygon points="8,6 12,42 24,45 36,42 40,6" stroke="#1a1c1c" strokeWidth="2.5" fill="none" strokeLinejoin="miter" />
        <line x1="16" y1="18" x2="32" y2="18" stroke="#1a1c1c" strokeWidth="2.5" />
        <line x1="17" y1="27" x2="31" y2="27" stroke="#1a1c1c" strokeWidth="2.5" />
        <line x1="20" y1="36" x2="24" y2="37.5" stroke="#1a1c1c" strokeWidth="2.5" />
        <line x1="28" y1="36" x2="24" y2="37.5" stroke="#1a1c1c" strokeWidth="2.5" />
      </svg>
    ),
  },
  {
    name: "CSS",
    category: "Frontend",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        <polygon points="8,6 12,42 24,45 36,42 40,6" stroke="#1a1c1c" strokeWidth="2.5" fill="none" strokeLinejoin="miter" />
        <path d="M16 22 Q14 27 20 27 Q26 27 26 32 Q26 38 18 38" stroke="#1a1c1c" strokeWidth="2.5" fill="none" strokeLinecap="square" />
        <line x1="16" y1="15" x2="32" y2="15" stroke="#1a1c1c" strokeWidth="2.5" />
      </svg>
    ),
  },
  {
    name: "JavaScript",
    category: "Language",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        <rect x="6" y="6" width="36" height="36" stroke="#1a1c1c" strokeWidth="2.5" />
        <path d="M20 28 C20 36 12 36 12 30" stroke="#1a1c1c" strokeWidth="2.5" fill="none" strokeLinecap="square" />
        <path d="M28 20 L28 36" stroke="#1a1c1c" strokeWidth="2.5" strokeLinecap="square" />
        <path d="M28 36 C28 36 32 38 36 34" stroke="#1a1c1c" strokeWidth="2.5" fill="none" strokeLinecap="square" />
      </svg>
    ),
  },
  {
    name: "C++",
    category: "Language",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        <path d="M28 10 C18 10 10 16 10 24 C10 32 18 38 28 38" stroke="#1a1c1c" strokeWidth="2.5" fill="none" strokeLinecap="square" />
        <line x1="32" y1="18" x2="32" y2="30" stroke="#1a1c1c" strokeWidth="2.5" />
        <line x1="26" y1="24" x2="38" y2="24" stroke="#1a1c1c" strokeWidth="2.5" />
        <line x1="40" y1="18" x2="40" y2="30" stroke="#1a1c1c" strokeWidth="2.5" />
        <line x1="34" y1="24" x2="46" y2="24" stroke="#1a1c1c" strokeWidth="2.5" />
      </svg>
    ),
  },
  {
    name: "Google Colab",
    category: "AI/ML",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        <circle cx="24" cy="24" r="18" stroke="#1a1c1c" strokeWidth="2.5" fill="none" />
        <polygon points="20,16 20,32 34,24" fill="#1a1c1c" />
        <line x1="12" y1="16" x2="12" y2="32" stroke="#1a1c1c" strokeWidth="3" strokeLinecap="square" />
      </svg>
    ),
  },
  {
    name: "Anaconda",
    category: "AI/ML",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        <path d="M24 6 C36 6 42 14 42 24 C42 34 36 42 24 42 C12 42 6 34 6 24 C6 14 12 6 24 6Z" stroke="#1a1c1c" strokeWidth="2.5" fill="none" />
        <path d="M24 12 C24 12 30 18 24 24 C18 30 24 36 24 36" stroke="#1a1c1c" strokeWidth="2.5" fill="none" />
        <circle cx="24" cy="12" r="2.5" fill="#1a1c1c" />
        <circle cx="24" cy="36" r="2.5" fill="#1a1c1c" />
      </svg>
    ),
  },
  {
    name: "MySQL",
    category: "Database",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        <ellipse cx="24" cy="12" rx="14" ry="5" stroke="#1a1c1c" strokeWidth="2.5" fill="none" />
        <line x1="10" y1="12" x2="10" y2="28" stroke="#1a1c1c" strokeWidth="2.5" />
        <line x1="38" y1="12" x2="38" y2="28" stroke="#1a1c1c" strokeWidth="2.5" />
        <ellipse cx="24" cy="28" rx="14" ry="5" stroke="#1a1c1c" strokeWidth="2.5" fill="none" />
        <path d="M38 28 L38 40 Q38 44 24 44 Q10 44 10 40 L10 28" stroke="#1a1c1c" strokeWidth="2.5" fill="none" />
      </svg>
    ),
  },
  {
    name: "Generative AI",
    category: "AI/ML",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        <polygon points="24,4 28,20 44,24 28,28 24,44 20,28 4,24 20,20" stroke="#1a1c1c" strokeWidth="2.5" fill="none" strokeLinejoin="miter" />
        <circle cx="24" cy="24" r="4" fill="#1a1c1c" />
      </svg>
    ),
  },
];

/* ─────────────────────────────────────────────────────────────
   INTERSECTION OBSERVER HOOK
───────────────────────────────────────────────────────────── */
function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.1, ...options }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return [ref, inView];
}

/* ─────────────────────────────────────────────────────────────
   CURSOR GLOW
───────────────────────────────────────────────────────────── */
function CursorGlow() {
  const [pos, setPos] = useState({ x: -200, y: -200 });

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      className="pointer-events-none fixed z-[9999] -translate-x-1/2 -translate-y-1/2 transition-transform duration-75"
      style={{ left: pos.x, top: pos.y }}
    >
      <div
        className="w-48 h-48 rounded-full opacity-[0.06]"
        style={{ background: "radial-gradient(circle, #f4fd2f 0%, transparent 70%)" }}
      />
    </div>
  );
}



/* ─────────────────────────────────────────────────────────────
   HERO
───────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center min-h-[716px]">
      {/* Left */}
      <div className="md:col-span-7">
        <div
          className="inline-block bg-[#f4fd2f] text-[#6f7300] px-4 py-1 mb-6 text-xl font-bold uppercase tracking-widest border-2 border-[#1a1c1c]"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Full Stack Developer
        </div>
        <div
          className="inline-block bg-[#f4fd2f] text-[#6f7300] px-4 py-1 mb-6 text-xl font-bold uppercase tracking-widest border-2 border-[#1a1c1c]"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Machine Learning Enthusiast
        </div>
        <h1
          className="text-6xl md:text-8xl lg:text-9xl font-black leading-none tracking-tighter mb-8 uppercase text-[#1a1c1c]"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Hi, I'm{" "}
          <span className="text-[#5f6300] underline decoration-8 underline-offset-8">Fazil</span>
        </h1>
        <p
          className="text-2xl md:text-3xl font-bold max-w-2xl leading-tight mb-12 border-l-8 border-[#5f6300] pl-6 text-[#1a1c1c]"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          I build modern web applications with surgical precision and architectural intent.
        </p>
        <div className="flex flex-wrap items-center gap-6 w-full">
          <Link
            href="/projects"
            className="w-full sm:w-auto text-center bg-[#1a1c1c] text-[#f9f9f9] px-6 py-4 md:px-10 md:py-5 text-lg md:text-xl font-black uppercase tracking-tighter transition-all hover:-translate-y-1 hover:-translate-x-1"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              boxShadow: "8px 8px 0 0 rgba(95,99,0,1)",
            }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = "12px 12px 0 0 rgba(95,99,0,1)"; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = "8px 8px 0 0 rgba(95,99,0,1)"; }}
          >
            View Projects
          </Link>
          <div className="flex flex-wrap items-center gap-4 md:gap-8 w-full sm:w-auto pl-0 md:pl-4 mt-2 sm:mt-0">
            {["Certificates", "Contact"].map((label) => (
              <Link
                key={label}
                href={`/${label.toLowerCase()}`}
                className="text-base md:text-lg font-bold uppercase tracking-widest border-b-4 border-[#1a1c1c] hover:text-[#5f6300] transition-colors text-[#1a1c1c]"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Right: image */}
      <div className="md:col-span-5 relative mt-6 md:mt-0">
        <div className="absolute -top-4 -left-4 md:-top-6 md:-left-6 w-full h-full bg-[#f4fd2f] -z-10 border-4 border-[#1a1c1c]" />
        <div
          className="border-[8px] md:border-[12px] border-[#1a1c1c] bg-[#e2e2e2] overflow-hidden"
          style={{ boxShadow: "12px 12px 0 0 rgba(26,28,28,1)" }}
        >
          <div className="w-full h-[300px] md:h-[500px] bg-[#e2e2e2] flex items-center justify-center grayscale contrast-125">
            <img
              src="/imu2.jpg"
              alt="Fazil - Full Stack Developer"
              className="w-full h-full object-cover grayscale contrast-125"
              onError={e => {
                e.currentTarget.style.display = "none";
                e.currentTarget.parentElement.innerHTML =
                  `<div style="width:100%;height:100%;background:#1a1c1c;display:flex;align-items:center;justify-content:center;">
                    <span style="font-family:'Space Grotesk',sans-serif;font-size:6rem;font-weight:900;color:#f4fd2f;letter-spacing:-0.05em">FZ</span>
                  </div>`;
              }}
            />
          </div>
        </div>
        <div
          className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 bg-[#5f6300] text-white px-4 py-2 md:px-6 md:py-4 font-black uppercase text-sm md:text-xl border-4 border-[#1a1c1c] rotate-3"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Available for work
        </div>
      </div>
    </section>
  );
}



/* ─────────────────────────────────────────────────────────────
   MARQUEE
───────────────────────────────────────────────────────────── */
function Marquee() {
  const words = ["Full Stack Mastery", "•", "Pixel Perfection", "•", "Scalable Architecture", "•"];
  return (
    <section className="my-40 border-y-8 border-[#1a1c1c] py-8 bg-[#f4fd2f] overflow-hidden whitespace-nowrap">
      <div className="flex" style={{ animation: "marquee 30s linear infinite", width: "200%" }}>
        {[...words, ...words].map((w, i) => (
          <span
            key={i}
            className="text-6xl font-black uppercase tracking-tighter italic mr-20 text-[#1a1c1c]"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {w}
          </span>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   EXPERTISE CARD
───────────────────────────────────────────────────────────── */
function ExpertiseCard({ tech, index, inView }) {
  const [hovered, setHovered] = useState(false);

  const categoryColors = {
    "Frontend": "#5f6300",
    "Backend": "#1a1c1c",
    "Database": "#474a00",
    "AI/ML": "#5f6300",
    "Framework": "#1a1c1c",
    "Tooling": "#3a3c00",
    "Language": "#1a1c1c",
  };

  return (
    <div
      className="relative border-4 border-[#1a1c1c] p-6 cursor-pointer transition-all duration-200 bg-[#f9f9f9]"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView
          ? hovered ? "translate(-4px, -4px)" : "translate(0,0)"
          : "translateY(30px)",
        transition: `opacity 0.5s ${index * 0.05}s cubic-bezier(.22,1,.36,1), transform ${hovered ? "0.15s" : "0.5s"
          } ${hovered ? "0s" : `${index * 0.05}s`} cubic-bezier(.22,1,.36,1), box-shadow 0.15s`,
        boxShadow: hovered
          ? "12px 12px 0 0 rgba(244,253,47,1)"
          : "8px 8px 0 0 rgba(26,28,28,1)",
        backgroundColor: hovered ? "#f4fd2f" : "#f9f9f9",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Category tag */}
      <div
        className="inline-block px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-[#f9f9f9] mb-4"
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          backgroundColor: categoryColors[tech.category] ?? "#1a1c1c",
        }}
      >
        {tech.category}
      </div>

      {/* Icon area */}
      <div
        className="w-16 h-16 border-4 border-[#1a1c1c] flex items-center justify-center mb-4 transition-colors duration-150"
        style={{ backgroundColor: hovered ? "#1a1c1c" : "#eeeeee" }}
      >
        <div
          style={{
            filter: hovered ? "invert(1)" : "none",
            transition: "filter 0.15s",
          }}
        >
          {tech.icon}
        </div>
      </div>

      {/* Name */}
      <h3
        className="text-xl font-black uppercase tracking-tighter text-[#1a1c1c]"
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        {tech.name}
      </h3>

      {/* Bottom accent line — animates in on hover */}
      <div
        className="absolute bottom-0 left-0 h-1 bg-[#5f6300] transition-all duration-200"
        style={{ width: hovered ? "100%" : "0%" }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   EXPERTISE SECTION
───────────────────────────────────────────────────────────── */
function Expertise() {
  const [headerRef, headerInView] = useInView();
  const [gridRef, gridInView] = useInView({ threshold: 0.05 });

  return (
    <section className="mt-0 mb-40 bg-[#eeeeee] border-y-8 border-[#1a1c1c] py-20 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div
          ref={headerRef}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8"
          style={{
            opacity: headerInView ? 1 : 0,
            transform: headerInView ? "translateY(0)" : "translateY(40px)",
            transition: "opacity 0.7s cubic-bezier(.22,1,.36,1), transform 0.7s cubic-bezier(.22,1,.36,1)",
          }}
        >
          <div>
            <div
              className="inline-block bg-[#f4fd2f] text-[#6f7300] px-4 py-1 mb-4 text-sm font-black uppercase tracking-widest border-2 border-[#1a1c1c]"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Stack
            </div>
            <h2
              className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-[#1a1c1c] leading-none"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Technical<br />Expertise
            </h2>
          </div>
          <div className="max-w-sm">
            <p
              className="text-lg font-bold text-[#1a1c1c] border-l-8 border-[#5f6300] pl-6 leading-snug"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Every tool chosen with intent. Every framework selected for architectural clarity.
            </p>
            <div className="mt-6 flex gap-2">
              <span
                className="bg-[#1a1c1c] text-[#f9f9f9] px-4 py-2 text-sm font-black uppercase"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {EXPERTISE.length} Technologies
              </span>
            </div>
          </div>
        </div>

        {/* Category filter strip */}
        <div
          className="flex gap-0 mb-12 overflow-x-auto"
          style={{
            opacity: headerInView ? 1 : 0,
            transition: "opacity 0.7s 0.2s cubic-bezier(.22,1,.36,1)",
          }}
        >
          {["All", "Frontend", "Backend", "Database", "AI/ML", "Framework", "Language", "Tooling"].map((cat, i) => (
            <span
              key={cat}
              className="px-4 py-2 text-xs font-black uppercase tracking-widest border-2 border-[#1a1c1c] -ml-[2px] cursor-pointer transition-colors duration-100 whitespace-nowrap"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                backgroundColor: i === 0 ? "#1a1c1c" : "#f9f9f9",
                color: i === 0 ? "#f4fd2f" : "#1a1c1c",
              }}
              onMouseEnter={e => {
                if (i !== 0) { e.currentTarget.style.backgroundColor = "#f4fd2f"; }
              }}
              onMouseLeave={e => {
                if (i !== 0) { e.currentTarget.style.backgroundColor = "#f9f9f9"; }
              }}
            >
              {cat}
            </span>
          ))}
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {EXPERTISE.map((tech, i) => (
            <ExpertiseCard key={tech.name} tech={tech} index={i} inView={gridInView} />
          ))}
        </div>

        {/* Bottom counter bar */}
        <div
          className="mt-16 border-4 border-[#1a1c1c] bg-[#1a1c1c] flex flex-col md:flex-row"
          style={{
            opacity: gridInView ? 1 : 0,
            transition: "opacity 0.7s 0.4s cubic-bezier(.22,1,.36,1)",
          }}
        >
          {[
            { label: "Frontend", count: EXPERTISE.filter(e => e.category === "Frontend").length },
            { label: "Backend", count: EXPERTISE.filter(e => e.category === "Backend").length },
            { label: "Database", count: EXPERTISE.filter(e => e.category === "Database").length },
            { label: "AI / ML", count: EXPERTISE.filter(e => e.category === "AI/ML").length },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className="flex-1 px-8 py-6 border-r-4 border-[#5f6300] last:border-r-0 flex items-center gap-6"
            >
              <span
                className="text-5xl font-black text-[#f4fd2f] tabular-nums"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {String(stat.count).padStart(2, "0")}
              </span>
              <span
                className="text-sm font-bold uppercase tracking-widest text-[#f9f9f9] opacity-70"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   ROOT
───────────────────────────────────────────────────────────── */
export default function HomeHero() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&family=Inter:wght@400;700&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; font-family: 'Inter', sans-serif; background: #f9f9f9; color: #1a1c1c; }
        h1,h2,h3,nav,button { font-family: 'Space Grotesk', sans-serif; }
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #f9f9f9; }
        ::-webkit-scrollbar-thumb { background: #1a1c1c; }
      `}</style>

      <CursorGlow />

      <main className="pt-32 md:pt-40 pb-20 px-8 max-w-7xl mx-auto">
        <Hero />
        <Marquee />
      </main>

      <Expertise />
    </>
  );
}
