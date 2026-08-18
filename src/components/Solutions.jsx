import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  ChevronRight,
  Building2,
  Users,
  Package,
  CreditCard,
  GraduationCap,
  HeartPulse,
  Scissors,
  Utensils,
  CalendarDays,
} from "lucide-react";

const solutions = [
  {
    number: "01",
    title: "CRM System",
    description:
      "Manage customers, leads, communication, follow-ups and sales from one intelligent workspace.",
    icon: Users,
    tags: ["Customers", "Leads", "Sales"],
  },
  {
    number: "02",
    title: "ERP System",
    description:
      "Connect finance, operations, inventory, employees and business processes into one platform.",
    icon: Building2,
    tags: ["Operations", "Finance", "Reports"],
  },
  {
    number: "03",
    title: "HR Management",
    description:
      "Simplify employee management, attendance, payroll, leave and performance tracking.",
    icon: Users,
    tags: ["Employees", "Payroll", "Attendance"],
  },
  {
    number: "04",
    title: "Inventory Management",
    description:
      "Track products, stock movement, suppliers, warehouses and inventory performance in real time.",
    icon: Package,
    tags: ["Products", "Stock", "Warehouse"],
  },
  {
    number: "05",
    title: "Billing & POS",
    description:
      "Fast billing and point-of-sale systems designed for modern stores and service businesses.",
    icon: CreditCard,
    tags: ["Billing", "POS", "Payments"],
  },
  {
    number: "06",
    title: "School Management",
    description:
      "Manage students, teachers, attendance, fees, exams, classes and communication.",
    icon: GraduationCap,
    tags: ["Students", "Teachers", "Fees"],
  },
  {
    number: "07",
    title: "Hospital Management",
    description:
      "Digitize appointments, patients, doctors, billing, records and hospital operations.",
    icon: HeartPulse,
    tags: ["Patients", "Doctors", "Appointments"],
  },
  {
    number: "08",
    title: "Salon Management",
    description:
      "Complete salon operating system for appointments, staff, customers, POS and daily business.",
    icon: Scissors,
    tags: ["Appointments", "Staff", "POS"],
  },
  {
    number: "09",
    title: "Restaurant Management",
    description:
      "Manage tables, orders, kitchen operations, billing, inventory and restaurant performance.",
    icon: Utensils,
    tags: ["Tables", "Kitchen", "Orders"],
  },
  {
    number: "10",
    title: "Booking System",
    description:
      "Powerful booking experiences for appointments, services, events and reservations.",
    icon: CalendarDays,
    tags: ["Bookings", "Calendar", "Payments"],
  },
];

