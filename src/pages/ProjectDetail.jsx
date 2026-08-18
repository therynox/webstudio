import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  ArrowLeft,
  ArrowUpRight,
  ExternalLink,
} from "lucide-react";

import {
  Link,
  useParams,
} from "react-router-dom";

import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";

import PageLayout from "../components/layout/PageLayout";
import api from "../services/api";
import { getMediaUrl } from "../utils/media";
import SEO from "../components/SEO";

/* =========================================================
   HELPERS
========================================================= */

function normalizeStatus(status) {
  return String(status || "")
    .trim()
    .toLowerCase()
    .replace(/_/g, "-")
    .replace(/\s+/g, "-");
}

function isInProgress(project) {
  return normalizeStatus(project?.status) === "in-progress";
}

function getProjectImage(project) {
  if (!project) return "";

  if (project.coverImage) {
    return project.coverImage;
  }

  if (
    Array.isArray(project.images) &&
    project.images.length > 0
  ) {
    const first = project.images[0];

    if (typeof first === "string") {
      return first;
    }

    return first?.url || "";
  }

  return "";
}

function safeMediaUrl(value) {
  if (!value) return "";

  try {
    return getMediaUrl(value);
  } catch (error) {
    console.error("MEDIA URL ERROR:", error);
    return value;
  }
}

/* =========================================================
   COMING SOON VISUAL
========================================================= */

