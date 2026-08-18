import React from "react";
import {
  Activity,
  ArrowDown,
  ArrowUpRight,
  Braces,
  Check,
  CircleDot,
  Cloud,
  Code2,
  Database,
  GitBranch,
  Globe2,
  LockKeyhole,
  Server,
  ShieldCheck,
  Terminal,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";

import PageLayout from "../../components/layout/PageLayout";
import PageHeader from "../../components/layout/PageHeader";

const capabilities = [
  {
    number: "01",
    title: "Frontend Engineering",
    description:
      "Fast, responsive interfaces built with modern component architecture and maintainable frontend code.",
    icon: Code2,
  },
  {
    number: "02",
    title: "Backend Development",
    description:
      "Reliable server-side systems, business logic and APIs designed around your application's requirements.",
    icon: Server,
  },
  {
    number: "03",
    title: "Database Architecture",
    description:
      "Structured data models designed for reliability, performance and future growth.",
    icon: Database,
  },
  {
    number: "04",
    title: "API & Integrations",
    description:
      "Connect your application with payments, third-party services, internal tools and external platforms.",
    icon: Braces,
  },
  {
    number: "05",
    title: "Security",
    description:
      "Authentication, permissions and secure application patterns built into the development process.",
    icon: ShieldCheck,
  },
  {
    number: "06",
    title: "Performance",
    description:
      "Optimised loading, rendering and server performance for a faster experience at every scale.",
    icon: Zap,
  },
];

const stack = [
  "React",
  "Next.js",
  "Laravel",
  "Node.js",
  "PHP",
  "TypeScript",
  "MySQL",
  "PostgreSQL",
];

const process = [
  {
    number: "01",
    title: "Architecture",
    text: "Define the technical structure, data model, integrations and development strategy.",
  },
  {
    number: "02",
    title: "Build",
    text: "Develop the frontend, backend, database and core business functionality.",
  },
  {
    number: "03",
    title: "Test",
    text: "Validate functionality, responsiveness, performance and security before launch.",
  },
  {
    number: "04",
    title: "Deploy",
    text: "Move the application into production with monitoring and a reliable deployment workflow.",
  },
];

export default function WebDevelopment() {
  return (
    <PageLayout showCTA={false}>
      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <PageHeader
        eyebrow="SERVICES / 02"
        number="02 / 06"
        title="Web development."
        description="Robust frontend, backend and infrastructure engineering for websites and digital products that need to perform."
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
              Built to work.
              <br />
              <span className="text-therynox-orange">
                Built to scale.
              </span>
            </motion.h2>

            <p className="max-w-md text-sm leading-7 text-therynox-muted sm:text-base">
              We engineer the technology behind digital experiences — from
              responsive frontends to APIs, databases and production
              infrastructure.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          ARCHITECTURE VISUAL
      ===================================================== */}

      <DevelopmentVisual />

      {/* =====================================================
          STATEMENT
      ===================================================== */}

      <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.65fr_0.35fr]">
            <h2 className="max-w-4xl text-4xl font-semibold leading-[0.98] tracking-[-0.06em] sm:text-5xl">
              Good technology
              <br />
              should feel{" "}
              <span className="text-therynox-orange">
                invisible.
              </span>
            </h2>

            <p className="max-w-md text-sm leading-7 text-therynox-muted">
              The customer sees a smooth experience. Underneath it, a
              carefully engineered system handles data, logic, security,
              performance and integrations.
            </p>
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
                Engineering
              </p>

              <h2 className="mt-6 max-w-sm text-4xl font-semibold leading-[0.95] tracking-[-0.06em] sm:text-5xl">
                Every layer
                <br />
                matters.
              </h2>

              <p className="mt-6 max-w-sm text-sm leading-6 text-therynox-muted">
                We treat the frontend, backend and infrastructure as one
                connected system.
              </p>
            </div>

            <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2">
              {capabilities.map((item, index) => {
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
          STACK
      ===================================================== */}

      <section className="bg-therynox-black px-5 py-24 text-white sm:px-8 lg:px-12 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-[0.42fr_0.58fr]">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-therynox-orange">
                Technology
              </p>

              <h2 className="mt-6 max-w-md text-4xl font-semibold leading-[0.95] tracking-[-0.06em] sm:text-5xl">
                The right stack
                <br />
                for the job.
              </h2>

              <p className="mt-6 max-w-md text-sm leading-7 text-white/40">
                Technology should serve the product. We choose tools based on
                your requirements, users, performance needs and long-term
                goals.
              </p>
            </div>

            <div className="grid grid-cols-2 border-l border-t border-white/10 sm:grid-cols-3">
              {stack.map((technology, index) => (
                <motion.div
                  key={technology}
                  initial={{
                    opacity: 0,
                  }}
                  whileInView={{
                    opacity: 1,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    delay: index * 0.05,
                  }}
                  className="group flex min-h-[110px] items-center justify-between border-b border-r border-white/10 p-5 sm:p-6"
                >
                  <span className="text-sm font-medium text-white/55 transition-colors duration-300 group-hover:text-white">
                    {technology}
                  </span>

                  <ArrowUpRight
                    size={14}
                    strokeWidth={1.4}
                    className="text-white/15 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-therynox-orange"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CODE / PERFORMANCE VISUAL
      ===================================================== */}

      <section className="px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <CodeVisual />
      </section>

      {/* =====================================================
          PROCESS
      ===================================================== */}

      <section className="px-5 pb-24 sm:px-8 lg:px-12 lg:pb-32">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-therynox-orange">
                Process
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.06em] sm:text-5xl">
                Architecture
                <br />
                to production.
              </h2>
            </div>

            <p className="max-w-sm text-sm leading-6 text-therynox-muted">
              Clean engineering practices keep the project reliable from
              first commit to production.
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
                Need something built?
              </p>

              <h2 className="mt-6 max-w-3xl text-4xl font-semibold leading-[0.95] tracking-[-0.06em] text-black sm:text-5xl lg:text-6xl">
                Let's build the
                <br />
                technology behind it.
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
   DEVELOPMENT VISUAL
========================================================= */

function DevelopmentVisual() {
  const layers = [
    {
      number: "01",
      title: "FRONTEND",
      subtitle: "User experience",
      icon: Globe2,
      items: ["React", "Components", "Responsive UI"],
    },
    {
      number: "02",
      title: "API",
      subtitle: "Business logic",
      icon: Braces,
      items: ["REST / API", "Authentication", "Integrations"],
    },
    {
      number: "03",
      title: "DATABASE",
      subtitle: "Data layer",
      icon: Database,
      items: ["Models", "Queries", "Relationships"],
    },
    {
      number: "04",
      title: "INFRASTRUCTURE",
      subtitle: "Production",
      icon: Cloud,
      items: ["Deploy", "Security", "Monitoring"],
    },
  ];

  return (
    <section className="px-5 pb-10 sm:px-8 lg:px-12 lg:pb-16">
      <div className="mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-[32px] bg-[#0a0a0a] text-white">
          {/* HEADER */}

          <div className="flex flex-col justify-between gap-4 border-b border-white/10 px-6 py-6 sm:flex-row sm:items-center sm:px-8">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04]">
                <Terminal
                  size={15}
                  strokeWidth={1.4}
                  className="text-therynox-orange"
                />
              </div>

              <div>
                <p className="text-[8px] font-bold uppercase tracking-[0.3em] text-white/30">
                  THERYNOX / ENGINEERING
                </p>

                <p className="mt-1 text-xs text-white/60">
                  Application architecture
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <motion.span
                animate={{
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                }}
                className="h-1.5 w-1.5 rounded-full bg-green-400"
              />

              <span className="text-[8px] font-bold uppercase tracking-[0.25em] text-white/30">
                Build pipeline healthy
              </span>
            </div>
          </div>

          {/* ARCHITECTURE */}

          <div className="px-5 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-14">
            <div className="grid gap-3 lg:grid-cols-[1fr_55px_1fr_55px_1fr_55px_1fr] lg:items-stretch">
              {layers.map((layer, index) => {
                const Icon = layer.icon;

                return (
                  <React.Fragment key={layer.number}>
                    <ArchitectureCard
                      layer={layer}
                      index={index}
                    />

                    {index < layers.length - 1 && (
                      <ArchitectureConnector />
                    )}
                  </React.Fragment>
                );
              })}
            </div>

            {/* REAL-TIME LAYER */}

            <div className="mt-5 grid gap-3 lg:grid-cols-3">
              <MiniSystemCard
                icon={GitBranch}
                label="VERSION CONTROL"
                value="Branch → Commit → Merge"
              />

              <MiniSystemCard
                icon={LockKeyhole}
                label="SECURITY"
                value="Auth → Permissions → Protection"
              />

              <MiniSystemCard
                icon={Activity}
                label="MONITORING"
                value="Logs → Metrics → Alerts"
              />
            </div>
          </div>

          {/* TERMINAL */}

          <div className="border-t border-white/10 bg-black/30">
            <div className="flex items-center gap-3 border-b border-white/10 px-6 py-4">
              <div className="flex gap-1.5">
                <span className="h-2 w-2 rounded-full bg-white/15" />
                <span className="h-2 w-2 rounded-full bg-white/15" />
                <span className="h-2 w-2 rounded-full bg-white/15" />
              </div>

              <span className="text-[8px] font-bold uppercase tracking-[0.25em] text-white/25">
                deployment.log
              </span>
            </div>

            <div className="overflow-hidden px-6 py-6 font-mono text-[9px] leading-7 sm:px-8">
              <TerminalLine
                prefix="$"
                text="npm run build"
              />

              <TerminalLine
                prefix="✓"
                text="Compiled successfully"
                success
              />

              <TerminalLine
                prefix="✓"
                text="Optimized production assets"
                success
              />

              <TerminalLine
                prefix="✓"
                text="Database migrations complete"
                success
              />

              <TerminalLine
                prefix=">"
                text="Application ready for production"
                active
              />
            </div>
          </div>

          {/* FOOTER */}

          <div className="flex flex-col gap-3 border-t border-white/10 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <div className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-therynox-orange" />

              <span className="text-[8px] font-bold uppercase tracking-[0.25em] text-white/25">
                Frontend · API · Database · Infrastructure
              </span>
            </div>

            <span className="text-[8px] uppercase tracking-[0.2em] text-white/20">
              Engineered for production
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   ARCHITECTURE CARD
========================================================= */

function ArchitectureCard({
  layer,
  index,
}) {
  const Icon = layer.icon;

  return (
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
      transition={{
        delay: index * 0.1,
        duration: 0.6,
      }}
      whileHover={{
        y: -5,
      }}
      className="group rounded-2xl border border-white/10 bg-white/[0.035] p-5 transition-colors duration-300 hover:border-therynox-orange/40"
    >
      <div className="flex items-center justify-between">
        <span className="text-[8px] font-bold tracking-[0.25em] text-therynox-orange">
          {layer.number}
        </span>

        <Icon
          size={17}
          strokeWidth={1.4}
          className="text-white/25 transition-colors duration-300 group-hover:text-therynox-orange"
        />
      </div>

      <p className="mt-8 text-[8px] font-bold uppercase tracking-[0.25em] text-white/30">
        {layer.title}
      </p>

      <h3 className="mt-2 text-lg font-semibold tracking-[-0.04em]">
        {layer.subtitle}
      </h3>

      <div className="mt-6 space-y-2">
        {layer.items.map((item) => (
          <div
            key={item}
            className="flex items-center gap-2"
          >
            <span className="h-1 w-1 rounded-full bg-therynox-orange" />

            <span className="text-[9px] text-white/35">
              {item}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-2 border-t border-white/10 pt-4">
        <span className="h-1.5 w-1.5 rounded-full bg-green-400" />

        <span className="text-[7px] font-bold uppercase tracking-[0.2em] text-white/20">
          Operational
        </span>
      </div>
    </motion.div>
  );
}

/* =========================================================
   ARCHITECTURE CONNECTOR
========================================================= */

function ArchitectureConnector() {
  return (
    <div className="hidden items-center justify-center lg:flex">
      <div className="relative h-px w-full bg-white/10">
        <motion.div
          animate={{
            x: ["-100%", "250%"],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute left-0 top-0 h-px w-5 bg-therynox-orange"
        />

        <ArrowUpRight
          size={13}
          strokeWidth={1.5}
          className="absolute -right-1 -top-1.5 text-therynox-orange"
        />
      </div>
    </div>
  );
}

/* =========================================================
   MINI SYSTEM CARD
========================================================= */

function MiniSystemCard({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.025] p-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-therynox-orange/10">
        <Icon
          size={15}
          strokeWidth={1.4}
          className="text-therynox-orange"
        />
      </div>

      <div className="min-w-0">
        <p className="text-[7px] font-bold uppercase tracking-[0.2em] text-white/25">
          {label}
        </p>

        <p className="mt-1 truncate text-[9px] text-white/45">
          {value}
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   TERMINAL LINE
========================================================= */

function TerminalLine({
  prefix,
  text,
  success = false,
  active = false,
}) {
  return (
    <div className="flex gap-3">
      <span
        className={
          success
            ? "text-green-400"
            : active
              ? "text-therynox-orange"
              : "text-white/25"
        }
      >
        {prefix}
      </span>

      <span
        className={
          success
            ? "text-white/50"
            : active
              ? "text-white/70"
              : "text-white/30"
        }
      >
        {text}
      </span>
    </div>
  );
}

/* =========================================================
   CODE VISUAL
========================================================= */

function CodeVisual() {
  return (
    <div className="mx-auto max-w-7xl overflow-hidden rounded-[30px] border border-therynox-border bg-white">
      <div className="grid lg:grid-cols-[0.58fr_0.42fr]">
        {/* CODE */}

        <div className="border-b border-therynox-border bg-[#0d0d0d] text-white lg:border-b-0 lg:border-r">
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
            <div className="flex items-center gap-3">
              <Code2
                size={15}
                className="text-therynox-orange"
                strokeWidth={1.4}
              />

              <span className="text-[8px] font-bold uppercase tracking-[0.25em] text-white/30">
                application.ts
              </span>
            </div>

            <span className="text-[7px] uppercase tracking-[0.2em] text-white/20">
              TypeScript
            </span>
          </div>

          <div className="overflow-hidden px-6 py-7 font-mono text-[9px] leading-7 sm:px-8">
            <CodeLine
              number="01"
              text="const application = {"
            />

            <CodeLine
              number="02"
              text="  architecture: 'scalable',"
              indent
            />

            <CodeLine
              number="03"
              text="  security: true,"
              indent
            />

            <CodeLine
              number="04"
              text="  performance: 'optimized',"
              indent
            />

            <CodeLine
              number="05"
              text="  realtime: true,"
              indent
            />

            <CodeLine
              number="06"
              text="  integrations: ['api', 'payments'],"
              indent
            />

            <CodeLine
              number="07"
              text="};"
            />

            <div className="my-4 h-px bg-white/10" />

            <CodeLine
              number="09"
              text="await deploy(application);"
              highlight
            />

            <CodeLine
              number="10"
              text="// production ready"
              comment
            />
          </div>
        </div>

        {/* PERFORMANCE */}

        <div className="p-7 sm:p-10 lg:p-12">
          <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-therynox-orange">
            Engineering quality
          </p>

          <h2 className="mt-6 max-w-md text-4xl font-semibold leading-[0.95] tracking-[-0.06em] sm:text-5xl">
            Fast by
            <br />
            default.
          </h2>

          <p className="mt-6 max-w-sm text-sm leading-7 text-therynox-muted">
            Performance isn't something added at the end. It is considered
            throughout architecture, development and deployment.
          </p>

          <div className="mt-10 space-y-5">
            <PerformanceRow
              label="Performance"
              value="98"
            />

            <PerformanceRow
              label="Accessibility"
              value="96"
            />

            <PerformanceRow
              label="Best practices"
              value="100"
            />

            <PerformanceRow
              label="SEO"
              value="97"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 border-t border-therynox-border px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div className="flex items-center gap-3">
          <span className="h-1.5 w-1.5 rounded-full bg-green-500" />

          <span className="text-[8px] font-bold uppercase tracking-[0.25em] text-therynox-muted">
            Production quality
          </span>
        </div>

        <span className="text-[8px] uppercase tracking-[0.2em] text-therynox-muted">
          Built for real users
        </span>
      </div>
    </div>
  );
}

/* =========================================================
   CODE LINE
========================================================= */

function CodeLine({
  number,
  text,
  indent = false,
  highlight = false,
  comment = false,
}) {
  return (
    <div className="flex">
      <span className="mr-5 w-5 shrink-0 text-right text-white/15">
        {number}
      </span>

      <span
        className={
          highlight
            ? "text-therynox-orange"
            : comment
              ? "text-white/20"
              : indent
                ? "text-white/55"
                : "text-white/70"
        }
      >
        {text}
      </span>
    </div>
  );
}

/* =========================================================
   PERFORMANCE ROW
========================================================= */

function PerformanceRow({
  label,
  value,
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-therynox-muted">
          {label}
        </span>

        <span className="text-xs font-semibold">
          {value}
        </span>
      </div>

      <div className="mt-3 h-1 overflow-hidden rounded-full bg-therynox-bg">
        <motion.div
          initial={{
            width: 0,
          }}
          whileInView={{
            width: `${value}%`,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 1,
            ease: "easeOut",
          }}
          className="h-full rounded-full bg-therynox-orange"
        />
      </div>
    </div>
  );
}