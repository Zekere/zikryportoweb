"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

import { useLocale } from "next-intl";

import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
} from "motion/react";

import type { IconType } from "react-icons";

import {
  SiHtml5,
  SiCss,
  SiBootstrap,
  SiTailwindcss,
  SiJavascript,
  SiTypescript,
  SiCodeigniter,
  SiFigma,
  SiReact,
  SiVite,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiGo,
  SiPhp,
  SiLaravel,
  SiKotlin,
  SiAndroid,
  SiDocker,
  SiMysql,
  SiMongodb,
  SiSupabase,
  SiNpm,
  SiBun,
  SiGithub,
  SiPostgresql,
  SiZoom,
  SiGit,
  SiFlutter,
} from "react-icons/si";

import {
  FaJava,
  FaWindows,
  FaFileExcel,
  FaFileWord,
  FaMicrophone,
  FaPalette,
  FaCode,
} from "react-icons/fa6";

import { skills } from "@/data/skills";

// =====================================================
// 01. DATA KEAHLIAN
// =====================================================

type DisplaySkill = {
  name: string;
  icon: IconType;
  color: string;
};

// Teknologi dari gambar referensi.
// Ikon Canva memakai ilustrasi palet sebagai fallback.
const catalog: DisplaySkill[] = [
  { name: "HTML", icon: SiHtml5, color: "#F97316" },
  { name: "CSS", icon: SiCss, color: "#3478F6" },
  { name: "Bootstrap", icon: SiBootstrap, color: "#8342D9" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#24B7EA" },
  { name: "JavaScript", icon: SiJavascript, color: "#F4C800" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "CodeIgniter", icon: SiCodeigniter, color: "#E53935" },
  // { name: "Figma", icon: SiFigma, color: "#E83E8C" },
  // { name: "Canva", icon: FaPalette, color: "#21B874" },

  { name: "React", icon: SiReact, color: "#13BBD7" },
  // { name: "Vite", icon: SiVite, color: "#9648E5" },
  { name: "Next.js", icon: SiNextdotjs, color: "#333333" },
  { name: "Node.js", icon: SiNodedotjs, color: "#19994A" },
  // { name: "Express.js", icon: SiExpress, color: "#404040" },
  // { name: "Go", icon: SiGo, color: "#00A5D9" },
  { name: "PHP", icon: SiPhp, color: "#777BB4" },
  { name: "Laravel", icon: SiLaravel, color: "#D62828" },
  // { name: "Kotlin", icon: SiKotlin, color: "#8134E8" },
  { name: "Java", icon: FaJava, color: "#E84141" },

  { name: "Android", icon: SiAndroid, color: "#21884C" },
  // { name: "Docker", icon: SiDocker, color: "#26738C" },
  { name: "MySQL", icon: SiMysql, color: "#2386A0" },
  { name: "MongoDB", icon: SiMongodb, color: "#E8A320" },
  { name: "Supabase", icon: SiSupabase, color: "#19B788" },
  { name: "npm", icon: SiNpm, color: "#BD3434" },
  // { name: "Bun", icon: SiBun, color: "#CBB99E" },
  { name: "GitHub", icon: SiGithub, color: "#344052" },
  // { name: "PostgreSQL", icon: SiPostgresql, color: "#3978CB" },
  // { name: "Zoom", icon: SiZoom, color: "#1599D1" },
  // { name: "Audio", icon: FaMicrophone, color: "#9745DB" },

  { name: "Microsoft Excel", icon: FaFileExcel, color: "#16994E" },
  { name: "Microsoft Word", icon: FaFileWord, color: "#285CD3" },
  { name: "Windows", icon: FaWindows, color: "#E74747" },
];

// Ikon tambahan untuk teknologi dari data lama.
const extraIcons: Record<string, IconType> = {
  Git: SiGit,
  Flutter: SiFlutter,
  GitHub: SiGithub,
};

const knownNames = new Set(
  catalog.map((item) => item.name.toLowerCase())
);

// Hanya gunakan nama, ikon, dan warna.
// Status "used"/"learning" dari data lama tidak lagi ditampilkan.
const allSkills: DisplaySkill[] = [
  ...catalog,
  ...skills
    .filter((skill) => !knownNames.has(skill.name.toLowerCase()))
    .map((skill) => ({
      name: skill.name,
      icon: extraIcons[skill.name] ?? FaCode,
      color: "#268B82",
    })),
];

// Piksel per detik. Kecilkan untuk gerakan lebih santai.
const SPEED = 25;
// const BUTTON_SHIFT = 190;

// Normalisasi posisi agar tetap dalam rentang [-width, 0).
// Aman untuk geser manual ke kiri MAUPUN ke kanan.
function wrapPosition(value: number, width: number) {
  if (width <= 0) return 0;
  return ((value % width) + width) % width - width;
}

// =====================================================
// 02. KARTU KEAHLIAN - TANPA STATUS
// =====================================================

function SkillCard({
  skill,
  duplicate = false,
}: {
  skill: DisplaySkill;
  duplicate?: boolean;
}) {
  const Icon = skill.icon;

  const orbStyle = {
    "--skill-color": skill.color,
  } as CSSProperties;

  return (
    <li
      className="skills-unified-card"
      aria-hidden={duplicate ? true : undefined}
      title={skill.name}
    >
      <div
        className="skills-unified-orb"
        style={orbStyle}
        aria-hidden="true"
      >
        <div className="skills-unified-orb-inner">
          <Icon className="skills-unified-icon" />
        </div>
      </div>

      <span className="skills-unified-name">
        {skill.name}
      </span>
    </li>
  );
}

// =====================================================
// 03. INFINITE CAROUSEL: AUTO + DRAG + SWIPE + TOMBOL
// =====================================================

function InfiniteSkills({ items }: { items: DisplaySkill[] }) {
  const locale = useLocale();
  const isId = locale !== "en";

  const viewportRef = useRef<HTMLDivElement>(null);
  const firstGroupRef = useRef<HTMLUListElement>(null);
  const groupWidthRef = useRef(0);

  const pointerRef = useRef<{
    id: number;
    lastX: number;
  } | null>(null);

  // const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [dragging, setDragging] = useState(false);

  const x = useMotionValue(0);
  const reduceMotion = useReducedMotion();
  const isInView = useInView(viewportRef, { amount: 0.1 });

  // Dua grup identik menjadikan pengulangan tanpa loncatan.
  // Untuk daftar yang pendek, ulang isi di dalam SETIAP grup.
  const copiesPerGroup = Math.max(
    1,
    Math.ceil(10 / Math.max(items.length, 1))
  );
  const displayItems = Array.from(
    { length: copiesPerGroup },
    () => items
  ).flat();

  useEffect(() => {
    const group = firstGroupRef.current;
    if (!group) return;

    const measure = () => {
      const width = group.getBoundingClientRect().width;
      groupWidthRef.current = width;
      x.set(0);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(group);

    return () => observer.disconnect();
  }, [x]);

  // Autoplay berhenti ketika di-hover, sedang di-drag,
  // dijeda, di luar viewport, atau preferensi reduced-motion.
  useAnimationFrame((_time, delta) => {
  const width = groupWidthRef.current;

  if (
    !width ||
    hovered ||
    pointerRef.current !== null ||
    reduceMotion ||
    !isInView
  ) {
    return;
  }

  const distance =
    (Math.min(delta, 64) / 1000) * SPEED;

  x.set(wrapPosition(x.get() - distance, width));
});

  const shift = (amount: number) => {
    const width = groupWidthRef.current;
    if (!width) return;
    x.set(wrapPosition(x.get() + amount, width));
  };

  const stopDragging = (element: HTMLDivElement, pointerId: number) => {
    if (pointerRef.current?.id !== pointerId) return;

    pointerRef.current = null;
    setDragging(false);

    if (element.hasPointerCapture(pointerId)) {
      element.releasePointerCapture(pointerId);
    }
  };

  return (
    <>
      <div
        ref={viewportRef}
        className={`skills-unified-viewport${dragging ? " is-dragging" : ""}`}
        role="region"
        aria-roledescription="carousel"
        aria-label={
          isId
            ? "Daftar teknologi, bisa digeser ke kiri atau kanan"
            : "Technology list, draggable left or right"
        }
        onPointerEnter={(event) => {
          if (event.pointerType === "mouse") setHovered(true);
        }}
        onPointerLeave={() => setHovered(false)}
        onPointerDown={(event) => {
          if (!event.isPrimary || event.button !== 0) return;

          pointerRef.current = {
            id: event.pointerId,
            lastX: event.clientX,
          };
          setDragging(true);
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          const pointer = pointerRef.current;
          if (!pointer || pointer.id !== event.pointerId) return;

          const deltaX = event.clientX - pointer.lastX;
          pointer.lastX = event.clientX;
          shift(deltaX);
        }}
        onPointerUp={(event) => {
          stopDragging(event.currentTarget, event.pointerId);
        }}
        onPointerCancel={(event) => {
          stopDragging(event.currentTarget, event.pointerId);
        }}
        onLostPointerCapture={(event) => {
          if (pointerRef.current?.id === event.pointerId) {
            pointerRef.current = null;
            setDragging(false);
          }
        }}
      >
        <motion.div
          className="skills-unified-track"
          style={{ x }}
        >
          <ul
            ref={firstGroupRef}
            className="skills-unified-group"
          >
            {displayItems.map((skill, index) => (
              <SkillCard
                key={`first-${index}-${skill.name}`}
                skill={skill}
                duplicate={index >= items.length}
              />
            ))}
          </ul>

          <ul
            className="skills-unified-group"
            aria-hidden="true"
          >
            {displayItems.map((skill, index) => (
              <SkillCard
                key={`second-${index}-${skill.name}`}
                skill={skill}
                duplicate
              />
            ))}
          </ul>
        </motion.div>
      </div>

      {/* <div className="skills-unified-footer">
        <p className="skills-unified-help">
          {isId
            ? "Geser dengan mouse atau usap ke kiri/kanan"
            : "Drag with your mouse or swipe left/right"}
        </p>

        <div className="skills-unified-controls">
          <button
            type="button"
            className="skills-unified-arrow"
            aria-label={isId ? "Geser ke kanan" : "Scroll right"}
            onClick={() => shift(BUTTON_SHIFT)}
          >
            <span aria-hidden="true">←</span>
          </button>

          <button
            type="button"
            className="skills-marquee-toggle"
            aria-pressed={paused}
            onClick={() => setPaused((value) => !value)}
          >
            <span aria-hidden="true">{paused ? "▶" : "Ⅱ"}</span>
            {paused
              ? isId
                ? "Lanjutkan animasi"
                : "Resume animation"
              : isId
                ? "Jeda animasi"
                : "Pause animation"}
          </button>

          <button
            type="button"
            className="skills-unified-arrow"
            aria-label={isId ? "Geser ke kiri" : "Scroll left"}
            onClick={() => shift(-BUTTON_SHIFT)}
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div> */}
    </>
  );
}

// =====================================================
// 04. SECTION KEAHLIAN
// =====================================================

export function Skills() {
  const locale = useLocale();
  const isId = locale !== "en";

  return (
    <section
      id="skills"
      className="section-pad skills-unified-section"
    >
      <div className="container compact-section">
        <p className="eyebrow">
          {isId ? "02 / KEAHLIAN" : "02 / SKILLS"}
        </p>

        <h2>{isId ? "Keahlian" : "Skills"}</h2>

        <p className="section-lead">
          {isId
            ? "Keahlian teknis dan profesional saya."
            : "My technical and professional skills."}
        </p>

        <div className="skills-unified-panel">
          <InfiniteSkills items={allSkills} />
        </div>
      </div>
    </section>
  );
}
