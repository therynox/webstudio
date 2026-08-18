import React from "react";
import { motion } from "framer-motion";

const defaultStats = [
  { number: "25+", label: "Digital Projects", visible: true },
  { number: "15+", label: "Business Systems", visible: true },
  { number: "10+", label: "Industries Served", visible: true },
  { number: "100%", label: "Built With Purpose", visible: true },
];

export default function Stats({ settings }) {
  const stats = (settings?.items?.length ? settings.items : defaultStats).filter((item) => item.visible !== false);

  return (
    <section
      id="stats"
      className="relative overflow-hidden bg-[#f4f2ed] px-6 pb-14 pt-16 text-[#111111] md:px-10 md:pb-16 md:pt-20 lg:px-16"
    >
      <div className="mx-auto max-w-[1600px]">
        {/* Heading */}
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#ff5426]">
              {settings?.eyebrow || "THERYNOX WEB STUDIO"}
            </p>

            <h2 className="max-w-3xl font-sans text-4xl font-medium leading-[0.95] tracking-[-0.04em] md:text-6xl lg:text-7xl">
              {settings?.title || "Digital products built for ambitious businesses."}
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-6 text-black/55">
            {settings?.description || "Strategy, design and development working together to create digital experiences that actually move businesses forward."}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 border-t border-black/15 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.55,
                delay: index * 0.07,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`group border-b border-black/15 px-5 py-8 lg:border-b-0 lg:px-8 lg:py-10 ${
                index !== 3 ? "lg:border-r lg:border-black/15" : ""
              }`}
            >
              {/* Top row */}
              <div className="mb-6 flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-black/40">
                  0{index + 1}
                </span>

                <span className="h-2 w-2 rounded-full bg-[#ff5426] transition-transform duration-300 group-hover:scale-[1.7]" />
              </div>

              {/* Number */}
              <div className="font-sans text-5xl font-medium tracking-[-0.05em] md:text-6xl lg:text-7xl">
                {stat.number}
              </div>

              {/* Label */}
              <div className="mt-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-black/50">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}