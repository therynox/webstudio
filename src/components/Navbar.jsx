import React, { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
} from "framer-motion";
import {
  ArrowUpRight,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import api from "../services/api";



/* =========================================================
   SERVICES
========================================================= */

const serviceLinks = [
  { label: "Web Design", path: "/services/web-design" },
  { label: "Web Development", path: "/services/web-development" },
  { label: "E-commerce", path: "/services/ecommerce" },
  { label: "Web Applications", path: "/services/web-applications" },
  { label: "Business Systems", path: "/services/business-systems" },
  { label: "SEO & Growth", path: "/services/seo-growth" },
];

/* =========================================================
   SOLUTIONS
========================================================= */

const solutionLinks = [
  { label: "CRM Systems", path: "/solutions/crm" },
  { label: "ERP Systems", path: "/solutions/erp" },
  { label: "HR Management", path: "/solutions/hr-management" },
  { label: "Inventory Management", path: "/solutions/inventory" },
  { label: "POS Systems", path: "/solutions/pos" },
  { label: "Booking Systems", path: "/solutions/booking" },
];

/* =========================================================
   MAIN NAV
========================================================= */

const mainLinks = [
  { label: "Work", path: "/work" },
  { label: "Blog", path: "/blog" },
  { label: "Pricing", path: "/pricing" },
  { label: "Process", path: "/process" },
];

/* =========================================================
   NAVBAR
========================================================= */

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [scrolled, setScrolled] =
    useState(false);

  const [mobileOpen, setMobileOpen] =
    useState(false);

  const [activeDropdown, setActiveDropdown] =
    useState(null);

  const [globalSettings, setGlobalSettings] = useState(null);

  /* =======================================================
     SCROLL
  ======================================================= */

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(
        window.scrollY > 60
      );
    };

    handleScroll();

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true }
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  useEffect(() => {
    let mounted = true;

    const loadGlobalSettings = async () => {
      try {
        const response = await api.get("/settings");
        if (mounted) {
          setGlobalSettings(response.data?.data || null);
        }
      } catch (error) {
        console.error("NAVBAR SETTINGS ERROR:", error);
      }
    };

    loadGlobalSettings();

    return () => {
      mounted = false;
    };
  }, []);

  /* =======================================================
     ROUTE CHANGE
  ======================================================= */

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [location.pathname]);

  /* =======================================================
     CLOSE MOBILE
  ======================================================= */

  const services =
    globalSettings?.navigation?.services?.length
      ? globalSettings.navigation.services.filter(
          (item) => item.visible !== false
        )
      : serviceLinks;

  const solutions =
    globalSettings?.navigation?.solutions?.length
      ? globalSettings.navigation.solutions.filter(
          (item) => item.visible !== false
        )
      : solutionLinks;

  const main =
    globalSettings?.navigation?.main?.length
      ? globalSettings.navigation.main.filter(
          (item) => item.visible !== false
        )
      : mainLinks;

  const headerCtaText =
    globalSettings?.navigation?.ctaText || "Start a Project";

  const headerCtaUrl =
    globalSettings?.navigation?.ctaUrl || "/contact";

  const brandName =
    globalSettings?.branding?.brandName || "THERYNOX";

  const studioName =
    globalSettings?.branding?.studioName || "Web Studio";

  const closeMobile = () => {
    setMobileOpen(false);
    setActiveDropdown(null);
  };

  /* =======================================================
     HOME
  ======================================================= */

  const goHome = () => {
    closeMobile();

    if (location.pathname === "/") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return;
    }

    navigate("/");
  };

  /* =======================================================
     COLORS
  ======================================================= */
const isHomePage = location.pathname === "/";

const useLightNavbar = !isHomePage;

const textColor =
  useLightNavbar || scrolled
    ? "text-therynox-black"
    : "text-white";

