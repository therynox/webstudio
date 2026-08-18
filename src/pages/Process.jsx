import React from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  Compass,
  Lightbulb,
  PenTool,
  Code2,
  Rocket,
  TrendingUp,
  CircleDot,
} from "lucide-react";
import { motion } from "framer-motion";

import PageLayout from "../components/layout/PageLayout";
import PageHeader from "../components/layout/PageHeader";

const phases = [
  {
    number: "01",
    label: "DISCOVER",
    title: "Understand the problem.",
    description:
      "Before we design anything, we understand your business, your users, your goals and the problem the product needs to solve.",
    icon: Compass,
    color: "light",
    duration: "01 — 03 DAYS",
    deliverables: [
      "Business discovery",
      "Goals & requirements",
      "Audience research",
      "Project direction",
    ],
  },
  {
    number: "02",
    label: "DEFINE",
    title: "Turn ideas into direction.",
    description:
      "We turn conversations and requirements into a clear product structure, user journeys and technical direction.",
    icon: Lightbulb,
    color: "orange",
    duration: "02 — 04 DAYS",
    deliverables: [
      "Information architecture",
      "User flows",
      "Feature planning",
      "Technical strategy",
    ],
  },
  {
    number: "03",
    label: "DESIGN",
    title: "Make the experience feel right.",
    description:
      "We create the visual language, interfaces and interactions that make the product clear, useful and memorable.",
    icon: PenTool,
    color: "dark",
    duration: "05 — 10 DAYS",
    deliverables: [
      "UI direction",
      "Responsive layouts",
      "Interaction design",
      "Design system",
    ],
  },
  {
    number: "04",
    label: "DEVELOP",
    title: "Build it properly.",
    description:
      "Design becomes a real product through clean engineering, responsive implementation, integrations and performance-focused development.",
    icon: Code2,
    color: "light",
    duration: "10 — 30+ DAYS",
    deliverables: [
      "Frontend development",
      "Backend development",
      "API integrations",
      "Testing & optimisation",
    ],
  },
  {
    number: "05",
    label: "LAUNCH",
    title: "Put it into the world.",
    description:
      "We prepare the product for launch, handle deployment and make sure the final experience works across devices and environments.",
    icon: Rocket,
    color: "orange",
    duration: "01 — 03 DAYS",
    deliverables: [
      "Production deployment",
      "Domain & hosting",
      "Final QA",
      "Launch support",
    ],
  },
  {
    number: "06",
    label: "GROW",
    title: "Keep making it better.",
    description:
      "Launch is not the finish line. We use feedback, analytics and new requirements to improve the product over time.",
    icon: TrendingUp,
    color: "dark",
    duration: "ONGOING",
    deliverables: [
      "Performance monitoring",
      "Continuous improvements",
      "Maintenance",
      "Growth iterations",
    ],
  },
];

