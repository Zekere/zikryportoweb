
"use client";

import { useState } from "react";

import {
  useLocale,
  useTranslations,
} from "next-intl";

import { useTheme } from "next-themes";

import {
  Link,
  usePathname,
  useRouter,
} from "@/i18n/navigation";

import {
  Moon,
  Sun,
  Menu,
  X,
  Globe,
} from "lucide-react";

// =====================================================
// 01. NAVBAR COMPONENT
// =====================================================

export function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();

  const router = useRouter();
  const pathname = usePathname();

  const { resolvedTheme, setTheme } = useTheme();

  const [open, setOpen] = useState(false);

  // ===================================================
  // 02. NAVIGATION LINKS
  // ===================================================

  const links = [
    {
      id: "about",
      label: t("about"),
      href: "/#about",
    },
    {
      id: "skills",
      label: t("skills"),
      href: "/#skills",
    },
    {
      id: "portfolio",
      label: t("portfolio"),
      href: "/#portfolio",
    },
    {
      id: "contact",
      label: t("contact"),
      href: "/#contact",
    },
  ];

  // ===================================================
  // 03. CHANGE LANGUAGE
  // ===================================================

  function changeLocale() {
    const nextLocale = locale === "id" ? "en" : "id";

    router.replace(pathname, {
      locale: nextLocale,
    });

    setOpen(false);
  }

  // ===================================================
  // 04. TOGGLE THEME
  // ===================================================

  function toggleTheme() {
    setTheme(
      resolvedTheme === "dark" ? "light" : "dark"
    );
  }

  // ===================================================
  // 05. CLOSE MOBILE MENU
  // ===================================================

  function closeMenu() {
    setOpen(false);
  }

  // ===================================================
  // 06. NAVBAR UI
  // ===================================================

  return (
    <header className="site-header">
      <div className="container nav-inner">

        {/* =====================================
            LOGO
            ===================================== */}

        <Link
          href="/"
          className="brand"
          aria-label={
            locale === "id"
              ? "Kembali ke halaman utama"
              : "Back to homepage"
          }
          onClick={closeMenu}
        >
          Z<span>.</span>
        </Link>

        {/* =====================================
            DESKTOP NAVIGATION
            ===================================== */}

        <nav
          className="nav-links"
          aria-label={
            locale === "id"
              ? "Navigasi utama"
              : "Main navigation"
          }
        >
          {links.map((item) => (
            <Link
              key={item.id}
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* =====================================
            NAVBAR ACTIONS
            ===================================== */}

        <div className="nav-actions">

          {/* LANGUAGE SWITCH */}
          <button
            type="button"
            className="icon-button locale-button"
            onClick={changeLocale}
            aria-label={
              locale === "id"
                ? "Ubah bahasa ke Inggris"
                : "Change language to Indonesian"
            }
          >
            <Globe size={16} />

            <span>
              {locale.toUpperCase()}
            </span>
          </button>

          {/* DARK / LIGHT MODE */}
          <button
            type="button"
            className="icon-button"
            onClick={toggleTheme}
            aria-label={
              locale === "id"
                ? "Ganti mode warna"
                : "Toggle color theme"
            }
          >
            <Sun
              className="dark-icon"
              size={19}
            />

            <Moon
              className="light-icon"
              size={19}
            />
          </button>

          {/* MOBILE HAMBURGER */}
          <button
            type="button"
            className="icon-button hamburger"
            aria-label={
              open
                ? locale === "id"
                  ? "Tutup menu"
                  : "Close menu"
                : locale === "id"
                  ? "Buka menu"
                  : "Open menu"
            }
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? (
              <X size={21} />
            ) : (
              <Menu size={21} />
            )}
          </button>

        </div>
      </div>

      {/* =====================================
          MOBILE NAVIGATION
          ===================================== */}

      {open && (
        <nav
          id="mobile-navigation"
          className="mobile-nav"
          aria-label={
            locale === "id"
              ? "Navigasi mobile"
              : "Mobile navigation"
          }
        >
          {links.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              onClick={closeMenu}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