const mutedColor =
  useLightNavbar || scrolled
    ? "text-therynox-muted"
    : "text-white/75";

  return (
    <>
      {/* =====================================================
          HEADER
      ===================================================== */}

        <header
          className={`
            fixed left-0 top-0 z-50 w-full
            transition-all duration-500

            ${
              scrolled || useLightNavbar
                ? "border-b border-therynox-border bg-therynox-bg/90 backdrop-blur-xl"
                : "bg-transparent"
            }
          `}
        >
          

        <div
          className="
            mx-auto flex h-[82px]
            max-w-9xl items-center
            justify-between
            px-5 sm:px-8 lg:px-12
          "
        >

          {/* =================================================
              LOGO
          ================================================= */}

          <button
            type="button"
            onClick={goHome}
            className="
              relative z-50
              flex items-center
              text-left
            "
          >

            <span
              className={`
                text-[21px]
                font-black
                tracking-[-0.06em]
                transition-colors
                duration-500

                sm:text-[24px]

                ${textColor}
              `}
            >
              {brandName}
            </span>

            <span
              className="
                ml-2 hidden
                text-[8px]
                font-bold
                uppercase
                tracking-[0.3em]
                text-therynox-orange
                sm:block
              "
            >
              {studioName}
            </span>

          </button>


          {/* =================================================
              DESKTOP NAV
          ================================================= */}

          <nav
            className="
              hidden
              items-center
              gap-8
              lg:flex
            "
          >

            {/* =================================================
                SERVICES
            ================================================= */}

            <DropdownWrapper
              id="services"
              label="Services"
              activeDropdown={
                activeDropdown
              }
              setActiveDropdown={
                setActiveDropdown
              }
              color={mutedColor}
            >

              <Dropdown
                title="What we build"
                items={services}
                onNavigate={() =>
                  setActiveDropdown(null)
                }
              />

            </DropdownWrapper>


            {/* =================================================
                SOLUTIONS
            ================================================= */}

            <DropdownWrapper
              id="solutions"
              label="Solutions"
              activeDropdown={
                activeDropdown
              }
              setActiveDropdown={
                setActiveDropdown
              }
              color={mutedColor}
            >

              <Dropdown
                title="Business systems"
                items={solutions}
                onNavigate={() =>
                  setActiveDropdown(null)
                }
              />

            </DropdownWrapper>


            {/* =================================================
                MAIN LINKS
            ================================================= */}

            {main.map((item) => (
              <NavLink
                key={item.path}
                item={item}
                color={mutedColor}
              />
            ))}

          </nav>


          {/* =================================================
              CTA
          ================================================= */}

          <Link
            to={headerCtaUrl}
            className={`
              group hidden
              items-center
              gap-3
              rounded-full
              px-6 py-3.5
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.14em]
              transition-all
              duration-500

              lg:flex

              ${
              useLightNavbar || scrolled
                ? "bg-therynox-black text-white hover:bg-therynox-orange"
                : "bg-white text-black hover:bg-therynox-orange hover:text-white"
              }
            `}
          >

            {headerCtaText}

            <ArrowUpRight
              size={14}
              className="
                transition-transform
                group-hover:translate-x-1
                group-hover:-translate-y-1
              "
            />

          </Link>


          {/* =================================================
              MOBILE BUTTON
          ================================================= */}

          <button
            type="button"
            aria-label={
              mobileOpen
                ? "Close navigation"
                : "Open navigation"
            }
            onClick={() =>
              setMobileOpen(
                (value) => !value
              )
            }
            className={`
              relative z-50
              flex h-11 w-11
              items-center
              justify-center
              rounded-full
              border
              transition-colors
              lg:hidden

              ${
                scrolled
                  ? "border-therynox-border text-therynox-black"
                  : "border-white/30 text-white"
              }
            `}
          >

            {mobileOpen ? (
              <X size={19} />
            ) : (
              <Menu size={19} />
            )}

          </button>

        </div>

      </header>


      {/* =====================================================
          MOBILE MENU
      ===================================================== */}

      <AnimatePresence>

        {mobileOpen && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="
              fixed inset-0 z-40
              overflow-y-auto
              bg-therynox-bg
              px-6 pb-10 pt-28
              lg:hidden
            "
          >

            <div className="mx-auto max-w-xl">

              <p
                className="
                  mb-8
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.3em]
                  text-therynox-orange
                "
              >
                Navigation
              </p>


              <div
                className="
                  border-t
                  border-therynox-border
                "
              >

                {/* =================================================
                    MOBILE SERVICES
                ================================================= */}

                <MobileSection
                  title="Services"
                  items={services}
                  onNavigate={
                    closeMobile
                  }
                />


                {/* =================================================
                    MOBILE SOLUTIONS
                ================================================= */}

                <MobileSection
                  title="Solutions"
                  items={solutions}
                  onNavigate={
                    closeMobile
                  }
                />


                {/* =================================================
                    MAIN LINKS
                ================================================= */}

                {mainLinks.map(
                  (item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={
                        closeMobile
                      }
                      className="
                        block
                        border-b
                        border-therynox-border
                        py-6
                        text-3xl
                        font-semibold
                        text-therynox-black
                        transition-colors
                        hover:text-therynox-orange
                      "
                    >
                      {item.label}
                    </Link>
                  )
                )}

              </div>


              {/* =================================================
                  MOBILE CTA
              ================================================= */}

              <Link
                to={headerCtaUrl}
                onClick={
                  closeMobile
                }
                className="
                  mt-10
                  flex
                  items-center
                  justify-center
                  gap-3
                  rounded-full
                  bg-therynox-black
                  px-6 py-5
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.2em]
                  text-white
                  transition
                  hover:bg-therynox-orange
                "
              >

                {headerCtaText}

                <ArrowUpRight
                  size={15}
                />

              </Link>

            </div>

          </motion.div>
        )}

      </AnimatePresence>
    </>
  );
}


