import React from "react";
import { motion } from "framer-motion";

export default function PriceSummary({
  title = "Estimated total",
  basePrice = 0,
  addons = [],
  services = [],
  customQuote = false,
  showBase = true,
}) {
  const addonTotal = addons.reduce((total, item) => {
    return total + (item.price || 0) * (item.quantity || 1);
  }, 0);

  const serviceTotal = services.reduce((total, item) => {
    return total + (item.price || 0);
  }, 0);

  const fixedTotal =
    basePrice +
    addonTotal +
    serviceTotal;

  const hasCustomServices = services.some(
    (item) => item.price === null
  );

  const hasCustomPricing =
    customQuote || hasCustomServices;

  const hasMonthlyService = [
    ...addons,
    ...services,
  ].some((item) => item.suffix === "/month");

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 10,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.35,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="rounded-2xl border border-therynox-border bg-therynox-bg p-5 sm:p-6"
    >
      {/* =========================================
          HEADER
      ========================================= */}

      <div className="flex items-center justify-between gap-4">
        <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-therynox-muted">
          {title}
        </span>

        {hasCustomPricing && (
          <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-therynox-orange">
            Custom quote
          </span>
        )}
      </div>

      {/* =========================================
          BASE PACKAGE
      ========================================= */}

      {showBase && basePrice > 0 && (
        <div className="mt-5 flex items-center justify-between gap-4">
          <span className="text-sm text-therynox-black">
            Base package
          </span>

          <span className="text-sm font-semibold text-therynox-black">
            ₹{basePrice.toLocaleString("en-IN")}
          </span>
        </div>
      )}

      {/* =========================================
          SERVICES
      ========================================= */}

      {services.length > 0 && (
        <div className="mt-4 space-y-3">
          {services.map((service) => (
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
                  Custom
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* =========================================
          ADDONS
      ========================================= */}

      {addons.length > 0 && (
        <div className="mt-4 space-y-3">
          {addons.map((addon) => {
            const quantity = addon.quantity || 1;

            const total =
              (addon.price || 0) *
              quantity;

            return (
              <div
                key={addon.id}
                className="flex items-center justify-between gap-4"
              >
                <span className="text-sm text-therynox-black">
                  {addon.name}

                  {addon.id === "extra-page" &&
                    quantity > 1 && (
                      <span className="ml-1 text-xs text-therynox-muted">
                        × {quantity}
                      </span>
                    )}
                </span>

                <span className="text-sm font-semibold">
                  +₹
                  {total.toLocaleString("en-IN")}
                  {addon.suffix || ""}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* =========================================
          DIVIDER
      ========================================= */}

      {(basePrice > 0 ||
        addonTotal > 0 ||
        serviceTotal > 0) && (
        <div className="my-5 border-t border-therynox-border" />
      )}

      {/* =========================================
          TOTAL
      ========================================= */}

      <div className="flex items-end justify-between gap-6">
        <div>
          <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-therynox-muted">
            {hasCustomPricing
              ? "Starting estimate"
              : title}
          </p>

          <p className="mt-2 max-w-xs text-[10px] leading-5 text-therynox-muted">
            {hasCustomPricing
              ? "Final pricing will be confirmed after reviewing your requirements."
              : "Final pricing is confirmed before work begins."}
          </p>
        </div>

        <div className="shrink-0 text-right">

          {fixedTotal > 0 ? (
            <p className="text-2xl font-bold tracking-[-0.05em] text-therynox-black">
              ₹{fixedTotal.toLocaleString("en-IN")}
              {hasMonthlyService ? "+" : ""}
            </p>
          ) : (
            <p className="text-xl font-bold tracking-[-0.04em] text-therynox-black">
              Custom Quote
            </p>
          )}

        </div>
      </div>

      {/* =========================================
          CUSTOM NOTICE
      ========================================= */}

      {hasCustomPricing && (
        <div className="mt-5 rounded-xl border border-therynox-orange/20 bg-therynox-orange/[0.05] px-4 py-3">
          <p className="text-[10px] leading-5 text-therynox-muted">
            Some requirements need to be reviewed before
            we can provide the final price. We'll confirm
            everything with you before starting.
          </p>
        </div>
      )}
    </motion.div>
  );
}