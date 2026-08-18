import React from "react";

export default function PageHeader({
  eyebrow,
  number,
  title,
  description,
}) {
  return (
    <section className="relative px-5 pb-14 pt-28 sm:px-8 sm:pb-16 sm:pt-32 lg:px-12 lg:pb-20 lg:pt-36">
      <div className="mx-auto max-w-[1600px]">

        {/* TOP META */}

        <div className="flex items-center justify-between border-b border-black/10 pb-5">

          <div className="flex items-center gap-3">

            <span className="h-2.5 w-2.5 rounded-full bg-therynox-orange" />

            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-therynox-orange">
              {eyebrow}
            </span>

          </div>

          <span className="text-[9px] font-bold tracking-[0.25em] text-black/45">
            {number}
          </span>

        </div>


        {/* MAIN */}

        <div className="grid gap-10 pt-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:pt-14">

          {/* TITLE */}

          <h1 className="max-w-[1000px] text-[clamp(4rem,8vw,8.5rem)] font-semibold leading-[0.82] tracking-[-0.075em] text-therynox-black">
            {title}
          </h1>


          {/* DESCRIPTION */}

          <div className="max-w-md lg:pb-2">

            <p className="text-sm leading-7 text-therynox-muted sm:text-base">
              {description}
            </p>

            <div className="mt-8 flex items-center gap-3">

              <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-therynox-black">
                Scroll to explore
              </span>

              <span className="text-sm text-therynox-orange">
                ↘
              </span>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}