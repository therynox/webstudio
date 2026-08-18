import React from "react";
import {
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  MoreHorizontal,
  Plus,
  UserRound,
  Video,
  X,
} from "lucide-react";
import { motion } from "framer-motion";

import PageLayout from "../../components/layout/PageLayout";
import PageHeader from "../../components/layout/PageHeader";

const days = [
  { day: "MON", date: "12" },
  { day: "TUE", date: "13" },
  { day: "WED", date: "14", active: true },
  { day: "THU", date: "15" },
  { day: "FRI", date: "16" },
];

const appointments = [
  {
    time: "09:30",
    end: "10:15",
    name: "Aarav Studio",
    service: "Strategy Meeting",
    type: "Video call",
    color: "orange",
  },
  {
    time: "10:30",
    end: "11:30",
    name: "Noxwear",
    service: "Project Review",
    type: "In person",
    color: "dark",
  },
  {
    time: "13:00",
    end: "14:00",
    name: "Mehta Retail",
    service: "Website Consultation",
    type: "Video call",
    color: "orange",
  },
  {
    time: "15:30",
    end: "16:15",
    name: "Rynox",
    service: "Design Review",
    type: "In person",
    color: "dark",
  },
];

const upcoming = [
  {
    name: "Aarav Studio",
    service: "Strategy Meeting",
    time: "09:30",
    status: "Confirmed",
  },
  {
    name: "Noxwear",
    service: "Project Review",
    time: "10:30",
    status: "Confirmed",
  },
  {
    name: "Mehta Retail",
    service: "Website Consultation",
    time: "13:00",
    status: "Pending",
  },
  {
    name: "Rynox",
    service: "Design Review",
    time: "15:30",
    status: "Confirmed",
  },
];

