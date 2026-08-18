import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  ArrowUpRight,
  ChevronDown,
  Loader2,
} from "lucide-react";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import api from "../services/api";
import { getMediaUrl } from "../utils/media";


// =========================================================
// HERO
// =========================================================

export default function Hero({ settings }) {
  const [projects, setProjects] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  // =======================================================
  // LOAD PROJECTS
  // =======================================================

  useEffect(() => {
    let mounted = true;

    const loadProjects = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/projects");

        if (!mounted) return;

        const data = Array.isArray(
          response.data?.data
        )
          ? response.data.data
          : [];

        setProjects(data);

      } catch (err) {
        console.error(
          "HERO PROJECT ERROR:",
          err
        );

        if (mounted) {
          setError(
            err.response?.data?.message ||
              "Unable to load projects."
          );
        }

      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadProjects();

    return () => {
      mounted = false;
    };
  }, []);


  // =======================================================
  // ACTIVE PROJECT
  // =======================================================

  // Projects selected from Admin > Homepage > Hero Projects.
  // When no projects have been configured yet, fall back to published/featured
  // projects so an existing homepage never becomes empty after this update.
  const heroProjectIds = useMemo(() => {
    return Array.isArray(settings?.projectIds)
      ? settings.projectIds.map((id) => String(id))
      : [];
  }, [settings?.projectIds]);

  const heroProjects = useMemo(() => {
    if (!projects.length) return [];

    if (heroProjectIds.length > 0) {
      return heroProjectIds
        .map((id) =>
          projects.find((project) => String(project._id) === id)
        )
        .filter(Boolean);
    }

    return projects.filter(
      (project) => project.status === "published"
    );
  }, [projects, heroProjectIds]);

  const activeProject = useMemo(() => {
    if (!heroProjects.length) return null;

    return heroProjects[activeIndex % heroProjects.length];
  }, [heroProjects, activeIndex]);


  // =======================================================
  // AUTO CHANGE PROJECT
  // =======================================================

  useEffect(() => {
    setActiveIndex(0);
  }, [heroProjectIds.join("|")]);

  useEffect(() => {
    if (
      loading ||
      heroProjects.length <= 1 ||
      settings?.autoplay === false
    ) {
      return;
    }

    const duration = Number(settings?.autoplayDuration) || 5000;

    const timer = setInterval(() => {
      setActiveIndex((current) =>
        (current + 1) % heroProjects.length
      );
    }, duration);

    return () => clearInterval(timer);
  }, [
    loading,
    heroProjects.length,
    settings?.autoplay,
    settings?.autoplayDuration,
  ]);


  // =======================================================
  // CONTACT
  // =======================================================

  const scrollToContact = () => {
    const element =
      document.getElementById(
        "contact"
      );

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
      });
    } else {
      window.location.href =
        "/contact";
    }
  };


  // =======================================================
  // WORK
  // =======================================================

  const scrollToWork = () => {
    const element =
      document.getElementById("work");

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
      });
    }
  };


  // =======================================================
  // HERO
  // =======================================================

  return (
    <section
      id="hero"
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#050505]
        text-white
      "
    >

      {/* ===================================================
          BACKGROUND GRID
      ==================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.045]
          [background-image:linear-gradient(rgba(255,255,255,.45)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.45)_1px,transparent_1px)]
          [background-size:80px_80px]
        "
      />


      {/* ===================================================
          SOFT BACKGROUND GLOW
      ==================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-[42%]
          h-[600px]
          w-[600px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-therynox-orange/[0.045]
          blur-[160px]
        "
      />


      {/* ===================================================
          MAIN CONTAINER
      ==================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          flex
          min-h-screen
          max-w-[1680px]
          flex-col
          px-5
          pb-5
          pt-24
          sm:px-8
          lg:px-12
        "
      >

        {/* =================================================
            TOP BAR
        ================================================= */}

        <div
          className="
            flex
            items-center
            justify-between
          "
        >

          {/* BRAND */}

          <div
            className="
              flex
              items-center
              gap-3
            "
          >

            <motion.span
              animate={{
                opacity: [
                  1,
                  0.45,
                  1,
                ],
                scale: [
                  1,
                  0.85,
                  1,
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                h-2
                w-2
                rounded-full
                bg-therynox-orange
                shadow-[0_0_18px_rgba(255,122,0,.8)]
              "
            />

            <span
              className="
                text-[8px]
                font-bold
                uppercase
                tracking-[0.35em]
                text-white/75
              "
            >
              THERYNOX WEB STUDIO
            </span>

          </div>


          {/* RIGHT META */}

          <div
            className="
              hidden
              items-center
              gap-3
              sm:flex
            "
          >

            <span
              className="
                text-[7px]
                font-bold
                uppercase
                tracking-[0.28em]
                text-white/25
              "
            >
              DIGITAL
            </span>

            <span className="h-px w-5 bg-white/10" />

            <span
              className="
                text-[7px]
                font-bold
                uppercase
                tracking-[0.28em]
                text-white/25
              "
            >
              DESIGN
            </span>

            <span className="h-px w-5 bg-white/10" />

            <span
              className="
                text-[7px]
                font-bold
                uppercase
                tracking-[0.28em]
                text-white/25
              "
            >
              DEVELOPMENT
            </span>

          </div>

        </div>


        {/* =================================================
            PROJECT VISUAL
        ================================================= */}

        <div
          className="
            relative
            mt-10
            flex
            flex-1
            items-center
            justify-center
            sm:mt-12
          "
        >

          <div
            className="
              relative
              h-[610px]
              w-full
              max-w-[1500px]
              overflow-hidden
              rounded-[28px]
              border
              border-white/[0.12]
              bg-[#111]
              shadow-[0_35px_100px_rgba(0,0,0,.55)]
              sm:h-[650px]
              lg:h-[690px]
            "
          >

            {/* =============================================
                PROJECT MEDIA
            ============================================== */}

            <AnimatePresence
              mode="wait"
            >

              {activeProject && (
                <motion.div
                  key={
                    activeProject._id
                  }
                  initial={{
                    opacity: 0,
                    scale: 1.04,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 1.02,
                  }}
                  transition={{
                    duration: 0.9,
                    ease: [
                      0.16,
                      1,
                      0.3,
                      1,
                    ],
                  }}
                  className="
                    absolute
                    inset-0
                  "
                >

                  {activeProject.video ? (

                    <video
                      key={
                        activeProject.video
                      }
                      src={
                        getMediaUrl(
                          activeProject.video
                        )
                      }
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      className="
                        h-full
                        w-full
                        object-cover
                      "
                    />

                  ) : activeProject.coverImage ? (

                    <img
                      src={
                        getMediaUrl(
                          activeProject.coverImage
                        )
                      }
                      alt=""
                      className="
                        h-full
                        w-full
                        object-cover
                      "
                    />

                  ) : (

                    <div
                      className="
                        h-full
                        w-full
                        bg-gradient-to-br
                        from-[#222]
                        via-[#101010]
                        to-[#050505]
                      "
                    />

                  )}

                </motion.div>
              )}

            </AnimatePresence>


            {/* =============================================
                MEDIA OVERLAY
            ============================================== */}

            {/* top dark */}

            <div
              className="
                absolute
                inset-0
                bg-gradient-to-b
                from-black/70
                via-transparent
                to-black/85
              "
            />


            {/* left dark */}

            <div
              className="
                absolute
                inset-0
                bg-gradient-to-r
                from-black/75
                via-black/20
                to-transparent
              "
            />


            {/* center soft layer */}

            <div
              className="
                absolute
                inset-0
                bg-black/10
              "
            />


            {/* =============================================
                ORANGE GLOW
            ============================================== */}

            <div
              className="
                pointer-events-none
                absolute
                -right-32
                -top-32
                h-[400px]
                w-[400px]
                rounded-full
                bg-therynox-orange/[0.10]
                blur-[130px]
              "
            />


            {/* =============================================
                PROJECT NUMBER
            ============================================== */}

            {activeProject && (
              <div
                className="
                  absolute
                  left-6
                  top-6
                  z-20
                  sm:left-8
                  sm:top-8
                  lg:left-10
                  lg:top-10
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
                    bg-black/30
                    px-4
                    py-2.5
                    backdrop-blur-xl
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
                    {String(
                      (activeIndex % Math.max(heroProjects.length, 1)) + 1
                    ).padStart(2, "0")}
                  </span>

                  <span
                    className="
                      h-1
                      w-1
                      rounded-full
                      bg-white/25
                    "
                  />

                  <span
                    className="
                      text-[7px]
                      font-bold
                      uppercase
                      tracking-[0.2em]
                      text-white/45
                    "
                  >
                    {activeProject.category ||
                      "PROJECT"}
                  </span>

                </div>

              </div>
            )}


            {/* =============================================
                YEAR
            ============================================== */}

            {activeProject?.year && (
              <div
                className="
                  absolute
                  right-6
                  top-6
                  z-20
                  sm:right-8
                  sm:top-8
                  lg:right-10
                  lg:top-10
                "
              >

                <span
                  className="
                    text-[8px]
                    font-bold
                    tracking-[0.25em]
                    text-white/40
                  "
                >
                  {activeProject.year}
                </span>

              </div>
            )}


            {/* =============================================
                CENTER PROJECT CONTENT
            ============================================== */}

            <div
              className="
                absolute
                inset-x-0
                bottom-0
                z-20
                flex
                flex-col
                items-center
                px-6
                pb-12
                text-center
                sm:pb-14
                lg:pb-16
              "
            >

              <AnimatePresence
                mode="wait"
              >

                <motion.div
                  key={
                    activeProject?._id ||
                    "default"
                  }
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
                    y: -20,
                  }}
                  transition={{
                    duration: 0.55,
                  }}
                  className="
                    flex
                    w-full
                    max-w-[1050px]
                    flex-col
                    items-center
                  "
                >

                  {/* SMALL LABEL */}

                  <div
                    className="
                      mb-5
                      flex
                      items-center
                      gap-3
                    "
                  >

                    <span
                      className="
                        h-px
                        w-7
                        bg-therynox-orange
                      "
                    />

                    <span
                      className="
                        text-[7px]
                        font-bold
                        uppercase
                        tracking-[0.32em]
                        text-white/55
                      "
                    >
                      {settings?.badge || "SELECTED DIGITAL WORK"}
                    </span>

                    <span
                      className="
                        h-px
                        w-7
                        bg-therynox-orange
                      "
                    />

                  </div>


                  {/* TITLE */}

                  <h1
                    className="
                      max-w-[1000px]
                      text-[42px]
                      font-medium
                      leading-[0.88]
                      tracking-[-0.07em]
                      text-white
                      drop-shadow-[0_8px_30px_rgba(0,0,0,.55)]
                      sm:text-[58px]
                      md:text-[72px]
                      lg:text-[92px]
                      xl:text-[105px]
                    "
                  >

                    {activeProject?.title || settings?.title || "Digital experiences"}

                  </h1>


                  {/* ORANGE UNDERLINE */}

                  <div
                    className="
                      mt-5
                      h-[2px]
                      w-16
                      bg-therynox-orange
                      shadow-[0_0_20px_rgba(255,122,0,.45)]
                    "
                  />


                  {/* DESCRIPTION */}

                  <p
                    className="
                      mt-5
                      max-w-[650px]
                      text-xs
                      leading-6
                      text-white/65
                      sm:text-sm
                      sm:leading-7
                    "
                  >
                    {activeProject?.shortDescription || settings?.description ||
                      "We design and develop websites, applications and digital systems that help ambitious businesses grow."}
                  </p>


                  {/* META */}

                  <div
                    className="
                      mt-5
                      flex
                      flex-wrap
                      items-center
                      justify-center
                      gap-2
                    "
                  >

                    <span
                      className="
                        rounded-full
                        border
                        border-white/15
                        bg-black/30
                        px-4
                        py-2
                        text-[7px]
                        font-bold
                        uppercase
                        tracking-[0.2em]
                        text-white/55
                        backdrop-blur-md
                      "
                    >
                      {activeProject?.category ||
                        "PROJECT"}
                    </span>


                    {activeProject?.type && (
                      <span
                        className="
                          rounded-full
                          border
                          border-white/15
                          bg-black/30
                          px-4
                          py-2
                          text-[7px]
                          font-bold
                          uppercase
                          tracking-[0.2em]
                          text-white/45
                          backdrop-blur-md
                        "
                      >
                        {activeProject.type}
                      </span>
                    )}

                  </div>


                  {/* ACTIONS */}

                  <div
                    className="
                      mt-7
                      flex
                      flex-wrap
                      items-center
                      justify-center
                      gap-3
                    "
                  >

                    {activeProject?.slug && (
                      <a
                        href={`/work/${activeProject.slug}`}
                        className="
                          group
                          inline-flex
                          items-center
                          gap-3
                          rounded-full
                          border
                          border-white/20
                          bg-black/35
                          px-6
                          py-3.5
                          text-[8px]
                          font-bold
                          uppercase
                          tracking-[0.2em]
                          text-white
                          backdrop-blur-xl
                          transition-all
                          duration-300
                          hover:border-therynox-orange
                          hover:bg-therynox-orange
                          hover:text-black
                        "
                      >

                        View project

                        <ArrowUpRight
                          size={13}
                          className="
                            transition-transform
                            group-hover:translate-x-1
                            group-hover:-translate-y-1
                          "
                        />

                      </a>
                    )}


                    <button
                      type="button"
                      onClick={
                        scrollToContact
                      }
                      className="
                        group
                        inline-flex
                        items-center
                        gap-3
                        rounded-full
                        bg-white
                        px-6
                        py-3.5
                        text-[8px]
                        font-bold
                        uppercase
                        tracking-[0.2em]
                        text-black
                        transition-all
                        duration-300
                        hover:bg-therynox-orange
                      "
                    >

                      Start a project

                      <ArrowUpRight
                        size={13}
                        className="
                          transition-transform
                          group-hover:translate-x-1
                          group-hover:-translate-y-1
                        "
                      />

                    </button>

                  </div>

                </motion.div>

              </AnimatePresence>

            </div>


            {/* =============================================
                PROGRESS
            ============================================== */}

            <div
              className="
                absolute
                bottom-0
                left-0
                z-30
                h-[2px]
                w-full
                bg-white/10
              "
            >

              {!loading &&
                heroProjects.length > 1 && (
                  <motion.div
                    key={
                      activeIndex
                    }
                    initial={{
                      width: "0%",
                    }}
                    animate={{
                      width: "100%",
                    }}
                    transition={{
                      duration: (Number(settings?.autoplayDuration) || 5000) / 1000,
                      ease: "linear",
                    }}
                    className="
                      h-full
                      bg-gradient-to-r
                      from-therynox-orange
                      to-[#ffb36b]
                      shadow-[0_0_15px_rgba(255,122,0,.7)]
                    "
                  />
                )}

            </div>

          </div>

        </div>


        {/* =================================================
            BOTTOM SCROLL ONLY
        ================================================= */}

        <div
          className="
            flex
            items-center
            justify-center
            gap-3
            py-4
          "
        >

          <span
            className="
              text-[7px]
              font-bold
              uppercase
              tracking-[0.3em]
              text-white/25
            "
          >
            Scroll to explore
          </span>

          <ChevronDown
            size={13}
            className="
              animate-bounce
              text-white/25
            "
          />

        </div>

      </div>


      {/* ===================================================
          LOADING
      ==================================================== */}

      {loading && (
        <div
          className="
            absolute
            bottom-20
            left-1/2
            z-50
            flex
            -translate-x-1/2
            items-center
            gap-2
            rounded-full
            border
            border-white/10
            bg-black/60
            px-4
            py-2
            backdrop-blur-xl
          "
        >

          <Loader2
            size={12}
            className="
              animate-spin
              text-therynox-orange
            "
          />

          <span
            className="
              text-[7px]
              font-bold
              uppercase
              tracking-[0.22em]
              text-white/40
            "
          >
            Loading projects
          </span>

        </div>
      )}


      {/* ===================================================
          ERROR
      ==================================================== */}

      {!loading &&
        error && (
          <div
            className="
              absolute
              bottom-20
              left-1/2
              z-50
              -translate-x-1/2
              text-[7px]
              font-bold
              uppercase
              tracking-[0.2em]
              text-white/30
            "
          >
            Unable to load projects
          </div>
        )}

    </section>
  );
}