export default function Process() {
  return (
    <PageLayout showCTA={false}>
      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <PageHeader
        eyebrow="HOW WE WORK"
        number="04 / 06"
        title="A process built for clarity."
        description="Good digital work doesn't happen by accident. We use a structured process that keeps strategy, design and engineering moving in the same direction."
      />

      {/* =====================================================
          HERO STATEMENT
      ===================================================== */}

      <section className="px-5 pb-20 pt-16 sm:px-8 lg:px-12 lg:pb-32 lg:pt-24">
        <div className="mx-auto max-w-7xl">

          <div className="grid gap-12 lg:grid-cols-[1fr_0.4fr] lg:items-end">

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-6xl text-5xl font-semibold leading-[0.9] tracking-[-0.07em] sm:text-6xl lg:text-8xl"
            >
              From first
              <br />
              conversation
              <br />
              <span className="text-therynox-orange">
                to launch.
              </span>
            </motion.h2>

            <div className="max-w-sm">

              <div className="flex items-center gap-2">

                <span className="h-1.5 w-1.5 rounded-full bg-therynox-orange" />

                <span className="text-[8px] font-bold uppercase tracking-[0.25em] text-black/30">
                  Six focused phases
                </span>

              </div>

              <p className="mt-5 text-sm leading-7 text-therynox-muted sm:text-base">
                No mystery handoffs. No disappearing into a black box.
                You always know what we're solving, what we're building and
                what's coming next.
              </p>

              <div className="mt-7 flex items-center gap-2">

                <ArrowDown
                  size={14}
                  className="text-therynox-orange"
                />

                <span className="text-[7px] font-bold uppercase tracking-[0.2em] text-black/25">
                  Explore the process
                </span>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* =====================================================
          PROCESS OVERVIEW
      ===================================================== */}

      <section className="border-y border-therynox-border bg-[#f5f5f2] px-5 py-10 sm:px-8 lg:px-12">

        <div className="mx-auto grid max-w-7xl grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">

          {phases.map((phase, index) => (
            <OverviewItem
              key={phase.number}
              phase={phase}
              index={index}
            />
          ))}

        </div>

      </section>

      {/* =====================================================
          MAIN PROCESS TIMELINE
      ===================================================== */}

      <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-32">

        <div className="mx-auto max-w-7xl">

          <div className="mb-16 max-w-2xl">

            <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-therynox-orange">
              The journey
            </p>

            <h2 className="mt-5 text-4xl font-semibold leading-[0.95] tracking-[-0.06em] sm:text-5xl">
              Every stage has
              <br />
              a reason.
            </h2>

          </div>

          <div className="relative">

            {/* CENTER LINE */}

            <div className="absolute bottom-0 left-[20px] top-0 hidden w-px bg-therynox-border lg:left-1/2 lg:block" />

            <div className="space-y-20 lg:space-y-28">

              {phases.map((phase, index) => (
                <ProcessPhase
                  key={phase.number}
                  phase={phase}
                  index={index}
                />
              ))}

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          PRINCIPLES
      ===================================================== */}

      <section className="bg-[#090909] px-5 py-24 text-white sm:px-8 lg:px-12 lg:py-32">

        <div className="mx-auto max-w-7xl">

          <div className="grid gap-14 lg:grid-cols-[0.42fr_0.58fr]">

            <div>

              <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-therynox-orange">
                Our principles
              </p>

              <h2 className="mt-6 text-4xl font-semibold leading-[0.94] tracking-[-0.06em] sm:text-5xl">
                How we make
                <br />
                better work.
              </h2>

            </div>

            <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2">

              <Principle
                number="01"
                title="Clarity"
                text="We make complicated things easier to understand before we make them easier to use."
              />

              <Principle
                number="02"
                title="Purpose"
                text="Every feature, interaction and visual decision needs a reason to exist."
              />

              <Principle
                number="03"
                title="Quality"
                text="We care about the details users notice and the engineering details they don't."
              />

              <Principle
                number="04"
                title="Momentum"
                text="Small, clear decisions keep projects moving instead of getting stuck in endless cycles."
              />

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          DELIVERY MODEL
      ===================================================== */}

      <section className="px-5 py-24 sm:px-8 lg:px-12 lg:py-32">

        <div className="mx-auto max-w-7xl">

          <div className="grid gap-12 lg:grid-cols-[0.4fr_0.6fr]">

            <div>

              <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-therynox-orange">
                Communication
              </p>

              <h2 className="mt-6 text-4xl font-semibold leading-[0.95] tracking-[-0.06em] sm:text-5xl">
                You stay
                <br />
                in the loop.
              </h2>

              <p className="mt-6 max-w-md text-sm leading-7 text-therynox-muted">
                A good process isn't only about what happens internally.
                It's also about making sure you always know where the project
                stands.
              </p>

            </div>

            <div className="space-y-3">

              <CommunicationRow
                number="01"
                title="Project kickoff"
                text="Goals, scope and priorities aligned before production begins."
              />

              <CommunicationRow
                number="02"
                title="Design reviews"
                text="Review key interfaces and decisions before development."
              />

              <CommunicationRow
                number="03"
                title="Development updates"
                text="Regular progress updates throughout implementation."
              />

              <CommunicationRow
                number="04"
                title="Launch checklist"
                text="Final testing, deployment and handover before launch."
              />

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="px-5 pb-24 sm:px-8 lg:px-12 lg:pb-32">

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-7xl overflow-hidden rounded-[32px] bg-therynox-orange p-8 sm:p-12 lg:p-16"
        >

          <div className="flex flex-col justify-between gap-12 lg:flex-row lg:items-end">

            <div>

              <div className="flex items-center gap-2">

                <CircleDot
                  size={13}
                  className="text-black/60"
                />

                <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-black/50">
                  Ready when you are
                </span>

              </div>

              <h2 className="mt-7 max-w-4xl text-5xl font-semibold leading-[0.9] tracking-[-0.07em] text-black sm:text-6xl lg:text-7xl">
                Let's start with
                <br />
                the first step.
              </h2>

            </div>

            <a
              href="/contact"
              className="group inline-flex shrink-0 items-center gap-3 rounded-full bg-black px-7 py-5 text-[9px] font-bold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-white hover:text-black"
            >
              Start a project

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
   OVERVIEW ITEM
