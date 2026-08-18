import React from "react";
import {
  ArrowUpRight,
  Check,
  Grid3X3,
  Layers3,
  MousePointer2,
  Palette,
  Smartphone,
  Sparkles,
  Type,
} from "lucide-react";
import { motion } from "framer-motion";

import PageLayout from "../../components/layout/PageLayout";
import PageHeader from "../../components/layout/PageHeader";

const designCapabilities = [
  {
    number: "01",
    title: "UI / UX Design",
    description:
      "Clear interfaces and thoughtful user journeys designed around real people and real goals.",
    icon: MousePointer2,
  },
  {
    number: "02",
    title: "Responsive Design",
    description:
      "Layouts that feel intentional across desktop, tablet and mobile instead of simply shrinking.",
    icon: Smartphone,
  },
  {
    number: "03",
    title: "Visual Systems",
    description:
      "Typography, spacing, colour, grids and components that create a consistent visual language.",
    icon: Palette,
  },
  {
    number: "04",
    title: "Design Systems",
    description:
      "Reusable components and patterns that keep larger websites consistent and easier to scale.",
    icon: Layers3,
  },
  {
    number: "05",
    title: "Interaction Design",
    description:
      "Motion and micro-interactions that give interfaces feedback, hierarchy and personality.",
    icon: Sparkles,
  },
  {
    number: "06",
    title: "Conversion Design",
    description:
      "Content hierarchy and interaction patterns designed to guide visitors toward meaningful actions.",
    icon: Grid3X3,
  },
];

const principles = [
  {
    number: "01",
    title: "Clarity",
    text: "Every element should have a reason to exist.",
  },
  {
    number: "02",
    title: "Hierarchy",
    text: "Important information should always feel important.",
  },
  {
    number: "03",
    title: "Consistency",
    text: "A strong visual system makes every page feel connected.",
  },
  {
    number: "04",
    title: "Motion",
    text: "Animation should communicate rather than distract.",
  },
];

const process = [
  {
    number: "01",
    title: "Discover",
    text: "Understand the brand, audience, goals and competitive landscape.",
  },
  {
    number: "02",
    title: "Structure",
    text: "Build the information architecture, content hierarchy and page structure.",
  },
  {
    number: "03",
    title: "Design",
    text: "Create the visual system, interfaces, responsive layouts and interactions.",
  },
  {
    number: "04",
    title: "Refine",
    text: "Polish spacing, typography, responsiveness, motion and every small detail.",
  },
];

