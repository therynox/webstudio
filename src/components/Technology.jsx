import React from "react";
import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiFramer,
  SiPhp,
  SiLaravel,
  SiNodedotjs,
  SiNestjs,
  SiMysql,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiPrisma,
  SiShopify,
  SiWoocommerce,
  SiWordpress,
  SiOdoo,
  SiGit,
  SiGithub,
  SiDocker,
  SiFigma,
  SiVite,
} from "react-icons/si";

import "./Technology.css";

const technologies = [
  {
    name: "HTML",
    icon: SiHtml5,
    group: "Frontend",
  },
  {
    name: "CSS",
    icon: SiCss,
    group: "Frontend",
  },
  {
    name: "JavaScript",
    icon: SiJavascript,
    group: "Frontend",
  },
  {
    name: "TypeScript",
    icon: SiTypescript,
    group: "Frontend",
  },
  {
    name: "React",
    icon: SiReact,
    group: "Frontend",
  },
  {
    name: "Next.js",
    icon: SiNextdotjs,
    group: "Frontend",
  },
  {
    name: "Tailwind",
    icon: SiTailwindcss,
    group: "Frontend",
  },
  {
    name: "Framer Motion",
    icon: SiFramer,
    group: "Frontend",
  },

  {
    name: "PHP",
    icon: SiPhp,
    group: "Backend",
  },
  {
    name: "Laravel",
    icon: SiLaravel,
    group: "Backend",
  },
  {
    name: "Node.js",
    icon: SiNodedotjs,
    group: "Backend",
  },
  {
    name: "NestJS",
    icon: SiNestjs,
    group: "Backend",
  },

  {
    name: "MySQL",
    icon: SiMysql,
    group: "Database",
  },
  {
    name: "PostgreSQL",
    icon: SiPostgresql,
    group: "Database",
  },
  {
    name: "MongoDB",
    icon: SiMongodb,
    group: "Database",
  },
  {
    name: "Redis",
    icon: SiRedis,
    group: "Database",
  },
  {
    name: "Prisma",
    icon: SiPrisma,
    group: "Database",
  },

  {
    name: "Shopify",
    icon: SiShopify,
    group: "Commerce",
  },
  {
    name: "WooCommerce",
    icon: SiWoocommerce,
    group: "Commerce",
  },
  {
    name: "WordPress",
    icon: SiWordpress,
    group: "Commerce",
  },
  {
    name: "Odoo",
    icon: SiOdoo,
    group: "Commerce",
  },

  {
    name: "Git",
    icon: SiGit,
    group: "Tools",
  },
  {
    name: "GitHub",
    icon: SiGithub,
    group: "Tools",
  },
  {
    name: "Docker",
    icon: SiDocker,
    group: "Tools",
  },
  {
    name: "Figma",
    icon: SiFigma,
    group: "Tools",
  },
  {
    name: "Vite",
    icon: SiVite,
    group: "Tools",
  },
];

const groups = [
  "Frontend",
  "Backend",
  "Database",
  "Commerce",
  "Tools",
];

export default function Technology() {
  return (
    <section className="technology-section">

      <div className="technology-inner">

        {/* HEADER */}

        <div className="technology-heading">

          <div className="technology-label">
            TECHNOLOGY
          </div>

          <h2>
            Built with modern
            <br />
            technology.
          </h2>

          <p>
            The right tools for fast, scalable and
            high-performance digital products.
          </p>

        </div>


        {/* TECHNOLOGY GROUPS */}

        <div className="technology-groups">

          {groups.map((group) => {

            const groupTechnologies = technologies.filter(
              (technology) => technology.group === group
            );

            return (
              <div
                className="technology-group"
                key={group}
              >

                <div className="technology-group-header">

                  <span>
                    {group}
                  </span>

                  <span>
                    {String(groupTechnologies.length).padStart(2, "0")}
                  </span>

                </div>


                <div className="technology-grid">

                  {groupTechnologies.map(
                    ({ name, icon: Icon }) => (

                      <div
                        className="technology-item"
                        key={name}
                      >

                        <div className="technology-icon">
                          <Icon />
                        </div>

                        <span>
                          {name}
                        </span>

                      </div>

                    )
                  )}

                </div>

              </div>
            );

          })}

        </div>


        {/* BOTTOM */}

        <div className="technology-bottom">

          <span>
            25+ TECHNOLOGIES
          </span>

          <span>
            DESIGN × DEVELOPMENT × SYSTEMS
          </span>

          <span>
            THERYNOX WEB STUDIO
          </span>

        </div>

      </div>

    </section>
  );
}