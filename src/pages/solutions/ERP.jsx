import React from "react";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Boxes,
  Building2,
  Check,
  CircleDollarSign,
  ClipboardList,
  FileText,
  Layers3,
  Package,
  RefreshCw,
  ShoppingCart,
  Sparkles,
  TrendingUp,
  Truck,
  Users,
  WalletCards,
} from "lucide-react";
import { motion } from "framer-motion";

import PageLayout from "../../components/layout/PageLayout";
import PageHeader from "../../components/layout/PageHeader";

const modules = [
  {
    number: "01",
    title: "Finance",
    description:
      "Manage revenue, expenses, invoices, payments and financial operations.",
    icon: CircleDollarSign,
  },
  {
    number: "02",
    title: "Sales",
    description:
      "Connect customers, orders, invoices and sales performance.",
    icon: TrendingUp,
  },
  {
    number: "03",
    title: "Inventory",
    description:
      "Track stock, products, warehouses and product movement.",
    icon: Boxes,
  },
  {
    number: "04",
    title: "Procurement",
    description:
      "Manage suppliers, purchase orders and incoming inventory.",
    icon: Truck,
  },
  {
    number: "05",
    title: "Operations",
    description:
      "Organise daily workflows, teams, branches and business activity.",
    icon: Building2,
  },
  {
    number: "06",
    title: "Reporting",
    description:
      "Turn operational data into useful business intelligence.",
    icon: BarChart3,
  },
];

const process = [
  {
    number: "01",
    title: "Map",
    text: "Understand how your departments, teams and business processes work.",
  },
  {
    number: "02",
    title: "Connect",
    text: "Bring your important business information into one system.",
  },
  {
    number: "03",
    title: "Automate",
    text: "Reduce repetitive work with connected workflows and rules.",
  },
  {
    number: "04",
    title: "Scale",
    text: "Build a foundation that grows with your business.",
  },
];

