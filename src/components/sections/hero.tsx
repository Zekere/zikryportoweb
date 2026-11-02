"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowUpRight, Github, Linkedin, Instagram, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { socials } from "@/data/socials";

export function Hero() {
  const t = useTranslations("hero");
  const reduceMotion = useReducedMotion();
  const [portraitError, setPortraitError] = useState(false);

  const showPhoto = profile.showPortrait && !portraitError;

  const socialLinks = [
    { url: socials.github, icon: Github, label: "GitHub" },
    { url: socials.linkedin, icon: Linkedin, label: "LinkedIn" },
    { url: socials.instagram, icon: Instagram, label: "Instagram" },
    { url: profile.email ? `mailto:${profile.email}` : "", icon: Mail, label: "Email" },
  ].filter((item) => Boolean(item.url));

  return (
    <section id="home" className="hero">
      <div className="container hero-wrap">
        <div className="hero-topline">
          <span>{t("greeting")}</span>
          <span className="hero-mini-serial">PORTFOLIO / {new Date().getFullYear()}</span>
        </div>

        <div className="hero-editorial">
          <motion.div
            className="hero-title-block"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h1 aria-label={profile.name}>
              <span className="hero-firstname" aria-hidden="true">
                {profile.firstName}
              </span>
              <span className="hero-lastname" aria-hidden="true">
                {profile.lastName}
              </span>
            </h1>
          </motion.div>

          <motion.div
            className="hero-portrait-shell"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.1 }}
          >
            <div className="hero-portrait">
              {showPhoto ? (
                // Foto memakai aset lokal; tidak di-request sampai showPortrait = true.
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={profile.portrait}
                  alt={`Potret ${profile.name}`}
                  className="hero-portrait-image"
                  onError={() => setPortraitError(true)}
                />
              ) : (
                <div className="portrait-silhouette" aria-hidden="true">
                  <span className="portrait-head" />
                  <span className="portrait-body" />
                </div>
              )}
            </div>
            {!showPhoto && <span className="photo-tag">FOTO PROFIL</span>}
          </motion.div>

          <div className="hero-side-note" aria-hidden="true">
            BUILDING WITH PURPOSE <span>✳</span> KEEP LEARNING
          </div>
        </div>

        <div className="hero-bottom">
          <div className="hero-intro">
            <p className="hero-role">{t("role")}</p>
            <p className="hero-description">{t("description")}</p>
            {profile.availableForWork && (
              <p className="availability">
                <i aria-hidden="true" />
                {t("available")}
              </p>
            )}
          </div>

          <div className="hero-right">
            <div className="hero-cta">
              <a className="btn btn-primary" href="#portfolio">
                {t("projects")} <ArrowUpRight size={17} aria-hidden="true" />
              </a>
              <a className="btn btn-outline" href="#contact">
                {t("contact")}
              </a>
            </div>
            {socialLinks.length > 0 && (
              <div className="hero-socials" aria-label="Profil sosial">
                {socialLinks.map(({ url, icon: Icon, label }) => (
                  <a
                    key={label}
                    href={url}
                    aria-label={label}
                    title={label}
                    target={url.startsWith("mailto:") ? undefined : "_blank"}
                    rel={url.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                  >
                    <Icon size={18} aria-hidden="true" />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        <a href="#about" className="scroll-cue">
          <span>{t("scroll")}</span>
          <ArrowDown size={16} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
