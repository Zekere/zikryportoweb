
"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, GraduationCap } from "lucide-react";

// =====================================================
// 01. ABOUT SECTION
// =====================================================

export function About() {
  const t = useTranslations("about");
  const locale = useLocale();
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="about"
      className="about section-pad"
      aria-labelledby="about-heading"
    >
      <div className="container about-grid">

        {/* ==========================================
            LEFT SIDE - DEVELOPER ILLUSTRATION
            ========================================== */}

        <motion.div
          className="about-graphic"
          initial={{
            opacity: 0,
            x: -25,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: reduceMotion ? 0 : 0.6,
            ease: "easeOut",
          }}
        >
          <div
            className="illustration-card"
            aria-hidden="true"
          >
            {/* Computer Illustration */}
            <div className="illustration-screen">
              <span>{"</>"}</span>

              <div className="illustration-lines">
                <i />
                <i />
                <i />
              </div>
            </div>

            {/* Developer Illustration */}
            <div className="illustration-person">
              <div className="ill-head" />
              <div className="ill-shirt" />
            </div>

            {/* Desk Illustration */}
            <div className="illustration-desk" />
          </div>

          <small>
            MINIMAL FLAT DEVELOPER · ILLUSTRATION
          </small>
        </motion.div>

        {/* ==========================================
            RIGHT SIDE - ABOUT CONTENT
            ========================================== */}

        <motion.div
          className="about-copy"
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: reduceMotion ? 0 : 0.6,
            delay: reduceMotion ? 0 : 0.1,
            ease: "easeOut",
          }}
        >
          {/* Section Label */}
          <p className="eyebrow">
            {t("eyebrow")}
          </p>

          {/* Section Title */}
          <h2 id="about-heading">
            {t("title")}
          </h2>

          {/* About Description */}
          <p>{t("body1")}</p>
          <p>{t("body2")}</p>

          {/* ======================================
              MORE ABOUT ME BUTTON
              ====================================== */}

          <div className="about-more">
            <Link
              href={`/${locale}/about`}
              className="about-more-button"
              aria-label={
                locale === "id"
                  ? "Kenali Saya Lebih Lanjut"
                  : "Get to Know Me"
              }
            >
              <span>
                {locale === "id"
                  ? "Kenali Saya Lebih Lanjut"
                  : "Get to Know Me"}
              </span>

              <ArrowUpRight
                size={18}
                aria-hidden="true"
              />
            </Link>
          </div>

          {/* ======================================
              EDUCATION INFORMATION
              ====================================== */}

          <p className="education">
            <GraduationCap
              size={17}
              aria-hidden="true"
            />

            <span>
              D3 Teknik Informatika · Universitas Dian Nuswantoro
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
