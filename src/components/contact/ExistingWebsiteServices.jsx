import React from "react";
import { Check, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

import { EXISTING_SERVICES } from "../../config/pricing";

export default function ExistingWebsiteServices({
  form,
  onChange,
}) {
  const toggleService = (service) => {
    const exists = form.services.includes(service.id);

    const services = exists
      ? form.services.filter((id) => id !== service.id)
      : [...form.services, service.id];

    onChange({
      target: {
        name: "services",
        value: services,
      },
    });
  };

  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 18,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="space-y-8"
    >

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div>

        <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-therynox-orange">
          Existing website
        </p>

        <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">
          What do you need help with?
        </h3>

        <p className="mt-3 max-w-xl text-sm leading-6 text-therynox-muted">
          Tell us what you need and we'll review your existing
          website before confirming the final scope and price.
        </p>

      </div>


      {/* =====================================================
          WEBSITE URL
      ===================================================== */}

      <div>

        <label
          htmlFor="websiteUrl"
          className="mb-3 block text-[9px] font-bold uppercase tracking-[0.2em] text-therynox-muted"
        >
          Existing website URL
        </label>

        <input
          id="websiteUrl"
          type="url"
          name="websiteUrl"
          value={form.websiteUrl}
          onChange={onChange}
          required
          placeholder="https://yourwebsite.com"
          className="w-full rounded-xl border border-therynox-border bg-therynox-bg px-4 py-4 text-sm outline-none transition placeholder:text-black/30 focus:border-therynox-orange"
        />

      </div>


      {/* =====================================================
          SERVICES
      ===================================================== */}

      <div>

        <div className="mb-4 flex items-end justify-between gap-4">

          <div>

            <label className="block text-[9px] font-bold uppercase tracking-[0.2em] text-therynox-muted">
              Services
            </label>

            <p className="mt-2 text-xs leading-5 text-therynox-muted">
              Select everything you need.
            </p>

          </div>

          <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-therynox-orange">
            Multiple
          </span>

        </div>


        <div className="grid gap-2 sm:grid-cols-2">

          {EXISTING_SERVICES.map((service, index) => {

            const active = form.services.includes(service.id);

            return (
              <motion.button
                key={service.id}
                type="button"
                onClick={() => toggleService(service)}
                initial={{
                  opacity: 0,
                  y: 8,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: index * 0.025,
                  duration: 0.3,
                }}
                className={`
                  group flex min-h-[62px]
                  items-center justify-between
                  rounded-xl border
                  px-4 py-3
                  text-left
                  transition-all duration-300

                  ${
                    active
                      ? "border-therynox-orange bg-therynox-orange/[0.06]"
                      : "border-therynox-border bg-therynox-bg hover:border-black/25 hover:bg-white"
                  }
                `}
              >

                {/* LEFT */}

                <div className="flex min-w-0 items-center gap-3">

                  <span
                    className={`
                      flex h-5 w-5 shrink-0
                      items-center justify-center
                      rounded-full border
                      text-[10px]
                      transition-all duration-300

                      ${
                        active
                          ? "border-therynox-orange bg-therynox-orange text-white"
                          : "border-black/15 text-transparent group-hover:border-black/30"
                      }
                    `}
                  >
                    <Check
                      size={11}
                      strokeWidth={3}
                    />
                  </span>


                  <span className="min-w-0">

                    <span className="block text-sm font-medium text-therynox-black">
                      {service.name}
                    </span>

                    {service.price === null && (
                      <span className="mt-0.5 block text-[10px] text-therynox-muted">
                        Price after review
                      </span>
                    )}

                  </span>

                </div>


                {/* PRICE */}

                <div className="ml-3 shrink-0">

                  {service.price !== null ? (
                    <span className="text-sm font-semibold text-therynox-black">
                      ₹{service.price.toLocaleString("en-IN")}
                      {service.suffix || ""}
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-[0.12em] text-therynox-muted">
                      Custom
                      <ArrowUpRight size={11} />
                    </span>
                  )}

                </div>

              </motion.button>
            );
          })}

        </div>

      </div>


      {/* =====================================================
          SELECTED SERVICE SUMMARY
      ===================================================== */}

      {form.services.length > 0 && (
        <SelectedServices
          services={form.services}
        />
      )}

    </motion.section>
  );
}


/* ==========================================================
   SELECTED SERVICES
========================================================== */

function SelectedServices({ services }) {
  const selected = EXISTING_SERVICES.filter((service) =>
    services.includes(service.id)
  );

  const fixedTotal = selected.reduce(
    (total, service) =>
      total + (service.price || 0),
    0
  );

  const hasCustom = selected.some(
    (service) => service.price === null
  );

  return (
    <motion.div
      initial={{
        opacity: 0,
        height: 0,
      }}
      animate={{
        opacity: 1,
        height: "auto",
      }}
      className="overflow-hidden"
    >

      <div className="rounded-2xl border border-therynox-border bg-therynox-bg p-5">

        {/* HEADER */}

        <div className="flex items-center justify-between">

          <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-therynox-muted">
            Your request
          </span>

          <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-therynox-orange">
            {selected.length} selected
          </span>

        </div>


        {/* LIST */}

        <div className="mt-4 space-y-3">

          {selected.map((service) => (

            <div
              key={service.id}
              className="flex items-center justify-between gap-4"
            >

              <span className="text-sm text-therynox-black">
                {service.name}
              </span>

              {service.price !== null ? (
                <span className="text-sm font-semibold">
                  ₹{service.price.toLocaleString("en-IN")}
                  {service.suffix || ""}
                </span>
              ) : (
                <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-therynox-muted">
                  Custom quote
                </span>
              )}

            </div>

          ))}

        </div>


        {/* TOTAL */}

        {fixedTotal > 0 && (
          <>

            <div className="my-4 border-t border-therynox-border" />

            <div className="flex items-end justify-between">

              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-therynox-muted">
                Fixed-price services
              </span>

              <span className="text-xl font-bold tracking-[-0.04em]">
                ₹{fixedTotal.toLocaleString("en-IN")}
              </span>

            </div>

          </>
        )}


        {/* CUSTOM NOTE */}

        {hasCustom && (
          <p className="mt-4 text-[10px] leading-5 text-therynox-muted">
            Some selected services require a review of your
            existing website. We'll confirm the final scope
            and custom pricing before starting.
          </p>
        )}

      </div>

    </motion.div>
  );
}