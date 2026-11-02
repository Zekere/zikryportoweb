"use client";

import { useLocale, useTranslations } from "next-intl";
import { MotionConfig, motion } from "motion/react";
import {
  ArrowUpRight,
  Github,
  Instagram,
  Linkedin,
  Mail,
  type LucideIcon,
} from "lucide-react";

import { profile } from "@/data/profile";
import { socials } from "@/data/socials";

type Locale = "id" | "en";

type ContactChannel = {
  id: "github" | "linkedin" | "email" | "instagram";
  label: string;
  icon: LucideIcon;
  url: string;
  description: Record<Locale, string>;
  action: Record<Locale, string>;
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

function ChannelContent({
  channel,
  locale,
}: {
  channel: ContactChannel;
  locale: Locale;
}) {
  const Icon = channel.icon;

  return (
    <>
      <div className="contact-v2-card-top">
        <span className="contact-v2-icon" aria-hidden="true">
          <Icon size={22} strokeWidth={1.8} />
        </span>
        <ArrowUpRight
          className="contact-v2-card-arrow"
          size={18}
          aria-hidden="true"
        />
      </div>
      <div className="contact-v2-card-body">
        <h3>{channel.label}</h3>
        <p>{channel.description[locale]}</p>
      </div>
      <span className="contact-v2-card-action">
        {channel.url
          ? channel.action[locale]
          : locale === "id"
            ? "Tautan belum ditambahkan"
            : "Link not added yet"}
      </span>
    </>
  );
}

export function Contact() {
  const t = useTranslations("contact");
  const locale: Locale = useLocale() === "en" ? "en" : "id";
  const isId = locale === "id";

  const email = profile.email.trim();
  const emailUrl = email ? `mailto:${email}` : "";

  // Semua kartu selalu muncul. Tautan kosong ditampilkan nonaktif,
  // sehingga tidak ada link palsu atau navigasi ke halaman kosong.
  const channels: ContactChannel[] = [
    {
      id: "github",
      label: "GitHub",
      icon: Github,
      url: socials.github.trim(),
      description: {
        id: "Kode sumber, eksperimen, dan proyek pengembangan.",
        en: "Source code, experiments, and development projects.",
      },
      action: { id: "Lihat profil", en: "View profile" },
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      icon: Linkedin,
      url: socials.linkedin.trim(),
      description: {
        id: "Jejaring profesional dan peluang kolaborasi.",
        en: "Professional networking and collaboration opportunities.",
      },
      action: { id: "Terhubung", en: "Connect" },
    },
    {
      id: "email",
      label: "Email",
      icon: Mail,
      url: emailUrl,
      description: {
        id: "Diskusi proyek, pekerjaan, dan kerja sama.",
        en: "Project discussions, work, and partnerships.",
      },
      action: { id: "Kirim pesan", en: "Send a message" },
    },
    {
      id: "instagram",
      label: "Instagram",
      icon: Instagram,
      url: socials.instagram.trim(),
      description: {
        id: "Aktivitas, proses kreatif, dan cerita di balik karya.",
        en: "Updates, creative process, and behind-the-scenes work.",
      },
      action: { id: "Lihat Instagram", en: "View Instagram" },
    },
  ];

  return (
    <MotionConfig reducedMotion="user">
      <section
        id="contact"
        className="contact contact-v2 section-pad"
        aria-labelledby="contact-v2-title"
      >
        <div className="container contact-inner contact-v2-inner">
          <motion.div
            className="contact-v2-intro"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <div className="contact-v2-topline">
              <p className="eyebrow">{t("eyebrow")}</p>
              <span className="contact-v2-meta">LET&apos;S CONNECT</span>
            </div>

            <h2 id="contact-v2-title">
              {isId ? "Mari membangun sesuatu " : "Let's build something "}
              <span>{isId ? "yang luar biasa." : "extraordinary."}</span>
            </h2>

            <p className="contact-v2-description">
              {isId
                ? "Terbuka untuk kolaborasi, proyek freelance, peluang kerja, dan diskusi seputar teknologi. Punya ide? Mari terhubung."
                : "Open to collaborations, freelance projects, career opportunities, and conversations about technology. Have an idea? Let's connect."}
            </p>

            {emailUrl ? (
              <a className="contact-v2-cta" href={emailUrl}>
                <Mail size={19} aria-hidden="true" />
                <span>{isId ? "Kirim Email" : "Send an Email"}</span>
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            ) : (
              <div className="contact-v2-email-placeholder">
                <Mail size={18} aria-hidden="true" />
                <span>
                  {isId
                    ? "Tambahkan email di src/data/profile.ts untuk mengaktifkan tombol email."
                    : "Add your email in src/data/profile.ts to enable email contact."}
                </span>
              </div>
            )}
          </motion.div>

          <motion.div
            className="contact-v2-cards"
            aria-label={isId ? "Kanal untuk terhubung" : "Contact channels"}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {channels.map((channel) => (
              <motion.div
                key={channel.id}
                className="contact-v2-card-slot"
                variants={itemVariants}
              >
                {channel.url ? (
                  <a
                    className="contact-v2-card"
                    href={channel.url}
                    target={channel.id === "email" ? undefined : "_blank"}
                    rel={channel.id === "email" ? undefined : "noopener noreferrer"}
                    aria-label={`${channel.label} — ${channel.action[locale]}`}
                  >
                    <ChannelContent channel={channel} locale={locale} />
                  </a>
                ) : (
                  <div className="contact-v2-card is-unavailable">
                    <ChannelContent channel={channel} locale={locale} />
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