/* ==========================================================
   DROPDOWN WRAPPER
========================================================== */

function DropdownWrapper({
  id,
  label,
  activeDropdown,
  setActiveDropdown,
  color,
  children,
}) {
  const isActive =
    activeDropdown === id;

  return (
    <div
      className="relative"
      onMouseEnter={() =>
        setActiveDropdown(id)
      }
      onMouseLeave={() =>
        setActiveDropdown(null)
      }
    >

      <button
        type="button"
        onClick={() =>
          setActiveDropdown(
            isActive ? null : id
          )
        }
        className={`
          flex
          items-center
          gap-1.5
          text-[11px]
          font-medium
          transition-colors
          duration-500
          hover:text-therynox-orange
          ${color}
        `}
      >

        {label}

        <ChevronDown
          size={13}
          strokeWidth={1.7}
          className={`
            transition-transform
            duration-300

            ${
              isActive
                ? "rotate-180"
                : ""
            }
          `}
        />

      </button>

      <AnimatePresence>
        {isActive && children}
      </AnimatePresence>

    </div>
  );
}


/* ==========================================================
   DESKTOP DROPDOWN
========================================================== */

function Dropdown({
  title,
  items,
  onNavigate,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 8,
        scale: 0.98,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        y: 8,
        scale: 0.98,
      }}
      transition={{
        duration: 0.2,
      }}
      className="
        absolute
        left-1/2
        top-full
        mt-5
        w-[310px]
        -translate-x-1/2
        rounded-2xl
        border
        border-therynox-border
        bg-white
        p-3
        shadow-2xl
      "
    >

      <p
        className="
          px-3
          pb-3
          pt-2
          text-[9px]
          font-bold
          uppercase
          tracking-[0.2em]
          text-therynox-orange
        "
      >
        {title}
      </p>


      {items.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          onClick={onNavigate}
          className="
            group
            flex
            items-center
            justify-between
            rounded-xl
            px-3 py-3
            text-sm
            text-therynox-muted
            transition-colors
            hover:bg-therynox-surface
            hover:text-therynox-black
          "
        >

          <span>
            {item.label}
          </span>

          <ArrowUpRight
            size={14}
            className="
              opacity-0
              transition-all
              group-hover:translate-x-1
              group-hover:-translate-y-1
              group-hover:opacity-100
            "
          />

        </Link>
      ))}

    </motion.div>
  );
}


/* ==========================================================
   NAV LINK
========================================================== */

function NavLink({
  item,
  color,
}) {
  const location =
    useLocation();

  const active =
    location.pathname ===
    item.path;

  return (
    <Link
      to={item.path}
      className={`
        relative
        text-[11px]
        font-medium
        transition-colors
        duration-500

        ${
          active
            ? "text-therynox-orange"
            : color
        }

        hover:text-therynox-orange
      `}
    >

      {item.label}

      {active && (
        <motion.span
          layoutId="navbar-active"
          className="
            absolute
            -bottom-2
            left-0
            h-px
            w-full
            bg-therynox-orange
          "
        />
      )}

    </Link>
  );
}


/* ==========================================================
   MOBILE SECTION
========================================================== */

function MobileSection({
  title,
  items,
  onNavigate,
}) {
  return (
    <div
      className="
        border-b
        border-therynox-border
        py-6
      "
    >

      <p
        className="
          mb-5
          text-3xl
          font-semibold
          text-therynox-black
        "
      >
        {title}
      </p>


      <div
        className="
          grid
          grid-cols-2
          gap-x-5
          gap-y-2
        "
      >

        {items.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={onNavigate}
            className="
              py-2
              text-sm
              text-therynox-muted
              transition-colors
              hover:text-therynox-orange
            "
          >
            {item.label}
          </Link>
        ))}

      </div>

    </div>
  );
}