export default function Booking() {
  return (
    <PageLayout showCTA={false}>
      <PageHeader
        eyebrow="SOLUTIONS / 06"
        number="06 / 06"
        title="Booking Systems."
        description="A smarter way to manage appointments, availability, teams and customer schedules without the back-and-forth."
      />

      {/* =====================================================
          INTRO
      ===================================================== */}

      <section className="px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-7xl">

          <div className="grid gap-10 lg:grid-cols-[1fr_0.55fr] lg:items-end">

            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-5xl text-4xl font-semibold leading-[0.94] tracking-[-0.065em] sm:text-5xl lg:text-7xl"
            >
              Your schedule,
              <br />
              <span className="text-black/25">without the chaos.</span>
            </motion.h2>

            <p className="max-w-md text-sm leading-7 text-therynox-muted sm:text-base">
              Give customers an easier way to book. Give your team a clearer
              way to work. Every appointment stays organised in one connected
              scheduling system.
            </p>

          </div>

        </div>
      </section>

      {/* =====================================================
          BOOKING COMMAND CENTER
      ===================================================== */}

      <section className="px-5 pb-20 sm:px-8 lg:px-12 lg:pb-28">

        <div className="mx-auto max-w-7xl overflow-hidden rounded-[30px] border border-therynox-border bg-white shadow-[0_30px_100px_rgba(0,0,0,0.06)]">

          {/* HEADER */}

          <div className="flex flex-col gap-5 border-b border-therynox-border px-5 py-5 sm:px-7 lg:flex-row lg:items-center lg:justify-between">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black">
                <CalendarDays
                  size={17}
                  className="text-therynox-orange"
                />
              </div>

              <div>
                <p className="text-[8px] font-bold uppercase tracking-[0.3em] text-black/30">
                  THERYNOX BOOKING
                </p>

                <p className="mt-1 text-sm font-semibold">
                  Schedule command center
                </p>
              </div>

            </div>

            <div className="flex items-center gap-3">

              <div className="flex items-center gap-2 rounded-full border border-therynox-border px-4 py-2.5">

                <span className="h-1.5 w-1.5 rounded-full bg-green-500" />

                <span className="text-[7px] font-bold uppercase tracking-[0.18em] text-black/35">
                  12 available slots
                </span>

              </div>

              <button
                type="button"
                className="flex items-center gap-2 rounded-full bg-black px-4 py-2.5 text-[7px] font-bold uppercase tracking-[0.18em] text-white transition hover:bg-therynox-orange hover:text-black"
              >
                <Plus size={12} />
                New booking
              </button>

            </div>

          </div>

          {/* CALENDAR TOOLBAR */}

          <div className="flex flex-col gap-5 border-b border-therynox-border px-5 py-5 sm:px-7 md:flex-row md:items-center md:justify-between">

            <div>

              <p className="text-[8px] font-bold uppercase tracking-[0.25em] text-therynox-orange">
                MAY 2026
              </p>

              <h3 className="mt-2 text-2xl font-semibold tracking-[-0.05em]">
                Weekly schedule
              </h3>

            </div>

            <div className="flex items-center gap-2">

              <button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-therynox-border"
              >
                <ChevronLeft size={14} />
              </button>

              <button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-therynox-border"
              >
                <ChevronRight size={14} />
              </button>

              <button
                type="button"
                className="ml-2 rounded-lg border border-therynox-border px-4 py-2.5 text-[7px] font-bold uppercase tracking-[0.18em]"
              >
                Today
              </button>

            </div>

          </div>

          {/* DAYS */}

          <div className="grid grid-cols-5 border-b border-therynox-border">

            {days.map((day) => (
              <div
                key={day.date}
                className={`border-r border-therynox-border px-3 py-4 text-center last:border-r-0 ${
                  day.active ? "bg-[#fff7f2]" : ""
                }`}
              >

                <p className="text-[7px] font-bold tracking-[0.2em] text-black/25">
                  {day.day}
                </p>

                <div
                  className={`mx-auto mt-2 flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
                    day.active
                      ? "bg-therynox-orange text-black"
                      : "text-black"
                  }`}
                >
                  {day.date}
                </div>

              </div>
            ))}

          </div>

          {/* MAIN CALENDAR */}

          <div className="grid lg:grid-cols-[1fr_300px]">

            {/* TIMELINE */}

            <div className="relative min-h-[650px] overflow-hidden border-b border-therynox-border lg:border-b-0 lg:border-r">

              {/* GRID */}

              <div className="absolute inset-0">

                {[
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00",
                  "13:00",
                  "14:00",
                  "15:00",
                  "16:00",
                  "17:00",
                ].map((time, index) => (
                  <div
                    key={time}
                    className="absolute left-0 right-0 flex"
                    style={{
                      top: `${index * 12.3}%`,
                    }}
                  >

                    <div className="w-16 shrink-0 px-3 pt-2 text-right text-[7px] font-medium text-black/25 sm:w-20">
                      {time}
                    </div>

                    <div className="h-px flex-1 bg-black/[0.06]" />

                  </div>
                ))}

              </div>

              {/* APPOINTMENT BLOCKS */}

              <div className="relative ml-16 min-h-[650px] pt-10 sm:ml-20">

                {appointments.map((appointment, index) => (
                  <AppointmentCard
                    key={appointment.name}
                    appointment={appointment}
                    index={index}
                  />
                ))}

                {/* CURRENT TIME */}

                <div
                  className="absolute left-0 right-5 top-[44%] flex items-center gap-2"
                >

                  <span className="h-2 w-2 rounded-full bg-therynox-orange" />

                  <div className="h-px flex-1 bg-therynox-orange" />

                  <span className="rounded-full bg-therynox-orange px-2 py-1 text-[6px] font-bold text-black">
                    NOW
                  </span>

                </div>

              </div>

            </div>

            {/* RIGHT PANEL */}

            <div className="bg-[#fafaf8] p-5 sm:p-7">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-[8px] font-bold uppercase tracking-[0.25em] text-therynox-orange">
                    Upcoming
                  </p>

                  <h3 className="mt-2 text-xl font-semibold tracking-[-0.04em]">
                    Today's bookings
                  </h3>
                </div>

                <MoreHorizontal
                  size={17}
                  className="text-black/30"
                />

              </div>

              <div className="mt-7 space-y-3">

                {upcoming.map((item, index) => (
                  <UpcomingBooking
                    key={item.name}
                    item={item}
                    index={index}
                  />
                ))}

              </div>

              {/* AVAILABILITY */}

              <div className="mt-7 rounded-2xl bg-black p-5 text-white">

                <div className="flex items-center justify-between">

                  <p className="text-[7px] font-bold uppercase tracking-[0.2em] text-white/30">
                    Availability
                  </p>

                  <Clock3
                    size={13}
                    className="text-therynox-orange"
                  />

                </div>

                <p className="mt-5 text-3xl font-semibold tracking-[-0.06em]">
                  82%
                </p>

                <p className="mt-1 text-[7px] text-white/25">
                  Schedule utilisation
                </p>

                <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/10">

                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "82%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="h-full rounded-full bg-therynox-orange"
                  />

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          SIMPLE BOOKING FLOW
      ===================================================== */}

      <section className="bg-[#090909] px-5 py-24 text-white sm:px-8 lg:px-12 lg:py-32">

        <div className="mx-auto max-w-7xl">

          <div className="grid gap-16 lg:grid-cols-[0.42fr_0.58fr]">

            <div>

              <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-therynox-orange">
                Booking Flow
              </p>

              <h2 className="mt-6 text-4xl font-semibold leading-[0.94] tracking-[-0.06em] sm:text-5xl">
                From open slot
                <br />
                to confirmed.
              </h2>

              <p className="mt-6 max-w-md text-sm leading-7 text-white/35">
                Customers choose a time. Your team gets the notification.
                Everyone knows what happens next.
              </p>

            </div>

            <div className="space-y-3">

              <FlowStep
                number="01"
                title="Choose a service"
                text="Customers select exactly what they need."
                icon={CalendarDays}
              />

              <FlowStep
                number="02"
                title="Find an available time"
                text="Only real available slots are displayed."
                icon={Clock3}
              />

              <FlowStep
                number="03"
                title="Confirm customer"
                text="Capture the customer details and booking preferences."
                icon={UserRound}
              />

              <FlowStep
                number="04"
                title="Booking confirmed"
                text="Everyone receives the confirmation automatically."
                icon={Check}
              />

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          FEATURES
      ===================================================== */}

      <section className="px-5 py-24 sm:px-8 lg:px-12 lg:py-32">

        <div className="mx-auto max-w-7xl">

          <div className="mb-14 max-w-2xl">

            <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-therynox-orange">
              Booking Capabilities
            </p>

            <h2 className="mt-5 text-4xl font-semibold leading-[0.95] tracking-[-0.06em] sm:text-5xl">
              Scheduling that
              <br />
              works around you.
            </h2>

          </div>

          <div className="grid border-l border-t border-therynox-border sm:grid-cols-2 lg:grid-cols-4">

            <Feature
              number="01"
              icon={CalendarDays}
              title="Smart Calendar"
              text="See appointments, availability and team schedules in one clear view."
            />

            <Feature
              number="02"
              icon={Clock3}
              title="Availability"
              text="Automatically prevent double bookings and unavailable time slots."
            />

            <Feature
              number="03"
              icon={UserRound}
              title="Customer Booking"
              text="Let customers book appointments without endless messages or calls."
            />

            <Feature
              number="04"
              icon={Video}
              title="Online Meetings"
              text="Connect bookings with online meeting workflows when needed."
            />

          </div>

        </div>

      </section>

      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="px-5 pb-24 sm:px-8 lg:px-12 lg:pb-32">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-7xl overflow-hidden rounded-[30px] bg-[#f0f0ed] p-8 sm:p-12 lg:p-16"
        >

          <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">

            <div>

              <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-therynox-orange">
                Build your booking experience
              </p>

              <h2 className="mt-6 max-w-3xl text-4xl font-semibold leading-[0.94] tracking-[-0.06em] sm:text-5xl lg:text-6xl">
                Less scheduling.
                <br />
                More doing.
              </h2>

            </div>

            <a
              href="/contact"
              className="group inline-flex shrink-0 items-center justify-center gap-3 rounded-full bg-black px-7 py-5 text-[9px] font-bold uppercase tracking-[0.18em] text-white transition hover:bg-therynox-orange hover:text-black"
            >
              Discuss Booking System
              <ArrowUpRight
                size={15}
                className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </a>

          </div>

        </motion.div>

      </section>

    </PageLayout>
  );
}