function ComingSoonVisual({
  project,
  className = "",
  compact = false,
}) {
  const image = getProjectImage(project);

  const [imageFailed, setImageFailed] =
    useState(false);

  const imageUrl =
    image && !imageFailed
      ? safeMediaUrl(image)
      : "";

  return (
    <div
      className={`
        relative
        overflow-hidden
        bg-black
        ${className}
      `}
    >
      {/* ===================================================
          BACKGROUND IMAGE
      =================================================== */}

      {imageUrl ? (
        <img
          src={imageUrl}
          alt={`${project?.title || "Project"} — Coming Soon`}
          className="
            absolute
            inset-0
            h-full
            w-full
            object-cover
            opacity-55
            transition-transform
            duration-1000
          "
          onError={() => {
            setImageFailed(true);
          }}
        />
      ) : (
        <div
          className="
            absolute
            inset-0
            bg-[radial-gradient(circle_at_75%_25%,rgba(255,94,24,0.32),transparent_30%),radial-gradient(circle_at_20%_80%,rgba(255,94,24,0.10),transparent_30%),linear-gradient(135deg,#191919_0%,#080808_52%,#000_100%)]
          "
        />
      )}

      {/* ===================================================
          DECORATIVE GRID
      =================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-20
          [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)]
          [background-size:48px_48px]
        "
      />

      {/* ===================================================
          CIRCLES
      =================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -right-24
          -top-24
          h-80
          w-80
          rounded-full
          border
          border-white/10
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -right-10
          -top-10
          h-56
          w-56
          rounded-full
          border
          border-therynox-orange/30
        "
      />

      {/* ===================================================
          DARK OVERLAY
      =================================================== */}

      <div
        className="
          absolute
          inset-0
          bg-black/50
        "
      />

      {/* ===================================================
          CONTENT
      =================================================== */}

      <div
        className={`
          relative
          z-10
          flex
          h-full
          flex-col
          justify-between
          ${
            compact
              ? "p-6 sm:p-8"
              : "p-7 sm:p-10 lg:p-14"
          }
        `}
      >
        {/* TOP */}

        <div
          className="
            flex
            items-center
            justify-between
            gap-4
          "
        >
          <div
            className="
              flex
              items-center
              gap-3
              rounded-full
              border
              border-white/15
              bg-white/10
              px-4
              py-2
              backdrop-blur-md
            "
          >
            <span
              className="
                h-1.5
                w-1.5
                animate-pulse
                rounded-full
                bg-therynox-orange
              "
            />

            <span
              className="
                text-[7px]
                font-bold
                uppercase
                tracking-[0.25em]
                text-white
              "
            >
              Project in process
            </span>
          </div>

          {project?.year && (
            <span
              className="
                rounded-full
                border
                border-white/10
                bg-white/10
                px-4
                py-2
                text-[7px]
                font-bold
                uppercase
                tracking-[0.2em]
                text-white/60
                backdrop-blur-md
              "
            >
              {project.year}
            </span>
          )}
        </div>

        {/* CENTER */}

        <div
          className="
            max-w-2xl
          "
        >
          <span
            className="
              text-[8px]
              font-bold
              uppercase
              tracking-[0.32em]
              text-therynox-orange
            "
          >
            THERYNOX WEB STUDIO
          </span>

          <h2
            className={`
              mt-4
              font-semibold
              leading-[0.82]
              tracking-[-0.08em]
              text-white
              ${
                compact
                  ? "text-5xl sm:text-6xl"
                  : "text-6xl sm:text-7xl lg:text-8xl"
              }
            `}
          >
            Coming
            <br />

            <span className="text-white/30">
              Soon
            </span>

            <span className="text-therynox-orange">
              .
            </span>
          </h2>

          {!compact && (
            <p
              className="
                mt-6
                max-w-md
                text-xs
                leading-6
                text-white/45
              "
            >
              A new digital experience is being
              crafted behind the scenes. The full
              project will be revealed when the work
              is ready.
            </p>
          )}
        </div>

        {/* BOTTOM */}

        <div
          className="
            flex
            items-end
            justify-between
            gap-5
          "
        >
          <div>
            <span
              className="
                block
                text-[7px]
                font-bold
                uppercase
                tracking-[0.24em]
                text-white/30
              "
            >
              {project?.category ||
                "WEBSITE DEVELOPMENT"}
            </span>

            <span
              className="
                mt-2
                block
                text-sm
                font-semibold
                tracking-[-0.03em]
                text-white
              "
            >
              {project?.title || "Project"}
            </span>
          </div>

          <div
            className="
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-therynox-orange
              text-black
            "
          >
            <ArrowUpRight size={16} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   PROJECT DETAIL PAGE
========================================================= */

export default function ProjectDetail() {
  const { slug } = useParams();

  const [project, setProject] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const {
    scrollYProgress,
  } = useScroll();

  const heroScale = useTransform(
    scrollYProgress,
    [0, 0.25],
    [1, 1.06]
  );

  const heroY = useTransform(
    scrollYProgress,
    [0, 0.25],
    [0, 50]
  );

  /* =======================================================
     LOAD PROJECT
  ======================================================= */

  useEffect(() => {
    let mounted = true;

    const loadProject = async () => {
      try {
        setLoading(true);
        setError("");

        const response =
          await api.get(
            `/projects/${slug}`
          );

        if (!mounted) return;

        setProject(
          response.data?.data || null
        );
      } catch (err) {
        console.error(
          "PROJECT DETAIL ERROR:",
          err
        );

        if (!mounted) return;

        setError(
          err.response?.data?.message ||
            "Unable to load project."
        );
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    if (slug) {
      loadProject();
    }

    return () => {
      mounted = false;
    };
  }, [slug]);

  /* =======================================================
     GALLERY
  ======================================================= */

  const gallery = useMemo(() => {
    if (
      !project ||
      !Array.isArray(project.images)
    ) {
      return [];
    }

    return project.images
      .map((image, index) => {
        if (typeof image === "string") {
          return {
            url: image,
            caption: "",
            order: index,
          };
        }

        return {
          url: image?.url || "",
          caption: image?.caption || "",
          order:
            image?.order ?? index,
        };
      })
      .filter((image) => image.url)
      .sort(
        (a, b) =>
          (a.order || 0) -
          (b.order || 0)
      );
  }, [project]);

  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {
    return (
      <PageLayout showCTA={false}>
        <div
          className="
            flex
            min-h-screen
            items-center
            justify-center
            bg-[#f5f5f2]
          "
        >
          <div className="text-center">
            <div
              className="
                mx-auto
                mb-5
                h-7
                w-7
                animate-spin
                rounded-full
                border
                border-black/10
                border-t-black
              "
            />

            <p
              className="
                text-[8px]
                font-bold
                uppercase
                tracking-[0.3em]
                text-black/30
              "
            >
              Loading project
            </p>
          </div>
        </div>
      </PageLayout>
    );
  }

  /* =======================================================
     ERROR
  ======================================================= */

  if (error || !project) {
    return (
      <PageLayout showCTA={false}>
        <section
          className="
            flex
            min-h-screen
            items-center
            justify-center
            px-5
            bg-[#f5f5f2]
          "
        >
          <div className="text-center">
            <p
              className="
                text-4xl
                font-semibold
                tracking-[-0.07em]
                sm:text-5xl
              "
            >
              Project unavailable.
            </p>

            <p
              className="
                mx-auto
                mt-4
                max-w-md
                text-sm
                leading-6
                text-black/40
              "
            >
              {error ||
                "This project could not be found."}
            </p>

            <Link
              to="/work"
              className="
                mt-8
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-black
                px-6
                py-3
                text-[8px]
                font-bold
                uppercase
                tracking-[0.2em]
                text-white
                transition-transform
                hover:scale-105
              "
            >
              <ArrowLeft size={13} />
              Back to work
            </Link>
          </div>
        </section>
      </PageLayout>
    );
  }

  /* =======================================================
     IMPORTANT:
     IN-PROGRESS PROJECT
  ======================================================= */

  if (isInProgress(project)) {
    return (
      <ComingSoonProject
        project={project}
      />
    );
  }

  /* =======================================================
     PUBLISHED PROJECT DETAIL
  ======================================================= */

  return (
    <PageLayout showCTA={false}>
      <SEO
        type="project"
        reference={
          project._id || slug
        }
      />

      {/* ===================================================
          HERO
      =================================================== */}

      <section
        className="
          relative
          overflow-hidden
          px-5
          pb-12
          pt-7
          sm:px-8
          lg:px-12
          lg:pb-20
          lg:pt-10
        "
      >
        <div className="mx-auto max-w-[1500px]">
          <Link
            to="/work"
            className="
              group
              mb-10
              inline-flex
              items-center
              gap-2
              text-[8px]
              font-bold
              uppercase
              tracking-[0.25em]
              text-black/50
              transition-colors
              hover:text-black
            "
          >
            <ArrowLeft
              size={13}
              className="
                transition-transform
                duration-300
                group-hover:-translate-x-1
              "
            />

            Selected work
          </Link>

          {/* TITLE */}

          <motion.div
            initial={{
              opacity: 0,
              y: 35,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              ease: [
                0.16,
                1,
                0.3,
                1,
              ],
            }}
            className="
              grid
              gap-8
              lg:grid-cols-[1fr_280px]
              lg:items-end
            "
          >
            <div>
              <div
                className="
                  flex
                  items-center
                  gap-3
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
                    text-[8px]
                    font-bold
                    uppercase
                    tracking-[0.28em]
                    text-black/45
                  "
                >
                  {project.category ||
                    "SELECTED PROJECT"}
                </span>
              </div>

              <h1
                className="
                  mt-5
                  max-w-6xl
                  text-[17vw]
                  font-semibold
                  leading-[0.76]
                  tracking-[-0.085em]
                  text-black
                  sm:text-[12vw]
                  lg:text-[10vw]
                  xl:text-[9rem]
                "
              >
                {project.title}

                <span className="text-therynox-orange">
                  .
                </span>
              </h1>
            </div>

            <div className="lg:pb-2">
              <p
                className="
                  text-sm
                  leading-6
                  text-black/55
                "
              >
                {project.shortDescription ||
                  "A digital experience designed and engineered by THERYNOX WEB STUDIO."}
              </p>
            </div>
          </motion.div>

          {/* HERO IMAGE */}

          <motion.div
            initial={{
              opacity: 0,
              y: 45,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.9,
              delay: 0.15,
              ease: [
                0.16,
                1,
                0.3,
                1,
              ],
            }}
            className="
              relative
              mt-10
              overflow-hidden
              rounded-[22px]
              bg-[#e9e7e2]
              sm:mt-14
              sm:rounded-[28px]
            "
          >
            <motion.div
              style={{
                scale: heroScale,
                y: heroY,
              }}
              className="
                relative
                aspect-[16/8]
                w-full
              "
            >
              <ProjectCoverImage
                project={project}
              />

              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-black/45
                  via-transparent
                  to-transparent
                "
              />
            </motion.div>

            <div
              className="
                absolute
                bottom-5
                left-5
                right-5
                flex
                items-end
                justify-between
                sm:bottom-7
                sm:left-7
                sm:right-7
              "
            >
              <div>
                <p
                  className="
                    text-[7px]
                    font-bold
                    uppercase
                    tracking-[0.25em]
                    text-white/70
                  "
                >
                  THERYNOX WEB STUDIO
                </p>

                <p
                  className="
                    mt-1
                    text-[8px]
                    font-medium
                    text-white/50
                  "
                >
                  {project.year || ""}
                </p>
              </div>

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${project.title}`}
                  className="
                    group
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-full
                    bg-therynox-orange
                    text-black
                    transition-transform
                    duration-300
                    hover:scale-110
                  "
                  onClick={(event) => {
                    event.stopPropagation();
                  }}
                >
                  <ArrowUpRight
                    size={16}
                    className="
                      transition-transform
                      duration-300
                      group-hover:translate-x-0.5
                      group-hover:-translate-y-0.5
                    "
                  />
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===================================================
          PROJECT META
      =================================================== */}

      <section className="px-5 sm:px-8 lg:px-12">
        <div
          className="
            mx-auto
            grid
            max-w-[1500px]
            grid-cols-2
            border-y
            border-black/10
            sm:grid-cols-4
          "
        >
          <MetaItem
            label="Client"
            value={
              project.client || "—"
            }
          />

          <MetaItem
            label="Year"
            value={
              project.year || "—"
            }
          />

          <MetaItem
            label="Type"
            value={
              project.type ||
              "Digital Project"
            }
          />

          <MetaItem
            label="Category"
            value={
              project.category || "—"
            }
          />
        </div>
      </section>

      {/* ===================================================
          OVERVIEW
      =================================================== */}

      <section
        className="
          px-5
          py-20
          sm:px-8
          lg:px-12
          lg:py-32
        "
      >
        <div
          className="
            mx-auto
            grid
            max-w-[1500px]
            gap-12
            lg:grid-cols-[260px_1fr]
          "
        >
          <div>
            <span
              className="
                text-[8px]
                font-bold
                uppercase
                tracking-[0.28em]
                text-therynox-orange
              "
            >
              01 / Overview
            </span>
          </div>

          <div>
            <h2
              className="
                max-w-5xl
                text-4xl
                font-semibold
                leading-[0.95]
                tracking-[-0.065em]
                sm:text-5xl
                lg:text-7xl
              "
            >
              {project.shortDescription ||
                "Digital work designed to make an impression and built to perform."}
            </h2>

            {project.description && (
              <p
                className="
                  mt-10
                  max-w-3xl
                  text-sm
                  leading-7
                  text-black/45
                  sm:text-base
                  sm:leading-8
                "
              >
                {project.description}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ===================================================
          SERVICES
      =================================================== */}

      {Array.isArray(project.services) &&
        project.services.length > 0 && (
          <section
            className="
              border-y
              border-black/10
              bg-[#f5f5f2]
              px-5
              py-16
              sm:px-8
              lg:px-12
              lg:py-20
            "
          >
            <div
              className="
                mx-auto
                grid
                max-w-[1500px]
                gap-10
                lg:grid-cols-[260px_1fr]
              "
            >
              <div>
                <span
                  className="
                    text-[8px]
                    font-bold
                    uppercase
                    tracking-[0.28em]
                    text-black/30
                  "
                >
                  02 / Services
                </span>
              </div>

              <div
                className="
                  grid
                  border-t
                  border-black/10
                  sm:grid-cols-2
                "
              >
                {project.services.map(
                  (service, index) => (
                    <div
                      key={`${service}-${index}`}
                      className="
                        flex
                        items-center
                        justify-between
                        border-b
                        border-black/10
                        py-5
                        pr-5
                      "
                    >
                      <span
                        className="
                          text-sm
                          font-medium
                          tracking-[-0.02em]
                        "
                      >
                        {service}
                      </span>

                      <span
                        className="
                          text-[7px]
                          font-bold
                          text-black/20
                        "
                      >
                        {String(
                          index + 1
                        ).padStart(2, "0")}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>
          </section>
        )}

      {/* ===================================================
          CHALLENGE / SOLUTION / RESULT
      =================================================== */}

      {(project.challenge ||
        project.solution ||
        project.result) && (
        <section
          className="
            px-5
            py-20
            sm:px-8
            lg:px-12
            lg:py-32
          "
        >
          <div className="mx-auto max-w-[1500px]">
            <div className="mb-14">
              <span
                className="
                  text-[8px]
                  font-bold
                  uppercase
                  tracking-[0.28em]
                  text-therynox-orange
                "
              >
                03 / Approach
              </span>
            </div>

            <div className="border-t border-black/10">
              {project.challenge && (
                <StoryRow
                  number="01"
                  title="Challenge"
                  text={
                    project.challenge
                  }
                />
              )}

              {project.solution && (
                <StoryRow
                  number="02"
                  title="Solution"
                  text={
                    project.solution
                  }
                />
              )}

              {project.result && (
                <StoryRow
                  number="03"
                  title="Result"
                  text={
                    project.result
                  }
                />
              )}
            </div>
          </div>
        </section>
      )}

      {/* ===================================================
          GALLERY
      =================================================== */}

      {gallery.length > 0 && (
        <section
          className="
            px-5
            pb-16
            sm:px-8
            lg:px-12
            lg:pb-24
          "
        >
          <div className="mx-auto max-w-[1200px]">
            <div
              className="
                mb-8
                flex
                items-end
                justify-between
              "
            >
              <div>
                <span
                  className="
                    text-[8px]
                    font-bold
                    uppercase
                    tracking-[0.28em]
                    text-therynox-orange
                  "
                >
                  04 / Project Gallery
                </span>

                <h2
                  className="
                    mt-3
                    text-3xl
                    font-semibold
                    tracking-[-0.065em]
                    sm:text-4xl
                  "
                >
                  Inside the work.
                </h2>
              </div>

              <span
                className="
                  hidden
                  text-[7px]
                  font-bold
                  uppercase
                  tracking-[0.2em]
                  text-black/25
                  sm:block
                "
              >
                {gallery.length} visuals
              </span>
            </div>

            <div
              className="
                grid
                gap-5
                sm:grid-cols-2
              "
            >
              {gallery.map(
                (image, index) => (
                  <GalleryImage
                    key={`${image.url}-${index}`}
                    image={image}
                    index={index}
                    project={project}
                  />
                )
              )}
            </div>
          </div>
        </section>
      )}

      {/* ===================================================
          PRIVACY
      =================================================== */}

      <section className="px-5 pb-10 sm:px-8 lg:px-12">
        <div
          className="
            mx-auto
            flex
            max-w-[1500px]
            items-start
            gap-4
            border-t
            border-black/10
            pt-7
          "
        >
          <span
            className="
              mt-1
              h-1.5
              w-1.5
              shrink-0
              rounded-full
              bg-therynox-orange
            "
          />

          <p
            className="
              max-w-2xl
              text-[9px]
              leading-5
              text-black/35
            "
          >
            This case study contains publicly
            shareable project information only.
            Private credentials, infrastructure
            details, security configuration and
            confidential client information are
            not exposed.
          </p>
        </div>
      </section>

      {/* ===================================================
          LIVE PROJECT
      =================================================== */}

      {project.liveUrl && (
        <section
          className="
            px-5
            pb-16
            pt-8
            sm:px-8
            lg:px-12
            lg:pb-24
          "
        >
          <div className="mx-auto max-w-[1500px]">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
                group
                relative
                block
                overflow-hidden
                rounded-[28px]
                bg-black
                p-7
                sm:p-10
                lg:p-14
              "
            >
              <div
                className="
                  pointer-events-none
                  absolute
                  -right-24
                  -top-24
                  h-72
                  w-72
                  rounded-full
                  bg-therynox-orange/20
                  blur-3xl
                  transition-transform
                  duration-700
                  group-hover:scale-125
                "
              />

              <div
                className="
                  relative
                  flex
                  flex-col
                  justify-between
                  gap-12
                  sm:flex-row
                  sm:items-end
                "
              >
                <div>
                  <span
                    className="
                      text-[8px]
                      font-bold
                      uppercase
                      tracking-[0.3em]
                      text-white/30
                    "
                  >
                    05 / Visit project
                  </span>

                  <h2
                    className="
                      mt-5
                      max-w-4xl
                      text-4xl
                      font-semibold
                      leading-[0.9]
                      tracking-[-0.07em]
                      text-white
                      sm:text-6xl
                      lg:text-8xl
                    "
                  >
                    See it
                    <br />

                    <span className="text-white/25">
                      in action.
                    </span>
                  </h2>
                </div>

                <div
                  className="
                    flex
                    h-16
                    w-16
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-therynox-orange
                    text-black
                    transition-transform
                    duration-500
                    group-hover:rotate-45
                  "
                >
                  <ExternalLink
                    size={19}
                  />
                </div>
              </div>
            </a>
          </div>
        </section>
      )}

      {/* ===================================================
          NEXT PROJECT
      =================================================== */}

      <NextProject
        currentProject={project}
      />

      {/* ===================================================
          BACK
      =================================================== */}

      <section
        className="
          border-t
          border-black/10
          px-5
          py-10
          sm:px-8
          lg:px-12
        "
      >
        <div className="mx-auto max-w-[1500px]">
          <Link
            to="/work"
            className="
              group
              inline-flex
              items-center
              gap-3
              text-[8px]
              font-bold
              uppercase
              tracking-[0.25em]
              text-black/35
              transition-colors
              hover:text-black
            "
          >
            <ArrowLeft
              size={13}
              className="
                transition-transform
                group-hover:-translate-x-1
              "
            />

            Back to selected work
          </Link>
        </div>
      </section>
    </PageLayout>
  );
}

/* =========================================================
   PROJECT COVER IMAGE
========================================================= */

function ProjectCoverImage({
  project,
}) {
  const image =
    getProjectImage(project);

  const [failed, setFailed] =
    useState(false);

  const url =
    image && !failed
      ? safeMediaUrl(image)
      : "";

  if (!url) {
    return (
      <ComingSoonVisual
        project={project}
        className="absolute inset-0"
        compact
      />
    );
  }

  return (
    <img
      src={url}
      alt={project.title}
      className="
        absolute
        inset-0
        h-full
        w-full
        object-cover
      "
      onError={() => {
        setFailed(true);
      }}
    />
  );
}

/* =========================================================
   COMING SOON PROJECT PAGE
========================================================= */

function ComingSoonProject({
  project,
}) {
  const [otherProjects, setOtherProjects] =
    useState([]);

  const [loadingOthers, setLoadingOthers] =
    useState(true);

  useEffect(() => {
    let mounted = true;

    const loadOtherProjects = async () => {
      try {
        setLoadingOthers(true);

        const response =
          await api.get("/projects");

        const projects =
          Array.isArray(
            response.data?.data
          )
            ? response.data.data
            : [];

        const publishedProjects =
          projects
            .filter((item) => {
              return (
                item._id !== project._id &&
                normalizeStatus(
                  item.status
                ) === "published"
              );
            })
            .slice(0, 3);

        if (mounted) {
          setOtherProjects(
            publishedProjects
          );
        }
      } catch (error) {
        console.error(
          "COMING SOON OTHER PROJECTS ERROR:",
          error
        );

        if (mounted) {
          setOtherProjects([]);
        }
      } finally {
        if (mounted) {
          setLoadingOthers(false);
        }
      }
    };

    loadOtherProjects();

    return () => {
      mounted = false;
    };
  }, [project?._id]);

  return (
    <PageLayout showCTA={false}>
      <SEO
        type="project"
        reference={
          project._id ||
          project.slug
        }
      />

      {/* ===================================================
          COMING SOON HERO
      =================================================== */}

      <section
        className="
          relative
          overflow-hidden
          border-b
          border-black/10
          bg-[#f5f5f2]
          px-5
          py-10
          sm:px-8
          lg:px-12
          lg:py-16
        "
      >
        <div
          className="
            pointer-events-none
            absolute
            -right-40
            -top-40
            h-[500px]
            w-[500px]
            rounded-full
            bg-therynox-orange/10
            blur-3xl
          "
        />

        <div className="mx-auto max-w-[1500px]">
          {/* BACK */}

          <Link
            to="/work"
            className="
              group
              inline-flex
              items-center
              gap-2
              text-[8px]
              font-bold
              uppercase
              tracking-[0.25em]
              text-black/40
              transition-colors
              hover:text-black
            "
          >
            <ArrowLeft
              size={13}
              className="
                transition-transform
                group-hover:-translate-x-1
              "
            />

            Selected work
          </Link>

          {/* MAIN */}

          <div
            className="
              mt-10
              grid
              items-center
              gap-10
              lg:grid-cols-[0.85fr_1.15fr]
              lg:gap-16
            "
          >
            {/* LEFT */}

            <motion.div
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
              }}
            >
              <div
                className="
                  flex
                  items-center
                  gap-3
                "
              >
                <span
                  className="
                    h-1.5
                    w-1.5
                    animate-pulse
                    rounded-full
                    bg-therynox-orange
                  "
                />

                <span
                  className="
                    text-[8px]
                    font-bold
                    uppercase
                    tracking-[0.28em]
                    text-black/40
                  "
                >
                  PROJECT IN PROCESS
                </span>
              </div>

              <h1
                className="
                  mt-6
                  max-w-4xl
                  text-[16vw]
                  font-semibold
                  leading-[0.78]
                  tracking-[-0.09em]
                  sm:text-[11vw]
                  lg:text-[8vw]
                "
              >
                {project.title}

                <span className="text-therynox-orange">
                  .
                </span>
              </h1>

              <p
                className="
                  mt-8
                  max-w-xl
                  text-base
                  leading-7
                  text-black/50
                  sm:text-lg
                  sm:leading-8
                "
              >
                We are currently building
                this project. The full case
                study will be published here
                when the work is ready.
              </p>

              <div
                className="
                  mt-8
                  flex
                  flex-wrap
                  gap-2
                "
              >
                <span
                  className="
                    rounded-full
                    bg-black
                    px-4
                    py-2
                    text-[7px]
                    font-bold
                    uppercase
                    tracking-[0.2em]
                    text-white
                  "
                >
                  Coming Soon
                </span>

                {project.category && (
                  <span
                    className="
                      rounded-full
                      border
                      border-black/10
                      bg-white
                      px-4
                      py-2
                      text-[7px]
                      font-bold
                      uppercase
                      tracking-[0.2em]
                      text-black/40
                    "
                  >
                    {project.category}
                  </span>
                )}
              </div>
            </motion.div>

            {/* RIGHT — IMAGE */}

            <motion.div
              initial={{
                opacity: 0,
                y: 35,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
                delay: 0.1,
              }}
              className="
                relative
                overflow-hidden
                rounded-[28px]
                border
                border-black/10
                bg-black
                p-2
                shadow-2xl
              "
            >
              <ComingSoonVisual
                project={project}
                className="
                  aspect-[4/3]
                  rounded-[22px]
                "
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===================================================
          PROJECT INFORMATION
      =================================================== */}

      <section
        className="
          border-b
          border-black/10
          px-5
          py-16
          sm:px-8
          lg:px-12
          lg:py-24
        "
      >
        <div
          className="
            mx-auto
            grid
            max-w-[1500px]
            gap-10
            lg:grid-cols-[260px_1fr]
          "
        >
          <div>
            <span
              className="
                text-[8px]
                font-bold
                uppercase
                tracking-[0.28em]
                text-therynox-orange
              "
            >
              Project status
            </span>
          </div>

          <div>
            <div
              className="
                grid
                border-t
                border-black/10
                sm:grid-cols-3
              "
            >
              <MetaItem
                label="Client"
                value={
                  project.client || "—"
                }
              />

              <MetaItem
                label="Year"
                value={
                  project.year || "—"
                }
              />

              <MetaItem
                label="Type"
                value={
                  project.type ||
                  "Digital Project"
                }
              />
            </div>

            {project.shortDescription && (
              <p
                className="
                  mt-10
                  max-w-3xl
                  text-sm
                  leading-7
                  text-black/45
                  sm:text-base
                  sm:leading-8
                "
              >
                {project.shortDescription}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ===================================================
          OTHER PROJECTS
      =================================================== */}

      <section
        className="
          px-5
          py-16
          sm:px-8
          lg:px-12
          lg:py-24
        "
      >
        <div className="mx-auto max-w-[1500px]">
          <div
            className="
              flex
              items-end
              justify-between
              gap-6
              border-b
              border-black/10
              pb-6
            "
          >
            <div>
              <span
                className="
                  text-[8px]
                  font-bold
                  uppercase
                  tracking-[0.28em]
                  text-therynox-orange
                "
              >
                More from THERYNOX
              </span>

              <h2
                className="
                  mt-3
                  text-4xl
                  font-semibold
                  tracking-[-0.065em]
                  sm:text-5xl
                "
              >
                Other projects.
              </h2>
            </div>

            <Link
              to="/work"
              className="
                hidden
                text-[8px]
                font-bold
                uppercase
                tracking-[0.2em]
                text-black/35
                hover:text-black
                sm:block
              "
            >
              View all work ↗
            </Link>
          </div>

          {loadingOthers ? (
            <div
              className="
                flex
                min-h-[220px]
                items-center
                justify-center
                text-[8px]
                font-bold
                uppercase
                tracking-[0.25em]
                text-black/25
              "
            >
              Loading other projects...
            </div>
          ) : otherProjects.length > 0 ? (
            <div
              className="
                mt-8
                grid
                gap-6
                md:grid-cols-3
              "
            >
              {otherProjects.map(
                (item) => (
                  <OtherProjectCard
                    key={item._id}
                    project={item}
                  />
                )
              )}
            </div>
          ) : (
            <div
              className="
                mt-8
                rounded-[18px]
                border
                border-dashed
                border-black/10
                py-16
                text-center
                text-[8px]
                font-bold
                uppercase
                tracking-[0.22em]
                text-black/25
              "
            >
              More projects are coming soon.
            </div>
          )}
        </div>
      </section>

      {/* ===================================================
          BACK
      =================================================== */}

      <section
        className="
          border-t
          border-black/10
          px-5
          py-10
          sm:px-8
          lg:px-12
        "
      >
        <div className="mx-auto max-w-[1500px]">
          <Link
            to="/work"
            className="
              group
              inline-flex
              items-center
              gap-3
              text-[8px]
              font-bold
              uppercase
              tracking-[0.25em]
              text-black/35
              hover:text-black
            "
          >
            <ArrowLeft
              size={13}
              className="
                transition-transform
                group-hover:-translate-x-1
              "
            />

            Back to selected work
          </Link>
        </div>
      </section>
    </PageLayout>
  );
}

/* =========================================================
   OTHER PROJECT CARD
========================================================= */

function OtherProjectCard({
  project,
}) {
  const image =
    getProjectImage(project);

  const [failed, setFailed] =
    useState(false);

  const imageUrl =
    image && !failed
      ? safeMediaUrl(image)
      : "";

  return (
    <Link
      to={`/work/${project.slug}`}
      className="group block"
    >
      <div
        className="
          relative
          aspect-[4/3]
          overflow-hidden
          rounded-[18px]
          border
          border-black/10
          bg-[#ece9e3]
        "
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={project.title}
            loading="lazy"
            className="
              absolute
              inset-0
              h-full
              w-full
              object-cover
              transition-transform
              duration-700
              group-hover:scale-[1.03]
            "
            onError={() => {
              setFailed(true);
            }}
          />
        ) : (
          <div
            className="
              absolute
              inset-0
              bg-gradient-to-br
              from-[#efede8]
              to-[#d6d3cc]
            "
          />
        )}

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black/45
            via-transparent
            to-transparent
          "
        />

        <div
          className="
            absolute
            bottom-4
            left-4
            right-4
            flex
            items-end
            justify-between
            gap-3
          "
        >
          <span
            className="
              text-[8px]
              font-bold
              uppercase
              tracking-[0.16em]
              text-white
            "
          >
            {project.category ||
              "Project"}
          </span>

          <span
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              bg-therynox-orange
              text-black
              transition-transform
              group-hover:rotate-45
            "
          >
            <ArrowUpRight
              size={14}
            />
          </span>
        </div>
      </div>

      <div className="px-1 pt-4">
        <h3
          className="
            text-xl
            font-semibold
            tracking-[-0.05em]
          "
        >
          {project.title}
        </h3>

        <p
          className="
            mt-2
            text-[11px]
            leading-5
            text-black/40
          "
        >
          {project.shortDescription ||
            project.description ||
            "Digital work by THERYNOX WEB STUDIO."}
        </p>
      </div>
    </Link>
  );
}

/* =========================================================
   GALLERY IMAGE
========================================================= */

function GalleryImage({
  image,
  index,
  project,
}) {
  const [failed, setFailed] =
    useState(false);

  const url =
    image.url && !failed
      ? safeMediaUrl(image.url)
      : "";

  return (
    <motion.figure
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
        amount: 0.15,
      }}
      transition={{
        duration: 0.5,
      }}
      className={`
        overflow-hidden
        rounded-[16px]
        bg-[#eeece7]
        ${
          index % 3 === 0
            ? "sm:col-span-2"
            : ""
        }
      `}
    >
      <div
        className={`
          relative
          overflow-hidden
          ${
            index % 3 === 0
              ? "aspect-[2.2/1]"
              : "aspect-[1.5/1]"
          }
        `}
      >
        {url ? (
          <img
            src={url}
            alt={
              image.caption ||
              `${project.title} project visual`
            }
            loading="lazy"
            className="
              absolute
              inset-0
              h-full
              w-full
              object-cover
              transition-transform
              duration-700
              hover:scale-[1.02]
            "
            onError={() => {
              setFailed(true);
            }}
          />
        ) : (
          <div
            className="
              absolute
              inset-0
              flex
              items-center
              justify-center
              bg-gradient-to-br
              from-[#efede8]
              to-[#d6d3cc]
            "
          >
            <span
              className="
                text-[8px]
                font-bold
                uppercase
                tracking-[0.25em]
                text-black/25
              "
            >
              Project visual unavailable
            </span>
          </div>
        )}
      </div>

      {image.caption && (
        <figcaption
          className="
            px-4
            py-3
            text-[7px]
            font-bold
            uppercase
            tracking-[0.18em]
            text-black/30
          "
        >
          {image.caption}
        </figcaption>
      )}
    </motion.figure>
  );
}

/* =========================================================
   META ITEM
========================================================= */

function MetaItem({
  label,
  value,
}) {
  return (
    <div
      className="
        border-r
        border-black/10
        px-4
        py-6
        first:pl-0
        last:border-r-0
        sm:px-6
        sm:py-7
        lg:px-8
      "
    >
      <p
        className="
          text-[7px]
          font-bold
          uppercase
          tracking-[0.25em]
          text-black/25
        "
      >
        {label}
      </p>

      <p
        className="
          mt-2
          text-xs
          font-semibold
          uppercase
          tracking-[0.02em]
          text-black
          sm:text-sm
        "
      >
        {value}
      </p>
    </div>
  );
}

/* =========================================================
   STORY ROW
========================================================= */

function StoryRow({
  number,
  title,
  text,
}) {
  return (
    <div
      className="
        grid
        gap-6
        border-b
        border-black/10
        py-8
        lg:grid-cols-[80px_220px_1fr]
        lg:items-start
        lg:gap-8
      "
    >
      <span
        className="
          text-[8px]
          font-bold
          tracking-[0.2em]
          text-therynox-orange
        "
      >
        {number}
      </span>

      <h3
        className="
          text-xl
          font-semibold
          tracking-[-0.04em]
        "
      >
        {title}
      </h3>

      <p
        className="
          max-w-2xl
          text-sm
          leading-7
          text-black/45
          sm:text-base
          sm:leading-8
        "
      >
        {text}
      </p>
    </div>
  );
}

/* =========================================================
   NEXT PROJECT
========================================================= */

function NextProject({
  currentProject,
}) {
  const [nextProject, setNextProject] =
    useState(null);

  const [loadingNext, setLoadingNext] =
    useState(true);

  useEffect(() => {
    let mounted = true;

    const loadNextProject = async () => {
      try {
        setLoadingNext(true);

        const response =
          await api.get("/projects");

        const projects =
          Array.isArray(
            response.data?.data
          )
            ? response.data.data
            : [];

        /* ONLY PUBLISHED PROJECTS */

        const publishedProjects =
          projects.filter(
            (item) =>
              normalizeStatus(
                item.status
              ) === "published"
          );

        if (
          publishedProjects.length === 0
        ) {
          if (mounted) {
            setNextProject(null);
          }

          return;
        }

        const currentIndex =
          publishedProjects.findIndex(
            (item) =>
              item._id ===
              currentProject?._id
          );

        let next;

        if (currentIndex === -1) {
          next = publishedProjects[0];
        } else if (
          currentIndex ===
          publishedProjects.length - 1
        ) {
          next = publishedProjects[0];
        } else {
          next =
            publishedProjects[
              currentIndex + 1
            ];
        }

        if (mounted) {
          setNextProject(
            next &&
              next._id !==
                currentProject?._id
              ? next
              : null
          );
        }
      } catch (error) {
        console.error(
          "NEXT PROJECT ERROR:",
          error
        );

        if (mounted) {
          setNextProject(null);
        }
      } finally {
        if (mounted) {
          setLoadingNext(false);
        }
      }
    };

    if (currentProject?._id) {
      loadNextProject();
    }

    return () => {
      mounted = false;
    };
  }, [currentProject?._id]);

  if (
    loadingNext ||
    !nextProject
  ) {
    return null;
  }

  const image =
    getProjectImage(nextProject);

  return (
    <section
      className="
        border-t
        border-black/10
      "
    >
      <div className="mx-auto max-w-[1500px]">
        <Link
          to={`/work/${nextProject.slug}`}
          className="
            group
            grid
            overflow-hidden
            sm:grid-cols-[0.8fr_1.2fr]
          "
        >
          {/* IMAGE */}

          <div
            className="
              relative
              aspect-[1.3/1]
              overflow-hidden
              bg-[#e9e7e2]
              sm:aspect-auto
              sm:min-h-[340px]
            "
          >
            <NextProjectImage
              project={nextProject}
              image={image}
            />

            <div
              className="
                absolute
                inset-0
                bg-black/5
                transition-colors
                duration-500
                group-hover:bg-black/0
              "
            />
          </div>

          {/* CONTENT */}

          <div
            className="
              flex
              min-h-[340px]
              flex-col
              justify-between
              bg-[#f5f5f2]
              p-7
              sm:p-10
              lg:p-14
            "
          >
            <div
              className="
                flex
                items-center
                justify-between
              "
            >
              <span
                className="
                  text-[8px]
                  font-bold
                  uppercase
                  tracking-[0.28em]
                  text-black/30
                "
              >
                Next project
              </span>

              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-black/10
                  text-black
                  transition-all
                  duration-300
                  group-hover:bg-black
                  group-hover:text-white
                "
              >
                <ArrowUpRight
                  size={15}
                />
              </div>
            </div>

            <div>
              <span
                className="
                  text-[8px]
                  font-bold
                  uppercase
                  tracking-[0.22em]
                  text-therynox-orange
                "
              >
                {nextProject.category ||
                  "PROJECT"}
              </span>

              <h2
                className="
                  mt-3
                  max-w-2xl
                  text-4xl
                  font-semibold
                  leading-[0.9]
                  tracking-[-0.07em]
                  text-black
                  sm:text-5xl
                  lg:text-6xl
                "
              >
                {nextProject.title}

                <span className="text-therynox-orange">
                  .
                </span>
              </h2>

              <p
                className="
                  mt-5
                  max-w-md
                  text-xs
                  leading-6
                  text-black/40
                "
              >
                {nextProject.shortDescription ||
                  "Explore another project by THERYNOX WEB STUDIO."}
              </p>
            </div>

            <div
              className="
                flex
                items-center
                justify-between
                pt-8
              "
            >
              <span
                className="
                  text-[7px]
                  font-bold
                  uppercase
                  tracking-[0.2em]
                  text-black/25
                "
              >
                {nextProject.year || ""}
              </span>

              <span
                className="
                  text-[7px]
                  font-bold
                  uppercase
                  tracking-[0.2em]
                  text-black/30
                  transition-colors
                  group-hover:text-black
                "
              >
                View project →
              </span>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}

/* =========================================================
   NEXT PROJECT IMAGE
========================================================= */

function NextProjectImage({
  project,
  image,
}) {
  const [failed, setFailed] =
    useState(false);

  const url =
    image && !failed
      ? safeMediaUrl(image)
      : "";

  if (!url) {
    return (
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-br
          from-[#efede8]
          to-[#d6d3cc]
        "
      />
    );
  }

  return (
    <img
      src={url}
      alt={project.title}
      loading="lazy"
      className="
        absolute
        inset-0
        h-full
        w-full
        object-cover
        transition-transform
        duration-700
        group-hover:scale-[1.035]
      "
      onError={() => {
        setFailed(true);
      }}
    />
  );
}