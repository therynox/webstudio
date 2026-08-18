import React, { useMemo } from "react";
import { Check, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

import {
  ADDONS,
  PLANS,
} from "../../config/pricing";

export default function AddonsSelector({
  selectedPlan,
  selectedAddons,
  onChange,
}) {
  const plan = PLANS[selectedPlan];

  const toggleAddon = (addon) => {
    const exists = selectedAddons.some(
      (item) => item.id === addon.id
    );

    if (exists) {
      onChange(
        selectedAddons.filter(
          (item) => item.id !== addon.id
        )
      );

      return;
    }

    onChange([
      ...selectedAddons,
      {
        id: addon.id,
        quantity:
          addon.id === "extra-page" ? 1 : 1,
      },
    ]);
  };

  const updateQuantity = (addonId, quantity) => {
    const safeQuantity = Math.max(
      1,
      Number(quantity) || 1
    );

    onChange(
      selectedAddons.map((item) =>
        item.id === addonId
          ? {
              ...item,
              quantity: safeQuantity,
            }
          : item
      )
    );
  };

  const addonTotal = useMemo(() => {
    return selectedAddons.reduce(
      (total, selected) => {
        const addon = ADDONS.find(
          (item) => item.id === selected.id
        );

        if (!addon) {
          return total;
        }

        return (
          total +
          addon.price *
            (selected.quantity || 1)
        );
      },
      0
    );
  }, [selectedAddons]);

  const extraPageAddon = ADDONS.find(
    (addon) => addon.id === "extra-page"
  );

  const extraPageSelection = selectedAddons.find(
    (item) => item.id === "extra-page"
  );

  const extraPageQuantity =
    extraPageSelection?.quantity || 0;

  /*
   * ================================================
   * PACKAGE UPGRADE CHECK
   * ================================================
   */

  const upgradeSuggestion = useMemo(() => {
    if (!plan) {
      return null;
    }

    if (
      plan.pages === null ||
      extraPageQuantity <= 0
    ) {
      return null;
    }

    const requestedPages =
      plan.pages + extraPageQuantity;

    const currentTotal =
      plan.price + addonTotal;

    const availablePlans = Object.values(PLANS)
      .filter(
        (candidate) =>
          candidate.price > plan.price &&
          candidate.pages !== null &&
          candidate.pages >= requestedPages
      )
      .sort(
        (a, b) =>
          a.price - b.price
      );

    const betterPlan =
      availablePlans[0];

    if (!betterPlan) {
      return null;
    }

    if (
      betterPlan.price < currentTotal
    ) {
      return {
        type: "better",
        plan: betterPlan,
        currentTotal,
        savings:
          currentTotal -
          betterPlan.price,
      };
    }

    if (
      betterPlan.price === currentTotal
    ) {
      return {
        type: "same",
        plan: betterPlan,
        currentTotal,
      };
    }

    return {
      type: "normal",
      plan: betterPlan,
      currentTotal,
      difference:
        betterPlan.price -
        currentTotal,
    };
  }, [
    plan,
    extraPageQuantity,
    addonTotal,
  ]);

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
        ease: [
          0.22,
          1,
          0.36,
          1,
        ],
      }}
      className="space-y-8"
    >

      {/* ==================================================
          HEADER
      ================================================== */}

      <div>

        <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-therynox-orange">
          Optional extras
        </p>

        <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">
          Need anything extra?
        </h3>

        <p className="mt-3 max-w-xl text-sm leading-6 text-therynox-muted">
          Your package already includes its complete core
          workflow. Add only the things you need beyond
          the package.
        </p>

      </div>


      {/* ==================================================
          ADDONS
      ================================================== */}

      <div className="grid gap-2 sm:grid-cols-2">

        {ADDONS.map(
          (addon, index) => {

            const selected =
              selectedAddons.some(
                (item) =>
                  item.id === addon.id
              );

            const selectedItem =
              selectedAddons.find(
                (item) =>
                  item.id === addon.id
              );

            const quantity =
              selectedItem?.quantity || 1;

            return (
              <motion.div
                key={addon.id}
                initial={{
                  opacity: 0,
                  y: 8,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay:
                    index * 0.025,
                  duration: 0.3,
                }}
                className={`
                  rounded-xl border
                  transition-all duration-300
                  ${
                    selected
                      ? "border-therynox-orange bg-therynox-orange/[0.04]"
                      : "border-therynox-border bg-therynox-bg hover:border-black/25"
                  }
                `}
              >

                <button
                  type="button"
                  onClick={() =>
                    toggleAddon(addon)
                  }
                  className="flex w-full items-center justify-between gap-4 p-4 text-left"
                >

                  {/* LEFT */}

                  <div className="flex min-w-0 items-center gap-3">

                    <span
                      className={`
                        flex h-5 w-5 shrink-0
                        items-center justify-center
                        rounded-full border
                        transition-all duration-300
                        ${
                          selected
                            ? "border-therynox-orange bg-therynox-orange text-white"
                            : "border-black/15 text-transparent"
                        }
                      `}
                    >
                      <Check
                        size={11}
                        strokeWidth={3}
                      />
                    </span>

                    <span className="text-sm font-medium text-therynox-black">
                      {addon.name}
                    </span>

                  </div>


                  {/* PRICE */}

                  <span className="shrink-0 text-sm font-semibold text-therynox-black">

                    +₹
                    {addon.price.toLocaleString(
                      "en-IN"
                    )}

                    {addon.suffix || ""}

                  </span>

                </button>


                {/* ======================================
                    EXTRA PAGE QUANTITY
                ====================================== */}

                {selected &&
                  addon.id ===
                    "extra-page" && (
                    <div className="flex items-center justify-between border-t border-therynox-border px-4 py-3">

                      <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-therynox-muted">
                        Number of extra pages
                      </span>

                      <div className="flex items-center gap-2">

                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              addon.id,
                              quantity - 1
                            )
                          }
                          disabled={
                            quantity <= 1
                          }
                          className="flex h-8 w-8 items-center justify-center rounded-full border border-therynox-border text-sm transition hover:border-black disabled:cursor-not-allowed disabled:opacity-30"
                        >
                          −
                        </button>

                        <span className="flex h-8 min-w-8 items-center justify-center rounded-full bg-therynox-black px-2 text-xs font-semibold text-white">
                          {quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              addon.id,
                              quantity + 1
                            )
                          }
                          className="flex h-8 w-8 items-center justify-center rounded-full border border-therynox-border text-sm transition hover:border-black"
                        >
                          +
                        </button>

                      </div>

                    </div>
                  )}

              </motion.div>
            );
          }
        )}

      </div>


      {/* ==================================================
          UPGRADE SUGGESTION
      ================================================== */}

      {upgradeSuggestion && (
        <UpgradeSuggestion
          suggestion={
            upgradeSuggestion
          }
        />
      )}


      {/* ==================================================
          PRICE SUMMARY
      ================================================== */}

      <div className="rounded-2xl border border-therynox-border bg-therynox-bg p-5">

        <div className="flex items-center justify-between">

          <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-therynox-muted">
            Package
          </span>

          <span className="text-sm font-semibold">
            ₹
            {plan?.price.toLocaleString(
              "en-IN"
            )}
          </span>

        </div>


        {addonTotal > 0 && (
          <div className="mt-3 flex items-center justify-between">

            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-therynox-muted">
              Extras
            </span>

            <span className="text-sm font-semibold text-therynox-orange">
              +₹
              {addonTotal.toLocaleString(
                "en-IN"
              )}
            </span>

          </div>
        )}


        <div className="my-4 border-t border-therynox-border" />


        <div className="flex items-end justify-between">

          <div>

            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-therynox-muted">
              Estimated total
            </p>

            <p className="mt-1 text-[10px] text-therynox-muted">
              Final pricing confirmed before work begins.
            </p>

          </div>

          <span className="text-2xl font-bold tracking-[-0.04em]">
            ₹
            {(
              (plan?.price || 0) +
              addonTotal
            ).toLocaleString(
              "en-IN"
            )}
          </span>

        </div>

      </div>

    </motion.section>
  );
}


