import React from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Code2,
  Palette,
  Search,
  ShoppingBag,
  Database,
  Smartphone,
} from "lucide-react";

const services = [
  {
    number: "01",
    title: "Web Design",
    description:
      "Premium websites designed around your brand, audience, and business goals.",
    icon: Palette,
    tags: ["UI/UX", "Design Systems", "Prototyping"],
  },
  {
    number: "02",
    title: "Web Development",
    description:
      "High-performance websites and web applications built for speed, scale, and reliability.",
    icon: Code2,
    tags: ["React", "Laravel", "PHP"],
  },
  {
    number: "03",
    title: "E-commerce",
    description:
      "Conversion-focused online stores with powerful product, payment, and order experiences.",
    icon: ShoppingBag,
    tags: ["Stores", "Payments", "Multi-vendor"],
  },
  {
    number: "04",
    title: "Business Systems",
    description:
      "Custom digital systems that simplify operations and connect the way your business works.",
    icon: Database,
    tags: ["CRM", "ERP", "POS"],
  },
  {
    number: "05",
    title: "SEO & Growth",
    description:
      "Technical SEO and growth strategies that help your business become easier to discover.",
    icon: Search,
    tags: ["Technical SEO", "Analytics", "Growth"],
  },
  {
    number: "06",
    title: "Web Applications",
    description:
      "Modern responsive applications built to work beautifully across desktop, tablet, and mobile.",
    icon: Smartphone,
    tags: ["Dashboards", "SaaS", "Mobile"],
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="relative w-full overflow-hidden bg-[#f4f2ed] text-[#111111]"
    >
      <div className="mx-auto max-w-[1600px] px-6 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40">

        {/* =========================================
            HEADER
        ========================================= */}

        <div className="grid gap-12 lg:grid-cols-[0.8fr_2fr]">

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-[#ff5722]" />

              <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-black/50">
                What we do
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <h2
              className="
                max-w-5xl
                text-5xl
                font-medium
                leading-[0.92]
                tracking-[-0.055em]
                sm:text-6xl
                md:text-7xl
                lg:text-[7rem]
              "
            >
              Everything you need
              <br />
              to build{" "}
              <span className="text-[#ff5722]">
                digital.
              </span>
            </h2>
          </motion.div>

        </div>

        {/* =========================================
            DESCRIPTION
        ========================================= */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="
            mt-16
            max-w-xl
            lg:ml-[25%]
            lg:mt-20
          "
        >
          <p className="text-lg leading-7 text-black/60 sm:text-xl">
            From your first idea to a complete digital ecosystem,
            Therynox combines strategy, design, development and
            technology to create products that actually move
            your business forward.
          </p>
        </motion.div>

        {/* =========================================
            SERVICES
        ========================================= */}

        <div className="mt-24 border-t border-black/15 sm:mt-32">

          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.div
                key={service.number}
                initial={{
                  opacity: 0,
                  y: 30,
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
                  duration: 0.7,
                  delay: index * 0.04,
                }}
                className="
                  group
                  relative
                  border-b
                  border-black/15
                  py-8
                  sm:py-10
                  lg:py-12
                "
              >

                {/* Hover background */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    origin-bottom
                    scale-y-0
                    bg-[#111111]
                    transition-transform
                    duration-500
                    ease-[cubic-bezier(0.22,1,0.36,1)]
                    group-hover:scale-y-100
                  "
                />

                <div
                  className="
                    relative
                    z-10
                    grid
                    gap-8
                    lg:grid-cols-[100px_1.2fr_1fr_80px]
                    lg:items-center
                  "
                >

                  {/* NUMBER */}

                  <div
                    className="
                      text-[10px]
                      font-semibold
                      tracking-[0.2em]
                      text-black/40
                      transition-colors
                      duration-300
                      group-hover:text-white/40
                    "
                  >
                    {service.number}
                  </div>

                  {/* TITLE */}

                  <div className="flex items-center gap-5">

                    <div
                      className="
                        flex
                        h-12
                        w-12
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-black/15
                        transition-all
                        duration-500
                        group-hover:border-[#ff5722]
                        group-hover:bg-[#ff5722]
                        group-hover:text-white
                      "
                    >
                      <Icon size={18} strokeWidth={1.5} />
                    </div>

                    <h3
                      className="
                        text-3xl
                        font-medium
                        tracking-[-0.04em]
                        transition-colors
                        duration-300
                        sm:text-4xl
                        md:text-5xl
                        lg:text-6xl
                        group-hover:text-white
                      "
                    >
                      {service.title}
                    </h3>

                  </div>

                  {/* DESCRIPTION */}

                  <div>

                    <p
                      className="
                        max-w-md
                        text-sm
                        leading-6
                        text-black/50
                        transition-colors
                        duration-300
                        group-hover:text-white/55
                      "
                    >
                      {service.description}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">

                      {service.tags.map((tag) => (
                        <span
                          key={tag}
                          className="
                            border
                            border-black/10
                            px-3
                            py-1.5
                            text-[8px]
                            font-semibold
                            uppercase
                            tracking-[0.15em]
                            text-black/50
                            transition-colors
                            duration-300
                            group-hover:border-white/15
                            group-hover:text-white/45
                          "
                        >
                          {tag}
                        </span>
                      ))}

                    </div>

                  </div>

                  {/* ARROW */}

                  <div className="flex lg:justify-end">

                    <div
                      className="
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-black/15
                        transition-all
                        duration-500
                        group-hover:border-white/30
                        group-hover:bg-white
                        group-hover:text-black
                      "
                    >
                      <ArrowUpRight
                        size={18}
                        className="
                          transition-transform
                          duration-300
                          group-hover:translate-x-0.5
                          group-hover:-translate-y-0.5
                        "
                      />
                    </div>

                  </div>

                </div>

              </motion.div>
            );
          })}

        </div>

        {/* =========================================
            BOTTOM CTA
        ========================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.8,
          }}
          className="
            mt-20
            flex
            flex-col
            gap-8
            sm:mt-24
            lg:flex-row
            lg:items-end
            lg:justify-between
          "
        >

          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-black/40">
              Need something custom?
            </p>

            <h3
              className="
                mt-4
                max-w-2xl
                text-3xl
                font-medium
                leading-tight
                tracking-[-0.04em]
                sm:text-4xl
              "
            >
              Tell us what you're trying
              to build.
            </h3>
          </div>

          <a
            href="#contact"
            className="
              group
              flex
              w-fit
              items-center
              gap-5
              bg-[#111111]
              px-7
              py-5
              text-[9px]
              font-bold
              uppercase
              tracking-[0.2em]
              text-white
              transition-all
              duration-300
              hover:bg-[#ff5722]
            "
          >
            Start a project

            <ArrowUpRight
              size={16}
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