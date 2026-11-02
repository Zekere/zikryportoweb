"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  Eye,
  Github,
  GraduationCap,
  Maximize2,
  RefreshCw,
  Sparkles,
  X,
} from "lucide-react";


import {
  projects,
  type PortfolioCategory,
  type PortfolioProject,
  type ProjectScreenshot,
} from "@/data/projects";



// =====================================================
// 01. TYPES & FILTERS
// =====================================================

type Locale = "id" | "en";
type Category = "all" | PortfolioCategory;

// Status mengikuti `PortfolioProject` dari src/data/projects.ts.
// Tidak perlu mendeklarasikan ulang union ProjectStatus di file ini.

const categories: Category[] = [
  "all",
  "web",
  "mobile",
  // "graphic", // NONAKTIF SEMENTARA: aktifkan jika karya grafis sudah siap.
];

// Daftar tampilan badge. String-keyed agar status baru di projects.ts
// tidak menyebabkan konflik tipe pada komponen Portfolio.
const statusConfig: Record<
  string,
  { label: Record<Locale, string>; Icon: typeof CheckCircle2 }
> = {
  completed: {
    label: { id: "Selesai", en: "Completed" },
    Icon: CheckCircle2,
  },
  development: {
    label: { id: "Dalam Pengembangan", en: "In Development" },
    Icon: Clock3,
  },
  maintenance: {
    label: { id: "Dalam Pembaruan", en: "Updating" },
    Icon: RefreshCw,
  },
  planned: {
    label: { id: "Segera Hadir", en: "Coming Soon" },
    Icon: Sparkles,
  },
  coursework: {
    label: { id: "Proyek Perkuliahan", en: "Academic Project" },
    Icon: GraduationCap,
  },
};

// =====================================================
// 02. PROJECT THUMBNAIL
// =====================================================

function ProjectImage({
  project,
  locale,
  categoryLabel,
}: {
  project: PortfolioProject;
  locale: Locale;
  categoryLabel: string;
}) {
  const status = project.status;
  const config = status ? statusConfig[status] : undefined;
  const StatusIcon = config?.Icon;

  return (
    <div className="project-media">
      <Image
        src={project.image}
        alt={`Preview ${project.title[locale]}`}
        fill
        sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
        className="project-image"
      />

      <span className="project-image-category">{categoryLabel}</span>

      {status && config && StatusIcon && (
        <span className={`project-status-badge project-status-${status}`}>
          <StatusIcon size={12} aria-hidden="true" />
          {config.label[locale]}
        </span>
      )}
    </div>
  );
}

// =====================================================
// 03. PROJECT CARD (PREVIEW + GITHUB)
// =====================================================