/* =========================================================
   APPOINTMENT CARD
========================================================= */

function AppointmentCard({ appointment, index }) {
  const positions = [
    {
      top: "4%",
      left: "10%",
      width: "39%",
      height: "13%",
    },
    {
      top: "17%",
      left: "48%",
      width: "42%",
      height: "16%",
    },
    {
      top: "47%",
      left: "15%",
      width: "43%",
      height: "16%",
    },
    {
      top: "76%",
      left: "50%",
      width: "39%",
      height: "13%",
    },
  ];

  const position = positions[index];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className={`absolute overflow-hidden rounded-xl border p-3 ${
        appointment.color === "orange"
          ? "border-orange-200 bg-[#fff5ed]"
          : "border-black/10 bg-white"
      }`}
      style={{
        top: position.top,
        left: position.left,
        width: position.width,
        height: position.height,
      }}
    >

      <div className="flex h-full flex-col justify-between">

        <div className="flex items-start justify-between gap-2">

          <div className="min-w-0">

            <p className="truncate text-[7px] font-bold uppercase tracking-[0.1em] text-black/30">
              {appointment.time} — {appointment.end}
            </p>

            <p className="mt-1 truncate text-[8px] font-semibold">
              {appointment.name}
            </p>

          </div>

          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" />

        </div>

        <p className="truncate text-[7px] text-black/30">
          {appointment.service}
        </p>

      </div>

    </motion.div>
  );
}

