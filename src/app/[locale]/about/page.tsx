
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import {
  ArrowLeft,
  ArrowUpRight,
  BriefcaseBusiness,
  GraduationCap,
  MapPin,
} from "lucide-react";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Contact } from "@/components/sections/contact";
import { projects } from "@/data/projects";

// =====================================================
// 01. TYPES
// =====================================================

type AboutPageProps = {
  params: Promise<{ locale: string }>;
};

// =====================================================
// 02. METADATA
// =====================================================

export const metadata: Metadata = {
  title: "Tentang Saya | Zikry Dwi Maulana",
  description:
    "Kenali Zikry Dwi Maulana, Full Stack Developer yang berfokus pada pengembangan web, mobile, dan desain digital.",
};

// =====================================================
// 03. ABOUT PAGE
// =====================================================

export default async function AboutPage({
  params,
}: AboutPageProps) {
  const { locale } = await params;

  const lang: "id" | "en" = locale === "en" ? "en" : "id";
  const isId = lang === "id";

  const featuredProjects = projects.slice(0, 3);

  return (
    <>
      {/* NAVBAR */}
      <Navbar />

      <main>
        <section className="about-story">
          <div className="container about-story-container">

            {/* ======================================
                01. BACK NAVIGATION
                ====================================== */}

            <div className="about-story-top">
              <Link
                href={`/${lang}#about`}
                className="about-story-back"
              >
                <ArrowLeft size={17} aria-hidden="true" />

                <span>
                  {isId
                    ? "Kembali ke Portofolio"
                    : "Back to Portfolio"}
                </span>
              </Link>

              <span className="about-story-index">
                ZIKRY / ABOUT / 2026
              </span>
            </div>

            {/* ======================================
                MAIN EDITORIAL GRID
                ====================================== */}

            <div className="about-story-grid">

              {/* ====================================
                  02. LEFT SIDE - PORTRAIT
                  ==================================== */}

              <div className="about-story-visual">
                <div className="about-story-portrait">
                  <div
                    className="about-story-portrait-shape"
                    aria-hidden="true"
                  />

                  <Image
                    src="/images/profile/zikry-portrait.webp"
                    alt="Zikry Dwi Maulana"
                    fill
                    priority
                    sizes="(max-width: 680px) 90vw, 43vw"
                    className="about-story-photo"
                  />

                  <span className="about-story-photo-label">
                    ZIKRY
                    <br />
                    DWI MAULANA
                  </span>
                </div>

                <div className="about-story-visual-footer">
                  <span>FULL STACK DEVELOPER</span>
                  <span>© 2026</span>
                </div>
              </div>

              {/* ====================================
                  03. RIGHT SIDE - PERSONAL INFO
                  ==================================== */}

              <div className="about-story-content">

                {/* INTRODUCTION */}
                <div className="about-story-intro">
                  <p className="about-story-eyebrow">
                    {isId
                      ? "HALO, PERKENALKAN"
                      : "HELLO, I'M"}
                  </p>

                  <h1>
                    {isId ? "Halo! Saya " : "Hello! I'm "}
                    <span>Zikry</span>
                    <br />
                    Dwi Maulana.
                  </h1>

                  <p className="about-story-role">
                    FULL STACK DEVELOPER
                  </p>

                  <div className="about-story-description">
                    <p>
                      {isId
                        ? "Saya adalah seorang Full Stack Developer yang berfokus pada pengembangan aplikasi web, mulai dari perancangan antarmuka yang responsif hingga pengelolaan sistem backend dan database."
                        : "I'm a Full Stack Developer focused on building web applications, from responsive interfaces to backend systems and databases."}
                    </p>

                    <p>
                      {isId
                        ? "Saya juga terus mempelajari mobile development, UI/UX, serta desain grafis menggunakan Affinity. Saya percaya setiap proyek adalah kesempatan untuk belajar, berkembang, dan membangun solusi digital yang bermanfaat."
                        : "I also continue exploring mobile development, UI/UX, and graphic design using Affinity. I believe every project is an opportunity to learn, grow, and build meaningful digital solutions."}
                    </p>
                  </div>

                  <div className="about-story-location">
                    <MapPin size={15} aria-hidden="true" />
                    <span>Semarang, Indonesia</span>
                  </div>
                </div>

                {/* ====================================
                    04. EXPERIENCE & EDUCATION
                    ==================================== */}

                <div className="about-story-details-grid">

                  {/* EXPERIENCE */}
                  <div className="about-story-detail">
                    <div className="about-story-detail-heading">
                      <BriefcaseBusiness
                        size={18}
                        aria-hidden="true"
                      />

                      <h2>
                        {isId ? "Pengalaman" : "Experience"}
                      </h2>
                    </div>

                    <div className="about-story-timeline">

                      {/* FULL TIME - ASAKANAMBU */}
                      <div className="about-story-timeline-item">
                        <span className="about-story-year">
                          Full Time
                        </span>

                        <div>
                          <h3>All Rounder</h3>

                          <p>AsakanAmbu · Semarang</p>

                          <small>
                            {isId
                              ? "Bekerja di rumah makan khas Sunda dengan tanggung jawab di beberapa bidang operasional, meliputi admin media sosial, frontliner (kasir dan waiter), serta backliner (juru masak)."
                              : "Worked at a Sundanese restaurant across several operational areas, including social media administration, front-of-house duties (cashier and waiter), and back-of-house duties (cook)."}
                          </small>
                        </div>
                      </div>

                      {/* FREELANCE WEB DEVELOPER */}
                      <div className="about-story-timeline-item">
                        <span className="about-story-year">
                          Freelance
                        </span>

                        <div>
                          <h3>Web Developer</h3>

                          <p>Freelance / Independent</p>

                          <small>
                            {isId
                              ? "Mengerjakan pengembangan website sesuai kebutuhan proyek, mulai dari perancangan tampilan, implementasi fitur, hingga pengelolaan fungsi website."
                              : "Developed websites based on project requirements, covering interface design, feature implementation, and website functionality."}
                          </small>
                        </div>
                      </div>

                      {/* INTERNSHIP - PUPR */}
                      <div className="about-story-timeline-item">
                        <span className="about-story-year">
                          2025
                        </span>

                        <div>
                          <h3>
                            {isId
                              ? "Praktik Kerja / Magang"
                              : "Internship"}
                          </h3>

                          <p>PUPR Cipta Karya · Semarang</p>

                          <small>
                            {isId
                              ? "Terlibat dalam pengembangan sistem informasi absensi pegawai berbasis web menggunakan Laravel dan MySQL, dengan fitur geolocation dan verifikasi wajah."
                              : "Contributed to a web-based employee attendance system using Laravel and MySQL, including geolocation and facial verification features."}
                          </small>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* EDUCATION */}
                  <div className="about-story-detail">
                    <div className="about-story-detail-heading">
                      <GraduationCap
                        size={18}
                        aria-hidden="true"
                      />

                      <h2>
                        {isId ? "Pendidikan" : "Education"}
                      </h2>
                    </div>

                    <div className="about-story-timeline">
                      <div className="about-story-timeline-item">
                        <span className="about-story-year">
                          D3
                        </span>

                        <div>
                          <h3>Teknik Informatika</h3>

                          <p>Universitas Dian Nuswantoro</p>

                          <small>Semarang, Indonesia</small>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                {/* ====================================
                    05. TECH STACK
                    ==================================== */}

                <div className="about-story-tools">
                  <span className="about-story-small-label">
                    TECH & TOOLS
                  </span>

                  <div className="about-story-tool-list">
                    <span>Next.js</span>
                    <span>Laravel</span>
                    <span>PHP</span>
                    <span>MySQL</span>
                    <span>JavaScript</span>
                    <span>Android Java</span>
                    <span>Figma</span>
                    <span>Affinity</span>
                  </div>
                </div>

                {/* ====================================
                    06. SELECTED PROJECTS
                    ==================================== */}

                <div className="about-story-gallery">
                  <div className="about-story-gallery-heading">
                    <h2>
                      {isId
                        ? "Cuplikan Karya"
                        : "Selected Work"}
                    </h2>

                    <Link href={`/${lang}#portfolio`}>
                      <span>
                        {isId
                          ? "Semua Proyek"
                          : "All Projects"}
                      </span>

                      <ArrowUpRight
                        size={15}
                        aria-hidden="true"
                      />
                    </Link>
                  </div>

                  <div className="about-story-gallery-grid">
                    {featuredProjects.map((project, index) => (
                      <Link
                        key={project.id}
                        href={`/${lang}#portfolio`}
                        className="about-story-polaroid"
                      >
                        <div className="about-story-polaroid-image">
                          <Image
                            src={project.image}
                            alt={project.title[lang]}
                            fill
                            sizes="(max-width: 680px) 45vw, 220px"
                          />
                        </div>

                        <div className="about-story-polaroid-caption">
                          <span>{project.title[lang]}</span>

                          <span>
                            {String(index + 1).padStart(2, "0")}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* ======================================
            07. CONTACT
            ====================================== */}

        <Contact />
      </main>

      {/* ======================================
          08. FOOTER
          ====================================== */}

      <Footer />
    </>
  );
}
