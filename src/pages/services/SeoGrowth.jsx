import React from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  MousePointer2,
  Search,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";

import PageLayout from "../../components/layout/PageLayout";
import PageHeader from "../../components/layout/PageHeader";

const capabilities = [
  {
    number: "01",
    title: "Technical SEO",
    description:
      "Improve the technical foundation of your website so search engines can crawl, understand and index it effectively.",
    icon: Search,
  },
  {
    number: "02",
    title: "Search Strategy",
    description:
      "Build a focused search strategy around the topics, keywords and audiences that matter to your business.",
    icon: Target,
  },
  {
    number: "03",
    title: "Content Growth",
    description:
      "Create useful content that attracts qualified visitors and builds long-term organic visibility.",
    icon: TrendingUp,
  },
  {
    number: "04",
    title: "Conversion Optimisation",
    description:
      "Turn more of your existing traffic into enquiries, customers and measurable business outcomes.",
    icon: MousePointer2,
  },
  {
    number: "05",
    title: "Performance",
    description:
      "Improve speed, usability and technical performance across desktop and mobile experiences.",
    icon: Zap,
  },
  {
    number: "06",
    title: "Analytics",
    description:
      "Measure traffic, engagement, conversions and growth so decisions are based on real data.",
    icon: BarChart3,
  },
];

const process = [
  {
    number: "01",
    title: "Audit",
    description:
      "Analyse your website, technical foundation, search visibility and current performance.",
  },
  {
    number: "02",
    title: "Strategy",
    description:
      "Identify opportunities and create a practical roadmap based on your goals.",
  },
  {
    number: "03",
    title: "Optimise",
    description:
      "Implement technical, content and conversion improvements across the experience.",
  },
  {
    number: "04",
    title: "Measure",
    description:
      "Track results, identify new opportunities and continuously improve performance.",
  },
];

const metrics = [
  {
    label: "Organic traffic",
    value: "+48.2%",
    detail: "vs previous period",
  },
  {
    label: "Search visibility",
    value: "+36%",
    detail: "keyword coverage",
  },
  {
    label: "Conversions",
    value: "+31%",
    detail: "qualified enquiries",
  },
];

export default function SeoGrowth() {
  return (
    <PageLayout showCTA={false}>
      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <PageHeader
        eyebrow="SERVICES / 06"
        number="06 / 06"
        title="SEO & Growth."
        description="Build visibility, attract the right audience and turn website traffic into measurable business growth."
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
              More visibility.
              <br />
              <span className="text-therynox-orange">
                More momentum.
              </span>
            </motion.h2>

            <div className="max-w-md">
              <p className="text-sm leading-7 text-therynox-muted sm:text-base">
                Growth isn't just about getting more visitors. It's about
                attracting the right people and giving them a reason to take
                action.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          GROWTH VISUAL
      ===================================================== */}

      <GrowthVisual />

      {/* =====================================================
          METRICS
      ===================================================== */}

      <section className="px-5 pt-0 pb-16 sm:px-8 lg:px-12 lg:pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid border-y border-therynox-border sm:grid-cols-3">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
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
                className="border-b border-therynox-border p-7 sm:border-b-0 sm:border-r sm:p-9 last:border-r-0"
              >
                <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-therynox-muted">
                  {metric.label}
                </p>

                <div className="mt-6 flex items-end justify-between gap-4">
                  <span className="text-4xl font-semibold tracking-[-0.06em] sm:text-5xl">
                    {metric.value}
                  </span>

                  <TrendingUp
                    size={20}
                    strokeWidth={1.5}
                    className="mb-1 text-therynox-orange"
                  />
                </div>

                <p className="mt-3 text-xs text-therynox-muted">
                  {metric.detail}
                </p>
              </motion.div>
            ))}
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
                What we improve
              </p>

              <h2 className="mt-6 max-w-sm text-4xl font-semibold leading-[0.95] tracking-[-0.06em] sm:text-5xl">
                Growth has
                <br />
                many levers.
              </h2>

              <p className="mt-6 max-w-sm text-sm leading-6 text-therynox-muted">
                Search, content, performance and conversion all work together.
                We optimise the complete journey.
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
                        strokeWidth={1.5}
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
          DARK GROWTH LOOP
      ===================================================== */}

      <section className="bg-therynox-black px-5 py-24 text-white sm:px-8 lg:px-12 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-[0.5fr_0.5fr]">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-therynox-orange">
                The growth loop
              </p>

              <h2 className="mt-6 max-w-xl text-4xl font-semibold leading-[0.95] tracking-[-0.06em] sm:text-5xl">
                Traffic is only
                <br />
                the beginning.
              </h2>

              <p className="mt-6 max-w-md text-sm leading-7 text-white/45">
                Sustainable growth happens when visibility, relevance,
                experience and conversion reinforce each other.
              </p>
            </div>

            <div>
              <GrowthRow
                number="01"
                title="Get discovered"
                text="Reach people actively searching for what you offer."
              />

              <GrowthRow
                number="02"
                title="Earn attention"
                text="Give visitors useful information and a strong reason to stay."
              />

              <GrowthRow
                number="03"
                title="Create action"
                text="Guide the right visitor toward an enquiry, purchase or signup."
              />

              <GrowthRow
                number="04"
                title="Learn & improve"
                text="Use data to continuously improve the entire journey."
              />
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
                From audit to growth.
              </h2>
            </div>

            <ArrowDownRight
              size={30}
              strokeWidth={1.3}
              className="hidden text-therynox-orange sm:block"
            />
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
                  {item.description}
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
                Ready to grow?
              </p>

              <h2 className="mt-6 max-w-3xl text-4xl font-semibold leading-[0.95] tracking-[-0.06em] text-black sm:text-5xl lg:text-6xl">
                Let's turn
                <br />
                attention into growth.
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
   GROWTH VISUAL