export default function ERP() {
  return (
    <PageLayout showCTA={false}>
      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <PageHeader
        eyebrow="SOLUTIONS / 02"
        number="02 / 06"
        title="ERP Systems."
        description="A complete business operating system that connects finance, sales, inventory, procurement and operations."
      />

      {/* =====================================================
          INTRO
      ===================================================== */}

      <section className="px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="max-w-5xl text-4xl font-semibold leading-[0.94] tracking-[-0.065em] sm:text-5xl lg:text-6xl"
            >
              Run your entire
              <br />
              business from
              <br />
              <span className="text-therynox-orange">
                one system.
              </span>
            </motion.h2>

            <p className="max-w-md text-sm leading-7 text-therynox-muted sm:text-base">
              Replace disconnected spreadsheets and separate tools with a
              central ERP built around the way your business actually works.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          ERP COMMAND CENTER
      ===================================================== */}

      <ERPCommandCenter />

      {/* =====================================================
          STATEMENT
      ===================================================== */}

      <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.65fr_0.35fr]">
            <h2 className="max-w-4xl text-4xl font-semibold leading-[0.98] tracking-[-0.06em] sm:text-5xl">
              Stop managing
              <br />
              separate systems.
              <br />
              <span className="text-therynox-orange">
                Start running one business.
              </span>
            </h2>

            <p className="max-w-md text-sm leading-7 text-therynox-muted">
              Every department works with the same information, while
              management gets a clear view of what is happening across the
              business.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          MODULES
      ===================================================== */}

      <section className="border-t border-therynox-border px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-[0.4fr_0.6fr]">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-therynox-orange">
                ERP Modules
              </p>

              <h2 className="mt-6 max-w-sm text-4xl font-semibold leading-[0.95] tracking-[-0.06em] sm:text-5xl">
                Built around
                <br />
                your business.
              </h2>

              <p className="mt-6 max-w-sm text-sm leading-6 text-therynox-muted">
                Start with what you need today and expand the system as your
                business grows.
              </p>
            </div>

            <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2">
              {modules.map((item, index) => {
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
          AUTOMATION FLOW
      ===================================================== */}

      <section className="bg-therynox-black px-5 py-24 text-white sm:px-8 lg:px-12 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-[0.42fr_0.58fr]">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-therynox-orange">
                Automated Operations
              </p>

              <h2 className="mt-6 max-w-md text-4xl font-semibold leading-[0.95] tracking-[-0.06em] sm:text-5xl">
                One action.
                <br />
                The business
                <br />
                responds.
              </h2>

              <p className="mt-6 max-w-md text-sm leading-7 text-white/40">
                When one department performs an action, the information can
                automatically flow through the rest of the business.
              </p>
            </div>

            <BusinessFlow />
          </div>
        </div>
      </section>

      {/* =====================================================
          BUSINESS INTELLIGENCE
      ===================================================== */}

      <section className="px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <BusinessIntelligence />
      </section>

      {/* =====================================================
          IMPLEMENTATION
      ===================================================== */}

      <section className="px-5 pb-24 sm:px-8 lg:px-12 lg:pb-32">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-therynox-orange">
                Implementation
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.06em] sm:text-5xl">
                From business
                <br />
                process to system.
              </h2>
            </div>

            <p className="max-w-sm text-sm leading-6 text-therynox-muted">
              We design the system around your actual workflow instead of
              forcing your business into a generic template.
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
                Build your business system
              </p>

              <h2 className="mt-6 max-w-3xl text-4xl font-semibold leading-[0.95] tracking-[-0.06em] text-black sm:text-5xl lg:text-6xl">
                Make your
                <br />
                business work as one.
              </h2>
            </div>

            <a
              href="/contact"
              className="group inline-flex shrink-0 items-center justify-center gap-3 rounded-full bg-therynox-black px-7 py-5 text-[9px] font-bold uppercase tracking-[0.18em] text-white transition hover:bg-white hover:text-black"
            >
              Discuss Your ERP

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
   ERP COMMAND CENTER
========================================================= */

function ERPCommandCenter() {
  return (
    <section className="px-5 pb-10 sm:px-8 lg:px-12 lg:pb-16">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[30px] border border-black/10 bg-white">

        {/* HEADER */}

        <div className="flex flex-col justify-between gap-4 border-b border-black/10 px-6 py-5 sm:flex-row sm:items-center sm:px-8">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#090909]">
              <Layers3
                size={16}
                strokeWidth={1.4}
                className="text-white"
              />
            </div>

            <div>
              <p className="text-[8px] font-bold uppercase tracking-[0.3em] text-black/35">
                THERYNOX ERP
              </p>

              <p className="mt-1 text-xs font-medium">
                Business command center
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
              className="h-1.5 w-1.5 rounded-full bg-green-500"
            />

            <span className="text-[7px] font-bold uppercase tracking-[0.2em] text-black/30">
              All systems operational
            </span>

          </div>

        </div>


        {/* MAIN CONTENT */}

        <div className="bg-[#f7f7f4] p-5 sm:p-8 lg:p-10">

          {/* INTRO */}

          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">

            <div>

              <p className="text-[8px] font-bold uppercase tracking-[0.3em] text-therynox-orange">
                BUSINESS COMMAND CENTER
              </p>

              <h3 className="mt-3 max-w-2xl text-3xl font-semibold leading-[0.94] tracking-[-0.06em] sm:text-4xl lg:text-5xl">
                Your entire business,
                <br />
                <span className="text-black/25">
                  at a glance.
                </span>
              </h3>

            </div>

            <p className="max-w-sm text-sm leading-6 text-black/40">
              Monitor financial performance, sales, inventory and daily
              operations from one connected workspace.
            </p>

          </div>


          {/* KPI CARDS */}

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

            <DashboardMetric
              title="Revenue"
              value="₹42.8L"
              change="+18.4%"
              icon={CircleDollarSign}
            />

            <DashboardMetric
              title="Orders"
              value="1,284"
              change="+12.8%"
              icon={ShoppingCart}
            />

            <DashboardMetric
              title="Inventory"
              value="12,840"
              change="Healthy"
              icon={Boxes}
            />

            <DashboardMetric
              title="Employees"
              value="248"
              change="Active"
              icon={Users}
            />

          </div>


          {/* LOWER DASHBOARD */}

          <div className="mt-3 grid gap-3 lg:grid-cols-[1.6fr_0.8fr]">

            {/* REVENUE */}

            <div className="rounded-2xl border border-black/10 bg-white p-5 sm:p-7">

              <div className="flex items-start justify-between">

                <div>

                  <p className="text-[7px] font-bold uppercase tracking-[0.22em] text-black/30">
                    PERFORMANCE
                  </p>

                  <h4 className="mt-2 text-lg font-semibold tracking-[-0.04em]">
                    Revenue overview
                  </h4>

                  <p className="mt-1 text-[8px] text-black/25">
                    Business performance across the current period
                  </p>

                </div>

                <span className="rounded-full bg-therynox-orange/10 px-3 py-1.5 text-[7px] font-bold uppercase tracking-[0.15em] text-therynox-orange">
                  2026
                </span>

              </div>


              {/* CHART */}

              <div className="relative mt-8 h-[260px]">

                {/* GRID */}

                <div className="absolute inset-0 flex flex-col justify-between">

                  {[1, 2, 3, 4, 5].map((item) => (
                    <div
                      key={item}
                      className="h-px bg-black/5"
                    />
                  ))}

                </div>


                <svg
                  viewBox="0 0 800 240"
                  className="absolute inset-0 h-full w-full"
                  preserveAspectRatio="none"
                >

                  <defs>

                    <linearGradient
                      id="erpChartFill"
                      x1="0"
                      x2="0"
                      y1="0"
                      y2="1"
                    >

                      <stop
                        offset="0%"
                        stopColor="#ff7a00"
                        stopOpacity="0.18"
                      />

                      <stop
                        offset="100%"
                        stopColor="#ff7a00"
                        stopOpacity="0"
                      />

                    </linearGradient>

                  </defs>


                  <path
                    d="M0 195
                    C60 190 80 165 130 175
                    C185 186 205 135 260 145
                    C315 155 335 120 390 130
                    C445 140 465 92 520 105
                    C570 117 600 68 650 78
                    C705 88 735 48 800 25
                    L800 240
                    L0 240 Z"
                    fill="url(#erpChartFill)"
                  />


                  <path
                    d="M0 195
                    C60 190 80 165 130 175
                    C185 186 205 135 260 145
                    C315 155 335 120 390 130
                    C445 140 465 92 520 105
                    C570 117 600 68 650 78
                    C705 88 735 48 800 25"
                    fill="none"
                    stroke="#ff7a00"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />

                </svg>


                {/* MONTHS */}

                <div className="absolute bottom-0 left-0 right-0 flex justify-between">

                  {[
                    "JAN",
                    "FEB",
                    "MAR",
                    "APR",
                    "MAY",
                    "JUN",
                    "JUL",
                  ].map((month) => (
                    <span
                      key={month}
                      className="text-[6px] font-bold tracking-[0.15em] text-black/20"
                    >
                      {month}
                    </span>
                  ))}

                </div>

              </div>


              {/* CHART FOOTER */}

              <div className="flex items-center justify-between border-t border-black/5 pt-4">

                <span className="text-[7px] text-black/25">
                  Previous period
                </span>

                <div className="flex items-center gap-2">

                  <span className="h-1.5 w-1.5 rounded-full bg-therynox-orange" />

                  <span className="text-[7px] font-bold text-black/30">
                    Revenue
                  </span>

                </div>

              </div>

            </div>


            {/* OPERATIONS */}

            <div className="rounded-2xl border border-black/10 bg-[#090909] p-5 text-white sm:p-7">

              <div className="flex items-start justify-between">

                <div>

                  <p className="text-[7px] font-bold uppercase tracking-[0.22em] text-white/25">
                    OPERATIONS
                  </p>

                  <h4 className="mt-2 text-lg font-semibold tracking-[-0.04em]">
                    Quick access
                  </h4>

                </div>

                <Activity
                  size={15}
                  className="text-therynox-orange"
                />

              </div>


              <div className="mt-8 space-y-2">

                <QuickAction
                  icon={ShoppingCart}
                  title="Sales"
                  description="Orders & customers"
                />

                <QuickAction
                  icon={Boxes}
                  title="Inventory"
                  description="Products & stock"
                />

                <QuickAction
                  icon={CircleDollarSign}
                  title="Finance"
                  description="Payments & invoices"
                />

                <QuickAction
                  icon={BarChart3}
                  title="Reports"
                  description="Business insights"
                />

              </div>


              {/* HEALTH */}

              <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.03] p-4">

                <div className="flex items-center justify-between">

                  <span className="text-[7px] font-bold uppercase tracking-[0.18em] text-white/25">
                    SYSTEM HEALTH
                  </span>

                  <span className="text-[8px] font-semibold">
                    99.9%
                  </span>

                </div>

                <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/10">

                  <motion.div
                    initial={{
                      width: 0,
                    }}
                    whileInView={{
                      width: "99.9%",
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      duration: 1.2,
                    }}
                    className="h-full rounded-full bg-therynox-orange"
                  />

                </div>

                <div className="mt-3 flex items-center gap-2">

                  <span className="h-1.5 w-1.5 rounded-full bg-green-400" />

                  <span className="text-[7px] text-white/30">
                    All systems running normally
                  </span>

                </div>

              </div>

            </div>

          </div>


          {/* LIVE ACTIVITY */}

          <div className="mt-3 rounded-2xl border border-black/10 bg-white p-5 sm:p-7">

            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

              <div>

                <p className="text-[7px] font-bold uppercase tracking-[0.22em] text-black/30">
                  LIVE ACTIVITY
                </p>

                <h4 className="mt-2 text-lg font-semibold tracking-[-0.04em]">
                  What's happening now
                </h4>

              </div>

              <div className="flex items-center gap-2">

                <span className="h-1.5 w-1.5 rounded-full bg-green-500" />

                <span className="text-[7px] font-bold uppercase tracking-[0.15em] text-black/30">
                  Live system
                </span>

              </div>

            </div>


            <div className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">

              <ActivityItem
                icon={ShoppingCart}
                title="New order"
                value="₹84,500"
                time="2 min"
              />

              <ActivityItem
                icon={Package}
                title="Stock received"
                value="+240 units"
                time="8 min"
              />

              <ActivityItem
                icon={FileText}
                title="Invoice"
                value="INV-2841"
                time="16 min"
              />

              <ActivityItem
                icon={WalletCards}
                title="Payment"
                value="₹1.24L"
                time="28 min"
              />

              <ActivityItem
                icon={Users}
                title="Customer"
                value="Aarav Studio"
                time="42 min"
              />

            </div>

          </div>

        </div>


        {/* FOOTER */}

        <div className="flex flex-col gap-3 border-t border-black/10 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">

          <span className="text-[8px] font-bold uppercase tracking-[0.25em] text-black/25">
            Finance · Sales · Inventory · People · Operations
          </span>

          <span className="text-[8px] uppercase tracking-[0.2em] text-black/20">
            One business · One command center
          </span>

        </div>

      </div>
    </section>
  );
}


