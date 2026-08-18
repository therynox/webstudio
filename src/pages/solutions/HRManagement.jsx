import React from "react";
import {
  Activity,
  ArrowUpRight,
  BarChart3,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  Clock3,
  CreditCard,
  FileText,
  MapPin,
  MoreHorizontal,
  UserCheck,
  Users,
  UserRoundPlus,
  WalletCards,
} from "lucide-react";
import { motion } from "framer-motion";

import PageLayout from "../../components/layout/PageLayout";
import PageHeader from "../../components/layout/PageHeader";

const departments = [
  {
    name: "Engineering",
    people: 42,
    percentage: 78,
  },
  {
    name: "Operations",
    people: 67,
    percentage: 91,
  },
  {
    name: "Sales",
    people: 31,
    percentage: 64,
  },
  {
    name: "Design",
    people: 18,
    percentage: 52,
  },
];

const attendance = [
  {
    name: "Aarav Shah",
    role: "Engineering",
    time: "09:02",
    status: "Present",
  },
  {
    name: "Riya Patel",
    role: "Design",
    time: "09:08",
    status: "Present",
  },
  {
    name: "Dev Mehta",
    role: "Sales",
    time: "09:14",
    status: "Present",
  },
  {
    name: "Mira Joshi",
    role: "Operations",
    time: "09:26",
    status: "Late",
  },
];

const leaveRequests = [
  {
    name: "Karan Patel",
    type: "Annual leave",
    dates: "12 — 14 Aug",
    avatar: "KP",
  },
  {
    name: "Neha Shah",
    type: "Personal leave",
    dates: "15 Aug",
    avatar: "NS",
  },
  {
    name: "Arjun Mehta",
    type: "Sick leave",
    dates: "18 — 19 Aug",
    avatar: "AM",
  },
];

