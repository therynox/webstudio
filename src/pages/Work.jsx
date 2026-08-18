import React, {
  useEffect,
  useMemo,
  useState,
} from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Globe2,
  Layers3,
  Monitor,
  ShoppingBag,
  Sparkles,
} from "lucide-react";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import PageLayout from "../components/layout/PageLayout";
import PageHeader from "../components/layout/PageHeader";
import api from "../services/api";


// =========================================================
// PROJECT IMAGE URL
// =========================================================
const API_ORIGIN =
  process.env.REACT_APP_API_ORIGIN ||
  "http://localhost:5000";

function getProjectImageUrl(value) {
  if (!value) return "";

  let image = value;

  if (typeof image === "object") {
    image =
      image.url ||
      image.src ||
      image.path ||
      image.image ||
      image.filename ||
      "";
  }

  image = String(image).trim();

  if (!image) return "";

  if (
    image.startsWith("http://") ||
    image.startsWith("https://") ||
    image.startsWith("data:") ||
    image.startsWith("blob:")
  ) {
    return image;
  }

  image = image.replace(/\\/g, "/");

  if (image.startsWith("/")) {
    return `${API_ORIGIN}${image}`;
  }

  return `${API_ORIGIN}/${image}`;
}

// =========================================================
// STATUS NORMALIZER
// =========================================================
function normalizeStatus(status) {
  return String(status || "")
    .trim()
    .toLowerCase()
    .replace(/_/g, "-")
    .replace(/\s+/g, "-");
}


