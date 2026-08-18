import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowLeft, ArrowRight } from "lucide-react";

const projects = [
  {
    id: "01",
    title: "Luxury Real Estate",
    category: "Real Estate",
    year: "2026",
    description:
      "An immersive digital experience for premium property brands, combining editorial design, property discovery and high-end visual storytelling.",
    image: "/images/projects/luxury.jpg",
    services: ["Strategy", "UI/UX", "Development"],
  },
  {
    id: "02",
    title: "Premium E-commerce",
    category: "E-commerce",
    year: "2026",
    description:
      "A conversion-focused commerce experience with product discovery, responsive shopping journeys and a premium visual system.",
    image: "/images/projects/ecommerce.jpg",
    services: ["E-commerce", "Development", "SEO"],
  },
  {
    id: "03",
    title: "Salon Management",
    category: "Business System",
    year: "2026",
    description:
      "A complete salon operating platform connecting appointments, customers, staff, POS, inventory and business analytics.",
    image: "/images/projects/salon.jpg",
    services: ["Product Design", "Web App", "POS"],
  },
  {
    id: "04",
    title: "CRM & ERP",
    category: "SaaS",
    year: "2026",
    description:
      "A scalable business platform designed to centralize customers, operations, reporting, employees and internal workflows.",
    image: "/images/projects/business.jpg",
    services: ["UX/UI", "SaaS", "Development"],
  },
  {
    id: "05",
    title: "Creative Studio",
    category: "Creative",
    year: "2026",
    description:
      "A bold portfolio experience built around motion, typography, storytelling and an expressive visual identity.",
    image: "/images/projects/creative.jpg",
    services: ["Branding", "Creative", "Development"],
  },
];

