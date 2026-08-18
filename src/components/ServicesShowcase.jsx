import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./ServicesShowcase.css";

const projects = [
  {
    id: "01",
    category: "Web Design",
    eyebrow: "WEB DESIGN",
    name: "Premium Web Design",
    title: "Web experiences built to make brands stand out.",
    description:
      "Strategy, visual design and development combined into memorable digital experiences.",
    image: "/images/projects/web-design.jpg",
  },

  {
    id: "02",
    category: "Online Store",
    eyebrow: "E-COMMERCE",
    name: "Premium E-Commerce",
    title: "Online stores built to convert.",
    description:
      "High-performance e-commerce experiences designed to turn visitors into customers.",
    image: "/images/projects/ecommerce.jpg",
  },

  {
    id: "03",
    category: "Business Systems",
    eyebrow: "BUSINESS SYSTEMS",
    name: "Salon Management",
    title: "Powerful systems for ambitious businesses.",
    description:
      "Custom dashboards, CRM, ERP and internal platforms that simplify business operations.",
    image: "/images/projects/business-system.jpg",
  },

  {
    id: "04",
    category: "Web Applications",
    eyebrow: "WEB APPLICATION",
    name: "SaaS Platform",
    title: "Web applications designed around real workflows.",
    description:
      "Modern applications that make complex business processes simple, fast and scalable.",
    image: "/images/projects/web-application.jpg",
  },

  {
    id: "05",
    category: "Growth",
    eyebrow: "DIGITAL GROWTH",
    name: "Growth Platform",
    title: "Digital products designed to move businesses forward.",
    description:
      "Strategy, design and technology working together to create measurable digital experiences.",
    image: "/images/projects/growth.jpg",
  },
];

const categories = [
  "Web Design",
  "Online Store",
  "Business Systems",
  "Web Applications",
  "Growth",
];

export default function ServicesShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);

  const current = projects[activeIndex];

  const previousIndex =
    (activeIndex - 1 + projects.length) % projects.length;

  const nextIndex =
    (activeIndex + 1) % projects.length;

  const previous = projects[previousIndex];
  const next = projects[nextIndex];

  const selectProject = (index) => {
    setActiveIndex(index);
  };

  const previousProject = () => {
    setActiveIndex(previousIndex);
  };

  const nextProject = () => {
    setActiveIndex(nextIndex);
  };

  return (
    <section className="services-showcase">

      {/* ================================
          HEADER
      ================================= */}

      <div className="showcase-header">

        <div className="showcase-eyebrow">
          WHAT WE BUILD
        </div>

        <h2>
          Grow your business.
        </h2>

        <p>
          You deserve a digital experience that can do it all.
        </p>


        {/* ================================
            CATEGORY BAR
        ================================= */}

        <div className="category-nav">

          {categories.map((category, index) => {

            const isActive = activeIndex === index;

            return (
              <button
                key={category}
                type="button"
                className={`category-button ${
                  isActive ? "active" : ""
                }`}
                onClick={() => selectProject(index)}
              >
                {category}
              </button>
            );

          })}

        </div>

      </div>


      {/* ================================
          PROJECT CARDS
      ================================= */}

      <div className="project-stage">


        {/* ================================
            PREVIOUS
        ================================= */}

        <motion.button
          key={`prev-${previous.id}`}
          type="button"
          className="project-side project-left"
          onClick={previousProject}
          initial={{
            opacity: 0,
            x: -25,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.35,
          }}
        >

          <img
            src={previous.image}
            alt={previous.name}
          />

          <div className="side-overlay" />

          <div className="side-content">

            <span>
              {previous.eyebrow}
            </span>

            <h3>
              {previous.name}
            </h3>

          </div>

          <div className="side-arrow">
            ←
          </div>

        </motion.button>


        {/* ================================
            MAIN PROJECT
        ================================= */}

        <AnimatePresence mode="wait">

          <motion.article
            key={current.id}
            className="project-main"

            initial={{
              opacity: 0,
              scale: 0.97,
            }}

            animate={{
              opacity: 1,
              scale: 1,
            }}

            exit={{
              opacity: 0,
              scale: 0.97,
            }}

            transition={{
              duration: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
          >

            <img
              src={current.image}
              alt={current.name}
            />

            <div className="main-overlay" />


            {/* TOP */}

            <div className="main-top">

              <div>

                <span className="main-eyebrow">
                  {current.eyebrow}
                </span>

                <span className="studio-name">
                  THERYNOX WEB STUDIO
                </span>

              </div>

              <span className="project-number">
                {current.id} / 05
              </span>

            </div>


            {/* CONTENT */}

            <div className="main-content">

              <h3>
                {current.title}
              </h3>

              <p>
                {current.description}
              </p>

              <button
                type="button"
                className="view-project"
              >
                <span>
                  VIEW PROJECT
                </span>

                <strong>
                  ↗
                </strong>

              </button>

            </div>


            {/* ARROWS */}

            <button
              type="button"
              className="main-arrow main-arrow-left"
              onClick={previousProject}
            >
              ←
            </button>

            <button
              type="button"
              className="main-arrow main-arrow-right"
              onClick={nextProject}
            >
              →
            </button>

          </motion.article>

        </AnimatePresence>


        {/* ================================
            NEXT
        ================================= */}

        <motion.button
          key={`next-${next.id}`}
          type="button"
          className="project-side project-right"
          onClick={nextProject}
          initial={{
            opacity: 0,
            x: 25,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.35,
          }}
        >

          <img
            src={next.image}
            alt={next.name}
          />

          <div className="side-overlay" />

          <div className="side-content">

            <span>
              {next.eyebrow}
            </span>

            <h3>
              {next.name}
            </h3>

          </div>

          <div className="side-arrow">
            →
          </div>

        </motion.button>

      </div>


      {/* ================================
          FOOTER
      ================================= */}

      <div className="showcase-footer">

        <div className="selected-project">

          <span className="orange-dot" />

          <span className="selected-label">
            SELECTED
          </span>

          <strong>
            {current.name}
          </strong>

        </div>

        <div className="project-count">
          {current.id} / 05
        </div>

      </div>

    </section>
  );
}