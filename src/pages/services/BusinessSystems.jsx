import React from "react";
import {
  ArrowUpRight,
  BarChart3,
  Boxes,
  BriefcaseBusiness,
  Check,
  ChevronRight,
  CreditCard,
  Database,
  Package,
  Settings2,
  Users,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";

import PageLayout from "../../components/layout/PageLayout";
import PageHeader from "../../components/layout/PageHeader";

const modules = [
  {
    number: "01",
    label: "CRM",
    title: "Customers",
    value: "1,248",
    description: "Customer records",
    icon: Users,
  },
  {
    number: "02",
    label: "POS",
    title: "Revenue",
    value: "₹84.2K",
    description: "Today's sales",
    icon: CreditCard,
  },
  {
    number: "03",
    label: "INVENTORY",
    title: "Products",
    value: "384",
    description: "Active products",
    icon: Package,
  },
  {
    number: "04",
    label: "REPORTS",
    title: "Growth",
    value: "+24%",
    description: "Monthly growth",
    icon: BarChart3,
  },
];

const capabilities = [
  {
    number: "01",
    title: "CRM & Customers",
    description:
      "Centralise customer information, interactions, activity and business relationships in one system.",
    icon: Users,
  },
  {
    number: "02",
    title: "Sales & POS",
    description:
      "Connect sales, billing, payments and customer information into one streamlined workflow.",
    icon: CreditCard,
  },
  {
    number: "03",
    title: "Inventory",
    description:
      "Track products, stock levels, movements and availability without relying on disconnected spreadsheets.",
    icon: Package,
  },
  {
    number: "04",
    title: "Reports & Analytics",
    description:
      "Turn operational data into useful dashboards, reports and decisions for your business.",
    icon: BarChart3,
  },
  {
    number: "05",
    title: "Business Automation",
    description:
      "Automate repetitive processes so your team can spend more time on valuable work.",
    icon: Zap,
  },
  {
    number: "06",
    title: "Integrations",
    description:
      "Connect APIs, payment providers, databases and external services into your operating system.",
    icon: Database,
  },
];

const workflow = [
  {
    number: "01",
    title: "Understand",
    text: "Map your current business processes and identify where information gets lost.",
  },
  {
    number: "02",
    title: "Connect",
    text: "Bring customers, sales, products, staff and data into one connected system.",
  },
  {
    number: "03",
    title: "Automate",
    text: "Remove repetitive manual work with rules, workflows and real-time updates.",
  },
  {
    number: "04",
    title: "Improve",
    text: "Use operational data and reporting to continuously improve your business.",
  },
];

export default function BusinessSystems() {
  return (
    <PageLayout showCTA={false}>
      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <PageHeader
        eyebrow="SERVICES / 05"
        number="05 / 06"
        title="Business systems."
        description="Connect the moving parts of your business into one intelligent, reliable digital operating system."
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
              Your business.
              <br />
              <span className="text-therynox-orange">
                One connected system.
              </span>
            </motion.h2>

            <p className="max-w-md text-sm leading-7 text-therynox-muted sm:text-base">
              Replace disconnected tools and manual processes with a
              digital system that keeps your business operations connected.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          BUSINESS SYSTEM VISUAL
      ===================================================== */}

      <BusinessSystemVisual />

      {/* =====================================================
          STATEMENT
      ===================================================== */}

      <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.65fr_0.35fr]">
            <h2 className="max-w-4xl text-4xl font-semibold leading-[0.98] tracking-[-0.06em] sm:text-5xl">
              Stop managing
              <br />
              <span className="text-therynox-orange">
                disconnected information.
              </span>
            </h2>

            <p className="max-w-md text-sm leading-7 text-therynox-muted">
              When your systems talk to each other, your team gets better
              information, your customers get better experiences and your
              business becomes easier to operate.
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
                What we connect
              </p>

              <h2 className="mt-6 max-w-sm text-4xl font-semibold leading-[0.95] tracking-[-0.06em] sm:text-5xl">
                Everything
                <br />
                working together.
              </h2>

              <p className="mt-6 max-w-sm text-sm leading-6 text-therynox-muted">
                Build only what your business actually needs and connect it
                into one reliable operational environment.
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
          DARK OPERATIONS SECTION
      ===================================================== */}

      <section className="bg-therynox-black px-5 py-24 text-white sm:px-8 lg:px-12 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-[0.45fr_0.55fr]">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-therynox-orange">
                Connected operations
              </p>

              <h2 className="mt-6 max-w-xl text-4xl font-semibold leading-[0.95] tracking-[-0.06em] sm:text-5xl">
                One action.
                <br />
                Multiple systems.
              </h2>

              <p className="mt-6 max-w-md text-sm leading-7 text-white/40">
                A good business system doesn't just store information.
                It moves information between the right people and processes
                automatically.
              </p>
            </div>

            <div className="rounded-[24px] border border-white/10 bg-white/[0.025] p-5 sm:p-7">
              <WorkflowRow
                number="01"
                title="New customer"
                text="Customer added to CRM"
                icon={Users}
              />

              <WorkflowConnector />

              <WorkflowRow
                number="02"
                title="Purchase created"
                text="Sale recorded in POS"
                icon={CreditCard}
              />

              <WorkflowConnector />

              <WorkflowRow
                number="03"
                title="Inventory updated"
                text="Stock automatically adjusted"
                icon={Package}
              />

              <WorkflowConnector />

              <WorkflowRow
                number="04"
                title="Report updated"
                text="Business dashboard refreshed"
                icon={BarChart3}
              />
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          WORKFLOW
      ===================================================== */}

      <section className="px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-therynox-orange">
                Our approach
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.06em] sm:text-5xl">
                From complexity
                <br />
                to clarity.
              </h2>
            </div>

            <p className="max-w-sm text-sm leading-6 text-therynox-muted">
              We don't add technology for the sake of technology. We build
              systems around real business problems.
            </p>
          </div>

          <div className="mt-14 grid border-t border-therynox-border sm:grid-cols-2 lg:grid-cols-4">
            {workflow.map((item, index) => (
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
          SYSTEM TYPES
      ===================================================== */}

      <section className="border-t border-therynox-border px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-therynox-orange">
                Built around your business
              </p>

              <h2 className="mt-5 max-w-2xl text-4xl font-semibold leading-[0.95] tracking-[-0.06em] sm:text-5xl">
                Systems for the way
                <br />
                you actually work.
              </h2>
            </div>

            <p className="max-w-md text-sm leading-6 text-therynox-muted">
              From small internal tools to complete business operating
              platforms, the architecture grows with your requirements.
            </p>
          </div>

          <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <SystemCard
              icon={BriefcaseBusiness}
              title="Business Management"
              text="Centralise everyday operations, customers and reporting."
            />

            <SystemCard
              icon={Settings2}
              title="Internal Tools"
              text="Replace repetitive spreadsheets and manual processes."
            />

            <SystemCard
              icon={Boxes}
              title="Inventory Systems"
              text="Track products, stock movement and availability."
            />

            <SystemCard
              icon={Users}
              title="CRM Platforms"
              text="Manage customers, leads, activity and relationships."
            />

            <SystemCard
              icon={CreditCard}
              title="POS & Billing"
              text="Connect sales, payments, invoices and customers."
            />

            <SystemCard
              icon={BarChart3}
              title="Analytics"
              text="Turn operational data into useful business decisions."
            />
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
                Ready to simplify?
              </p>

              <h2 className="mt-6 max-w-3xl text-4xl font-semibold leading-[0.95] tracking-[-0.06em] text-black sm:text-5xl lg:text-6xl">
                Let's connect
                <br />
                your business.
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
   BUSINESS SYSTEM VISUAL
========================================================= */

function BusinessSystemVisual() {
  return (
    <section className="px-5 pb-10 sm:px-8 lg:px-12 lg:pb-16">
      <div className="mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-[32px] bg-[#0b0b0b] text-white">
          {/* BACKGROUND GRID */}

          <div
            className="pointer-events-none absolute"
            style={{
              display: "none",
            }}
          />

          {/* HEADER */}

          <div className="flex flex-col justify-between gap-4 border-b border-white/10 px-7 py-7 sm:flex-row sm:items-center sm:px-10">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
                <Boxes
                  size={16}
                  strokeWidth={1.5}
                  className="text-therynox-orange"
                />
              </div>

              <div>
                <p className="text-[8px] font-bold uppercase tracking-[0.3em] text-white/30">
                  Business operating system
                </p>

                <p className="mt-1 text-xs text-white/65">
                  Connected workspace
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
                All systems operational
              </span>
            </div>
          </div>

          {/* DESKTOP PIPELINE */}

          <div className="hidden px-6 py-14 lg:block lg:px-10 lg:py-16">
            <div className="grid grid-cols-[1fr_70px_1fr_70px_1fr_70px_1fr] items-center">
              {modules.map((module, index) => {
                const Icon = module.icon;

                return (
                  <React.Fragment key={module.number}>
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
                        delay: index * 0.12,
                        duration: 0.6,
                      }}
                      whileHover={{
                        y: -6,
                      }}
                      className="group"
                    >
                      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-all duration-300 group-hover:border-therynox-orange/40 group-hover:bg-white/[0.06]">
                        <div className="flex items-center justify-between">
                          <span className="text-[8px] font-bold tracking-[0.25em] text-therynox-orange">
                            {module.number}
                          </span>

                          <Icon
                            size={17}
                            strokeWidth={1.4}
                            className="text-white/30 transition-colors group-hover:text-therynox-orange"
                          />
                        </div>

                        <p className="mt-9 text-[8px] font-bold uppercase tracking-[0.25em] text-white/30">
                          {module.label}
                        </p>

                        <p className="mt-3 text-2xl font-semibold tracking-[-0.05em]">
                          {module.value}
                        </p>

                        <p className="mt-1 text-xs text-white/35">
                          {module.description}
                        </p>

                        <div className="mt-5 flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-green-400" />

                          <span className="text-[7px] font-bold uppercase tracking-[0.2em] text-white/25">
                            Connected
                          </span>
                        </div>
                      </div>
                    </motion.div>

                    {index < modules.length - 1 && (
                      <div className="relative flex items-center justify-center px-2">
                        <div className="h-px w-full bg-white/10" />

                        <motion.div
                          animate={{
                            x: ["-100%", "100%"],
                          }}
                          transition={{
                            duration: 1.8,
                            repeat: Infinity,
                            ease: "linear",
                            delay: index * 0.25,
                          }}
                          className="absolute left-2 h-px w-7 bg-therynox-orange"
                        />

                        <ChevronRight
                          size={13}
                          className="absolute right-0 text-therynox-orange"
                        />
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>

            <div className="mt-10 flex justify-center">
              <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-5 py-3">
                <Zap
                  size={13}
                  className="text-therynox-orange"
                />

                <span className="text-[8px] font-bold uppercase tracking-[0.25em] text-white/30">
                  Data flows automatically between your business operations
                </span>
              </div>
            </div>
          </div>

          {/* MOBILE / TABLET */}

          <div className="grid gap-4 px-6 py-10 sm:grid-cols-2 lg:hidden">
            {modules.map((module, index) => {
              const Icon = module.icon;

              return (
                <motion.div
                  key={module.number}
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
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[8px] font-bold tracking-[0.25em] text-therynox-orange">
                      {module.number}
                    </span>

                    <Icon
                      size={16}
                      strokeWidth={1.4}
                      className="text-white/30"
                    />
                  </div>

                  <p className="mt-8 text-[8px] font-bold uppercase tracking-[0.25em] text-white/30">
                    {module.label}
                  </p>

                  <p className="mt-2 text-2xl font-semibold">
                    {module.value}
                  </p>

                  <p className="mt-1 text-xs text-white/35">
                    {module.description}
                  </p>

                  <div className="mt-5 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-400" />

                    <span className="text-[7px] font-bold uppercase tracking-[0.2em] text-white/25">
                      Connected
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* FOOTER */}

          <div className="flex flex-col gap-4 border-t border-white/10 px-7 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-10">
            <div className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400" />

              <span className="text-[8px] font-bold uppercase tracking-[0.25em] text-white/25">
                Business system operational
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className="text-[8px] uppercase tracking-[0.2em] text-white/20">
                CRM
              </span>

              <span className="text-white/10">/</span>

              <span className="text-[8px] uppercase tracking-[0.2em] text-white/20">
                POS
              </span>

              <span className="text-white/10">/</span>

              <span className="text-[8px] uppercase tracking-[0.2em] text-white/20">
                Inventory
              </span>

              <span className="text-white/10">/</span>

              <span className="text-[8px] uppercase tracking-[0.2em] text-white/20">
                Reports
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   WORKFLOW ROW
========================================================= */

function WorkflowRow({
  number,
  title,
  text,
  icon: Icon,
}) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.025] p-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-therynox-orange/10">
        <Icon
          size={17}
          strokeWidth={1.4}
          className="text-therynox-orange"
        />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-[7px] font-bold tracking-[0.2em] text-therynox-orange">
            {number}
          </span>

          <h3 className="text-sm font-medium text-white/80">
            {title}
          </h3>
        </div>

        <p className="mt-1 text-[10px] text-white/30">
          {text}
        </p>
      </div>

      <Check
        size={15}
        className="shrink-0 text-green-400"
        strokeWidth={2}
      />
    </div>
  );
}

/* =========================================================
   WORKFLOW CONNECTOR
========================================================= */

function WorkflowConnector() {
  return (
    <div className="flex h-7 items-center pl-9">
      <motion.div
        animate={{
          opacity: [0.2, 1, 0.2],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
        }}
        className="h-7 w-px bg-therynox-orange/50"
      />
    </div>
  );
}

/* =========================================================
   SYSTEM CARD
========================================================= */

function SystemCard({
  icon: Icon,
  title,
  text,
}) {
  return (
    <motion.div
      whileHover={{
        y: -4,
      }}
      className="group rounded-2xl border border-therynox-border bg-white p-6 transition-shadow duration-300 hover:shadow-[0_15px_50px_rgba(0,0,0,0.06)]"
    >
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-therynox-bg">
          <Icon
            size={17}
            strokeWidth={1.4}
            className="text-therynox-orange"
          />
        </div>

        <ArrowUpRight
          size={16}
          strokeWidth={1.4}
          className="text-therynox-muted transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-therynox-orange"
        />
      </div>

      <h3 className="mt-8 text-lg font-semibold tracking-[-0.04em]">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-6 text-therynox-muted">
        {text}
      </p>
    </motion.div>
  );
}