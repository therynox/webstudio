import React from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { motion } from "framer-motion";

const options = [
  {
    id: "new",
    number: "01",
    title: "New Website / Platform",
    description:
      "I need a new website, store, application or business platform.",
  },
  {
    id: "existing-website",
    number: "02",
    title: "I Already Have a Website",
    description:
      "I need help with my existing website, SEO, maintenance or improvements.",
  },
  {
    id: "existing-project",
    number: "03",
    title: "Existing THERYNOX Project",
    description:
      "I already worked with THERYNOX and need additional work or changes.",
  },
];

export default function CustomerTypeSelector({
  value,
  onChange,
}) {
  return (
    <section className="mb-10">

      {/* HEADER */}

      <div className="mb-5">

        <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-therynox-orange">
          Project type
        </p>

        <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">
          What are you looking for?
        </h3>

        <p className="mt-3 max-w-xl text-sm leading-6 text-therynox-muted">
          Choose the option that best describes your project.
          We'll show you only the information you need.
        </p>

      </div>


      {/* OPTIONS */}

      <div className="grid gap-3">

        {options.map((option, index) => {

          const active = value === option.id;

          return (
            <motion.button
              key={option.id}
              type="button"
              onClick={() => onChange(option.id)}
              initial={{
                opacity: 0,
                y: 12,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.06,
                duration: 0.35,
              }}
              whileHover={{
                y: -2,
              }}
              whileTap={{
                scale: 0.995,
              }}
              className={`
                group relative flex w-full
                items-center gap-4
                rounded-2xl border
                p-5 text-left
                transition-all duration-300
                sm:p-6

                ${
                  active
                    ? "border-therynox-black bg-therynox-black text-white shadow-lg"
                    : "border-therynox-border bg-therynox-bg text-therynox-black hover:border-black/30 hover:bg-white"
                }
              `}
            >

              {/* NUMBER */}

              <span
                className={`
                  flex h-10 w-10 shrink-0
                  items-center justify-center
                  rounded-full text-[10px]
                  font-bold
                  transition-all duration-300

                  ${
                    active
                      ? "bg-therynox-orange text-white"
                      : "border border-black/10 text-therynox-muted group-hover:border-black/20"
                  }
                `}
              >
                {option.number}
              </span>


              {/* CONTENT */}

              <span className="min-w-0 flex-1">

                <span
                  className={`
                    block text-sm font-semibold sm:text-base
                    ${
                      active
                        ? "text-white"
                        : "text-therynox-black"
                    }
                  `}
                >
                  {option.title}
                </span>

                <span
                  className={`
                    mt-1 block text-xs leading-5
                    ${
                      active
                        ? "text-white/55"
                        : "text-therynox-muted"
                    }
                  `}
                >
                  {option.description}
                </span>

              </span>


              {/* RIGHT ICON */}

              <span
                className={`
                  flex h-9 w-9 shrink-0
                  items-center justify-center
                  rounded-full
                  transition-all duration-300

                  ${
                    active
                      ? "bg-white/10"
                      : "bg-black/[0.04] group-hover:bg-black/[0.08]"
                  }
                `}
              >

                {active ? (
                  <Check
                    size={16}
                    className="text-therynox-orange"
                    strokeWidth={2.5}
                  />
                ) : (
                  <ArrowUpRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                )}

              </span>

            </motion.button>
          );
        })}

      </div>

    </section>
  );
}