/* =========================================================
   DASHBOARD METRIC
========================================================= */

function DashboardMetric({
  title,
  value,
  change,
  icon: Icon,
}) {
  return (
    <motion.div
      whileHover={{
        y: -3,
      }}
      className="rounded-2xl border border-black/10 bg-white p-5 transition-shadow duration-300 hover:shadow-[0_15px_35px_rgba(0,0,0,0.06)]"
    >

      <div className="flex items-center justify-between">

        <span className="text-[7px] font-bold uppercase tracking-[0.2em] text-black/30">
          {title}
        </span>

        <Icon
          size={15}
          strokeWidth={1.4}
          className="text-therynox-orange"
        />

      </div>

      <p className="mt-7 text-2xl font-semibold tracking-[-0.06em]">
        {value}
      </p>

      <div className="mt-2 flex items-center gap-2">

        <span className="text-[7px] font-bold text-green-600">
          {change}
        </span>

        {change.startsWith("+") && (
          <ArrowUpRight
            size={9}
            className="text-green-600"
          />
        )}

      </div>

    </motion.div>
  );
}


/* =========================================================
   QUICK ACTION
========================================================= */

function QuickAction({
  icon: Icon,
  title,
  description,
}) {
  return (
    <motion.div
      whileHover={{
        x: 4,
      }}
      className="group flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-white/[0.025] p-3 transition-colors hover:border-therynox-orange/30 hover:bg-therynox-orange/[0.04]"
    >

      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.05]">

        <Icon
          size={14}
          strokeWidth={1.4}
          className="text-white/40 transition-colors group-hover:text-therynox-orange"
        />

      </div>

      <div className="min-w-0 flex-1">

        <p className="text-[8px] font-semibold">
          {title}
        </p>

        <p className="mt-1 text-[7px] text-white/25">
          {description}
        </p>

      </div>

      <ArrowUpRight
        size={12}
        className="text-white/20 transition-colors group-hover:text-therynox-orange"
      />

    </motion.div>
  );
}