export default function Work() {
  const [active, setActive] = useState(0);

  const project = projects[active];

  const next = () => {
    setActive((current) => (current + 1) % projects.length);
  };

  const previous = () => {
    setActive(
      (current) =>
        (current - 1 + projects.length) % projects.length
    );
  };

  return (
    <section
      id="work"
      className="relative w-full overflow-hidden bg-black text-white"
    >
      <div className="mx-auto max-w-[1600px] px-6 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="grid gap-10 lg:grid-cols-[0.75fr_2fr]">

          <div>
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-[#ff5722]" />

              <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/40">
                Selected work
              </span>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <h2
              className="
                max-w-5xl
                text-5xl
                font-medium
                leading-[0.9]
                tracking-[-0.055em]
                sm:text-6xl
                md:text-7xl
                lg:text-[7rem]
              "
            >
              Work that makes
              <br />
              <span className="text-white/35">
                an impression.
              </span>
            </h2>
          </motion.div>

        </div>

        {/* =================================================
            FEATURED PROJECT
        ================================================= */}

        <div className="mt-20 sm:mt-28">

          <div className="relative overflow-hidden">

            <AnimatePresence mode="wait">

              <motion.div
                key={project.id}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -30,
                }}
                transition={{
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >

                {/* IMAGE */}

                <div
                  className="
                    relative
                    h-[430px]
                    overflow-hidden
                    sm:h-[550px]
                    md:h-[650px]
                    lg:h-[720px]
                  "
                >

                  <motion.img
                    src={project.image}
                    alt={project.title}
                    initial={{ scale: 1.05 }}
                    animate={{ scale: 1 }}
                    transition={{
                      duration: 1.2,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="
                      h-full
                      w-full
                      object-cover
                    "
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />

                  {/* TOP LABEL */}

                  <div
                    className="
                      absolute
                      left-5
                      top-5
                      flex
                      items-center
                      gap-3
                      sm:left-8
                      sm:top-8
                    "
                  >
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/70">
                      {project.category}
                    </span>

                    <span className="h-px w-8 bg-white/30" />

                    <span className="text-[9px] text-white/50">
                      {project.year}
                    </span>
                  </div>

                  {/* CONTENT */}

                  <div
                    className="
                      absolute
                      bottom-0
                      left-0
                      right-0
                      p-5
                      sm:p-8
                      lg:p-12
                    "
                  >

                    <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">

                      <div>

                        <p className="mb-4 text-[9px] uppercase tracking-[0.25em] text-white/40">
                          Case study {project.id}
                        </p>

                        <h3
                          className="
                            max-w-4xl
                            text-4xl
                            font-medium
                            leading-[0.9]
                            tracking-[-0.05em]
                            sm:text-5xl
                            md:text-6xl
                            lg:text-7xl
                          "
                        >
                          {project.title}
                        </h3>

                        <p
                          className="
                            mt-6
                            max-w-xl
                            text-sm
                            leading-6
                            text-white/60
                            sm:text-base
                          "
                        >
                          {project.description}
                        </p>

                        <div className="mt-6 flex flex-wrap gap-2">
                          {project.services.map((service) => (
                            <span
                              key={service}
                              className="
                                border
                                border-white/20
                                px-3
                                py-2
                                text-[8px]
                                font-semibold
                                uppercase
                                tracking-[0.15em]
                                text-white/60
                              "
                            >
                              {service}
                            </span>
                          ))}
                        </div>

                      </div>

                      {/* CTA */}

                      <a
                        href="#contact"
                        className="
                          group
                          flex
                          w-fit
                          shrink-0
                          items-center
                          gap-5
                          bg-white
                          px-6
                          py-4
                          text-[9px]
                          font-bold
                          uppercase
                          tracking-[0.18em]
                          text-black
                          transition-all
                          duration-300
                          hover:bg-[#ff5722]
                          hover:text-white
                        "
                      >
                        View project

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

                  </div>

                </div>

              </motion.div>

            </AnimatePresence>

          </div>

          {/* =================================================
              CONTROLS
          ================================================= */}

          <div className="flex items-center justify-between border-b border-white/15">

            <div className="flex items-center gap-4 py-6">

              <span className="text-[9px] uppercase tracking-[0.2em] text-white/35">
                Selected
              </span>

              <span className="text-sm">
                {project.id}
              </span>

              <span className="text-white/20">
                /
              </span>

              <span className="text-sm text-white/35">
                {String(projects.length).padStart(2, "0")}
              </span>

            </div>

            <div className="flex">

              <button
                type="button"
                onClick={previous}
                aria-label="Previous project"
                className="
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  border-l
                  border-white/15
                  transition-colors
                  hover:bg-white
                  hover:text-black
                "
              >
                <ArrowLeft size={17} />
              </button>

              <button
                type="button"
                onClick={next}
                aria-label="Next project"
                className="
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  border-l
                  border-white/15
                  transition-colors
                  hover:bg-white
                  hover:text-black
                "
              >
                <ArrowRight size={17} />
              </button>

            </div>

          </div>

        </div>

        {/* =================================================
            PROJECT LIST
        ================================================= */}

        <div className="mt-16 sm:mt-20">

          <div className="grid border-t border-white/15 lg:grid-cols-5">

            {projects.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActive(index)}
                className={`
                  group
                  border-b
                  border-white/15
                  p-5
                  text-left
                  transition-colors
                  duration-300
                  lg:border-b-0
                  lg:border-r
                  lg:p-6
                  lg:last:border-r-0
                  ${
                    active === index
                      ? "bg-white text-black"
                      : "hover:bg-white/[0.05]"
                  }
                `}
              >

                <div className="flex items-center justify-between">

                  <span
                    className={`
                      text-[9px]
                      font-bold
                      ${
                        active === index
                          ? "text-black/40"
                          : "text-white/30"
                      }
                    `}
                  >
                    {item.id}
                  </span>

                  <ArrowUpRight
                    size={14}
                    className={`
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                      group-hover:-translate-y-1
                      ${
                        active === index
                          ? "text-black"
                          : "text-white/40"
                      }
                    `}
                  />

                </div>

                <h4
                  className="
                    mt-10
                    text-lg
                    font-medium
                    tracking-tight
                  "
                >
                  {item.title}
                </h4>

                <p
                  className={`
                    mt-2
                    text-[8px]
                    uppercase
                    tracking-[0.15em]
                    ${
                      active === index
                        ? "text-black/40"
                        : "text-white/30"
                    }
                  `}
                >
                  {item.category}
                </p>

              </button>
            ))}

          </div>

        </div>

        {/* =================================================
            BOTTOM CTA
        ================================================= */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="
            mt-24
            flex
            flex-col
            gap-6
            border-t
            border-white/15
            pt-8
            sm:mt-32
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >

          <p className="max-w-xl text-xl tracking-tight text-white/70 sm:text-2xl">
            Your next project could be
            <span className="text-white"> here.</span>
          </p>

          <a
            href="#contact"
            className="
              group
              flex
              w-fit
              items-center
              gap-4
              border
              border-white/25
              px-6
              py-4
              text-[9px]
              font-bold
              uppercase
              tracking-[0.18em]
              transition-all
              duration-300
              hover:border-[#ff5722]
              hover:bg-[#ff5722]
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

        </motion.div>

      </div>
    </section>
  );
}