========================================================= */

function OverviewItem({
  phase,
  index,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
      className="group border-b border-r border-black/10 p-4 last:border-r-0 sm:p-5 lg:border-b-0 lg:p-5"
    >

      <div className="flex items-center justify-between">

        <span className="text-[8px] font-bold text-therynox-orange">
          {phase.number}
        </span>

        <phase.icon
          size={13}
          strokeWidth={1.5}
          className="text-black/25 transition-colors group-hover:text-therynox-orange"
        />

      </div>

      <p className="mt-6 text-[7px] font-bold uppercase tracking-[0.16em] text-black/35">
        {phase.label}
      </p>

    </motion.div>
  );
}

/* =========================================================
   PROCESS PHASE
========================================================= */

function ProcessPhase({
  phase,
  index,
}) {
  const Icon = phase.icon;
  const isEven = index % 2 === 1;

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 35,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        margin: "-80px",
      }}
      transition={{
        duration: 0.7,
      }}
      className="relative grid gap-8 lg:grid-cols-2 lg:gap-24"
    >

      {/* TIMELINE DOT */}

      <div className="absolute left-[20px] top-6 z-10 hidden h-3 w-3 -translate-x-1/2 items-center justify-center rounded-full bg-therynox-orange ring-8 ring-white lg:flex lg:left-1/2" />

      {/* CONTENT */}

      <div
        className={`${
          isEven
            ? "lg:col-start-2"
            : "lg:col-start-1"
        }`}
      >

        <div className="flex items-center justify-between border-t border-therynox-border pt-5">

          <span className="text-4xl font-semibold tracking-[-0.07em] text-black/10">
            {phase.number}
          </span>

          <span className="text-[7px] font-bold uppercase tracking-[0.2em] text-black/25">
            {phase.duration}
          </span>

        </div>

        <div className="mt-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-black">

          <Icon
            size={19}
            strokeWidth={1.5}
            className="text-therynox-orange"
          />

        </div>

        <p className="mt-7 text-[8px] font-bold uppercase tracking-[0.28em] text-therynox-orange">
          {phase.label}
        </p>

        <h3 className="mt-4 text-3xl font-semibold leading-[0.95] tracking-[-0.055em] sm:text-4xl">
          {phase.title}
        </h3>

        <p className="mt-5 max-w-lg text-sm leading-7 text-therynox-muted">
          {phase.description}
        </p>

        <div className="mt-8 grid gap-2 sm:grid-cols-2">

          {phase.deliverables.map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 rounded-xl border border-therynox-border px-4 py-3"
            >

              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-therynox-orange">

                <Check
                  size={10}
                  className="text-black"
                  strokeWidth={3}
                />

              </div>

              <span className="text-[8px] font-medium text-black/45">
                {item}
              </span>

            </div>
          ))}

        </div>

      </div>

      {/* VISUAL */}

      <div
        className={`hidden lg:block ${
          isEven
            ? "lg:col-start-1 lg:row-start-1"
            : "lg:col-start-2 lg:row-start-1"
        }`}
      >

        <PhaseVisual
          phase={phase}
          index={index}
        />

      </div>

    </motion.div>
  );
}