/* =========================================================
   ACTIVITY ITEM
========================================================= */

function ActivityItem({
  icon: Icon,
  title,
  value,
  time,
}) {
  return (
    <motion.div
      whileHover={{
        y: -2,
      }}
      className="flex items-center gap-3 rounded-xl border border-black/5 bg-[#f7f7f4] p-3"
    >

      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white">

        <Icon
          size={13}
          strokeWidth={1.4}
          className="text-black/35"
        />

      </div>

      <div className="min-w-0 flex-1">

        <p className="truncate text-[8px] font-semibold">
          {title}
        </p>

        <p className="mt-1 truncate text-[7px] text-black/25">
          {value}
        </p>

      </div>

      <span className="text-[6px] text-black/20">
        {time}
      </span>

    </motion.div>
  );
}

/* =========================================================
   TOP METRIC
========================================================= */

function TopMetric({
  title,
  value,
  label,
  icon: Icon,
}) {
  return (
    <div className="border-b border-black/10 p-5 sm:p-6 lg:border-r lg:border-b-0">
      <div className="flex items-center justify-between">
        <span className="text-[7px] font-bold uppercase tracking-[0.2em] text-black/30">
          {title}
        </span>

        <Icon
          size={14}
          strokeWidth={1.4}
          className="text-therynox-orange"
        />
      </div>

      <p className="mt-8 text-2xl font-semibold tracking-[-0.06em]">
        {value}
      </p>

      <div className="mt-1 flex items-center gap-2">
        <span className="text-[7px] font-bold text-green-600">
          {label}
        </span>

        {label.startsWith("+") && (
          <ArrowUpRight
            size={10}
            className="text-green-600"
          />
        )}
      </div>
    </div>
  );
}