/* ==========================================================
   UPGRADE SUGGESTION
========================================================== */

function UpgradeSuggestion({
  suggestion,
}) {
  if (!suggestion) {
    return null;
  }

  if (
    suggestion.type ===
    "better"
  ) {
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
        className="rounded-2xl border border-therynox-orange/30 bg-therynox-orange/[0.06] p-5"
      >

        <div className="flex items-start gap-4">

          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-therynox-orange text-white">
            <ArrowUpRight size={16} />
          </div>

          <div>

            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-therynox-orange">
              Better package
            </p>

            <p className="mt-2 text-sm font-semibold">
              {suggestion.plan.name}
            </p>

            <p className="mt-1 text-xs leading-5 text-therynox-muted">
              Your current configuration is ₹
              {suggestion.savings.toLocaleString(
                "en-IN"
              )}{" "}
              more. The{" "}
              <strong className="text-therynox-black">
                {suggestion.plan.name}
              </strong>{" "}
              package includes the required pages
              at ₹
              {suggestion.plan.price.toLocaleString(
                "en-IN"
              )}.
            </p>

          </div>

        </div>

      </motion.div>
    );
  }

  if (
    suggestion.type ===
    "same"
  ) {
    return (
      <div className="rounded-2xl border border-therynox-border bg-therynox-bg p-5">

        <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-therynox-orange">
          Package option
        </p>

        <p className="mt-2 text-sm font-semibold">
          {suggestion.plan.name}
        </p>

        <p className="mt-1 text-xs leading-5 text-therynox-muted">
          You can also choose the{" "}
          {suggestion.plan.name} package for
          the same estimated price.
        </p>

      </div>
    );
  }

  return null;
}