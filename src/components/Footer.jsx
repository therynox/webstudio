import React from "react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import api from "../services/api";

const Footer = () => {
  const year = new Date().getFullYear();
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    let mounted = true;

    api.get("/settings")
      .then((response) => {
        if (mounted) {
          setSettings(response.data?.data || null);
        }
      })
      .catch(() => {});

    return () => {
      mounted = false;
    };
  }, []);

  const footerSettings = settings?.footer;

  const footerGroups =
    footerSettings?.groups?.length
      ? footerSettings.groups
      : [
          {
            title: "EXPLORE",
            links: [
              { label: "Home", path: "/" },
              { label: "Work", path: "/work" },
              { label: "Services", path: "/services" },
              { label: "Process", path: "/process" },
            ],
          },
          {
            title: "SERVICES",
            links: [
              { label: "Web Design", path: "/services/web-design" },
              { label: "Online Store", path: "/services/ecommerce" },
              {
                label: "Web Applications",
                path: "/services/web-applications",
              },
              {
                label: "Business Systems",
                path: "/services/business-systems",
              },
            ],
          },
        ];

  const socialLinks =
    footerSettings?.social?.filter(
      (item) => item.visible !== false
    ) || [
      {
        label: "Instagram",
        path: "https://instagram.com",
        external: true,
      },
      {
        label: "LinkedIn",
        path: "https://linkedin.com",
        external: true,
      },
      {
        label: "GitHub",
        path: "https://github.com",
        external: true,
      },
    ];

  return (
    <footer className="tnx-footer">
      <div className="tnx-footer-container">

        {/* =========================================
            TOP FOOTER
        ========================================== */}
        <div className="tnx-footer-top">

          {/* BRAND */}
          <div className="tnx-footer-brand-column">
            <div className="tnx-footer-logo-small">
              <span>{settings?.branding?.brandName || "THERYNOX"}</span>
              <small>{settings?.branding?.studioName || "WEB STUDIO"}</small>
            </div>

            <p className="tnx-footer-description">
              {footerSettings?.description ||
                "Digital experiences, websites and systems built for ambitious businesses."}
            </p>

            <a
              href={`mailto:${footerSettings?.email || "hello@therynox.com"}`}
              className="tnx-footer-email"
            >
              {footerSettings?.email || "hello@therynox.com"}
              <span>↗</span>
            </a>
          </div>

          {footerGroups.slice(0, 2).map((group) => (
            <div
              className="tnx-footer-column"
              key={group._id || group.title}
            >
              <div className="tnx-footer-heading">{group.title}</div>

              {(group.links || [])
                .filter((item) => item.visible !== false)
                .map((item) => (
                  <a
                    key={`${group.title}-${item.label}`}
                    href={item.path || "#"}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noreferrer" : undefined}
                  >
                    {item.label}
                  </a>
                ))}
            </div>
          ))}

          <div className="tnx-footer-column">
            <div className="tnx-footer-heading">CONNECT</div>

            {socialLinks.map((item) => (
              <a
                key={item.label}
                href={item.path || "#"}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noreferrer" : undefined}
              >
                {item.label}
              </a>
            ))}

            <a
              href={`mailto:${footerSettings?.email || "hello@therynox.com"}`}
            >
              Email
            </a>
          </div>
        </div>


        {/* =========================================
            DIVIDER + ONLY ONE ORANGE DOT
        ========================================== */}
        <div className="tnx-footer-divider">

          <motion.span
            className="tnx-footer-dot"
            animate={{
              x: ["0%", "100%", "0%"],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

        </div>


        {/* =========================================
            BIG BRAND SECTION
        ========================================== */}
        <div className="tnx-footer-brand-section">

          {/* NO SECOND ORANGE DOT HERE */}
          <div className="tnx-footer-brand-line">
            <span>CREATIVE DIGITAL STUDIO</span>
          </div>


          {/* THERYNOX */}
          <div className="tnx-big-word-wrapper">
            <motion.div
              className="tnx-big-word"
              animate={{
                color: [
                  "#ffffff",
                  "#f5f5f5",
                  "#ffffff",
                  "#dedede",
                  "#ffffff",
                ],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              THERYNOX
            </motion.div>
          </div>


          {/* WEB STUDIO */}
          <div className="tnx-big-word-wrapper tnx-webstudio-wrapper">
            <motion.div
              className="tnx-big-word tnx-webstudio-word"
              animate={{
                color: [
                  "#ffffff",
                  "#eeeeee",
                  "#ffffff",
                  "#d8d8d8",
                  "#ffffff",
                ],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              WEB STUDIO
            </motion.div>
          </div>


          {/* ORANGE ANIMATED LINE */}
          <motion.div
            className="tnx-orange-line"
            animate={{
              scaleX: [0.15, 1, 0.15],
              opacity: [0.35, 1, 0.35],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />


          {/* SMALL LABELS */}
          <div className="tnx-footer-sub-brand">
            <span>DIGITAL EXPERIENCES</span>
            <span>EST. 2026</span>
          </div>

        </div>


        {/* =========================================
            BOTTOM FOOTER
        ========================================== */}
        <div className="tnx-footer-bottom">

          <div>
            © {year} {footerSettings?.copyright || "THERYNOX WEB STUDIO"}
          </div>

          <div>
            {footerSettings?.location || "INDIA · WORKING WORLDWIDE"}
          </div>

          <a href={footerSettings?.privacyUrl || "/privacy"}>
            PRIVACY
          </a>

          <a href={footerSettings?.termsUrl || "/terms"}>
            TERMS
          </a>

          <div className="tnx-built-purpose">
            BUILT WITH PURPOSE
          </div>

        </div>

      </div>


      {/* =========================================
          CSS
      ========================================== */}
      <style>{`

        /* =========================================
           MAIN FOOTER
        ========================================= */

        .tnx-footer {
          position: relative;
          width: 100%;
          background: #050505;
          color: #ffffff;
          overflow: hidden;

          border-top:
            1px solid rgba(255,255,255,0.08);
        }


        .tnx-footer-container {
          width: min(
            1420px,
            calc(100% - 80px)
          );

          margin: 0 auto;

          padding-top: 70px;
        }


        /* =========================================
           TOP FOOTER GRID
        ========================================= */

        .tnx-footer-top {
          display: grid;

          grid-template-columns:
            2.2fr
            1fr
            1.2fr
            1fr;

          gap: 70px;

          padding-bottom: 70px;
        }


        /* =========================================
           BRAND
        ========================================== */

        .tnx-footer-brand-column {
          max-width: 430px;
        }


        .tnx-footer-logo-small {
          display: flex;
          align-items: baseline;
          gap: 12px;
        }


        .tnx-footer-logo-small span {
          font-size: 30px;

          line-height: 1;

          font-weight: 800;

          letter-spacing: -1.5px;

          color: #ffffff;
        }


        .tnx-footer-logo-small small {
          font-size: 8px;

          font-weight: 800;

          letter-spacing: 3px;

          color: #ff5a1f;
        }


        .tnx-footer-description {
          max-width: 390px;

          margin-top: 28px;
          margin-bottom: 30px;

          color:
            rgba(255,255,255,0.48);

          font-size: 15px;

          line-height: 1.65;
        }


        .tnx-footer-email {
          display: inline-flex;

          align-items: center;

          gap: 14px;

          padding-bottom: 10px;

          color: #ffffff;

          text-decoration: none;

          font-size: 14px;

          font-weight: 500;

          border-bottom:
            1px solid
            rgba(255,255,255,0.25);

          transition:
            color 0.3s ease,
            border-color 0.3s ease;
        }


        .tnx-footer-email span {
          color: #ff5a1f;

          font-size: 18px;
        }


        .tnx-footer-email:hover {
          color: #ff5a1f;

          border-color: #ff5a1f;
        }


        /* =========================================
           FOOTER COLUMNS
        ========================================== */

        .tnx-footer-column {
          display: flex;

          flex-direction: column;

          gap: 17px;
        }


        .tnx-footer-heading {
          margin-bottom: 10px;

          color:
            rgba(255,255,255,0.35);

          font-size: 8px;

          font-weight: 800;

          letter-spacing: 3px;
        }


        .tnx-footer-column a {
          width: fit-content;

          color:
            rgba(255,255,255,0.72);

          font-size: 14px;

          text-decoration: none;

          transition:
            color 0.25s ease,
            transform 0.25s ease;
        }


        .tnx-footer-column a:hover {
          color: #ffffff;

          transform:
            translateX(5px);
        }


        /* =========================================
           DIVIDER
        ========================================== */

        .tnx-footer-divider {
          position: relative;

          width: 100%;

          height: 1px;

          background:
            rgba(255,255,255,0.12);
        }


        /* ONLY ORANGE DOT */
        .tnx-footer-dot {
          position: absolute;

          top: -3px;

          left: 0;

          width: 7px;

          height: 7px;

          border-radius: 50%;

          background: #ff5a1f;

          box-shadow:
            0 0 15px
            rgba(255,90,31,0.5);
        }


        /* =========================================
           BIG BRAND SECTION
        ========================================== */

        .tnx-footer-brand-section {
          padding-top: 55px;

          padding-bottom: 30px;
        }


        /*
          IMPORTANT:
          No orange dot here.
          Only text on the right.
        */

        .tnx-footer-brand-line {
          display: flex;

          align-items: center;

          justify-content: flex-end;

          margin-bottom: 34px;

          color:
            rgba(255,255,255,0.38);

          font-size: 8px;

          font-weight: 800;

          letter-spacing: 3px;
        }


        /* =========================================
           BIG LOGO
        ========================================== */

        .tnx-big-word-wrapper {
          width: 100%;

          overflow: hidden;

          display: flex;

          justify-content: center;
        }


        .tnx-big-word {
          font-family:
            Inter,
            "Helvetica Neue",
            Helvetica,
            Arial,
            sans-serif;

          /*
            BIG SIZE
          */
          font-size:
            clamp(
              130px,
              15vw,
              260px
            );

          font-weight: 850;

          line-height: 0.82;

          /*
            LETTER SPACE FIX
          */
          letter-spacing: 0.015em;

          white-space: nowrap;

          text-align: center;

          user-select: none;

          will-change: color;
        }


        .tnx-webstudio-wrapper {
          margin-top: 8px;
        }


        .tnx-webstudio-word {
          font-size:
            clamp(
              105px,
              12.5vw,
              220px
            );

          /*
            EXTRA SPACE
            BETWEEN LETTERS
          */
          letter-spacing: 0.02em;
        }


        /* =========================================
           ORANGE LINE
        ========================================== */

        .tnx-orange-line {
          width: 100%;

          height: 2px;

          margin-top: 24px;

          background: #ff5a1f;

          transform-origin: center;

          box-shadow:
            0 0 15px
            rgba(255,90,31,0.25);
        }


        /* =========================================
           SMALL BRAND LABELS
        ========================================== */

        .tnx-footer-sub-brand {
          display: flex;

          align-items: center;

          justify-content: space-between;

          margin-top: 18px;

          color:
            rgba(255,255,255,0.38);

          font-size: 8px;

          font-weight: 700;

          letter-spacing: 3px;
        }


        .tnx-footer-sub-brand span:first-child {
          color:
            rgba(255,255,255,0.8);
        }


        /* =========================================
           BOTTOM
        ========================================== */

        .tnx-footer-bottom {
          display: grid;

          grid-template-columns:
            1.5fr
            1.5fr
            0.6fr
            0.6fr
            1fr;

          align-items: center;

          gap: 25px;

          min-height: 75px;

          border-top:
            1px solid
            rgba(255,255,255,0.12);

          color:
            rgba(255,255,255,0.38);

          font-size: 8px;

          font-weight: 600;

          letter-spacing: 1.8px;
        }


        .tnx-footer-bottom a {
          color:
            rgba(255,255,255,0.38);

          text-decoration: none;

          transition:
            color 0.25s ease;
        }


        .tnx-footer-bottom a:hover {
          color: #ffffff;
        }


        .tnx-built-purpose {
          color: #ff5a1f;

          text-align: right;
        }


        /* =========================================
           TABLET
        ========================================== */

        @media (max-width: 1000px) {

          .tnx-footer-container {
            width:
              calc(100% - 48px);
          }


          .tnx-footer-top {
            grid-template-columns:
              1.5fr
              1fr
              1fr;

            gap: 45px;
          }


          .tnx-footer-brand-column {
            grid-column:
              1 / -1;
          }


          .tnx-big-word {
            font-size: 15vw;
          }


          .tnx-webstudio-word {
            font-size: 12.5vw;
          }


          .tnx-footer-bottom {
            grid-template-columns:
              1fr
              1fr
              0.6fr
              0.6fr;
          }


          .tnx-built-purpose {
            grid-column:
              1 / -1;

            text-align: left;
          }
        }


        /* =========================================
           MOBILE
        ========================================== */

        @media (max-width: 700px) {

          .tnx-footer {
            width: 100%;
            overflow: hidden;
          }

          .tnx-footer-container {
            width: calc(100% - 40px);
            max-width: none;
            padding-top: 38px;
          }

          .tnx-footer-top {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 38px 24px;
            padding-bottom: 42px;
          }

          .tnx-footer-brand-column {
            grid-column: 1 / -1;
            max-width: 100%;
          }

          .tnx-footer-logo-small {
            gap: 8px;
          }

          .tnx-footer-logo-small span {
            font-size: 24px;
            letter-spacing: -1px;
          }

          .tnx-footer-logo-small small {
            font-size: 6px;
            letter-spacing: 2px;
          }

          .tnx-footer-description {
            max-width: 100%;
            margin: 18px 0 24px;
            font-size: 12px;
            line-height: 1.55;
          }

          .tnx-footer-email {
            font-size: 12px;
          }

          .tnx-footer-column {
            gap: 13px;
            min-width: 0;
          }

          .tnx-footer-heading {
            margin-bottom: 6px;
            font-size: 7px;
            letter-spacing: 2px;
          }

          .tnx-footer-column a {
            font-size: 12px;
            line-height: 1.4;
          }

          .tnx-footer-divider {
            margin-top: 4px;
          }

          .tnx-footer-brand-section {
            padding-top: 36px;
            padding-bottom: 24px;
          }

          .tnx-footer-brand-line {
            justify-content: flex-end;
            margin-bottom: 22px;
            font-size: 6px;
            letter-spacing: 2px;
          }

          .tnx-big-word-wrapper {
            width: 100%;
            overflow: hidden;
          }

          .tnx-big-word {
            width: max-content;
            max-width: none;
            font-size: 17vw;
            line-height: 0.82;
            letter-spacing: 0;
            white-space: nowrap;
            transform: translateX(0);
          }

          .tnx-webstudio-wrapper {
            margin-top: 5px;
          }

          .tnx-webstudio-word {
            font-size: 14.2vw;
            line-height: 0.82;
            letter-spacing: 0;
          }

          .tnx-orange-line {
            width: 100%;
            height: 2px;
            margin-top: 18px;
          }

          .tnx-footer-sub-brand {
            margin-top: 13px;
            font-size: 6px;
            letter-spacing: 1.5px;
          }

          .tnx-footer-bottom {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px 20px;
            min-height: auto;
            padding: 22px 0 26px;
            font-size: 6.5px;
            line-height: 1.5;
            letter-spacing: 1.2px;
          }

          .tnx-footer-bottom > div:first-child {
            grid-column: 1 / -1;
          }

          .tnx-built-purpose {
            grid-column: 1 / -1;
            text-align: left;
          }
        }

        @media (max-width: 420px) {

          .tnx-footer-container {
            width: calc(100% - 28px);
            padding-top: 32px;
          }

          .tnx-footer-top {
            grid-template-columns: 1fr 1fr;
            gap: 32px 18px;
          }

          .tnx-footer-logo-small span {
            font-size: 22px;
          }

          .tnx-footer-description {
            font-size: 11px;
          }

          .tnx-footer-column a {
            font-size: 11px;
          }

          .tnx-big-word {
            font-size: 16.2vw;
          }

          .tnx-webstudio-word {
            font-size: 13.5vw;
          }

          .tnx-footer-sub-brand {
            font-size: 5.5px;
          }

          .tnx-footer-bottom {
            font-size: 6px;
          }
        }

        @media (max-width: 360px) {

          .tnx-footer-container {
            width: calc(100% - 24px);
          }

          .tnx-footer-top {
            grid-template-columns: 1fr;
            gap: 28px;
          }

          .tnx-footer-brand-column {
            grid-column: auto;
          }

          .tnx-big-word {
            font-size: 15.8vw;
          }

          .tnx-webstudio-word {
            font-size: 13.2vw;
          }

          .tnx-footer-bottom {
            grid-template-columns: 1fr;
          }

          .tnx-footer-bottom > div:first-child,
          .tnx-built-purpose {
            grid-column: auto;
          }
        }

        /* =====================================================
   MOBILE — SMALL BRAND LOGO
===================================================== */

@media (max-width: 700px) {

  .tnx-big-word {
    font-size: 15vw !important;
    line-height: 0.82 !important;
    letter-spacing: -0.07em !important;
    width: 100% !important;
    max-width: 100% !important;
  }

  .tnx-webstudio-word {
    font-size: 11.5vw !important;
    line-height: 0.85 !important;
    letter-spacing: -0.065em !important;
    width: 100% !important;
    max-width: 100% !important;
  }

  .tnx-big-word-wrap,
  .tnx-webstudio-wrap {
    width: 100% !important;
    overflow: hidden !important;
  }

  .tnx-brand-section {
    padding-top: 42px !important;
  }

  .tnx-brand-line {
    margin-bottom: 18px !important;
  }

  .tnx-sub-brand {
    margin-top: 14px !important;
    font-size: 6px !important;
    letter-spacing: 2px !important;
  }
}

      `
      }</style>
    </footer>
  );
};

export default Footer;