/* =========================================================
   PHASE VISUAL
========================================================= */

function PhaseVisual({
  phase,
  index,
}) {
  const Icon = phase.icon;

  const visualStyles = [
    "bg-[#f3f2ee]",
    "bg-[#fff1e8]",
    "bg-[#0b0b0b]",
    "bg-[#f0f0ed]",
    "bg-[#fff1e8]",
    "bg-[#0b0b0b]",
  ];

  const isDark = index === 2 || index === 5;

  return (
    <div
      className={`relative min-h-[360px] overflow-hidden rounded-[28px] border border-black/5 ${visualStyles[index]} ${
        isDark ? "text-white" : ""
      }`}
    >

      {/* BIG NUMBER */}

      <span
        className={`absolute -right-4 -top-12 text-[180px] font-semibold leading-none tracking-[-0.12em] ${
          isDark
            ? "text-white/[0.035]"
            : "text-black/[0.035]"
        }`}
      >
        {phase.number}
      </span>

      {/* CENTER */}

      <div className="absolute inset-0 flex items-center justify-center">

        <div className="relative">

          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className={`absolute -inset-10 rounded-full border border-dashed ${
              isDark
                ? "border-white/10"
                : "border-black/10"
            }`}
          />

          <motion.div
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className={`relative flex h-28 w-28 items-center justify-center rounded-[30px] shadow-xl ${
              isDark
                ? "bg-white/5"
                : "bg-white"
            }`}
          >

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-therynox-orange">

              <Icon
                size={24}
                strokeWidth={1.5}
                className="text-black"
              />

            </div>

          </motion.div>

        </div>

      </div>

      {/* LABEL */}

      <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">

        <div>

          <p
            className={`text-[7px] font-bold uppercase tracking-[0.25em] ${
              isDark
                ? "text-white/25"
                : "text-black/25"
            }`}
          >
            Current phase
          </p>

          <p
            className={`mt-2 text-sm font-semibold ${
              isDark
                ? "text-white"
                : "text-black"
            }`}
          >
            {phase.label}
          </p>

        </div>

        <div
          className={`flex h-8 w-8 items-center justify-center rounded-full ${
            isDark
              ? "border border-white/10"
              : "border border-black/10"
          }`}
        >

          <ArrowUpRight
            size={13}
            className={
              isDark
                ? "text-white/40"
                : "text-black/30"
            }
          />

        </div>

      </div>

    </div>
  );
}

/* =========================================================
   PRINCIPLE
========================================================= */

function Principle({
  number,
  title,
  text,
}) {
  return (
    <div className="bg-[#090909] p-7 sm:p-9">

      <span className="text-[9px] font-bold tracking-[0.2em] text-therynox-orange">
        {number}
      </span>

      <h3 className="mt-9 text-2xl font-semibold tracking-[-0.05em]">
        {title}
      </h3>

      <p className="mt-4 text-sm leading-6 text-white/30">
        {text}
      </p>

    </div>
  );
}

/* =========================================================
   COMMUNICATION ROW
========================================================= */

function CommunicationRow({
  number,
  title,
  text,
}) {
  return (
    <motion.div
      whileHover={{ x: 5 }}
      className="flex gap-5 border-t border-therynox-border py-6"
    >

      <span className="pt-1 text-[8px] font-bold tracking-[0.2em] text-therynox-orange">
        {number}
      </span>

      <div className="flex-1">

        <h3 className="text-lg font-semibold tracking-[-0.03em]">
          {title}
        </h3>

        <p className="mt-2 max-w-lg text-sm leading-6 text-therynox-muted">
          {text}
        </p>

      </div>

    </motion.div>
  );
}