import React, { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import api from "../services/api";
import getImageUrl from "../utils/imageUrl";


// =========================================================
// STATUS
// =========================================================

function normalizeStatus(status) {
  return String(status || "")
    .trim()
    .toLowerCase()
    .replace(/_/g, "-")
    .replace(/\s+/g, "-");
}


// =========================================================
// HOME PROJECTS
// =========================================================

export default function HomeProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);

        const response = await api.get("/projects");

        setProjects(
          Array.isArray(response.data?.data)
            ? response.data.data
            : []
        );
      } catch (error) {
        console.error(
          "HOME PROJECTS ERROR:",
          error
        );

        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);


  // =========================================================
  // HOMEPAGE = PUBLISHED ONLY
  // =========================================================

  const visibleProjects = projects.filter(
    (project) =>
      normalizeStatus(project.status) ===
      "published"
  );


  return (
    <section
      id="work"
      className="
        bg-[#f5f5f2]
        px-5
        py-16
        sm:px-8
        lg:px-12
        lg:py-24
      "
    >

      <div className="mx-auto max-w-7xl">


        {/* =================================================
            HEADER
        ================================================= */}

        <div
          className="
            mb-10
            flex
            flex-col
            justify-between
            gap-6
            sm:flex-row
            sm:items-end
          "
        >

          <div>

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
                  tracking-[0.28em]
                  text-black/35
                "
              >
                Selected Work
              </span>

            </div>


            <h2
              className="
                mt-4
                text-4xl
                font-semibold
                leading-[0.92]
                tracking-[-0.065em]
                text-black
                sm:text-5xl
                lg:text-6xl
              "
            >
              Work that
              <br />

              <span className="text-black/20">
                moves businesses.
              </span>

            </h2>

          </div>


          <div className="max-w-xs">

            <p
              className="
                text-xs
                leading-6
                text-black/45
                sm:text-sm
              "
            >
              A selection of websites, commerce
              platforms and digital systems built
              by THERYNOX WEB STUDIO.
            </p>

          </div>

        </div>


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
              rounded-[24px]
              border
              border-black/10
              bg-white
            "
          >

            <div className="text-center">

              <div
                className="
                  mx-auto
                  mb-4
                  h-7
                  w-7
                  animate-spin
                  rounded-full
                  border-2
                  border-black/10
                  border-t-black
                "
              />

              <p
                className="
                  text-[8px]
                  font-bold
                  uppercase
                  tracking-[0.2em]
                  text-black/30
                "
              >
                Loading projects...
              </p>

            </div>

          </div>
        )}


        {/* =================================================
            PROJECTS
        ================================================= */}

        {!loading &&
          visibleProjects.length > 0 && (

            <div
              className="
                grid
                grid-cols-1
                gap-x-7
                gap-y-12
                sm:grid-cols-2
                lg:gap-x-8
                lg:gap-y-14
              "
            >

              {visibleProjects.map(
                (project, index) => (

                  <HomeProjectCard
                    key={project._id}
                    project={project}
                    index={index}
                  />

                )
              )}

            </div>

          )}


        {/* =================================================
            EMPTY
        ================================================= */}

        {!loading &&
          visibleProjects.length === 0 && (

            <div
              className="
                flex
                min-h-[250px]
                items-center
                justify-center
                rounded-[24px]
                border
                border-dashed
                border-black/10
              "
            >

              <p className="text-sm text-black/40">
                No published projects yet.
              </p>

            </div>

          )}


        {/* =================================================
            VIEW ALL
        ================================================= */}

        {!loading &&
          visibleProjects.length > 0 && (

            <div className="mt-12 flex justify-center">

              <Link
                to="/work"
                className="
                  group
                  inline-flex
                  items-center
                  gap-3
                  rounded-full
                  border
                  border-black
                  bg-black
                  px-6
                  py-3.5
                  text-[8px]
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

                View all projects

                <ArrowUpRight
                  size={14}
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                    group-hover:-translate-y-1
                  "
                />

              </Link>

            </div>

          )}

      </div>

    </section>
  );
}


// =========================================================
// HOME PROJECT CARD
// =========================================================

function HomeProjectCard({
  project,
  index,
}) {
  const image = getImageUrl(
    project.coverImage
  );

  const detailPath = `/work/${project.slug}`;


  return (
    <motion.article
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
        amount: 0.15,
      }}
      transition={{
        duration: 0.5,
        delay: index * 0.05,
      }}
      className="group"
    >


      {/* =================================================
          IMAGE
      ================================================= */}

      <Link
        to={detailPath}
        className="block"
        aria-label={`View ${project.title}`}
      >

        <div
          className="
            relative
            overflow-hidden
            rounded-[18px]
            border
            border-[#dedbd4]
            bg-[#f3f1ec]
            p-2
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

            {image ? (

              <img
                src={image}
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


            {/* TOP META */}

            <div
              className="
                absolute
                left-4
                right-4
                top-4
                z-10
                flex
                items-center
                justify-between
              "
            >

              <div
                className="
                  rounded-full
                  border
                  border-white/60
                  bg-white/80
                  px-3
                  py-1.5
                  text-[6px]
                  font-bold
                  uppercase
                  tracking-[0.18em]
                  text-black/50
                  backdrop-blur-md
                "
              >
                {project.category ||
                  "PROJECT"}
              </div>


              {project.year && (
                <div
                  className="
                    rounded-full
                    border
                    border-white/60
                    bg-white/80
                    px-3
                    py-1.5
                    text-[7px]
                    font-bold
                    text-black/45
                    backdrop-blur-md
                  "
                >
                  {project.year}
                </div>
              )}

            </div>


            {/* DETAIL BUTTON */}

            <div
              className="
                absolute
                bottom-4
                right-4
                z-10
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                bg-therynox-orange
                text-black
                shadow-lg
                transition-transform
                duration-300
                group-hover:rotate-45
              "
            >
              <ArrowUpRight size={14} />
            </div>

          </div>

        </div>

      </Link>


      {/* =================================================
          INFO
      ================================================= */}

      <div className="px-1 pt-4">

        <div className="flex items-start gap-5">

          <div className="min-w-0">

            <div className="mb-2 flex items-center gap-2">

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


            <Link
              to={detailPath}
              className="
                block
                text-xl
                font-semibold
                leading-none
                tracking-[-0.055em]
                text-black
                transition-opacity
                hover:opacity-60
                sm:text-2xl
              "
            >
              {project.title}
            </Link>


            <p
              className="
                mt-2
                max-w-lg
                text-[11px]
                leading-5
                text-black/45
                sm:text-xs
              "
            >
              {project.shortDescription ||
                project.description ||
                "A premium digital project by THERYNOX WEB STUDIO."}
            </p>


            {project.technologies?.length > 0 && (

              <div
                className="
                  mt-3
                  flex
                  flex-wrap
                  gap-1.5
                "
              >

                {project.technologies
                  .slice(0, 4)
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
                          border-black/10
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

        </div>

      </div>

    </motion.article>
  );
}