// =========================================================
// WORK PAGE
// =========================================================
export default function Work() {
  const [activeFilter, setActiveFilter] =
    useState("ALL");

  const [projects, setProjects] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  // =======================================================
  // LOAD PROJECTS FROM MONGODB
  // =======================================================
  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(
          "/projects"
        );

        setProjects(
          response.data?.data || []
        );
      } catch (err) {
        console.error(
          "WORK PROJECTS ERROR:",
          err
        );

        setError(
          err.response?.data?.message ||
            "Unable to load projects."
        );
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);


  // =======================================================
  // PUBLIC WORK PROJECTS
  //
  // PUBLISHED + IN-PROGRESS
  //
  // DRAFT / ARCHIVED ARE HIDDEN
  // =======================================================
  const publicProjects = useMemo(() => {
    return projects.filter((project) => {
      const status = normalizeStatus(
        project.status
      );

      return (
        status === "published" ||
        status === "in-progress"
      );
    });
  }, [projects]);


  // =======================================================
  // DYNAMIC FILTERS
  // =======================================================
  const filters = useMemo(() => {
    const categories = publicProjects
      .map((project) => project.category)
      .filter(Boolean);

    return [
      "ALL",
      ...Array.from(
        new Set(categories)
      ),
    ];
  }, [publicProjects]);


  // =======================================================
  // FILTER PROJECTS
  //
  // IMPORTANT:
  // publicProjects is created BEFORE filteredProjects.
  // This prevents:
  // "Cannot access 'visibleProjects'
  //  before initialization"
  // =======================================================
  const filteredProjects = useMemo(() => {
    if (activeFilter === "ALL") {
      return publicProjects;
    }

    return publicProjects.filter(
      (project) =>
        project.category === activeFilter
    );
  }, [
    activeFilter,
    publicProjects,
  ]);


  // =======================================================
  // PAGE
  // =======================================================
  return (
    <PageLayout showCTA={false}>

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}
      <PageHeader
        eyebrow="SELECTED WORK"
        number="03 / 06"
        title="Work that makes an impression."
        description="Websites, commerce platforms, applications and business systems designed and engineered by THERYNOX WEB STUDIO."
      />


      {/* =====================================================
          INTRO
      ===================================================== */}
      <section
        className="
          px-5
          pb-12
          pt-12
          sm:px-8
          lg:px-12
          lg:pb-16
          lg:pt-16
        "
      >
        <div className="mx-auto max-w-7xl">

          <div
            className="
              grid
              gap-8
              lg:grid-cols-[1fr_0.3fr]
              lg:items-end
            "
          >

            <motion.h2
              initial={{
                opacity: 0,
                y: 25,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
              }}
              className="
                max-w-5xl
                text-4xl
                font-semibold
                leading-[0.92]
                tracking-[-0.065em]
                sm:text-5xl
                lg:text-7xl
              "
            >
              Ideas become
              <br />

              <span className="text-black/20">
                digital products.
              </span>
            </motion.h2>


            <div className="max-w-sm">

              <div className="flex items-center gap-2">

                <span
                  className="
                    h-1.5
                    w-1.5
                    rounded-full
                    bg-therynox-orange
                  "
                />

                <span
                  className="
                    text-[8px]
                    font-bold
                    uppercase
                    tracking-[0.25em]
                    text-black/30
                  "
                >
                  {loading
                    ? "Loading projects"
                    : `${publicProjects.length} ${
                        publicProjects.length === 1
                          ? "selected project"
                          : "selected projects"
                      }`}
                </span>

              </div>


              <p
                className="
                  mt-4
                  text-xs
                  leading-6
                  text-therynox-muted
                  sm:text-sm
                "
              >
                Explore our work across websites,
                commerce, applications and custom
                business software.
              </p>

            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          FILTER BAR
      ===================================================== */}
      <section
        className="
          sticky
          top-0
          z-30
          border-y
          border-therynox-border
          bg-white/90
          px-5
          py-3
          backdrop-blur-xl
          sm:px-8
          lg:px-12
        "
      >

        <div
          className="
            mx-auto
            flex
            max-w-7xl
            items-center
            justify-between
            gap-5
          "
        >

          <div
            className="
              flex
              min-w-0
              gap-2
              overflow-x-auto
              pb-1
              scrollbar-hide
            "
          >

            {filters.map((filter) => {
              const isActive =
                activeFilter === filter;

              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() =>
                    setActiveFilter(filter)
                  }
                  className={`
                    relative
                    shrink-0
                    rounded-full
                    px-4
                    py-2
                    text-[7px]
                    font-bold
                    uppercase
                    tracking-[0.18em]
                    transition-all
                    duration-300
                    ${
                      isActive
                        ? "bg-black text-white"
                        : "border border-therynox-border bg-white text-black/35 hover:border-black/20 hover:text-black"
                    }
                  `}
                >
                  {filter}
                </button>
              );
            })}

          </div>


          <div
            className="
              hidden
              shrink-0
              items-center
              gap-2
              sm:flex
            "
          >

            <span
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-therynox-orange
              "
            />

            <span
              className="
                text-[7px]
                font-bold
                uppercase
                tracking-[0.18em]
                text-black/25
              "
            >
              {filteredProjects.length} shown
            </span>

          </div>

        </div>

      </section>


      {/* =====================================================
          PROJECT GRID
      ===================================================== */}
      <section
        className="
          px-5
          py-12
          sm:px-8
          lg:px-12
          lg:py-16
        "
      >

        <div className="mx-auto max-w-7xl">

          {/* =================================================
              LOADING
          ================================================= */}
          {loading && (
            <div
              className="
                flex
                min-h-[300px]
                items-center
                justify-center
              "
            >

              <div className="text-center">

                <div
                  className="
                    mx-auto
                    mb-5
                    h-8
                    w-8
                    animate-spin
                    rounded-full
                    border-2
                    border-black/10
                    border-t-black
                  "
                />

                <p
                  className="
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.2em]
                    text-black/30
                  "
                >
                  Loading selected work...
                </p>

              </div>

            </div>
          )}


          {/* =================================================
              ERROR
          ================================================= */}
          {error && !loading && (
            <div
              className="
                flex
                min-h-[300px]
                items-center
                justify-center
                rounded-[24px]
                border
                border-dashed
                border-therynox-border
              "
            >

              <div className="px-5 text-center">

                <p
                  className="
                    text-2xl
                    font-semibold
                    tracking-[-0.05em]
                    sm:text-3xl
                  "
                >
                  Unable to load projects.
                </p>

                <p
                  className="
                    mt-3
                    text-sm
                    text-therynox-muted
                  "
                >
                  {error}
                </p>

              </div>

            </div>
          )}


          {/* =================================================
              PROJECTS
          ================================================= */}
          {!loading &&
            !error && (
              <AnimatePresence mode="popLayout">

                <motion.div
                  layout
                  className="
                    grid
                    grid-cols-1
                    gap-x-7
                    gap-y-12
                    sm:grid-cols-2
                    lg:gap-x-8
                    lg:gap-y-16
                  "
                >

                  {filteredProjects.map(
                    (project, index) => (
                      <ProjectCard
                        key={project._id}
                        project={project}
                        index={index}
                      />
                    )
                  )}

                </motion.div>


                {/* =================================================
                    EMPTY
                ================================================= */}
                {filteredProjects.length === 0 && (
                  <motion.div
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: 1,
                    }}
                    className="
                      mt-5
                      flex
                      min-h-[300px]
                      items-center
                      justify-center
                      rounded-[24px]
                      border
                      border-dashed
                      border-therynox-border
                    "
                  >

                    <div className="text-center">

                      <p
                        className="
                          text-2xl
                          font-semibold
                          tracking-[-0.05em]
                          sm:text-3xl
                        "
                      >
                        Nothing here yet.
                      </p>

                      <p
                        className="
                          mt-3
                          text-sm
                          text-therynox-muted
                        "
                      >
                        More projects are coming soon.
                      </p>

                    </div>

                  </motion.div>
                )}

              </AnimatePresence>
            )}

        </div>

      </section>


      {/* =====================================================
          CAPABILITIES
      ===================================================== */}
      <section
        className="
          border-y
          border-therynox-border
          bg-[#f5f5f2]
          px-5
          py-12
          sm:px-8
          lg:px-12
          lg:py-16
        "
      >

        <div className="mx-auto max-w-7xl">

          <div
            className="
              grid
              gap-px
              overflow-hidden
              rounded-2xl
              border
              border-black/10
              bg-black/10
              sm:grid-cols-2
              lg:grid-cols-4
            "
          >

            <Capability
              icon={Globe2}
              title="Websites"
              text="Premium digital experiences."
            />

            <Capability
              icon={ShoppingBag}
              title="E-commerce"
              text="Commerce that converts."
            />

            <Capability
              icon={Monitor}
              title="Web Apps"
              text="Products built for real users."
            />

            <Capability
              icon={Layers3}
              title="Business Systems"
              text="Software that runs businesses."
            />

          </div>

        </div>

      </section>


      {/* =====================================================
          CTA
      ===================================================== */}
      <section
        className="
          px-5
          py-16
          sm:px-8
          lg:px-12
          lg:py-24
        "
      >

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          className="
            mx-auto
            max-w-7xl
            overflow-hidden
            rounded-[28px]
            bg-therynox-orange
            p-7
            sm:p-10
            lg:p-14
          "
        >

          <div
            className="
              flex
              flex-col
              justify-between
              gap-10
              lg:flex-row
              lg:items-end
            "
          >

            <div>

              <div className="flex items-center gap-2">

                <Sparkles
                  size={13}
                  className="text-black/60"
                />

                <span
                  className="
                    text-[8px]
                    font-bold
                    uppercase
                    tracking-[0.3em]
                    text-black/50
                  "
                >
                  Your project next?
                </span>

              </div>


              <h2
                className="
                  mt-6
                  max-w-3xl
                  text-4xl
                  font-semibold
                  leading-[0.92]
                  tracking-[-0.065em]
                  text-black
                  sm:text-5xl
                  lg:text-6xl
                "
              >
                Let's build
                <br />
                something useful.
              </h2>

            </div>


            <a
              href="/contact"
              className="
                group
                inline-flex
                shrink-0
                items-center
                gap-3
                rounded-full
                bg-black
                px-6
                py-4
                text-[9px]
                font-bold
                uppercase
                tracking-[0.2em]
                text-white
                transition-all
                duration-300
                hover:bg-white
                hover:text-black
              "
            >
              Start a project

              <ArrowUpRight
                size={15}
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                  group-hover:-translate-y-1
                "
              />
            </a>

          </div>

        </motion.div>

      </section>

    </PageLayout>
  );
}


