import React from "react";
import {
  Activity,
  ArrowUpRight,
  BarChart3,
  Bell,
  Check,
  ChevronDown,
  CircleUserRound,
  FolderKanban,
  LayoutDashboard,
  Menu,
  MoreHorizontal,
  Search,
  Settings,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";

import PageLayout from "../../components/layout/PageLayout";
import PageHeader from "../../components/layout/PageHeader";

const stats = [
  {
    label: "Active users",
    value: "12,480",
    change: "+18.4%",
    icon: Users,
  },
  {
    label: "Projects",
    value: "842",
    change: "+12.8%",
    icon: FolderKanban,
  },
  {
    label: "Conversion",
    value: "24.8%",
    change: "+6.2%",
    icon: BarChart3,
  },
];

const features = [
  {
    number: "01",
    title: "Custom workflows",
    description:
      "Build software around the way your business actually works instead of forcing your team into a generic tool.",
  },
  {
    number: "02",
    title: "Real-time systems",
    description:
      "Live dashboards, notifications and collaborative interfaces that keep your team working from the same information.",
  },
  {
    number: "03",
    title: "Secure architecture",
    description:
      "Role-based access, structured data and scalable foundations designed for production use.",
  },
  {
    number: "04",
    title: "Business integrations",
    description:
      "Connect payments, APIs, databases, communication tools and other services into one unified experience.",
  },
];

const applications = [
  "Customer portals",
  "Admin dashboards",
  "SaaS platforms",
  "Booking systems",
  "CRM platforms",
  "Internal tools",
];

export default function WebApplications() {
  return (
    <PageLayout showCTA={false}>
      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <PageHeader
        eyebrow="SERVICES / 04"
        number="04 / 06"
        title="Web applications."
        description="Custom software experiences built around your users, workflows and business logic."
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
              Software that
              <br />
              <span className="text-therynox-orange">
                works your way.
              </span>
            </motion.h2>

            <p className="max-w-md text-sm leading-7 text-therynox-muted sm:text-base">
              From customer portals to complex internal platforms, we design
              and build web applications that turn complicated workflows into
              simple digital experiences.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          SAAS PRODUCT VISUAL
      ===================================================== */}

      <ApplicationVisual />

      {/* =====================================================
          INTRO STATEMENT
      ===================================================== */}

      <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.65fr_0.35fr]">
            <h2 className="max-w-4xl text-4xl font-semibold leading-[0.98] tracking-[-0.06em] sm:text-5xl">
              Not just a website.
              <br />
              <span className="text-therynox-orange">
                A complete digital product.
              </span>
            </h2>

            <p className="max-w-md text-sm leading-7 text-therynox-muted">
              A web application can bring your customers, employees, data and
              business processes together inside one powerful interface.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          FEATURES
      ===================================================== */}

      <section className="border-t border-therynox-border px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-[0.4fr_0.6fr]">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-therynox-orange">
                What we build
              </p>

              <h2 className="mt-6 max-w-sm text-4xl font-semibold leading-[0.95] tracking-[-0.06em] sm:text-5xl">
                Built for
                <br />
                real work.
              </h2>

              <p className="mt-6 max-w-sm text-sm leading-6 text-therynox-muted">
                Every application is designed around a specific problem,
                workflow and group of users.
              </p>
            </div>

            <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.number}
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
                    delay: index * 0.07,
                  }}
                  className="group border-t border-therynox-border pt-5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-bold tracking-[0.2em] text-therynox-orange">
                      {feature.number}
                    </span>

                    <ArrowUpRight
                      size={17}
                      strokeWidth={1.4}
                      className="text-therynox-muted transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-therynox-orange"
                    />
                  </div>

                  <h3 className="mt-8 text-xl font-semibold tracking-[-0.04em]">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-therynox-muted">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          APPLICATION TYPES
      ===================================================== */}

      <section className="bg-therynox-black px-5 py-24 text-white sm:px-8 lg:px-12 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-[0.4fr_0.6fr]">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-therynox-orange">
                Application types
              </p>

              <h2 className="mt-6 max-w-md text-4xl font-semibold leading-[0.95] tracking-[-0.06em] sm:text-5xl">
                One platform.
                <br />
                Many possibilities.
              </h2>
            </div>

            <div className="grid sm:grid-cols-2">
              {applications.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{
                    opacity: 0,
                    y: 15,
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
                  className="flex items-center justify-between border-t border-white/10 px-1 py-6 sm:px-5"
                >
                  <span className="text-sm text-white/75">
                    {item}
                  </span>

                  <ArrowUpRight
                    size={15}
                    strokeWidth={1.4}
                    className="text-therynox-orange"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
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
                Idea to application.
              </h2>
            </div>

            <p className="max-w-sm text-sm leading-6 text-therynox-muted">
              We turn your business requirements into a clear, scalable
              digital product.
            </p>
          </div>

          <div className="mt-14 grid border-t border-therynox-border sm:grid-cols-2 lg:grid-cols-4">
            <ProcessStep
              number="01"
              title="Discover"
              text="Understand users, workflows, problems and business goals."
            />

            <ProcessStep
              number="02"
              title="Design"
              text="Create the product architecture, interface and user experience."
            />

            <ProcessStep
              number="03"
              title="Build"
              text="Develop the application, backend logic, database and integrations."
            />

            <ProcessStep
              number="04"
              title="Launch"
              text="Test, deploy and continuously improve the production system."
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
                Have a product idea?
              </p>

              <h2 className="mt-6 max-w-3xl text-4xl font-semibold leading-[0.95] tracking-[-0.06em] text-black sm:text-5xl lg:text-6xl">
                Let's build
                <br />
                something useful.
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
   APPLICATION VISUAL
========================================================= */

function ApplicationVisual() {
  return (
    <section className="px-5 pb-10 sm:px-8 lg:px-12 lg:pb-16">
      <div className="mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-[32px] border border-therynox-border bg-[#0d0d0d] text-white shadow-[0_30px_100px_rgba(0,0,0,0.12)]">
          {/* TOP BAR */}

          <div className="flex h-16 items-center justify-between border-b border-white/10 px-5 sm:px-7">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="h-2 w-2 rounded-full bg-white/20" />
                <span className="h-2 w-2 rounded-full bg-white/20" />
                <span className="h-2 w-2 rounded-full bg-white/20" />
              </div>

              <div className="hidden h-7 w-px bg-white/10 sm:block" />

              <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-white/40">
                THERYNOX APP
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden items-center gap-2 sm:flex">
                <span className="h-1.5 w-1.5 rounded-full bg-green-400" />

                <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/35">
                  Live
                </span>
              </div>

              <Bell
                size={16}
                strokeWidth={1.4}
                className="text-white/40"
              />

              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                <CircleUserRound
                  size={16}
                  strokeWidth={1.4}
                  className="text-white/60"
                />
              </div>
            </div>
          </div>

          <div className="flex min-h-[560px]">
            {/* SIDEBAR */}

            <aside className="hidden w-56 shrink-0 border-r border-white/10 p-5 md:block">
              <div className="mb-8">
                <p className="px-3 text-[8px] font-bold uppercase tracking-[0.25em] text-white/25">
                  Workspace
                </p>
              </div>

              <div className="space-y-1">
                <SidebarItem
                  active
                  icon={LayoutDashboard}
                  label="Dashboard"
                />

                <SidebarItem
                  icon={FolderKanban}
                  label="Projects"
                />

                <SidebarItem
                  icon={Users}
                  label="Customers"
                />

                <SidebarItem
                  icon={BarChart3}
                  label="Analytics"
                />

                <SidebarItem
                  icon={Bell}
                  label="Notifications"
                />
              </div>

              <div className="mt-10 border-t border-white/10 pt-6">
                <SidebarItem
                  icon={Settings}
                  label="Settings"
                />
              </div>
            </aside>

            {/* MAIN */}

            <main className="min-w-0 flex-1 bg-[#111111]">
              {/* MOBILE TOOLBAR */}

              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 md:hidden">
                <button
                  type="button"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10"
                >
                  <Menu size={17} />
                </button>

                <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-white/40">
                  Dashboard
                </span>

                <MoreHorizontal
                  size={18}
                  className="text-white/40"
                />
              </div>

              {/* DASHBOARD HEADER */}

              <div className="border-b border-white/10 px-5 py-6 sm:px-7">
                <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                  <div>
                    <p className="text-[8px] font-bold uppercase tracking-[0.3em] text-therynox-orange">
                      Overview
                    </p>

                    <h3 className="mt-2 text-2xl font-semibold tracking-[-0.05em]">
                      Good morning.
                    </h3>

                    <p className="mt-1 text-xs text-white/35">
                      Here's what's happening today.
                    </p>
                  </div>

                  <button
                    type="button"
                    className="flex w-fit items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2.5 text-[8px] font-bold uppercase tracking-[0.15em] text-white/50"
                  >
                    This month
                    <ChevronDown size={13} />
                  </button>
                </div>
              </div>

              {/* STATS */}

              <div className="grid border-b border-white/10 sm:grid-cols-3">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;

                  return (
                    <motion.div
                      key={stat.label}
                      initial={{
                        opacity: 0,
                        y: 15,
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
                      className="border-b border-white/10 p-5 sm:border-b-0 sm:border-r sm:p-6 last:border-r-0"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[8px] font-bold uppercase tracking-[0.22em] text-white/30">
                          {stat.label}
                        </span>

                        <Icon
                          size={15}
                          strokeWidth={1.4}
                          className="text-white/25"
                        />
                      </div>

                      <div className="mt-6 flex items-end justify-between">
                        <span className="text-2xl font-semibold tracking-[-0.05em]">
                          {stat.value}
                        </span>

                        <span className="text-[8px] font-bold text-green-400">
                          {stat.change}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* ANALYTICS */}

              <div className="grid lg:grid-cols-[1fr_0.55fr]">
                <div className="border-b border-white/10 p-5 sm:p-7 lg:border-b-0 lg:border-r">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[8px] font-bold uppercase tracking-[0.25em] text-white/30">
                        Activity
                      </p>

                      <p className="mt-2 text-sm font-medium">
                        Product activity
                      </p>
                    </div>

                    <MoreHorizontal
                      size={17}
                      className="text-white/25"
                    />
                  </div>

                  <div className="relative mt-10 h-48">
                    <div className="absolute inset-0 flex flex-col justify-between">
                      {[1, 2, 3, 4, 5].map((line) => (
                        <div
                          key={line}
                          className="h-px w-full bg-white/[0.06]"
                        />
                      ))}
                    </div>

                    <svg
                      viewBox="0 0 600 200"
                      className="absolute inset-0 h-full w-full"
                      preserveAspectRatio="none"
                    >
                      <defs>
                        <linearGradient
                          id="appGraphFill"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="#ff7a00"
                            stopOpacity="0.22"
                          />

                          <stop
                            offset="100%"
                            stopColor="#ff7a00"
                            stopOpacity="0"
                          />
                        </linearGradient>
                      </defs>

                      <motion.path
                        initial={{
                          pathLength: 0,
                        }}
                        whileInView={{
                          pathLength: 1,
                        }}
                        viewport={{
                          once: true,
                        }}
                        transition={{
                          duration: 1.8,
                          ease: "easeInOut",
                        }}
                        d="M0 165 C45 155 65 160 105 145 C145 130 160 145 200 120 C240 95 260 110 300 100 C345 88 365 110 405 80 C445 50 465 72 500 45 C540 20 565 35 600 15 L600 200 L0 200 Z"
                        fill="url(#appGraphFill)"
                      />

                      <motion.path
                        initial={{
                          pathLength: 0,
                        }}
                        whileInView={{
                          pathLength: 1,
                        }}
                        viewport={{
                          once: true,
                        }}
                        transition={{
                          duration: 1.8,
                          ease: "easeInOut",
                        }}
                        d="M0 165 C45 155 65 160 105 145 C145 130 160 145 200 120 C240 95 260 110 300 100 C345 88 365 110 405 80 C445 50 465 72 500 45 C540 20 565 35 600 15"
                        fill="none"
                        stroke="#ff7a00"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>

                  <div className="mt-4 flex justify-between text-[7px] uppercase tracking-[0.2em] text-white/20">
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                  </div>
                </div>

                {/* RECENT ACTIVITY */}

                <div className="p-5 sm:p-7">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[8px] font-bold uppercase tracking-[0.25em] text-white/30">
                        Recent activity
                      </p>

                      <p className="mt-2 text-sm font-medium">
                        Latest updates
                      </p>
                    </div>

                    <Activity
                      size={17}
                      className="text-therynox-orange"
                      strokeWidth={1.4}
                    />
                  </div>

                  <div className="mt-7 space-y-5">
                    <ActivityItem
                      title="New project created"
                      time="2 min ago"
                    />

                    <ActivityItem
                      title="Payment received"
                      time="18 min ago"
                    />

                    <ActivityItem
                      title="New customer added"
                      time="42 min ago"
                    />

                    <ActivityItem
                      title="Report generated"
                      time="1 hr ago"
                    />
                  </div>
                </div>
              </div>
            </main>
          </div>

          {/* FOOTER */}

          <div className="flex flex-col gap-3 border-t border-white/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
            <span className="text-[8px] font-bold uppercase tracking-[0.25em] text-white/20">
              Custom software interface
            </span>

            <div className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400" />

              <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/25">
                System operational
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   SIDEBAR ITEM
========================================================= */

function SidebarItem({
  icon: Icon,
  label,
  active = false,
}) {
  return (
    <div
      className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs transition ${
        active
          ? "bg-white/[0.07] text-white"
          : "text-white/30 hover:bg-white/[0.04] hover:text-white/70"
      }`}
    >
      <Icon
        size={15}
        strokeWidth={1.4}
      />

      <span>{label}</span>

      {active && (
        <span className="ml-auto h-1.5 w-1.5 rounded-full bg-therynox-orange" />
      )}
    </div>
  );
}

/* =========================================================
   ACTIVITY ITEM
========================================================= */

function ActivityItem({
  title,
  time,
}) {
  return (
    <div className="flex gap-3">
      <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.03]">
        <Check
          size={11}
          strokeWidth={2}
          className="text-therynox-orange"
        />
      </div>

      <div className="min-w-0">
        <p className="text-xs text-white/65">
          {title}
        </p>

        <p className="mt-1 text-[8px] uppercase tracking-[0.15em] text-white/20">
          {time}
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   PROCESS STEP
========================================================= */

function ProcessStep({
  number,
  title,
  text,
}) {
  return (
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
      className="border-b border-therynox-border p-6 sm:border-r sm:p-8 lg:border-b-0"
    >
      <span className="text-[9px] font-bold tracking-[0.2em] text-therynox-orange">
        {number}
      </span>

      <h3 className="mt-12 text-xl font-semibold tracking-[-0.04em]">
        {title}
      </h3>

      <p className="mt-4 text-sm leading-6 text-therynox-muted">
        {text}
      </p>
    </motion.div>
  );
}