export default function WebDesign() {
  return (
    <PageLayout showCTA={false}>
      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <PageHeader
        eyebrow="SERVICES / 01"
        number="01 / 06"
        title="Web design."
        description="Digital experiences with strong visual direction, clear structure and purposeful interaction."
      />

      {/* =====================================================
          INTRO
      ===================================================== */}

      <section className="px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <motion.h2
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
              }}
              transition={{
                duration: 0.7,
              }}
              className="max-w-4xl text-4xl font-semibold leading-[0.95] tracking-[-0.065em] sm:text-5xl lg:text-6xl"
            >
              Design that
              <br />
              <span className="text-therynox-orange">
                makes people stop.
              </span>
            </motion.h2>

            <p className="max-w-md text-sm leading-7 text-therynox-muted sm:text-base">
              We combine visual design, UX thinking and interaction to create
              websites that feel distinctive without sacrificing usability.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          MAIN DESIGN VISUAL
      ===================================================== */}

      <DesignVisual />

      {/* =====================================================
          STATEMENT
      ===================================================== */}

      <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.65fr_0.35fr]">
            <h2 className="max-w-4xl text-4xl font-semibold leading-[0.98] tracking-[-0.06em] sm:text-5xl">
              Good design looks
              <br />
              <span className="text-therynox-orange">
                effortless.
              </span>
            </h2>

            <p className="max-w-md text-sm leading-7 text-therynox-muted">
              Behind that simplicity is careful work — structure, hierarchy,
              typography, spacing, responsive behaviour and hundreds of small
              decisions.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          PRINCIPLES
      ===================================================== */}

      <section className="bg-therynox-black px-5 py-24 text-white sm:px-8 lg:px-12 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-[0.4fr_0.6fr]">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-therynox-orange">
                Design principles
              </p>

              <h2 className="mt-6 max-w-md text-4xl font-semibold leading-[0.95] tracking-[-0.06em] sm:text-5xl">
                Less noise.
                <br />
                More meaning.
              </h2>

              <p className="mt-6 max-w-md text-sm leading-7 text-white/40">
                A premium interface isn't about adding more effects. It's
                about knowing what deserves attention.
              </p>
            </div>

            <div className="grid sm:grid-cols-2">
              {principles.map((item, index) => (
                <motion.div
                  key={item.number}
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
                  transition={{
                    delay: index * 0.08,
                  }}
                  className="border-t border-white/10 p-6 sm:p-8"
                >
                  <span className="text-[9px] font-bold tracking-[0.2em] text-therynox-orange">
                    {item.number}
                  </span>

                  <h3 className="mt-12 text-xl font-semibold tracking-[-0.04em]">
                    {item.title}
                  </h3>

                  <p className="mt-4 max-w-xs text-sm leading-6 text-white/40">
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CAPABILITIES
      ===================================================== */}

      <section className="border-t border-therynox-border px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-[0.4fr_0.6fr]">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-therynox-orange">
                What we design
              </p>

              <h2 className="mt-6 max-w-sm text-4xl font-semibold leading-[0.95] tracking-[-0.06em] sm:text-5xl">
                Every detail
                <br />
                has a job.
              </h2>

              <p className="mt-6 max-w-sm text-sm leading-6 text-therynox-muted">
                From the first wireframe to the final interaction, we build a
                visual system that supports the purpose of the website.
              </p>
            </div>

            <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2">
              {designCapabilities.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.number}
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
                    transition={{
                      delay: index * 0.06,
                    }}
                    className="group border-t border-therynox-border pt-5"
                  >
                    <div className="flex items-start justify-between">
                      <span className="text-[9px] font-bold tracking-[0.2em] text-therynox-orange">
                        {item.number}
                      </span>

                      <Icon
                        size={18}
                        strokeWidth={1.4}
                        className="text-therynox-muted transition-colors duration-300 group-hover:text-therynox-orange"
                      />
                    </div>

                    <h3 className="mt-7 text-xl font-semibold tracking-[-0.04em]">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-therynox-muted">
                      {item.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          TYPOGRAPHY / DESIGN SYSTEM VISUAL
      ===================================================== */}

      <section className="px-5 pb-24 sm:px-8 lg:px-12 lg:pb-32">
        <DesignSystemVisual />
      </section>

      {/* =====================================================
          PROCESS
      ===================================================== */}

      <section className="px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-therynox-orange">
                Process
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.06em] sm:text-5xl">
                From idea
                <br />
                to interface.
              </h2>
            </div>

            <p className="max-w-sm text-sm leading-6 text-therynox-muted">
              A focused process keeps the design intentional from the first
              conversation to the final pixel.
            </p>
          </div>

          <div className="mt-14 grid border-t border-therynox-border sm:grid-cols-2 lg:grid-cols-4">
            {process.map((item, index) => (
              <motion.div
                key={item.number}
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
                transition={{
                  delay: index * 0.08,
                }}
                className="border-b border-therynox-border p-6 sm:border-r sm:p-8 lg:border-b-0"
              >
                <span className="text-[9px] font-bold tracking-[0.2em] text-therynox-orange">
                  {item.number}
                </span>

                <h3 className="mt-12 text-xl font-semibold tracking-[-0.04em]">
                  {item.title}
                </h3>

                <p className="mt-4 text-sm leading-6 text-therynox-muted">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="px-5 pb-24 sm:px-8 lg:px-12 lg:pb-32">
        <motion.div
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
          }}
          className="mx-auto max-w-7xl overflow-hidden rounded-[30px] bg-therynox-orange p-8 sm:p-12 lg:p-16"
        >
          <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-black/50">
                Have an idea?
              </p>

              <h2 className="mt-6 max-w-3xl text-4xl font-semibold leading-[0.95] tracking-[-0.06em] text-black sm:text-5xl lg:text-6xl">
                Let's make it
                <br />
                look incredible.
              </h2>
            </div>

            <a
              href="/contact"
              className="group inline-flex shrink-0 items-center justify-center gap-3 rounded-full bg-therynox-black px-7 py-5 text-[9px] font-bold uppercase tracking-[0.18em] text-white transition hover:bg-white hover:text-black"
            >
              Start a Project

              <ArrowUpRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </a>
          </div>
        </motion.div>
      </section>
    </PageLayout>
  );
}