export default function Solutions() {
  const [active, setActive] = useState(0);

  const current = solutions[active];
  const CurrentIcon = current.icon;

  return (
    <section
      id="solutions"
      className="relative w-full overflow-hidden bg-[#f4f2ed] text-[#111]"
    >
      <div className="mx-auto max-w-[1600px] px-6 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40">

        {/* HEADER */}

        <div className="grid gap-12 lg:grid-cols-[0.75fr_2fr]">

          <div>
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-[#ff5722]" />

              <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-black/45">
                Business solutions
              </span>
            </div>
          </div>

          <div>
            <motion.h2
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="
                max-w-5xl
                text-5xl
                font-medium
                leading-[0.9]
                tracking-[-0.055em]
                sm:text-6xl
                md:text-7xl
                lg:text-[7rem]
              "
            >
              Digital systems
              <br />
              for real{" "}
              <span className="text-[#ff5722]">
                businesses.
              </span>
            </motion.h2>

            <p className="mt-8 max-w-xl text-base leading-7 text-black/55 sm:text-lg">
              We build custom software around the way your
              business actually works — not the other way around.
            </p>
          </div>

        </div>

        {/* SOLUTION SHOWCASE */}

        <div className="mt-24 grid gap-6 lg:grid-cols-[0.8fr_1.7fr]">

          {/* LEFT LIST */}

          <div className="border-t border-black/15">

            {solutions.map((solution, index) => {
              const Icon = solution.icon;
              const isActive = active === index;

              return (
                <button
                  key={solution.number}
                  type="button"
                  onClick={() => setActive(index)}
                  className={`
                    group
                    flex
                    w-full
                    items-center
                    gap-4
                    border-b
                    border-black/15
                    px-3
                    py-5
                    text-left
                    transition-all
                    duration-300
                    sm:px-5
                    ${
                      isActive
                        ? "bg-[#111] text-white"
                        : "hover:bg-black/[0.04]"
                    }
                  `}
                >
                  <span
                    className={`
                      w-7
                      text-[8px]
                      font-semibold
                      tracking-[0.15em]
                      ${
                        isActive
                          ? "text-white/40"
                          : "text-black/30"
                      }
                    `}
                  >
                    {solution.number}
                  </span>

                  <Icon
                    size={16}
                    strokeWidth={1.5}
                    className={
                      isActive
                        ? "text-[#ff5722]"
                        : "text-black/40"
                    }
                  />

                  <span className="flex-1 text-sm font-medium sm:text-base">
                    {solution.title}
                  </span>

                  <ChevronRight
                    size={15}
                    className={`
                      transition-transform
                      duration-300
                      ${
                        isActive
                          ? "translate-x-1 text-[#ff5722]"
                          : "text-black/25"
                      }
                    `}
                  />
                </button>
              );
            })}

          </div>

          {/* RIGHT FEATURE */}

          <div
            className="
              relative
              min-h-[520px]
              overflow-hidden
              bg-[#111]
              text-white
              sm:min-h-[600px]
            "
          >

            {/* GRID */}

            <div
              className="
                absolute
                inset-0
                opacity-[0.08]
                [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)]
                [background-size:50px_50px]
              "
            />

            {/* ORANGE GLOW */}

            <div
              className="
                absolute
                right-[-100px]
                top-[-100px]
                h-[350px]
                w-[350px]
                rounded-full
                bg-[#ff5722]
                opacity-20
                blur-[100px]
              "
            />

            <AnimatePresence mode="wait">

              <motion.div
                key={current.number}
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -20,
                }}
                transition={{
                  duration: 0.45,
                }}
                className="
                  relative
                  z-10
                  flex
                  h-full
                  min-h-[520px]
                  flex-col
                  justify-between
                  p-7
                  sm:min-h-[600px]
                  sm:p-10
                  lg:p-12
                "
              >

                {/* TOP */}

                <div className="flex items-start justify-between">

                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-white/35">
                      Custom business system
                    </p>

                    <p className="mt-3 text-[10px] text-white/30">
                      {current.number} / {String(solutions.length).padStart(2, "0")}
                    </p>
                  </div>

                  <div
                    className="
                      flex
                      h-14
                      w-14
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-white/15
                      bg-white/[0.04]
                    "
                  >
                    <CurrentIcon
                      size={23}
                      strokeWidth={1.3}
                      className="text-[#ff5722]"
                    />
                  </div>

                </div>

                {/* CENTER */}

                <div>

                  <motion.h3
                    key={`title-${current.number}`}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="
                      max-w-3xl
                      text-5xl
                      font-medium
                      leading-[0.9]
                      tracking-[-0.05em]
                      sm:text-6xl
                      md:text-7xl
                    "
                  >
                    {current.title}
                  </motion.h3>

                  <p
                    className="
                      mt-7
                      max-w-xl
                      text-sm
                      leading-6
                      text-white/50
                      sm:text-base
                    "
                  >
                    {current.description}
                  </p>

                  <div className="mt-7 flex flex-wrap gap-2">
                    {current.tags.map((tag) => (
                      <span
                        key={tag}
                        className="
                          border
                          border-white/15
                          px-3
                          py-2
                          text-[8px]
                          font-semibold
                          uppercase
                          tracking-[0.15em]
                          text-white/50
                        "
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                </div>

                {/* BOTTOM */}

                <div className="flex items-end justify-between gap-5">

                  <div>
                    <p className="text-[8px] uppercase tracking-[0.2em] text-white/30">
                      Built for your workflow
                    </p>

                    <div className="mt-3 h-px w-24 bg-[#ff5722]" />
                  </div>

                  <a
                    href="#contact"
                    className="
                      group
                      flex
                      items-center
                      gap-4
                      bg-white
                      px-5
                      py-4
                      text-[8px]
                      font-bold
                      uppercase
                      tracking-[0.15em]
                      text-black
                      transition-colors
                      duration-300
                      hover:bg-[#ff5722]
                      hover:text-white
                    "
                  >
                    Build this system

                    <ArrowUpRight
                      size={14}
                      className="
                        transition-transform
                        duration-300
                        group-hover:translate-x-1
                        group-hover:-translate-y-1
                      "
                    />
                  </a>

                </div>

              </motion.div>

            </AnimatePresence>

          </div>

        </div>

        {/* BOTTOM MESSAGE */}

        <div className="mt-20 border-t border-black/15 pt-8 sm:mt-28">

          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

            <p className="max-w-2xl text-xl leading-7 tracking-tight sm:text-2xl">
              Have a business process that still
              runs on spreadsheets?
            </p>

            <a
              href="#contact"
              className="
                w-fit
                text-[9px]
                font-bold
                uppercase
                tracking-[0.2em]
                text-[#ff5722]
                transition-colors
                hover:text-black
              "
            >
              Let's digitize it →
            </a>

          </div>

        </div>

      </div>
    </section>
  );
}