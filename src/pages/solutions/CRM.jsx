import React from "react";
import {
  Activity,
  ArrowUpRight,
  BarChart3,
  Bell,
  CalendarDays,
  Check,
  ChevronRight,
  CircleUserRound,
  Filter,
  Mail,
  MoreHorizontal,
  Phone,
  Search,
  Sparkles,
  Target,
  Users,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";

import PageLayout from "../../components/layout/PageLayout";
import PageHeader from "../../components/layout/PageHeader";

const capabilities = [
  {
    number: "01",
    title: "Customer Management",
    description:
      "Keep customer profiles, contact information, conversations and history organised in one place.",
    icon: Users,
  },
  {
    number: "02",
    title: "Sales Pipeline",
    description:
      "Track opportunities from the first interaction through qualification, proposal and conversion.",
    icon: Target,
  },
  {
    number: "03",
    title: "Follow-ups",
    description:
      "Never lose an opportunity with reminders, scheduled activities and customer follow-up workflows.",
    icon: Bell,
  },
  {
    number: "04",
    title: "Communication",
    description:
      "Keep calls, emails, notes and customer interactions connected to the right relationship.",
    icon: Mail,
  },
  {
    number: "05",
    title: "Activity Tracking",
    description:
      "Give your team a clear timeline of what happened, when it happened and what needs to happen next.",
    icon: Activity,
  },
  {
    number: "06",
    title: "Reports & Insights",
    description:
      "Understand pipeline health, conversion rates, team activity and customer performance.",
    icon: BarChart3,
  },
];

const process = [
  {
    number: "01",
    title: "Capture",
    text: "Bring leads and customer information into one central system.",
  },
  {
    number: "02",
    title: "Qualify",
    text: "Organise opportunities and identify the customers worth pursuing.",
  },
  {
    number: "03",
    title: "Convert",
    text: "Move opportunities through your sales process with clear ownership.",
  },
  {
    number: "04",
    title: "Retain",
    text: "Continue the relationship with follow-ups, history and customer insights.",
  },
];

export default function CRM() {
  return (
    <PageLayout showCTA={false}>
      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <PageHeader
        eyebrow="SOLUTIONS / 01"
        number="01 / 06"
        title="CRM Systems."
        description="A central customer system that turns leads, conversations and opportunities into organised business relationships."
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
              Know your
              <br />
              customers.
              <br />
              <span className="text-therynox-orange">
                Grow relationships.
              </span>
            </motion.h2>

            <p className="max-w-md text-sm leading-7 text-therynox-muted sm:text-base">
              A CRM should give your team one clear picture of every customer,
              every opportunity and every next step.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          CRM PRODUCT VISUAL
      ===================================================== */}

      <CRMVisual />

      {/* =====================================================
          STATEMENT
      ===================================================== */}

      <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.65fr_0.35fr]">
            <h2 className="max-w-4xl text-4xl font-semibold leading-[0.98] tracking-[-0.06em] sm:text-5xl">
              One customer.
              <br />
              One history.
              <br />
              <span className="text-therynox-orange">
                One source of truth.
              </span>
            </h2>

            <p className="max-w-md text-sm leading-7 text-therynox-muted">
              Stop searching across spreadsheets, messages and disconnected
              tools. Give your team a shared customer system that keeps every
              interaction connected.
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
                CRM capabilities
              </p>

              <h2 className="mt-6 max-w-sm text-4xl font-semibold leading-[0.95] tracking-[-0.06em] sm:text-5xl">
                Everything your
                <br />
                team needs.
              </h2>

              <p className="mt-6 max-w-sm text-sm leading-6 text-therynox-muted">
                Build a customer workflow around the way your business
                actually operates.
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
          WORKFLOW
      ===================================================== */}

      <section className="bg-therynox-black px-5 py-24 text-white sm:px-8 lg:px-12 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-[0.42fr_0.58fr]">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-therynox-orange">
                Customer workflow
              </p>

              <h2 className="mt-6 max-w-md text-4xl font-semibold leading-[0.95] tracking-[-0.06em] sm:text-5xl">
                From first
                <br />
                contact to
                <br />
                conversion.
              </h2>

              <p className="mt-6 max-w-md text-sm leading-7 text-white/40">
                Every customer interaction becomes part of a connected
                workflow your team can understand and act on.
              </p>
            </div>

            <PipelineVisual />
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
                How it works
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.06em] sm:text-5xl">
                Capture.
                <br />
                Convert.
                <br />
                Retain.
              </h2>
            </div>

            <p className="max-w-sm text-sm leading-6 text-therynox-muted">
              A CRM turns scattered customer activity into a repeatable
              process your team can follow.
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
                Build your customer system
              </p>

              <h2 className="mt-6 max-w-3xl text-4xl font-semibold leading-[0.95] tracking-[-0.06em] text-black sm:text-5xl lg:text-6xl">
                Turn customer
                <br />
                data into action.
              </h2>
            </div>

            <a
              href="/contact"
              className="group inline-flex shrink-0 items-center justify-center gap-3 rounded-full bg-therynox-black px-7 py-5 text-[9px] font-bold uppercase tracking-[0.18em] text-white transition hover:bg-white hover:text-black"
            >
              Discuss Your System

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
   CRM VISUAL