/* =========================================================
   UPCOMING BOOKING
========================================================= */

function UpcomingBooking({
  item,
  index,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 15 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
      className="rounded-xl border border-therynox-border bg-white p-4"
    >

      <div className="flex items-start gap-3">

        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#f4f4f1]">

          <UserRound
            size={13}
            className="text-black/35"
          />

        </div>

        <div className="min-w-0 flex-1">

          <div className="flex items-start justify-between gap-2">

            <div>

              <p className="truncate text-[8px] font-semibold">
                {item.name}
              </p>

              <p className="mt-1 truncate text-[7px] text-black/30">
                {item.service}
              </p>

            </div>

            <span className="text-[8px] font-semibold">
              {item.time}
            </span>

          </div>

          <div className="mt-3 flex items-center gap-2">

            <span
              className={`h-1.5 w-1.5 rounded-full ${
                item.status === "Confirmed"
                  ? "bg-green-500"
                  : "bg-therynox-orange"
              }`}
            />

            <span className="text-[6px] font-bold uppercase tracking-[0.16em] text-black/25">
              {item.status}
            </span>

          </div>

        </div>

      </div>

    </motion.div>
  );
}

/* =========================================================
   FLOW STEP
========================================================= */

function FlowStep({
  number,
  title,
  text,
  icon: Icon,
}) {
  return (
    <motion.div
      whileHover={{ x: 4 }}
      className="flex gap-5 rounded-2xl border border-white/10 bg-white/[0.025] p-5"
    >

      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-therynox-orange text-black">

        <Icon size={15} />

      </div>

      <div className="flex-1">

        <div className="flex items-center gap-3">

          <span className="text-[7px] font-bold tracking-[0.2em] text-therynox-orange">
            {number}
          </span>

          <h3 className="text-sm font-semibold">
            {title}
          </h3>

        </div>

        <p className="mt-2 text-[8px] leading-5 text-white/30">
          {text}
        </p>

      </div>

    </motion.div>
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
      whileHover={{ y: -4 }}
      className="border-b border-r border-therynox-border p-6 sm:p-8 lg:min-h-[260px]"
    >

      <div className="flex items-start justify-between">

        <span className="text-[8px] font-bold tracking-[0.2em] text-therynox-orange">
          {number}
        </span>

        <Icon
          size={18}
          strokeWidth={1.4}
          className="text-black/25"
        />

      </div>

      <h3 className="mt-12 text-xl font-semibold tracking-[-0.04em]">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-6 text-therynox-muted">
        {text}
      </p>

    </motion.div>
  );
}