/* =========================================================
   OPERATION
========================================================= */

function Operation({
  icon: Icon,
  title,
  value,
  time,
}) {
  return (
    <motion.div
      whileHover={{
        x: 3,
      }}
      className="flex items-center gap-3 border-b border-black/5 py-4"
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#f5f5f2]">
        <Icon
          size={13}
          strokeWidth={1.4}
          className="text-black/35"
        />
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-[8px] font-semibold">
          {title}
        </p>

        <p className="mt-1 text-[7px] text-black/25">
          {value}
        </p>
      </div>

      <span className="text-[7px] text-black/20">
        {time}
      </span>
    </motion.div>
  );
}

/* =========================================================
   BUSINESS FLOW
========================================================= */

function BusinessFlow() {
  const steps = [
    {
      number: "01",
      title: "SALE",
      text: "Order created",
      icon: ShoppingCart,
    },
    {
      number: "02",
      title: "INVENTORY",
      text: "Stock automatically updated",
      icon: Boxes,
    },
    {
      number: "03",
      title: "FINANCE",
      text: "Invoice and payment recorded",
      icon: CircleDollarSign,
    },
    {
      number: "04",
      title: "REPORTING",
      text: "Management dashboard updated",
      icon: BarChart3,
    },
  ];

  return (
    <div className="rounded-[24px] border border-white/10 bg-white/[0.025] p-5 sm:p-7">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[8px] font-bold uppercase tracking-[0.25em] text-white/25">
            Automated workflow
          </p>

          <p className="mt-2 text-sm text-white/60">
            One transaction updates the business
          </p>
        </div>

        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <RefreshCw
            size={15}
            className="text-therynox-orange"
          />
        </motion.div>
      </div>

      <div className="mt-7 space-y-2">
        {steps.map((step, index) => {
          const Icon = step.icon;

          return (
            <React.Fragment key={step.number}>
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
                  <Icon
                    size={15}
                    className="text-therynox-orange"
                    strokeWidth={1.4}
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-[7px] font-bold uppercase tracking-[0.2em] text-white/25">
                    {step.number} · {step.title}
                  </p>

                  <p className="mt-1 text-[9px] text-white/50">
                    {step.text}
                  </p>
                </div>

                <Check
                  size={14}
                  className="text-green-400"
                />
              </motion.div>

              {index < steps.length - 1 && (
                <div className="flex justify-center">
                  <ArrowRight
                    size={12}
                    className="rotate-90 text-therynox-orange/50"
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      <div className="mt-6 rounded-xl border border-therynox-orange/20 bg-therynox-orange/5 p-4">
        <div className="flex items-center gap-3">
          <Sparkles
            size={14}
            className="text-therynox-orange"
          />

          <div>
            <p className="text-[7px] font-bold uppercase tracking-[0.18em] text-therynox-orange">
              Automatic
            </p>

            <p className="mt-1 text-[8px] text-white/40">
              No duplicate data entry required.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   BUSINESS INTELLIGENCE
========================================================= */

function BusinessIntelligence() {
  const stats = [
    {
      title: "Revenue",
      value: "₹42.8L",
      change: "+18.4%",
      icon: CircleDollarSign,
    },
    {
      title: "Orders",
      value: "1,284",
      change: "+12.8%",
      icon: ShoppingCart,
    },
    {
      title: "Stock Value",
      value: "₹18.6L",
      change: "+7.2%",
      icon: Boxes,
    },
  ];

  return (
    <div className="mx-auto max-w-7xl overflow-hidden rounded-[30px] border border-therynox-border bg-white">
      <div className="grid lg:grid-cols-[0.42fr_0.58fr]">
        {/* LEFT */}

        <div className="border-b border-therynox-border p-7 sm:p-10 lg:border-b-0 lg:border-r lg:p-12">
          <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-therynox-orange">
            Business intelligence
          </p>

          <h2 className="mt-6 text-4xl font-semibold leading-[0.95] tracking-[-0.06em] sm:text-5xl">
            See what
            <br />
            your business
            <br />
            is doing.
          </h2>

          <p className="mt-6 max-w-sm text-sm leading-7 text-therynox-muted">
            Turn daily business activity into clear information for better
            decisions.
          </p>

          <div className="mt-9 space-y-1">
            {[
              "Financial performance",
              "Sales performance",
              "Inventory health",
              "Operational activity",
              "Management reports",
            ].map((item, index) => (
              <div
                key={item}
                className="flex items-center justify-between border-b border-therynox-border py-3"
              >
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-therynox-orange" />

                  <span className="text-[8px] text-black/45">
                    {item}
                  </span>
                </div>

                <span className="text-[7px] text-black/20">
                  0{index + 1}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}

        <div className="bg-[#f6f6f3] p-6 sm:p-8">
          <div className="grid gap-3 sm:grid-cols-3">
            {stats.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
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
                  className="rounded-xl border border-black/10 bg-white p-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[7px] font-bold uppercase tracking-[0.16em] text-black/25">
                      {item.title}
                    </span>

                    <Icon
                      size={13}
                      className="text-therynox-orange"
                    />
                  </div>

                  <p className="mt-5 text-xl font-semibold tracking-[-0.05em]">
                    {item.value}
                  </p>

                  <span className="mt-2 inline-block text-[7px] font-bold text-green-600">
                    {item.change}
                  </span>
                </motion.div>
              );
            })}
          </div>

          {/* CHART */}

          <div className="mt-3 rounded-xl border border-black/10 bg-white p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[7px] font-bold uppercase tracking-[0.18em] text-black/25">
                  PERFORMANCE
                </p>

                <p className="mt-1 text-sm font-semibold">
                  Revenue overview
                </p>
              </div>

              <span className="rounded-full bg-therynox-orange/10 px-3 py-1.5 text-[7px] font-bold uppercase tracking-[0.15em] text-therynox-orange">
                2026
              </span>
            </div>

            <div className="relative mt-8 h-48">
              <div className="absolute inset-0 flex flex-col justify-between">
                {[1, 2, 3, 4, 5].map((line) => (
                  <div
                    key={line}
                    className="h-px bg-black/5"
                  />
                ))}
              </div>

              <svg
                viewBox="0 0 600 190"
                className="absolute inset-0 h-full w-full"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient
                    id="erpRevenueGradient"
                    x1="0"
                    x2="0"
                    y1="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="#ff7a00"
                      stopOpacity="0.20"
                    />

                    <stop
                      offset="100%"
                      stopColor="#ff7a00"
                      stopOpacity="0"
                    />
                  </linearGradient>
                </defs>

                <path
                  d="M0 155 C70 145 95 130 145 137 C205 145 220 108 275 112 C330 116 355 80 410 87 C465 94 490 52 535 60 C565 65 585 35 600 22 L600 190 L0 190 Z"
                  fill="url(#erpRevenueGradient)"
                />

                <path
                  d="M0 155 C70 145 95 130 145 137 C205 145 220 108 275 112 C330 116 355 80 410 87 C465 94 490 52 535 60 C565 65 585 35 600 22"
                  fill="none"
                  stroke="#ff7a00"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>

              <div className="absolute bottom-0 left-0 right-0 flex justify-between">
                {[
                  "JAN",
                  "FEB",
                  "MAR",
                  "APR",
                  "MAY",
                  "JUN",
                ].map((month) => (
                  <span
                    key={month}
                    className="text-[6px] font-bold tracking-[0.12em] text-black/20"
                  >
                    {month}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* INSIGHT */}

          <div className="mt-3 flex items-center gap-4 rounded-xl bg-[#0a0a0a] p-4 text-white">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-therynox-orange/10">
              <TrendingUp
                size={15}
                className="text-therynox-orange"
              />
            </div>

            <div className="flex-1">
              <p className="text-[7px] font-bold uppercase tracking-[0.18em] text-white/25">
                Business insight
              </p>

              <p className="mt-1 text-[9px] text-white/55">
                Revenue is trending 18.4% higher than the previous period.
              </p>
            </div>

            <ArrowUpRight
              size={14}
              className="text-therynox-orange"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 border-t border-therynox-border px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <span className="text-[8px] font-bold uppercase tracking-[0.25em] text-black/25">
          Finance · Sales · Inventory · Operations · Insights
        </span>

        <span className="text-[8px] uppercase tracking-[0.2em] text-black/20">
          Decisions backed by data
        </span>
      </div>
    </div>
  );
}