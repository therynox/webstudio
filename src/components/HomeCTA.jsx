import React from "react";
import { ArrowUpRight } from "lucide-react";

export default function HomeCTA({ settings }) {
  return (
    <section
      id="contact"
      className="bg-therynox-bg px-5 py-20 sm:px-8 lg:px-12 lg:py-28"
    >
      <div className="mx-auto max-w-7xl">

        <div className="relative overflow-hidden rounded-[32px] bg-therynox-orange px-7 py-16 sm:px-12 lg:px-20 lg:py-24">

          {/* Decorative circle */}

          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full border border-black/10" />

          <div className="pointer-events-none absolute -bottom-32 -right-10 h-96 w-96 rounded-full border border-black/10" />

          {/* Content */}

          <div className="relative z-10">

            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-black/60">
              {settings?.eyebrow || "Have a project in mind?"}
            </span>

            <h2 className="mt-6 max-w-5xl text-[clamp(3rem,7vw,7rem)] font-semibold leading-[0.88] tracking-[-0.07em] text-black">
              {settings?.title || "Let's build something worth remembering."}
            </h2>

            <p className="mt-8 max-w-xl text-sm leading-7 text-black/65 sm:text-base">
              {settings?.description || "Tell us what you're building. We'll help turn your idea into a powerful digital experience."}
            </p>

            <a
              href={settings?.ctaUrl || "/contact"}
              className="group mt-9 inline-flex items-center gap-5 rounded-full bg-black px-7 py-4 text-[9px] font-bold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-white hover:text-black"
            >
              {settings?.ctaText || "Start a project"}

              <ArrowUpRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </a>

          </div>

        </div>

      </div>
    </section>
  );
}