// =========================================================
// DYNAMIC PROJECT CARD
// =========================================================
function ProjectCard({
  project,
  index,
}) {
  const isInProgress =
    normalizeStatus(project.status) ===
    "in-progress";


  return (
    <motion.article
      layout
      initial={{
        opacity: 0,
        y: 25,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        scale: 0.98,
      }}
      transition={{
        duration: 0.45,
        delay: index * 0.04,
      }}
      className="group"
    >

      {/* ===================================================
          PROJECT IMAGE / COMING SOON
      =================================================== */}
      <div
        className="
          relative
          overflow-hidden
          rounded-[18px]
          border
          border-[#dedbd4]
          bg-[#f3f1ec]
          p-2
          sm:p-2.5
        "
      >

        <div
          className="
            relative
            aspect-[4/3]
            overflow-hidden
            rounded-[14px]
            bg-[#e8e6e1]
          "
        >

          {/* =================================================
              IN-PROGRESS
          ================================================= */}
          {isInProgress ? (
            <>
              {/* PREMIUM COMING SOON BACKGROUND */}
              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-br
                  from-[#f4f2ed]
                  via-[#e7e5df]
                  to-[#d4d1ca]
                "
              />

              {/* VERY SUBTLE CENTER GLOW */}
              <div
                className="
                  absolute
                  left-1/2
                  top-1/2
                  h-48
                  w-48
                  -translate-x-1/2
                  -translate-y-1/2
                  rounded-full
                  bg-white/30
                  blur-3xl
                "
              />

              {/* COMING SOON */}
              <div
                className="
                  absolute
                  inset-0
                  z-10
                  flex
                  items-center
                  justify-center
                "
              >

                <div
                  className="
                    rounded-full
                    border
                    border-black/10
                    bg-white/80
                    px-6
                    py-3
                    text-[8px]
                    font-bold
                    uppercase
                    tracking-[0.22em]
                    text-black/55
                    shadow-sm
                    backdrop-blur-md
                  "
                >
                  Coming Soon
                </div>

              </div>


              {/* PROJECT IN PROCESS */}
              <div
                className="
                  absolute
                  bottom-4
                  left-4
                  z-10
                  rounded-full
                  border
                  border-white/60
                  bg-white/80
                  px-4
                  py-2.5
                  text-[7px]
                  font-bold
                  uppercase
                  tracking-[0.18em]
                  text-black/55
                  backdrop-blur-md
                "
              >
                Project in Process
              </div>

            </>
          ) : getProjectImageUrl(project.coverImage) ? (

            /* =================================================
               PUBLISHED IMAGE
            ================================================= */
            <img
              src={getProjectImageUrl(project.coverImage)}
              alt={
                project.title ||
                "Project"
              }
              loading="lazy"
              onError={(event) => {
                event.currentTarget.style.display =
                  "none";
              }}
              className="
                absolute
                inset-0
                h-full
                w-full
                object-cover
                transition-transform
                duration-700
                ease-out
                group-hover:scale-[1.025]
              "
            />

          ) : (

            /* =================================================
               PUBLISHED WITHOUT IMAGE
            ================================================= */
            <div
              className="
                absolute
                inset-0
                bg-gradient-to-br
                from-[#f1efea]
                to-[#dcd9d2]
              "
            />

          )}


          {/* =================================================
              SUBTLE OVERLAY
              Only for published projects
          ================================================= */}
          {!isInProgress && (
            <div
              className="
                pointer-events-none
                absolute
                inset-0
                bg-gradient-to-t
                from-black/10
                via-transparent
                to-white/10
              "
            />
          )}


          {/* =================================================
              TOP META
          ================================================= */}
          <div
            className="
              absolute
              left-4
              top-4
              z-20
              flex
              items-center
              gap-2
              rounded-full
              border
              border-white/60
              bg-white/80
              px-3
              py-1.5
              backdrop-blur-md
            "
          >

            <span
              className="
                text-[7px]
                font-bold
                tracking-[0.2em]
                text-therynox-orange
              "
            >
              {String(index + 1).padStart(
                2,
                "0"
              )}
            </span>

            <span
              className="
                text-[6px]
                font-bold
                uppercase
                tracking-[0.2em]
                text-black/45
              "
            >
              {project.category ||
                "PROJECT"}
            </span>

          </div>


          {/* =================================================
              YEAR
          ================================================= */}
          {project.year && (
            <div
              className="
                absolute
                right-4
                top-4
                z-20
                rounded-full
                border
                border-white/60
                bg-white/75
                px-3
                py-1.5
                text-[7px]
                font-bold
                tracking-[0.15em]
                text-black/45
                backdrop-blur-md
              "
            >
              {project.year}
            </div>
          )}


          {/* =================================================
              BOTTOM META
          ================================================= */}
          <div
            className="
              absolute
              bottom-4
              left-4
              right-4
              z-20
              flex
              items-end
              justify-between
              gap-3
            "
          >

            <div
              className="
                max-w-[70%]
                rounded-xl
                border
                border-white/50
                bg-white/75
                px-3
                py-2
                backdrop-blur-md
              "
            >

              <p
                className="
                  truncate
                  text-[8px]
                  font-semibold
                  uppercase
                  tracking-[0.12em]
                  text-black/70
                "
              >
                {isInProgress
                  ? "Project in Process"
                  : project.type ||
                    project.category ||
                    "Digital Project"}
              </p>

            </div>


            {/* =================================================
                ARROW
            ================================================= */}
            <Link
              to={`/work/${project.slug}`}
              aria-label={`View ${project.title}`}
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-therynox-orange
                text-black
                shadow-lg
                transition-all
                duration-300
                hover:scale-105
                group-hover:rotate-45
              "
            >
              <ArrowUpRight size={14} />
            </Link>


          </div>

        </div>
      </div>


      {/* ===================================================
          PROJECT INFORMATION
      =================================================== */}
      <div className="px-1 pb-2 pt-4">

        <div
          className="
            flex
            items-start
            justify-between
            gap-4
          "
        >

          <div className="min-w-0 flex-1">

            {/* NUMBER + CATEGORY */}
            <div
              className="
                mb-2
                flex
                items-center
                gap-2
              "
            >

              <span
                className="
                  text-[7px]
                  font-bold
                  tracking-[0.2em]
                  text-therynox-orange
                "
              >
                {String(index + 1).padStart(
                  2,
                  "0"
                )}
              </span>

              <span
                className="
                  text-[6px]
                  font-bold
                  uppercase
                  tracking-[0.18em]
                  text-black/30
                "
              >
                {project.category ||
                  "PROJECT"}
              </span>

            </div>


            {/* TITLE */}
            <h3
              className="
                text-xl
                font-semibold
                leading-none
                tracking-[-0.055em]
                text-black
                sm:text-2xl
              "
            >
              {project.title ||
                "Untitled Project"}
            </h3>


            {/* DESCRIPTION */}
            <p
              className="
                mt-2
                max-w-lg
                text-[11px]
                leading-5
                text-therynox-muted
                sm:text-xs
              "
            >
              {isInProgress
                ? "This project is currently being developed. The finished experience will be available soon."
                : project.shortDescription ||
                  project.description ||
                  "A premium digital project by THERYNOX WEB STUDIO."}
            </p>


            {/* =================================================
                TECHNOLOGIES
            ================================================= */}
            {!isInProgress &&
              project.technologies?.length >
                0 && (
                <div
                  className="
                    mt-3
                    flex
                    flex-wrap
                    gap-1.5
                  "
                >

                  {project.technologies
                    .slice(0, 5)
                    .map(
                      (
                        technology,
                        technologyIndex
                      ) => (
                        <span
                          key={`${technology}-${technologyIndex}`}
                          className="
                            rounded-full
                            border
                            border-therynox-border
                            px-2.5
                            py-1.5
                            text-[5.5px]
                            font-bold
                            uppercase
                            tracking-[0.12em]
                            text-black/35
                          "
                        >
                          {technology}
                        </span>
                      )
                    )}

                </div>
              )}

          </div>


          {/* =================================================
              PROJECT LINK
          ================================================= */}
            <Link
              to={`/work/${project.slug}`}
              aria-label={`View ${project.title}`}
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                border
                border-therynox-border
                text-black
                transition-all
                duration-300
                hover:bg-black
                hover:text-white
              "
            >
              <ArrowUpRight size={14} />
            </Link>


          </div>

        </div>

    </motion.article>
  );
}


// =========================================================
// CAPABILITY
// =========================================================
function Capability({
  icon: Icon,
  title,
  text,
}) {
  return (
    <div
      className="
        bg-[#f5f5f2]
        p-5
        transition-colors
        duration-300
        hover:bg-white
        sm:p-6
      "
    >

      <Icon
        size={17}
        strokeWidth={1.5}
        className="text-black/25"
      />

      <h3
        className="
          mt-6
          text-base
          font-semibold
          tracking-[-0.04em]
        "
      >
        {title}
      </h3>

      <p
        className="
          mt-1.5
          text-[8px]
          leading-5
          text-black/35
        "
      >
        {text}
      </p>

    </div>
  );
}