========================================================= */

function GrowthVisual() {
  const funnel = [
    {
      label: "SEARCH",
      value: "84,920",
      caption: "Impressions",
      width: "100%",
    },
    {
      label: "CLICKS",
      value: "6,284",
      caption: "Qualified visits",
      width: "82%",
    },
    {
      label: "TRAFFIC",
      value: "4,812",
      caption: "Engaged users",
      width: "65%",
    },
    {
      label: "LEADS",
      value: "684",
      caption: "Conversions",
      width: "48%",
    },
  ];

  return (
    <section className="px-5 pb-10 sm:px-8 lg:px-12 lg:pb-14">
      <div className="mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-[32px] border border-therynox-border bg-white">
          {/* =================================================
              TOP BAR
          ================================================= */}

          <div className="flex flex-col justify-between gap-5 border-b border-therynox-border px-7 py-7 sm:flex-row sm:items-center sm:px-10">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-therynox-border bg-therynox-bg">
                <TrendingUp
                  size={17}
                  strokeWidth={1.5}
                  className="text-therynox-orange"
                />
              </div>

              <div>
                <p className="text-[8px] font-bold uppercase tracking-[0.3em] text-therynox-muted">
                  Growth engine
                </p>

                <p className="mt-1 text-xs text-therynox-black">
                  Organic performance
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />

              <span className="text-[8px] font-bold uppercase tracking-[0.25em] text-therynox-muted">
                Growing
              </span>
            </div>
          </div>

          {/* =================================================
              MAIN CONTENT
          ================================================= */}

          <div className="grid lg:grid-cols-[0.6fr_0.4fr]">
            {/* =================================================
                FUNNEL
            ================================================= */}

            <div className="px-7 py-10 sm:px-10 lg:px-14 lg:py-12">
              <div className="mb-9 flex items-end justify-between">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-therynox-muted">
                    Acquisition funnel
                  </p>

                  <h3 className="mt-3 text-2xl font-semibold tracking-[-0.05em] sm:text-3xl">
                    Search to conversion.
                  </h3>
                </div>

                <ArrowDownRight
                  size={22}
                  strokeWidth={1.3}
                  className="text-therynox-orange"
                />
              </div>

              <div className="space-y-4">
                {funnel.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{
                      opacity: 0,
                      x: -25,
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
                  >
                    <div className="mb-2 flex items-end justify-between gap-4">
                      <div>
                        <span className="text-[8px] font-bold tracking-[0.25em] text-therynox-orange">
                          {item.label}
                        </span>

                        <p className="mt-1 text-xs text-therynox-muted">
                          {item.caption}
                        </p>
                      </div>

                      <span className="text-lg font-semibold tracking-[-0.04em]">
                        {item.value}
                      </span>
                    </div>

                    <div className="h-12 overflow-hidden rounded-lg bg-therynox-bg">
                      <motion.div
                        initial={{
                          width: 0,
                        }}
                        whileInView={{
                          width: item.width,
                        }}
                        viewport={{
                          once: true,
                        }}
                        transition={{
                          delay: index * 0.1 + 0.2,
                          duration: 0.8,
                          ease: "easeOut",
                        }}
                        className="h-full rounded-lg bg-therynox-orange"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* =================================================
                GRAPH
            ================================================= */}

            <div className="relative overflow-hidden border-t border-therynox-border bg-therynox-bg px-7 py-10 sm:px-10 lg:border-l lg:border-t-0 lg:px-10 lg:py-12">
              <div className="relative z-10">
                <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-therynox-muted">
                  Organic growth
                </p>

                <div className="mt-5 flex items-end justify-between">
                  <div>
                    <span className="text-4xl font-semibold tracking-[-0.06em]">
                      +48.2%
                    </span>

                    <p className="mt-2 text-xs text-therynox-muted">
                      Traffic growth
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-therynox-orange">
                    <TrendingUp size={17} strokeWidth={1.7} />

                    <span className="text-[9px] font-bold">
                      +18.4%
                    </span>
                  </div>
                </div>

                {/* GRAPH */}

                <div className="relative mt-10 h-52">
                  <div className="absolute inset-0 flex flex-col justify-between">
                    {[1, 2, 3, 4, 5].map((line) => (
                      <div
                        key={line}
                        className="h-px w-full bg-black/[0.06]"
                      />
                    ))}
                  </div>

                  <svg
                    viewBox="0 0 500 220"
                    className="absolute inset-0 h-full w-full overflow-visible"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient
                        id="growthFill"
                        x1="0"
                        y1="0"
                        x2="0"
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

                    {/* AREA */}

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
                      d="M0 190 C45 180 60 170 95 175 C130 180 145 145 180 150 C220 155 235 120 270 125 C305 130 320 95 350 100 C385 105 400 65 430 72 C455 76 475 45 500 30 L500 220 L0 220 Z"
                      fill="url(#growthFill)"
                      stroke="none"
                    />

                    {/* LINE */}

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
                      d="M0 190 C45 180 60 170 95 175 C130 180 145 145 180 150 C220 155 235 120 270 125 C305 130 320 95 350 100 C385 105 400 65 430 72 C455 76 475 45 500 30"
                      fill="none"
                      stroke="#ff7a00"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>

                  {/* END POINT */}

                  <motion.div
                    initial={{
                      scale: 0,
                    }}
                    whileInView={{
                      scale: 1,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      delay: 1.5,
                      duration: 0.3,
                    }}
                    className="absolute right-0 top-[11%] flex h-5 w-5 items-center justify-center rounded-full border-4 border-white bg-therynox-orange"
                  />
                </div>

                {/* GRAPH LABELS */}

                <div className="mt-5 flex justify-between">
                  <span className="text-[8px] uppercase tracking-[0.2em] text-therynox-muted">
                    Jan
                  </span>

                  <span className="text-[8px] uppercase tracking-[0.2em] text-therynox-muted">
                    Mar
                  </span>

                  <span className="text-[8px] uppercase tracking-[0.2em] text-therynox-muted">
                    May
                  </span>

                  <span className="text-[8px] uppercase tracking-[0.2em] text-therynox-muted">
                    Jul
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* =================================================
              BOTTOM BAR
          ================================================= */}

          <div className="flex flex-col gap-4 border-t border-therynox-border px-7 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-10">
            <div className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-therynox-orange" />

              <span className="text-[8px] font-bold uppercase tracking-[0.25em] text-therynox-muted">
                Search · Traffic · Conversion · Growth
              </span>
            </div>

            <span className="text-[8px] uppercase tracking-[0.2em] text-therynox-muted">
              Data-driven optimisation
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   GROWTH ROW
========================================================= */

function GrowthRow({ number, title, text }) {
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
      className="border-t border-white/10 py-6"
    >
      <div className="flex gap-6">
        <span className="w-8 shrink-0 text-[9px] font-bold tracking-[0.2em] text-therynox-orange">
          {number}
        </span>

        <div>
          <h3 className="text-xl font-semibold tracking-[-0.04em]">
            {title}
          </h3>

          <p className="mt-2 max-w-md text-sm leading-6 text-white/40">
            {text}
          </p>
        </div>
      </div>
    </motion.div>
  );
}