function ProjectCard({
  project,
  locale,
  onOpenPreview,
}: {
  project: PortfolioProject;
  locale: Locale;
  onOpenPreview: (project: PortfolioProject) => void;
}) {
  const t = useTranslations("portfolio");
  const githubUrl = project.githubUrl?.trim();
  const previewEnabled = project.previewEnabled !== false;
  const isGraphic = project.category === "graphic";

  return (
    <motion.article
      layout
      className="project-card portfolio-editorial-card"
      initial={false}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 12, scale: 0.98 }}
      transition={{ duration: 0.24 }}
    >
      <ProjectImage
        project={project}
        locale={locale}
        categoryLabel={t(project.category)}
      />

      <div className="project-content">
        <p className="project-category">{t(project.category)}</p>
        <h3>{project.title[locale]}</h3>
        <p>{project.description[locale]}</p>

        <div className="project-tags">
          {project.technologies.map((technology) => (
            <span key={technology}>{technology}</span>
          ))}
        </div>

        {/*
          Preview aktif secara default, kecuali previewEnabled: false.
          GitHub hanya muncul kalau githubUrl berisi tautan.
        */}
        <div className="project-actions">
          <button
            type="button"
            className="project-view-button"
            disabled={!previewEnabled}
            onClick={() => {
              if (previewEnabled) onOpenPreview(project);
            }}
            aria-label={
              previewEnabled
                ? `${isGraphic ? (locale === "id" ? "Lihat karya" : "View work") : "Preview"} ${project.title[locale]}`
                : `${locale === "id" ? "Preview belum tersedia" : "Preview unavailable"}: ${project.title[locale]}`
            }
            title={
              previewEnabled
                ? undefined
                : locale === "id"
                  ? "Preview proyek belum tersedia"
                  : "Project preview is not available yet"
            }
          >
            <Eye size={17} aria-hidden="true" />
            <span>
              {!previewEnabled
                ? locale === "id"
                  ? "Preview Belum Tersedia"
                  : "Preview Unavailable"
                : isGraphic
                  ? locale === "id"
                    ? "Lihat Karya"
                    : "View Work"
                  : "Preview"}
            </span>
          </button>

          {!isGraphic && githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-github-button"
              aria-label={`${locale === "id" ? "Lihat Proyek" : "View Project"} ${project.title[locale]} ${locale === "id" ? "di" : "on"} GitHub`}
            >
              <span>{locale === "id" ? "Lihat Proyek" : "View Project"}</span>
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

// =====================================================
// 04. PREVIEW POPUP (KEPT FROM CURRENT PORTFOLIO)
// =====================================================

function ProjectPreviewModal({
  project,
  locale,
  onClose,
}: {
  project: PortfolioProject;
  locale: Locale;
  onClose: () => void;
}) {
  const t = useTranslations("portfolio");
  const [activeImage, setActiveImage] = useState(0);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const screenshots: ProjectScreenshot[] =
    project.screenshots?.length
      ? project.screenshots
      : project.galleryImages?.length
        ? project.galleryImages.map((src) => ({ src, caption: project.description }))
        : [{ src: project.image, caption: project.description }];

  const totalImages = screenshots.length;
  const currentScreenshot = screenshots[activeImage] ?? screenshots[0];
  const githubUrl = project.githubUrl?.trim();

  const nextImage = () => setActiveImage((index) => (index + 1) % totalImages);
  const previousImage = () =>
    setActiveImage((index) => (index - 1 + totalImages) % totalImages);

  useEffect(() => {
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      if (previousFocus instanceof HTMLElement) previousFocus.focus();
    };
  }, [onClose]);

  return (
    <motion.div
      className="project-preview-backdrop"
      role="presentation"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="project-preview-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`preview-title-${project.id}`}
        aria-describedby={`preview-description-${project.id}`}
        onClick={(event) => event.stopPropagation()}
        initial={{ opacity: 0, scale: 0.97, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 16 }}
        transition={{ duration: 0.22 }}
      >
        <div className="project-preview-header">
          <div>
            <p className="project-category">{t(project.category)}</p>
            <h3 id={`preview-title-${project.id}`}>{project.title[locale]}</h3>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            className="project-preview-close"
            aria-label={locale === "id" ? "Tutup preview" : "Close preview"}
            onClick={onClose}
          >
            <X size={21} />
          </button>
        </div>

        <div className="project-preview-main">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`${project.id}-${activeImage}`}
              className="project-preview-image-wrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <Image
                src={currentScreenshot.src}
                alt={currentScreenshot.caption[locale]}
                fill
                sizes="(max-width: 768px) 94vw, 850px"
                className="project-preview-image"
              />
            </motion.div>
          </AnimatePresence>

          {totalImages > 1 && (
            <>
              <button
                type="button"
                className="project-preview-arrow previous"
                aria-label={locale === "id" ? "Screenshot sebelumnya" : "Previous screenshot"}
                onClick={previousImage}
              >
                <ArrowLeft size={20} />
              </button>
              <button
                type="button"
                className="project-preview-arrow next"
                aria-label={locale === "id" ? "Screenshot berikutnya" : "Next screenshot"}
                onClick={nextImage}
              >
                <ArrowRight size={20} />
              </button>
            </>
          )}
        </div>

        <div className="project-preview-counter">
          <span>Screenshot</span>
          <span>{activeImage + 1} / {totalImages}</span>
        </div>

        {totalImages > 1 && (
          <div className="project-preview-thumbnails">
            {screenshots.map((screenshot, index) => (
              <button
                key={`${screenshot.src}-${index}`}
                type="button"
                className={
                  activeImage === index
                    ? "project-preview-thumb active"
                    : "project-preview-thumb"
                }
                aria-label={`Screenshot ${index + 1}: ${screenshot.caption[locale]}`}
                aria-pressed={activeImage === index}
                onClick={() => setActiveImage(index)}
              >
                <Image
                  src={screenshot.src}
                  alt=""
                  width={120}
                  height={80}
                  className="project-preview-thumb-image"
                />
              </button>
            ))}
          </div>
        )}

        <div className="project-preview-caption">
          <p className="project-preview-label">
            {locale === "id" ? "Penjelasan Screenshot" : "Screenshot Description"}
          </p>
          <p>{currentScreenshot.caption[locale]}</p>
        </div>

        <div className="project-preview-details">
          <h4>{locale === "id" ? "Tentang Proyek" : "About the Project"}</h4>
          <p id={`preview-description-${project.id}`}>
            {project.details?.[locale] ?? project.description[locale]}
          </p>
          <div className="project-tags">
            {project.technologies.map((technology) => (
              <span key={technology}>{technology}</span>
            ))}
          </div>
        </div>

        {githubUrl && (
          <div className="project-preview-footer">
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-view-button"
            >
              <Github size={17} />
              <span>
                {locale === "id" ? "Lihat Proyek di GitHub" : "View Project on GitHub"}
              </span>
              <ArrowUpRight size={16} />
            </a>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

// =====================================================
// 05. PORTFOLIO EDITORIAL SECTION
// =====================================================

export function Portfolio() {
  const t = useTranslations("portfolio");
  const locale: Locale = useLocale() === "en" ? "en" : "id";
  const [activeTab, setActiveTab] = useState<Category>("all");
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const closePreview = useCallback(() => setSelectedProject(null), []);

  // DESAIN GRAFIS DISIMPAN DALAM projects.ts, TETAPI DISEMBUNYIKAN DULU.
  // Saat ingin mengaktifkan lagi:
  // 1. Hapus syarat `project.category !== "graphic"` di bawah.
  // 2. Aktifkan kembali "graphic" pada array `categories` di atas.
  const visibleProjects = projects.filter(
    (project) =>
      project.category !== "graphic" &&
      (activeTab === "all" || project.category === activeTab)
  );

  return (
    <section id="portfolio" className="section-pad portfolio-section portfolio-editorial">
      <div className="container">
        <div className="portfolio-editorial-topline">
          <p className="eyebrow">{t("eyebrow")}</p>
          <span>© 2026 · ZIKRY DWI MAULANA</span>
        </div>

        {/* Tab dan seluruh proyek berada di SATU folder. */}
        <div className="portfolio-editorial-browser">
          {/* Folder tabs */}
          <div
            className="portfolio-editorial-tabs"
            role="group"
            aria-label={locale === "id" ? "Filter portofolio" : "Portfolio filters"}
          >
            {categories.map((category, index) => (
              <button
                key={category}
                type="button"
                className={`portfolio-editorial-tab${activeTab === category ? " is-active" : ""}`}
                aria-pressed={activeTab === category}
                onClick={() => setActiveTab(category)}
              >
                <span
                  className={`portfolio-editorial-tab-dot dot-${index}`}
                  aria-hidden="true"
                />
                {t(category)}
              </button>
            ))}
            {/* Kategori graphic disembunyikan sementara. */}
          </div>

          {/* SATU CARD FOLDER: cover + kumpulan proyek */}
          <div className="portfolio-editorial-folder">
            {/* Cover bagian atas folder */}
            <div className="portfolio-editorial-hero">
              <div className="portfolio-editorial-hero-meta">
                <span>DESIGN / BUILD / EXPLORE</span>
                <span>PORTFOLIO © 2026</span>
                <a
                  href="#portfolio-projects"
                  className="portfolio-editorial-expand"
                  aria-label={locale === "id" ? "Jelajahi proyek" : "Explore projects"}
                >
                  <Maximize2 size={19} aria-hidden="true" />
                </a>
              </div>

              <div className="portfolio-editorial-selection" aria-label="Portfolio">
                <span className="portfolio-editorial-title">
                  portfolio<span>.</span>
                </span>
                <span className="portfolio-editorial-corner top-left" aria-hidden="true" />
                <span className="portfolio-editorial-corner top-right" aria-hidden="true" />
                <span className="portfolio-editorial-corner bottom-left" aria-hidden="true" />
                <span className="portfolio-editorial-corner bottom-right" aria-hidden="true" />
              </div>

              <div className="portfolio-editorial-bottom">
                <p>{t("description")}</p>
                <a href="#portfolio-projects" className="portfolio-editorial-scroll">
                  <span>{locale === "id" ? "Jelajahi Karya" : "Explore Work"}</span>
                  <ArrowDownRight size={17} aria-hidden="true" />
                </a>
              </div>
              <div className="portfolio-editorial-checker" aria-hidden="true" />
            </div>

            {/* Kumpulan proyek DI DALAM card folder yang sama */}
            <div id="portfolio-projects" className="portfolio-editorial-folder-content">
              <div className="portfolio-editorial-list-heading">
                <div>
                  <span className="portfolio-editorial-overline">
                    {locale === "id" ? "KUMPULAN KARYA" : "SELECTED WORK"}
                  </span>
                  <h2>{locale === "id" ? "Proyek Pilihan" : "Selected Projects"}</h2>
                </div>
                <span className="portfolio-editorial-count">
                  {String(visibleProjects.length).padStart(2, "0")}{" "}
                  {locale === "id" ? "PROYEK" : "PROJECTS"}
                </span>
              </div>

              <motion.div layout className="project-grid portfolio-editorial-projects">
                <AnimatePresence initial={false} mode="popLayout">
                  {visibleProjects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      locale={locale}
                      onOpenPreview={setSelectedProject}
                    />
                  ))}
                </AnimatePresence>
                {visibleProjects.length === 0 && (
                  <p className="empty-state">{t("placeholder")}</p>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {selectedProject && (
          <ProjectPreviewModal
            key={selectedProject.id}
            project={selectedProject}
            locale={locale}
            onClose={closePreview}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