/* =========================================================
   MAIN DESIGN VISUAL
========================================================= */

function DesignVisual() {
  return (
    <section className="px-5 pb-10 sm:px-8 lg:px-12 lg:pb-16">
      <div className="mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-[32px] border border-therynox-border bg-[#ecebe8]">
          {/* TOP TOOLBAR */}

          <div className="flex items-center justify-between border-b border-black/10 px-5 py-4 sm:px-7">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="h-2 w-2 rounded-full bg-black/15" />
                <span className="h-2 w-2 rounded-full bg-black/15" />
                <span className="h-2 w-2 rounded-full bg-black/15" />
              </div>

              <div className="hidden h-5 w-px bg-black/10 sm:block" />

              <span className="text-[8px] font-bold uppercase tracking-[0.25em] text-black/30">
                THERYNOX / DESIGN STUDIO
              </span>
            </div>

            <div className="flex items-center gap-4">
              <span className="hidden text-[8px] font-bold uppercase tracking-[0.2em] text-black/25 sm:block">
                Responsive preview
              </span>

              <div className="flex gap-2">
                <span className="h-6 w-6 rounded-md bg-black/5" />
                <span className="h-6 w-6 rounded-md bg-black/5" />
              </div>
            </div>
          </div>

          {/* CANVAS */}

          <div className="grid lg:grid-cols-[1fr_0.33fr]">
            {/* DESKTOP WEBSITE */}

            <div className="border-b border-black/10 p-5 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
              <div className="overflow-hidden rounded-2xl bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
                {/* NAV */}

                <div className="flex items-center justify-between border-b border-black/5 px-5 py-4">
                  <div className="text-[10px] font-black tracking-[-0.04em]">
                    STUDIO
                  </div>

                  <div className="hidden items-center gap-5 sm:flex">
                    <span className="text-[7px] uppercase tracking-[0.15em] text-black/35">
                      Work
                    </span>

                    <span className="text-[7px] uppercase tracking-[0.15em] text-black/35">
                      About
                    </span>

                    <span className="text-[7px] uppercase tracking-[0.15em] text-black/35">
                      Contact
                    </span>
                  </div>

                  <div className="h-7 w-7 rounded-full bg-therynox-black" />
                </div>

                {/* HERO */}

                <div className="grid min-h-[330px] grid-cols-[1.1fr_0.9fr]">
                  <div className="flex flex-col justify-between p-6 sm:p-8">
                    <div>
                      <div className="inline-flex items-center gap-2 rounded-full border border-black/10 px-3 py-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-therynox-orange" />

                        <span className="text-[6px] font-bold uppercase tracking-[0.18em] text-black/40">
                          Digital studio
                        </span>
                      </div>

                      <h3 className="mt-7 max-w-md text-4xl font-semibold leading-[0.88] tracking-[-0.07em] sm:text-5xl">
                        Digital
                        <br />
                        experiences
                        <br />
                        <span className="text-therynox-orange">
                          with intent.
                        </span>
                      </h3>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-[7px] uppercase tracking-[0.2em] text-black/30">
                        Scroll to explore
                      </span>

                      <ArrowUpRight
                        size={15}
                        className="text-black/30"
                      />
                    </div>
                  </div>

                  {/* ART */}

                  <div className="relative overflow-hidden bg-therynox-black">
                    <motion.div
                      animate={{
                        rotate: [0, 4, 0, -4, 0],
                        scale: [1, 1.04, 1],
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="absolute left-[18%] top-[16%] h-[58%] w-[64%] rounded-[45%_55%_40%_60%] bg-therynox-orange"
                    />

                    <div className="absolute bottom-[13%] left-[12%] right-[12%] rounded-xl border border-white/15 bg-white/[0.06] p-4 backdrop-blur-md">
                      <div className="flex items-center justify-between">
                        <span className="text-[6px] uppercase tracking-[0.2em] text-white/40">
                          New project
                        </span>

                        <Sparkles
                          size={11}
                          className="text-therynox-orange"
                        />
                      </div>

                      <div className="mt-5 h-1.5 w-3/4 rounded-full bg-white/15" />
                      <div className="mt-2 h-1.5 w-1/2 rounded-full bg-white/10" />
                    </div>

                    <motion.div
                      animate={{
                        y: [0, -12, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="absolute right-[12%] top-[9%] flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-xl"
                    >
                      <ArrowUpRight
                        size={14}
                        className="text-black"
                      />
                    </motion.div>
                  </div>
                </div>

                {/* LOWER CONTENT */}

                <div className="grid border-t border-black/5 sm:grid-cols-3">
                  <MiniDesignCard
                    title="Typography"
                    icon={Type}
                  />

                  <MiniDesignCard
                    title="Layout"
                    icon={Grid3X3}
                  />

                  <MiniDesignCard
                    title="Interaction"
                    icon={Sparkles}
                  />
                </div>
              </div>
            </div>

            {/* MOBILE PREVIEW */}

            <div className="flex items-center justify-center bg-[#deddd9] p-8 lg:p-7">
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
                className="w-full max-w-[220px] rounded-[30px] border-[7px] border-[#1a1a1a] bg-white p-2 shadow-[0_25px_70px_rgba(0,0,0,0.18)]"
              >
                <div className="overflow-hidden rounded-[22px]">
                  <div className="flex h-7 items-center justify-center bg-white">
                    <div className="h-1.5 w-12 rounded-full bg-black/10" />
                  </div>

                  <div className="bg-therynox-black p-5 text-white">
                    <p className="text-[6px] font-bold uppercase tracking-[0.25em] text-therynox-orange">
                      Studio
                    </p>

                    <h4 className="mt-8 text-3xl font-semibold leading-[0.88] tracking-[-0.07em]">
                      Make
                      <br />
                      it
                      <br />
                      <span className="text-therynox-orange">
                        matter.
                      </span>
                    </h4>

                    <div className="mt-10 h-24 overflow-hidden rounded-xl bg-white/5">
                      <motion.div
                        animate={{
                          rotate: [0, 8, 0],
                        }}
                        transition={{
                          duration: 5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="mx-auto mt-5 h-20 w-20 rounded-[45%] bg-therynox-orange"
                      />
                    </div>
                  </div>

                  <div className="space-y-3 p-4">
                    <div className="h-2 w-2/3 rounded-full bg-black/10" />
                    <div className="h-2 w-1/2 rounded-full bg-black/5" />

                    <div className="flex gap-2 pt-3">
                      <div className="h-7 flex-1 rounded-full bg-black" />
                      <div className="h-7 w-7 rounded-full border border-black/10" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* FOOTER */}

          <div className="flex flex-col gap-3 border-t border-black/10 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <span className="text-[8px] font-bold uppercase tracking-[0.25em] text-black/25">
              Desktop + Mobile
            </span>

            <span className="text-[8px] uppercase tracking-[0.2em] text-black/20">
              Designed as one experience
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   DESIGN SYSTEM VISUAL
========================================================= */

function DesignSystemVisual() {
  return (
    <div className="mx-auto max-w-7xl overflow-hidden rounded-[30px] bg-[#101010] text-white">
      <div className="grid lg:grid-cols-[0.45fr_0.55fr]">
        <div className="border-b border-white/10 p-7 sm:p-10 lg:border-b-0 lg:border-r lg:p-12">
          <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-therynox-orange">
            Visual system
          </p>

          <h2 className="mt-6 text-4xl font-semibold leading-[0.95] tracking-[-0.06em] sm:text-5xl">
            Design is
            <br />
            a system.
          </h2>

          <p className="mt-6 max-w-sm text-sm leading-7 text-white/40">
            Strong websites don't depend on individual pages looking good.
            They depend on every page feeling like it belongs to the same
            product.
          </p>

          <div className="mt-10 flex flex-wrap gap-2">
            <SystemTag text="8px grid" />
            <SystemTag text="Type scale" />
            <SystemTag text="Spacing" />
            <SystemTag text="Components" />
            <SystemTag text="Motion" />
          </div>
        </div>

        <div className="grid sm:grid-cols-2">
          <VisualToken
            title="Typography"
            type="type"
          />

          <VisualToken
            title="Spacing"
            type="spacing"
          />

          <VisualToken
            title="Components"
            type="components"
          />

          <VisualToken
            title="Interaction"
            type="interaction"
          />
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   MINI DESIGN CARD
========================================================= */

function MiniDesignCard({
  title,
  icon: Icon,
}) {
  return (
    <div className="flex items-center gap-3 border-b border-black/5 p-4 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
      <Icon
        size={14}
        strokeWidth={1.4}
        className="text-therynox-orange"
      />

      <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-black/40">
        {title}
      </span>
    </div>
  );
}

/* =========================================================
   SYSTEM TAG
========================================================= */

function SystemTag({
  text,
}) {
  return (
    <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-[7px] font-bold uppercase tracking-[0.16em] text-white/35">
      {text}
    </span>
  );
}

/* =========================================================
   VISUAL TOKEN
========================================================= */

function VisualToken({
  title,
  type,
}) {
  return (
    <div className="border-b border-white/10 p-7 last:border-b-0 sm:p-8">
      <div className="flex items-center justify-between">
        <span className="text-[8px] font-bold uppercase tracking-[0.25em] text-white/25">
          {title}
        </span>

        <span className="h-1.5 w-1.5 rounded-full bg-therynox-orange" />
      </div>

      {type === "type" && (
        <div className="mt-8">
          <p className="text-4xl font-semibold tracking-[-0.07em]">
            Aa
          </p>

          <div className="mt-4 h-px bg-white/10" />

          <p className="mt-3 text-[8px] uppercase tracking-[0.2em] text-white/25">
            Strong hierarchy
          </p>
        </div>
      )}

      {type === "spacing" && (
        <div className="mt-8 flex items-end gap-2">
          <div className="h-4 w-4 rounded-sm bg-therynox-orange/30" />
          <div className="h-7 w-7 rounded-sm bg-therynox-orange/50" />
          <div className="h-10 w-10 rounded-sm bg-therynox-orange/70" />
          <div className="h-14 w-14 rounded-sm bg-therynox-orange" />
        </div>
      )}

      {type === "components" && (
        <div className="mt-8 space-y-3">
          <div className="h-9 rounded-lg border border-white/10 bg-white/[0.03]" />
          <div className="flex gap-2">
            <div className="h-8 flex-1 rounded-full bg-therynox-orange" />
            <div className="h-8 w-8 rounded-full border border-white/10" />
          </div>
        </div>
      )}

      {type === "interaction" && (
        <div className="relative mt-8 h-20">
          <motion.div
            animate={{
              x: [0, 70, 0],
              y: [0, -8, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute left-0 top-2 flex h-10 w-10 items-center justify-center rounded-full bg-therynox-orange"
          >
            <ArrowUpRight
              size={15}
              className="text-white"
            />
          </motion.div>

          <MousePointer2
            size={18}
            className="absolute bottom-0 left-20 text-white/30"
          />
        </div>
      )}
    </div>
  );
}