export default function HRManagement() {
  return (
    <PageLayout showCTA={false}>
      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <PageHeader
        eyebrow="SOLUTIONS / 03"
        number="03 / 06"
        title="HR Management."
        description="Manage your people, attendance, leave, payroll and workforce operations from one focused system."
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
              className="max-w-5xl text-4xl font-semibold leading-[0.94] tracking-[-0.065em] sm:text-5xl lg:text-6xl"
            >
              Your people.
              <br />
              Your teams.
              <br />
              <span className="text-therynox-orange">
                One workspace.
              </span>
            </motion.h2>

            <p className="max-w-md text-sm leading-7 text-therynox-muted sm:text-base">
              Give your team a simple place to manage attendance, leave,
              payroll and everyday people operations without spreadsheets
              scattered across the business.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          HR WORKSPACE
      ===================================================== */}

      <HRWorkspace />

      {/* =====================================================
          STATEMENT
      ===================================================== */}

      <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_0.3fr]">
            <h2 className="max-w-5xl text-4xl font-semibold leading-[0.96] tracking-[-0.06em] sm:text-5xl lg:text-6xl">
              Less paperwork.
              <br />
              Better visibility.
              <br />
              <span className="text-therynox-orange">
                Happier teams.
              </span>
            </h2>

            <p className="max-w-sm text-sm leading-7 text-therynox-muted">
              Keep employee information, attendance, leave and payroll
              connected so your team can spend less time managing HR admin.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          HR FEATURES
      ===================================================== */}

      <section className="border-t border-therynox-border px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-[0.4fr_0.6fr]">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-therynox-orange">
                People Operations
              </p>

              <h2 className="mt-6 max-w-sm text-4xl font-semibold leading-[0.95] tracking-[-0.06em] sm:text-5xl">
                Everything
                <br />
                your team
                <br />
                needs.
              </h2>

              <p className="mt-6 max-w-sm text-sm leading-6 text-therynox-muted">
                A focused HR workspace for the daily tasks that keep your
                organisation moving.
              </p>
            </div>

            <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2">
              <Feature
                number="01"
                icon={Users}
                title="Employee Directory"
                text="Keep employee profiles, roles, departments and contact information organised."
              />

              <Feature
                number="02"
                icon={Clock3}
                title="Attendance"
                text="See who is working, who is late and who is away in real time."
              />

              <Feature
                number="03"
                icon={CalendarDays}
                title="Leave Management"
                text="Review leave requests, balances and upcoming absences."
              />

              <Feature
                number="04"
                icon={WalletCards}
                title="Payroll"
                text="Keep salary information and payroll operations structured."
              />

              <Feature
                number="05"
                icon={BriefcaseBusiness}
                title="Departments"
                text="Organise people into teams and understand workforce distribution."
              />

              <Feature
                number="06"
                icon={BarChart3}
                title="Workforce Insights"
                text="Turn employee activity into useful information for management."
              />
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          ATTENDANCE
      ===================================================== */}

      <section className="bg-[#090909] px-5 py-24 text-white sm:px-8 lg:px-12 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-[0.38fr_0.62fr] lg:items-start">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-therynox-orange">
                Daily Attendance
              </p>

              <h2 className="mt-6 max-w-md text-4xl font-semibold leading-[0.95] tracking-[-0.06em] sm:text-5xl">
                Know who's
                <br />
                here.
                <br />
                <span className="text-white/25">
                  In real time.
                </span>
              </h2>

              <p className="mt-6 max-w-md text-sm leading-7 text-white/40">
                Give managers a clear picture of today's workforce without
                manually checking spreadsheets or messages.
              </p>

              <div className="mt-8 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-400/10">
                  <CheckCircle2
                    size={15}
                    className="text-green-400"
                  />
                </div>

                <div>
                  <p className="text-[8px] font-semibold">
                    231 employees present
                  </p>

                  <p className="mt-1 text-[7px] text-white/25">
                    93.1% attendance today
                  </p>
                </div>
              </div>
            </div>

            <AttendancePanel />
          </div>
        </div>
      </section>

      {/* =====================================================
          DEPARTMENTS
      ===================================================== */}

      <section className="px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-therynox-orange">
                Workforce
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.06em] sm:text-5xl">
                Understand your
                <br />
                organisation.
              </h2>
            </div>

            <p className="max-w-sm text-sm leading-6 text-therynox-muted">
              See how your people are distributed across teams and departments
              at a glance.
            </p>
          </div>

          <div className="mt-14 grid border-t border-therynox-border sm:grid-cols-2">
            {departments.map((department, index) => (
              <DepartmentCard
                key={department.name}
                department={department}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          LEAVE MANAGEMENT
      ===================================================== */}

      <section className="px-5 pb-24 sm:px-8 lg:px-12 lg:pb-32">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[30px] border border-therynox-border bg-[#f7f7f4]">
          <div className="grid lg:grid-cols-[0.42fr_0.58fr]">
            <div className="border-b border-therynox-border p-7 sm:p-10 lg:border-b-0 lg:border-r lg:p-12">
              <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-therynox-orange">
                Leave Management
              </p>

              <h2 className="mt-6 text-4xl font-semibold leading-[0.95] tracking-[-0.06em] sm:text-5xl">
                Time off
                <br />
                made
                <br />
                simple.
              </h2>

              <p className="mt-6 max-w-sm text-sm leading-7 text-therynox-muted">
                Employees can request time off while managers get a simple
                view of what needs their attention.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-2">
                <SmallStat
                  value="17"
                  label="On leave"
                />

                <SmallStat
                  value="06"
                  label="Pending"
                />
              </div>
            </div>

            <div className="bg-white p-6 sm:p-8 lg:p-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[7px] font-bold uppercase tracking-[0.22em] text-black/30">
                    REQUESTS
                  </p>

                  <h3 className="mt-2 text-lg font-semibold tracking-[-0.04em]">
                    Recent leave
                  </h3>
                </div>

                <button
                  type="button"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-black/10"
                >
                  <MoreHorizontal
                    size={14}
                    className="text-black/40"
                  />
                </button>
              </div>

              <div className="mt-7 space-y-2">
                {leaveRequests.map((request, index) => (
                  <LeaveRow
                    key={request.name}
                    request={request}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t border-therynox-border px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <span className="text-[8px] font-bold uppercase tracking-[0.25em] text-black/25">
              Attendance · Leave · Payroll · People
            </span>

            <span className="text-[8px] uppercase tracking-[0.2em] text-black/20">
              People operations, simplified
            </span>
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
                Build better people operations
              </p>

              <h2 className="mt-6 max-w-3xl text-4xl font-semibold leading-[0.95] tracking-[-0.06em] text-black sm:text-5xl lg:text-6xl">
                Give your team
                <br />
                a better way to work.
              </h2>
            </div>

            <a
              href="/contact"
              className="group inline-flex shrink-0 items-center justify-center gap-3 rounded-full bg-[#090909] px-7 py-5 text-[9px] font-bold uppercase tracking-[0.18em] text-white transition hover:bg-white hover:text-black"
            >
              Discuss Your HR System

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
   HR WORKSPACE
========================================================= */

function HRWorkspace() {
  return (
    <section className="px-5 pb-10 sm:px-8 lg:px-12 lg:pb-16">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[30px] border border-black/10 bg-white">

        {/* PRODUCT HEADER */}

        <div className="flex flex-col justify-between gap-4 border-b border-black/10 px-6 py-5 sm:flex-row sm:items-center sm:px-8">
          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#090909]">
              <Users
                size={16}
                strokeWidth={1.4}
                className="text-white"
              />
            </div>

            <div>
              <p className="text-[8px] font-bold uppercase tracking-[0.3em] text-black/35">
                THERYNOX HR
              </p>

              <p className="mt-1 text-xs font-medium">
                People operations
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">

            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />

            <span className="text-[7px] font-bold uppercase tracking-[0.2em] text-black/30">
              Workforce online
            </span>

          </div>
        </div>

        {/* DASHBOARD */}

        <div className="bg-[#f7f7f4] p-5 sm:p-8 lg:p-10">

          {/* TOP */}

          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">

            <div>
              <p className="text-[8px] font-bold uppercase tracking-[0.3em] text-therynox-orange">
                PEOPLE OPERATIONS
              </p>

              <h3 className="mt-3 text-3xl font-semibold leading-[0.95] tracking-[-0.06em] sm:text-4xl">
                Your workforce,
                <br />
                <span className="text-black/25">
                  under control.
                </span>
              </h3>
            </div>

            <div className="flex items-center gap-3 rounded-full border border-black/10 bg-white px-4 py-2.5">
              <CalendarDays
                size={12}
                className="text-therynox-orange"
              />

              <span className="text-[7px] font-bold uppercase tracking-[0.15em] text-black/35">
                Today · 13 Aug 2026
              </span>
            </div>

          </div>

          {/* METRICS */}

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

            <HRMetric
              title="Employees"
              value="248"
              label="+12 this month"
              icon={Users}
            />

            <HRMetric
              title="Present"
              value="231"
              label="93.1% today"
              icon={UserCheck}
            />

            <HRMetric
              title="On Leave"
              value="17"
              label="6 pending requests"
              icon={CalendarDays}
            />

            <HRMetric
              title="Payroll"
              value="₹18.4L"
              label="Current month"
              icon={WalletCards}
            />

          </div>

          {/* MAIN GRID */}

          <div className="mt-3 grid gap-3 lg:grid-cols-[1.35fr_0.65fr]">

            {/* ATTENDANCE */}

            <div className="rounded-2xl border border-black/10 bg-white p-5 sm:p-7">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-[7px] font-bold uppercase tracking-[0.22em] text-black/30">
                    TODAY
                  </p>

                  <h4 className="mt-2 text-lg font-semibold tracking-[-0.04em]">
                    Attendance
                  </h4>
                </div>

                <span className="rounded-full bg-green-500/10 px-3 py-1.5 text-[7px] font-bold uppercase tracking-[0.15em] text-green-600">
                  231 present
                </span>

              </div>

              <div className="mt-6 space-y-1">

                {attendance.map((person, index) => (
                  <AttendanceRow
                    key={person.name}
                    person={person}
                    index={index}
                  />
                ))}

              </div>

              <div className="mt-5 flex items-center justify-between border-t border-black/5 pt-4">

                <span className="text-[7px] text-black/25">
                  17 employees are away today
                </span>

                <ArrowUpRight
                  size={12}
                  className="text-therynox-orange"
                />

              </div>

            </div>

            {/* TEAM SNAPSHOT */}

            <div className="rounded-2xl border border-black/10 bg-[#090909] p-5 text-white sm:p-7">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-[7px] font-bold uppercase tracking-[0.22em] text-white/25">
                    TEAM SNAPSHOT
                  </p>

                  <h4 className="mt-2 text-lg font-semibold tracking-[-0.04em]">
                    Workforce
                  </h4>
                </div>

                <Activity
                  size={15}
                  className="text-therynox-orange"
                />

              </div>

              <div className="mt-8">

                <div className="flex items-end justify-between">
                  <span className="text-[7px] uppercase tracking-[0.18em] text-white/25">
                    Attendance rate
                  </span>

                  <span className="text-2xl font-semibold tracking-[-0.06em]">
                    93.1%
                  </span>
                </div>

                <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">

                  <motion.div
                    initial={{
                      width: 0,
                    }}
                    whileInView={{
                      width: "93.1%",
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      duration: 1.1,
                    }}
                    className="h-full rounded-full bg-therynox-orange"
                  />

                </div>

              </div>

              <div className="mt-8 space-y-3">

                <MiniDarkStat
                  icon={Clock3}
                  title="On time"
                  value="218"
                />

                <MiniDarkStat
                  icon={Activity}
                  title="Late"
                  value="13"
                />

                <MiniDarkStat
                  icon={CalendarDays}
                  title="Away"
                  value="17"
                />

              </div>

            </div>

          </div>

        </div>

        {/* FOOTER */}

        <div className="flex flex-col gap-3 border-t border-black/10 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">

          <span className="text-[8px] font-bold uppercase tracking-[0.25em] text-black/25">
            People · Attendance · Leave · Payroll
          </span>

          <span className="text-[8px] uppercase tracking-[0.2em] text-black/20">
            People operations, simplified
          </span>

        </div>

      </div>
    </section>
  );
}

/* =========================================================
   ATTENDANCE PANEL
========================================================= */

function AttendancePanel() {
  return (
    <div className="overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.035]">

      <div className="flex items-center justify-between border-b border-white/10 px-5 py-5 sm:px-6">

        <div>
          <p className="text-[7px] font-bold uppercase tracking-[0.22em] text-white/25">
            LIVE ATTENDANCE
          </p>

          <h3 className="mt-2 text-lg font-semibold tracking-[-0.04em]">
            Today's check-ins
          </h3>
        </div>

        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-400/10">
          <UserCheck
            size={15}
            className="text-green-400"
          />
        </div>

      </div>

      <div className="divide-y divide-white/10">

        {attendance.map((person, index) => (
          <motion.div
            key={person.name}
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
              delay: index * 0.08,
            }}
            className="flex items-center gap-4 px-5 py-4 sm:px-6"
          >

            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/5 text-[8px] font-semibold text-white/50">
              {person.name
                .split(" ")
                .map((part) => part[0])
                .join("")}
            </div>

            <div className="min-w-0 flex-1">

              <p className="truncate text-[9px] font-semibold">
                {person.name}
              </p>

              <p className="mt-1 text-[7px] text-white/25">
                {person.role}
              </p>

            </div>

            <div className="text-right">

              <p className="text-[9px] font-semibold">
                {person.time}
              </p>

              <p
                className={`mt-1 text-[6px] font-bold uppercase tracking-[0.15em] ${
                  person.status === "Late"
                    ? "text-therynox-orange"
                    : "text-green-400"
                }`}
              >
                {person.status}
              </p>

            </div>

          </motion.div>
        ))}

      </div>

      <div className="border-t border-white/10 px-5 py-4 sm:px-6">

        <div className="flex items-center justify-between">

          <span className="text-[7px] text-white/25">
            Last updated just now
          </span>

          <span className="flex items-center gap-2 text-[7px] font-bold uppercase tracking-[0.15em] text-white/30">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
            Live
          </span>

        </div>

      </div>

    </div>
  );
}

/* =========================================================
   HR METRIC
========================================================= */

function HRMetric({
  title,
  value,
  label,
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

      <p className="mt-2 text-[7px] font-medium text-green-600">
        {label}
      </p>
    </motion.div>
  );
}

/* =========================================================
   ATTENDANCE ROW
========================================================= */

function AttendanceRow({
  person,
  index,
}) {
  return (
    <motion.div
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
        delay: index * 0.06,
      }}
      className="flex items-center gap-3 border-b border-black/5 py-4 last:border-b-0"
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f5f4f0] text-[7px] font-bold text-black/35">
        {person.name
          .split(" ")
          .map((part) => part[0])
          .join("")}
      </div>

      <div className="min-w-0 flex-1">

        <p className="truncate text-[8px] font-semibold">
          {person.name}
        </p>

        <p className="mt-1 text-[7px] text-black/25">
          {person.role}
        </p>

      </div>

      <div className="text-right">

        <p className="text-[8px] font-semibold">
          {person.time}
        </p>

        <span
          className={`mt-1 inline-block text-[6px] font-bold uppercase tracking-[0.12em] ${
            person.status === "Late"
              ? "text-therynox-orange"
              : "text-green-600"
          }`}
        >
          {person.status}
        </span>

      </div>
    </motion.div>
  );
}

/* =========================================================
   MINI DARK STAT
========================================================= */

function MiniDarkStat({
  icon: Icon,
  title,
  value,
}) {
  return (
    <div className="flex items-center gap-3 border-b border-white/10 pb-3 last:border-b-0">

      <Icon
        size={13}
        className="text-white/30"
        strokeWidth={1.4}
      />

      <span className="flex-1 text-[8px] text-white/35">
        {title}
      </span>

      <span className="text-[9px] font-semibold">
        {value}
      </span>

    </div>
  );
}

/* =========================================================
   FEATURE
========================================================= */

function Feature({
  number,
  icon: Icon,
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
      className="group border-t border-therynox-border pt-5"
    >
      <div className="flex items-start justify-between">

        <span className="text-[9px] font-bold tracking-[0.2em] text-therynox-orange">
          {number}
        </span>

        <Icon
          size={18}
          strokeWidth={1.4}
          className="text-therynox-muted transition-colors duration-300 group-hover:text-therynox-orange"
        />

      </div>

      <h3 className="mt-7 text-xl font-semibold tracking-[-0.04em]">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-6 text-therynox-muted">
        {text}
      </p>
    </motion.div>
  );
}

/* =========================================================
   DEPARTMENT CARD
========================================================= */

function DepartmentCard({
  department,
  index,
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
      transition={{
        delay: index * 0.08,
      }}
      className="border-b border-therynox-border p-6 sm:p-8"
    >
      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm font-semibold tracking-[-0.03em]">
            {department.name}
          </p>

          <p className="mt-1 text-[8px] text-therynox-muted">
            {department.people} employees
          </p>
        </div>

        <ArrowUpRight
          size={15}
          className="text-therynox-orange"
        />

      </div>

      <div className="mt-7 h-2 overflow-hidden rounded-full bg-black/5">

        <motion.div
          initial={{
            width: 0,
          }}
          whileInView={{
            width: `${department.percentage}%`,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 1,
            delay: index * 0.08,
          }}
          className="h-full rounded-full bg-therynox-orange"
        />

      </div>

      <div className="mt-3 flex items-center justify-between">

        <span className="text-[7px] uppercase tracking-[0.15em] text-black/25">
          Workforce share
        </span>

        <span className="text-[8px] font-semibold">
          {department.percentage}%
        </span>

      </div>
    </motion.div>
  );
}

/* =========================================================
   SMALL STAT
========================================================= */

function SmallStat({
  value,
  label,
}) {
  return (
    <div className="rounded-xl border border-black/10 bg-white p-4">

      <p className="text-2xl font-semibold tracking-[-0.05em]">
        {value}
      </p>

      <p className="mt-1 text-[7px] uppercase tracking-[0.15em] text-black/25">
        {label}
      </p>

    </div>
  );
}

/* =========================================================
   LEAVE ROW
========================================================= */

function LeaveRow({
  request,
  index,
}) {
  return (
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
        delay: index * 0.08,
      }}
      className="flex items-center gap-3 rounded-xl border border-black/5 bg-[#f7f7f4] p-3"
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[7px] font-bold text-black/35">
        {request.avatar}
      </div>

      <div className="min-w-0 flex-1">

        <p className="truncate text-[8px] font-semibold">
          {request.name}
        </p>

        <p className="mt-1 text-[7px] text-black/25">
          {request.type}
        </p>

      </div>

      <div className="text-right">

        <p className="text-[7px] font-semibold">
          {request.dates}
        </p>

        <span className="mt-1 inline-block text-[6px] font-bold uppercase tracking-[0.12em] text-therynox-orange">
          Review
        </span>

      </div>
    </motion.div>
  );
}