========================================================= */

function CRMVisual() {
  return (
    <section className="px-5 pb-10 sm:px-8 lg:px-12 lg:pb-16">
      <div className="mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-[32px] border border-therynox-border bg-[#f4f4f1]">
          {/* APP TOP BAR */}

          <div className="flex items-center justify-between border-b border-black/10 bg-white px-5 py-4 sm:px-7">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-therynox-black">
                <CircleUserRound
                  size={14}
                  className="text-white"
                  strokeWidth={1.5}
                />
              </div>

              <div>
                <p className="text-[8px] font-bold uppercase tracking-[0.3em] text-black/30">
                  THERYNOX CRM
                </p>

                <p className="mt-1 text-xs font-medium">
                  Customer operations
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden items-center gap-2 rounded-full border border-black/10 bg-black/[0.02] px-3 py-2 sm:flex">
                <Search
                  size={12}
                  className="text-black/30"
                />

                <span className="text-[7px] text-black/25">
                  Search customers...
                </span>
              </div>

              <div className="h-7 w-7 rounded-full bg-therynox-orange" />
            </div>
          </div>

          {/* APP BODY */}

          <div className="grid lg:grid-cols-[190px_1fr]">
            <Sidebar />

            <div className="min-w-0 p-5 sm:p-7 lg:p-8">
              {/* DASHBOARD HEADER */}

              <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                <div>
                  <p className="text-[8px] font-bold uppercase tracking-[0.25em] text-therynox-orange">
                    Overview
                  </p>

                  <h3 className="mt-2 text-2xl font-semibold tracking-[-0.05em]">
                    Good morning, team.
                  </h3>
                </div>

                <button
                  type="button"
                  className="inline-flex w-fit items-center gap-2 rounded-full bg-therynox-black px-4 py-2.5 text-[7px] font-bold uppercase tracking-[0.15em] text-white"
                >
                  <Users size={11} />
                  Add customer
                </button>
              </div>

              {/* STATS */}

              <div className="mt-7 grid grid-cols-2 gap-3 xl:grid-cols-4">
                <CRMStat
                  label="Customers"
                  value="2,486"
                  change="+12.4%"
                />

                <CRMStat
                  label="New leads"
                  value="148"
                  change="+8.2%"
                />

                <CRMStat
                  label="Open deals"
                  value="64"
                  change="+14.7%"
                />

                <CRMStat
                  label="Won this month"
                  value="₹8.4L"
                  change="+21.3%"
                />
              </div>

              {/* PIPELINE + CUSTOMER */}

              <div className="mt-3 grid gap-3 xl:grid-cols-[1fr_280px]">
                <PipelineBoard />

                <CustomerProfile />
              </div>

              {/* ACTIVITY */}

              <ActivityPanel />
            </div>
          </div>

          {/* FOOTER */}

          <div className="flex flex-col gap-3 border-t border-black/10 bg-white px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <span className="text-[8px] font-bold uppercase tracking-[0.25em] text-black/25">
              Customers · Pipeline · Activity · Insights
            </span>

            <span className="text-[8px] uppercase tracking-[0.2em] text-black/20">
              Business intelligence at a glance
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   SIDEBAR
========================================================= */

function Sidebar() {
  const items = [
    {
      label: "Overview",
      icon: BarChart3,
      active: true,
    },
    {
      label: "Customers",
      icon: Users,
    },
    {
      label: "Pipeline",
      icon: Target,
    },
    {
      label: "Activities",
      icon: Activity,
    },
    {
      label: "Calendar",
      icon: CalendarDays,
    },
  ];

  return (
    <aside className="hidden border-r border-black/10 bg-white p-4 lg:block">
      <div className="space-y-1">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 ${
                item.active
                  ? "bg-therynox-orange/10 text-black"
                  : "text-black/35"
              }`}
            >
              <Icon
                size={13}
                strokeWidth={1.4}
              />

              <span className="text-[8px] font-bold uppercase tracking-[0.12em]">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-10 border-t border-black/10 pt-5">
        <p className="px-3 text-[7px] font-bold uppercase tracking-[0.2em] text-black/20">
          Workspace
        </p>

        <div className="mt-3 space-y-2">
          <div className="px-3 text-[8px] text-black/30">
            Reports
          </div>

          <div className="px-3 text-[8px] text-black/30">
            Settings
          </div>
        </div>
      </div>
    </aside>
  );
}

/* =========================================================
   CRM STAT
========================================================= */

function CRMStat({
  label,
  value,
  change,
}) {
  return (
    <motion.div
      whileHover={{
        y: -2,
      }}
      className="rounded-xl border border-black/10 bg-white p-4"
    >
      <div className="flex items-center justify-between">
        <span className="text-[7px] font-bold uppercase tracking-[0.18em] text-black/25">
          {label}
        </span>

        <ArrowUpRight
          size={11}
          className="text-black/20"
        />
      </div>

      <p className="mt-5 text-xl font-semibold tracking-[-0.05em]">
        {value}
      </p>

      <div className="mt-2 flex items-center gap-1.5">
        <span className="text-[7px] font-bold text-green-600">
          {change}
        </span>

        <span className="text-[7px] text-black/20">
          this month
        </span>
      </div>
    </motion.div>
  );
}

/* =========================================================
   PIPELINE BOARD
========================================================= */

function PipelineBoard() {
  const columns = [
    {
      title: "New",
      count: "24",
      cards: [
        {
          name: "Aarav Studio",
          value: "₹1.2L",
          avatar: "AS",
        },
        {
          name: "Northline",
          value: "₹85K",
          avatar: "N",
        },
      ],
    },
    {
      title: "Qualified",
      count: "12",
      cards: [
        {
          name: "Orbit Labs",
          value: "₹2.4L",
          avatar: "OL",
        },
        {
          name: "Mira Foods",
          value: "₹1.8L",
          avatar: "MF",
        },
      ],
    },
    {
      title: "Won",
      count: "8",
      cards: [
        {
          name: "Rynox Retail",
          value: "₹3.6L",
          avatar: "RR",
        },
      ],
    },
  ];

  return (
    <div className="rounded-xl border border-black/10 bg-white p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[7px] font-bold uppercase tracking-[0.2em] text-black/25">
            Sales pipeline
          </p>

          <h4 className="mt-1 text-sm font-semibold">
            Opportunities
          </h4>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="rounded-md border border-black/10 p-1.5"
          >
            <Filter
              size={11}
              className="text-black/30"
            />
          </button>

          <button
            type="button"
            className="rounded-md border border-black/10 p-1.5"
          >
            <MoreHorizontal
              size={11}
              className="text-black/30"
            />
          </button>
        </div>
      </div>

      <div className="mt-5 grid gap-2 md:grid-cols-3">
        {columns.map((column, columnIndex) => (
          <div
            key={column.title}
            className="rounded-lg bg-[#f7f7f4] p-2.5"
          >
            <div className="flex items-center justify-between px-1 py-1">
              <span className="text-[7px] font-bold uppercase tracking-[0.15em] text-black/40">
                {column.title}
              </span>

              <span className="text-[7px] text-black/25">
                {column.count}
              </span>
            </div>

            <div className="mt-2 space-y-2">
              {column.cards.map((card, cardIndex) => (
                <motion.div
                  key={card.name}
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    delay:
                      columnIndex * 0.08 +
                      cardIndex * 0.05,
                  }}
                  className="rounded-lg border border-black/10 bg-white p-3"
                >
                  <div className="flex items-center gap-2">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-therynox-black text-[6px] font-bold text-white">
                      {card.avatar}
                    </div>

                    <span className="min-w-0 truncate text-[8px] font-semibold">
                      {card.name}
                    </span>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-[8px] font-medium">
                      {card.value}
                    </span>

                    <ChevronRight
                      size={11}
                      className="text-black/20"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   CUSTOMER PROFILE
========================================================= */

function CustomerProfile() {
  return (
    <div className="rounded-xl border border-black/10 bg-white p-4">
      <div className="flex items-center justify-between">
        <span className="text-[7px] font-bold uppercase tracking-[0.2em] text-black/25">
          Customer
        </span>

        <MoreHorizontal
          size={13}
          className="text-black/20"
        />
      </div>

      <div className="mt-5 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-therynox-orange text-xs font-bold">
          VK
        </div>

        <div>
          <h4 className="text-sm font-semibold">
            Vikram Kumar
          </h4>

          <p className="mt-1 text-[8px] text-black/30">
            Premium account
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <ProfileRow
          icon={Mail}
          text="vikram@company.com"
        />

        <ProfileRow
          icon={Phone}
          text="+91 88663 46076"
        />

        <ProfileRow
          icon={CalendarDays}
          text="Customer since 2024"
        />
      </div>

      <div className="mt-6 rounded-lg bg-therynox-bg p-3">
        <p className="text-[7px] font-bold uppercase tracking-[0.15em] text-black/25">
          Lifetime value
        </p>

        <p className="mt-2 text-lg font-semibold tracking-[-0.04em]">
          ₹4.82L
        </p>

        <div className="mt-3 h-1 overflow-hidden rounded-full bg-black/5">
          <motion.div
            initial={{
              width: 0,
            }}
            whileInView={{
              width: "78%",
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 1,
            }}
            className="h-full rounded-full bg-therynox-orange"
          />
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   PROFILE ROW
========================================================= */

function ProfileRow({
  icon: Icon,
  text,
}) {
  return (
    <div className="flex items-center gap-2">
      <Icon
        size={11}
        strokeWidth={1.4}
        className="text-black/25"
      />

      <span className="truncate text-[8px] text-black/40">
        {text}
      </span>
    </div>
  );
}

/* =========================================================
   ACTIVITY PANEL
========================================================= */

function ActivityPanel() {
  const activities = [
    {
      title: "Proposal sent",
      customer: "Rynox Retail",
      time: "12 min ago",
      color: "bg-therynox-orange",
    },
    {
      title: "Call completed",
      customer: "Orbit Labs",
      time: "38 min ago",
      color: "bg-blue-400",
    },
    {
      title: "New lead created",
      customer: "Aarav Studio",
      time: "1 hr ago",
      color: "bg-green-400",
    },
  ];

  return (
    <div className="mt-3 rounded-xl border border-black/10 bg-white p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[7px] font-bold uppercase tracking-[0.2em] text-black/25">
            Recent activity
          </p>

          <h4 className="mt-1 text-sm font-semibold">
            Team timeline
          </h4>
        </div>

        <span className="text-[7px] font-bold uppercase tracking-[0.15em] text-therynox-orange">
          Live
        </span>
      </div>

      <div className="mt-4 divide-y divide-black/5">
        {activities.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{
              opacity: 0,
              x: -10,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              delay: index * 0.08,
            }}
            className="flex items-center gap-3 py-3"
          >
            <span
              className={`h-1.5 w-1.5 shrink-0 rounded-full ${item.color}`}
            />

            <div className="min-w-0 flex-1">
              <p className="text-[8px] font-semibold">
                {item.title}
              </p>

              <p className="mt-1 truncate text-[7px] text-black/30">
                {item.customer}
              </p>
            </div>

            <span className="text-[7px] text-black/20">
              {item.time}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   PIPELINE VISUAL
========================================================= */

function PipelineVisual() {
  const stages = [
    {
      number: "01",
      title: "NEW LEAD",
      value: "148",
      description: "Fresh opportunities",
    },
    {
      number: "02",
      title: "QUALIFIED",
      value: "64",
      description: "High intent",
    },
    {
      number: "03",
      title: "PROPOSAL",
      value: "31",
      description: "In discussion",
    },
    {
      number: "04",
      title: "WON",
      value: "18",
      description: "Converted",
    },
  ];

  return (
    <div className="rounded-[24px] border border-white/10 bg-white/[0.025] p-5 sm:p-7">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[8px] font-bold uppercase tracking-[0.25em] text-white/25">
            Live pipeline
          </p>

          <p className="mt-2 text-sm text-white/60">
            Sales movement
          </p>
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

          <span className="text-[7px] font-bold uppercase tracking-[0.18em] text-white/25">
            Live
          </span>
        </div>
      </div>

      <div className="mt-7 space-y-3">
        {stages.map((stage, index) => (
          <React.Fragment key={stage.number}>
            <motion.div
              initial={{
                opacity: 0,
                x: 15,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: index * 0.1,
              }}
              className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.025] p-4"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-therynox-orange/10">
                <span className="text-[8px] font-bold text-therynox-orange">
                  {stage.number}
                </span>
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-[7px] font-bold uppercase tracking-[0.2em] text-white/25">
                  {stage.title}
                </p>

                <p className="mt-1 text-[8px] text-white/35">
                  {stage.description}
                </p>
              </div>

              <span className="text-lg font-semibold tracking-[-0.05em] text-white/75">
                {stage.value}
              </span>

              <Check
                size={14}
                className="text-green-400"
              />
            </motion.div>

            {index < stages.length - 1 && (
              <div className="flex h-3 items-center pl-[2.05rem]">
                <motion.div
                  animate={{
                    opacity: [0.15, 0.7, 0.15],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: index * 0.2,
                  }}
                  className="h-3 w-px bg-therynox-orange/50"
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="mt-7 flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.025] px-4 py-3">
        <div className="flex items-center gap-2">
          <Zap
            size={13}
            className="text-therynox-orange"
          />

          <span className="text-[7px] font-bold uppercase tracking-[0.18em] text-white/25">
            Conversion rate
          </span>
        </div>

        <span className="text-sm font-semibold text-white/70">
          12.2%
        </span>
      </div>
    </div>
  );
}