import React, { useMemo, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  ChevronLeft,
  Loader2,
} from "lucide-react";
import { useSearchParams } from "react-router-dom";

import PageLayout from "../components/layout/PageLayout";
import PageHeader from "../components/layout/PageHeader";

import CustomerTypeSelector from "../components/contact/CustomerTypeSelector";
import ProjectRequirements from "../components/contact/ProjectRequirements";
import ExistingWebsiteServices from "../components/contact/ExistingWebsiteServices";
import AddonsSelector from "../components/contact/AddonsSelector";

import api from "../services/api";

import {
  PLANS,
  ADDONS,
  EXISTING_SERVICES,
  PROJECT_TYPES,
} from "../config/pricing";


export default function Contact() {
  const [searchParams] = useSearchParams();

  /*
   * ======================================================
   * PLAN FROM PRICING PAGE
   * ======================================================
   */

  const planFromUrl = searchParams.get("plan") || "";

  const detectedPlan = Object.values(PLANS).find(
    (plan) =>
      plan.name.toLowerCase() ===
      planFromUrl.toLowerCase()
  );

  /*
   * ======================================================
   * STATE
   * ======================================================
   */

  const [customerType, setCustomerType] = useState(
    detectedPlan
      ? PROJECT_TYPES.NEW
      : ""
  );

  const [selectedPlanId, setSelectedPlanId] = useState(
    detectedPlan?.id || ""
  );

  const [selectedAddons, setSelectedAddons] = useState([]);

  const [submitted, setSubmitted] = useState(false);

  const [submitting, setSubmitting] =
    useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    company: "",

    businessName: "",
    businessType: "",
    projectGoal: "",
    pages: "",
    reference: "",
    message: "",

    websiteUrl: "",

    services: [],
  });

  /*
   * ======================================================
   * CURRENT PLAN
   * ======================================================
   */

  const selectedPlan =
    Object.values(PLANS).find(
      (plan) =>
        plan.id === selectedPlanId
    ) || null;

  /*
   * ======================================================
   * FIELD UPDATE
   * ======================================================
   */

  const updateField = (event) => {
    const {
      name,
      value,
    } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  /*
   * ======================================================
   * CUSTOMER TYPE
   * ======================================================
   */

  const handleCustomerTypeChange = (
    type
  ) => {
    setCustomerType(type);

    /*
     * Existing website/project does not
     * use a package.
     */

    if (
      type ===
        PROJECT_TYPES.EXISTING_WEBSITE ||
      type ===
        PROJECT_TYPES.EXISTING_PROJECT
    ) {
      setSelectedPlanId("");
      setSelectedAddons([]);
    }

    /*
     * If user goes back to new project
     * and URL had a plan, restore it.
     */

    if (
      type === PROJECT_TYPES.NEW &&
      detectedPlan
    ) {
      setSelectedPlanId(
        detectedPlan.id
      );
    }
  };

  /*
   * ======================================================
   * EXISTING WEBSITE SERVICES
   * ======================================================
   */

  const selectedExistingServices =
    useMemo(() => {
      return EXISTING_SERVICES.filter(
        (service) =>
          form.services.includes(
            service.id
          )
      );
    }, [form.services]);

  /*
   * ======================================================
   * EXISTING PROJECT SERVICES
   *
   * Same service list, but this represents
   * additional work on an existing THERYNOX
   * project.
   * ======================================================
   */

  /*
   * ======================================================
   * NEW PROJECT ADDON TOTAL
   * ======================================================
   */

  const addonTotal = useMemo(() => {
    return selectedAddons.reduce(
      (total, selected) => {
        const addon = ADDONS.find(
          (item) =>
            item.id === selected.id
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

  /*
   * ======================================================
   * EXISTING SERVICE TOTAL
   * ======================================================
   */

  const existingServiceTotal =
    useMemo(() => {
      return selectedExistingServices.reduce(
        (total, service) => {
          return (
            total +
            (service.price || 0)
          );
        },
        0
      );
    }, [selectedExistingServices]);

  /*
   * ======================================================
   * CUSTOM SERVICE CHECK
   * ======================================================
   */

  const hasCustomExistingService =
    selectedExistingServices.some(
      (service) =>
        service.price === null
    );

  /*
   * ======================================================
   * NEW PROJECT TOTAL
   * ======================================================
   */

  const newProjectTotal =
    (selectedPlan?.price || 0) +
    addonTotal;

  /*
   * ======================================================
   * SUBMIT
   * ======================================================
   */

  const customerTypeText = useMemo(() => {
  if (customerType === PROJECT_TYPES.EXISTING_WEBSITE) {
    return "Existing Website";
  }

  if (customerType === PROJECT_TYPES.EXISTING_PROJECT) {
    return "Existing THERYNOX Project";
  }

  return "New Project";
}, [customerType]);

const priceText = useMemo(() => {
  if (customerType === PROJECT_TYPES.NEW) {
    return `₹${newProjectTotal.toLocaleString("en-IN")}`;
  }

  if (existingServiceTotal > 0) {
    return `₹${existingServiceTotal.toLocaleString("en-IN")}${
      hasCustomExistingService ? "+" : ""
    }`;
  }

  return "Custom Quote";
}, [
  customerType,
  newProjectTotal,
  existingServiceTotal,
  hasCustomExistingService,
]);

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    if (submitting) {
      return;
    }

    // Immediately collapse the long form and move the user to the top.
    // The email is still sent in the background; success is only shown after EmailJS resolves.
    setSubmitting(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    try {
      /*
       * -----------------------------------------------
       * SERVICES TEXT
       * -----------------------------------------------
       */

      const servicesText =
        selectedExistingServices.length
          ? selectedExistingServices
              .map((service) => {
                if (
                  service.price === null
                ) {
                  return `${service.name} — Custom Quote`;
                }

                return `${service.name} — ₹${service.price.toLocaleString(
                  "en-IN"
                )}${service.suffix || ""}`;
              })
              .join("\n")
          : "Not applicable";

      /*
       * -----------------------------------------------
       * ADDONS TEXT
       * -----------------------------------------------
       */

      const addonsText =
        selectedAddons.length
          ? selectedAddons
              .map((selected) => {
                const addon =
                  ADDONS.find(
                    (item) =>
                      item.id ===
                      selected.id
                  );

                if (!addon) {
                  return "";
                }

                const quantity =
                  selected.quantity ||
                  1;

                const total =
                  addon.price *
                  quantity;

                return `${addon.name}${
                  quantity > 1
                    ? ` × ${quantity}`
                    : ""
                } — ₹${total.toLocaleString(
                  "en-IN"
                )}${addon.suffix || ""}`;
              })
              .filter(Boolean)
              .join("\n")
          : "No add-ons selected";

      /*
       * -----------------------------------------------
       * CUSTOMER TYPE
       * -----------------------------------------------
       */

      let customerTypeText =
        "New Project";

      if (
        customerType ===
        PROJECT_TYPES.EXISTING_WEBSITE
      ) {
        customerTypeText =
          "Existing Website";
      }

      if (
        customerType ===
        PROJECT_TYPES.EXISTING_PROJECT
      ) {
        customerTypeText =
          "Existing THERYNOX Project";
      }

      /*
       * -----------------------------------------------
       * PRICE
       * -----------------------------------------------
       */

      let priceText = "Custom Quote";

      if (
        customerType ===
        PROJECT_TYPES.NEW
      ) {
        priceText =
          `₹${newProjectTotal.toLocaleString(
            "en-IN"
          )}`;
      }

      if (
        customerType ===
          PROJECT_TYPES.EXISTING_WEBSITE ||
        customerType ===
          PROJECT_TYPES.EXISTING_PROJECT
      ) {
        if (
          existingServiceTotal > 0
        ) {
          priceText =
            `₹${existingServiceTotal.toLocaleString(
              "en-IN"
            )}${
              hasCustomExistingService
                ? "+"
                : ""
            }`;
        } else {
          priceText =
            "Custom Quote";
        }
      }

      /*
       * -----------------------------------------------
       * SAVE LEAD TO THERYNOX CRM
       * -----------------------------------------------
       */

      await api.post("/leads", {
        name: form.name,
        email: form.email,
        mobile: form.mobile,
        company: form.company || form.businessName,
        service: customerType === PROJECT_TYPES.NEW ? "Website Development" : servicesText,
        customerType: customerTypeText,
        budget: priceText,
        message: form.message,
        websiteUrl: form.websiteUrl,
        projectGoal: form.projectGoal,
        pages: form.pages,
        reference: form.reference,
        source: "Website Contact Form",
        plan: selectedPlan?.name || "",
        addons: addonsText,
        services: servicesText,
      });

      setSubmitted(true);
    } catch (error) {
      console.error("CONTACT FORM SUBMISSION ERROR:", error);
      window.alert(
        error?.response?.data?.message ||
          "We couldn't send your enquiry right now. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  /*
   * ======================================================
   * SENDING SCREEN
   * ======================================================
   */

  if (submitting && !submitted) {
    return (
      <PageLayout showCTA={false}>
        <section className="flex min-h-[calc(100vh-82px)] items-center justify-center px-5 py-24 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto w-full max-w-md text-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
              className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-therynox-orange/20 border-t-therynox-orange"
            >
              <span className="h-2 w-2 rounded-full bg-therynox-orange" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.12 }}
              className="mt-7 text-[9px] font-bold uppercase tracking-[0.3em] text-therynox-orange"
            >
              Sending enquiry
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.35 }}
              className="mt-3 text-3xl font-semibold tracking-[-0.05em] sm:text-4xl"
            >
              Just a moment.
            </motion.h1>

            <p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-therynox-muted">
              Your project details are being securely sent to THERYNOX Web Studio.
            </p>

            <div className="mx-auto mt-8 h-px w-full max-w-xs overflow-hidden bg-therynox-border">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                className="h-full w-1/2 bg-therynox-orange"
              />
            </div>
          </motion.div>
        </section>
      </PageLayout>
    );
  }

  /*
   * ======================================================
   * SUCCESS SCREEN
   * ======================================================
   */
if (submitted) {
  return (
    <PageLayout showCTA={false}>

      <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-therynox-bg px-5 py-24 sm:px-8 lg:px-12">

        {/* Animation background */}
        <SuccessAtmosphere />

        {/* =====================================
            SUCCESS CONTENT
        ===================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 35,
            scale: 0.96,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative z-10 w-full max-w-2xl"
        >

          {/* =================================
              SUCCESS CARD
          ================================= */}

          <div className="overflow-hidden rounded-[32px] border border-black/10 bg-white/90 shadow-[0_30px_100px_rgba(0,0,0,0.12)] backdrop-blur-xl">

            {/* Top animated line */}

            <motion.div
              initial={{
                scaleX: 0,
              }}
              animate={{
                scaleX: 1,
              }}
              transition={{
                duration: 1,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="h-[3px] origin-left bg-therynox-orange"
            />

            <div className="p-7 sm:p-10 lg:p-12">

              {/* =================================
                  ICON
              ================================= */}

              <div className="flex justify-center">

                <motion.div
                  initial={{
                    scale: 0,
                    rotate: -30,
                  }}
                  animate={{
                    scale: 1,
                    rotate: 0,
                  }}
                  transition={{
                    delay: 0.25,
                    duration: 0.65,
                    type: "spring",
                    stiffness: 180,
                    damping: 13,
                  }}
                  className="relative flex h-20 w-20 items-center justify-center rounded-full bg-therynox-black"
                >

                  {/* rotating ring */}

                  <motion.div
                    initial={{
                      rotate: 0,
                      opacity: 0,
                    }}
                    animate={{
                      rotate: 360,
                      opacity: 1,
                    }}
                    transition={{
                      rotate: {
                        duration: 1.8,
                        ease: "linear",
                      },
                      opacity: {
                        duration: 0.3,
                      },
                    }}
                    className="absolute inset-[-7px] rounded-full border border-therynox-orange/40 border-t-therynox-orange"
                  />

                  <motion.div
                    initial={{
                      pathLength: 0,
                    }}
                    animate={{
                      pathLength: 1,
                    }}
                    transition={{
                      delay: 0.55,
                      duration: 0.55,
                      ease: "easeOut",
                    }}
                  >
                    <Check
                      size={34}
                      className="text-white"
                      strokeWidth={2.5}
                    />
                  </motion.div>

                </motion.div>

              </div>


              {/* =================================
                  TITLE
              ================================= */}

              <motion.div
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.55,
                  duration: 0.5,
                }}
                className="mt-9 text-center"
              >

                <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-therynox-orange">
                  Request received
                </p>

                <h1 className="mt-4 text-4xl font-semibold tracking-[-0.06em] sm:text-5xl">
                  You're on our radar.
                </h1>

                <p className="mx-auto mt-5 max-w-md text-sm leading-6 text-therynox-muted">
                  Your project details are safely with
                  us. We'll review your requirements
                  and get back to you shortly.
                </p>

              </motion.div>


              {/* =================================
                  PROJECT SUMMARY
              ================================= */}

              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.8,
                  duration: 0.5,
                }}
                className="mt-10 rounded-2xl border border-therynox-border bg-therynox-bg"
              >

                <div className="grid grid-cols-2">

                  <div className="border-b border-r border-therynox-border p-5">
                    <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-therynox-muted">
                      Project
                    </p>

                    <p className="mt-2 text-sm font-semibold">
                      {selectedPlan?.name ||
                        customerTypeText ||
                        "Custom project"}
                    </p>
                  </div>

                  <div className="border-b border-therynox-border p-5">
                    <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-therynox-muted">
                      Estimate
                    </p>

                    <p className="mt-2 text-sm font-semibold">
                      {priceText}
                    </p>
                  </div>

                </div>

                <div className="p-5">

                  <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-therynox-muted">
                    Status
                  </p>

                  <div className="mt-4 flex items-center gap-3">

                    <span className="relative flex h-2.5 w-2.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-therynox-orange opacity-50" />
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-therynox-orange" />
                    </span>

                    <span className="text-sm font-medium">
                      Reviewing your enquiry
                    </span>

                  </div>

                </div>

              </motion.div>


              {/* =================================
                  TIMELINE
              ================================= */}

              <div className="mt-10 space-y-4">

                <SuccessStep
                  number="01"
                  text="Enquiry received"
                  delay={1}
                />

                <SuccessStep
                  number="02"
                  text="Requirements captured"
                  delay={1.15}
                />

                <SuccessStep
                  number="03"
                  text="THERYNOX team will contact you"
                  delay={1.3}
                  active
                />

              </div>


              {/* =================================
                  BUTTONS
              ================================= */}

              <motion.div
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 1.5,
                  duration: 0.5,
                }}
                className="mt-10 grid gap-3 sm:grid-cols-2"
              >

                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);

                    setTimeout(() => {
                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      });
                    }, 50);
                  }}
                  className="rounded-full border border-therynox-border px-6 py-4 text-[9px] font-bold uppercase tracking-[0.18em] transition hover:border-therynox-black"
                >
                  Send another enquiry
                </button>

                <a
                  href="/"
                  className="group flex items-center justify-center gap-2 rounded-full bg-therynox-black px-6 py-4 text-[9px] font-bold uppercase tracking-[0.18em] text-white transition hover:bg-therynox-orange"
                >
                  Back to home

                  <ArrowUpRight
                    size={14}
                    className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </a>

              </motion.div>

            </div>

          </div>

          {/* Brand */}

          <motion.p
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 1.7,
            }}
            className="mt-7 text-center text-[8px] font-bold uppercase tracking-[0.35em] text-therynox-muted"
          >
            THERYNOX WEB STUDIO
          </motion.p>

        </motion.div>

      </section>

    </PageLayout>
  );
}

  /*
   * ======================================================
   * MAIN
   * ======================================================
   */

  return (
    <PageLayout showCTA={false}>

      <PageHeader
        eyebrow="START A PROJECT"
        number="06 / 06"
        title="Let's build something."
        description="Tell us what you're building and we'll recommend the right solution for your business."
      />

      <section className="px-5 pb-24 pt-10 sm:px-8 lg:px-12 lg:pb-32">

        <div className="mx-auto max-w-5xl">

          {/* =============================================
              CONTACT INFORMATION
          ============================================= */}

          <div className="mb-8 rounded-[28px] border border-therynox-border bg-white p-7 sm:p-10">

            <div className="mb-8">

              <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-therynox-orange">
                Your details
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em]">
                Let's start with you.
              </h2>

            </div>

            <div className="grid gap-6 sm:grid-cols-2">

              <Field
                label="Your name"
                name="name"
                placeholder="John Doe"
                value={form.name}
                onChange={updateField}
                required
              />

              <Field
                label="Email"
                name="email"
                type="email"
                placeholder="john@example.com"
                value={form.email}
                onChange={updateField}
                required
              />

              <Field
                label="Mobile number"
                name="mobile"
                type="tel"
                placeholder="+91 98765 43210"
                value={form.mobile}
                onChange={updateField}
                required
              />

              <Field
                label="Company"
                name="company"
                placeholder="Your company"
                value={form.company}
                onChange={updateField}
              />

            </div>

          </div>


          {/* =============================================
              CUSTOMER TYPE
          ============================================= */}

          <div className="rounded-[28px] border border-therynox-border bg-white p-7 sm:p-10">

            <CustomerTypeSelector
              value={customerType}
              onChange={
                handleCustomerTypeChange
              }
            />

            {/* ===========================================
                NEW PROJECT
            =========================================== */}

            <AnimatePresence mode="wait">

              {customerType ===
                PROJECT_TYPES.NEW && (
                <motion.div
                  key="new-project"
                  initial={{
                    opacity: 0,
                    y: 18,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -12,
                  }}
                  transition={{
                    duration: 0.4,
                  }}
                  className="space-y-10"
                >

                  {/* PLAN */}

                  {!selectedPlan && (
                    <PlanSelector
                      value={
                        selectedPlanId
                      }
                      onChange={
                        setSelectedPlanId
                      }
                    />
                  )}

                  {selectedPlan && (
                    <SelectedPlan
                      plan={
                        selectedPlan
                      }
                    />
                  )}

                  {/* REQUIREMENTS */}

                  {selectedPlan && (
                    <ProjectRequirements
                      form={form}
                      onChange={
                        updateField
                      }
                    />
                  )}

                  {/* ADDONS */}

                  {selectedPlan && (
                    <AddonsSelector
                      selectedPlan={
                        selectedPlan.id
                      }
                      selectedAddons={
                        selectedAddons
                      }
                      onChange={
                        setSelectedAddons
                      }
                    />
                  )}

                  {/* PRICE
                      AddonsSelector already renders the single package/add-on total.
                      Keep one calculation card only. */}

                </motion.div>
              )}


              {/* =========================================
                  EXISTING WEBSITE
              ========================================= */}

              {customerType ===
                PROJECT_TYPES.EXISTING_WEBSITE && (
                <motion.div
                  key="existing-website"
                  initial={{
                    opacity: 0,
                    y: 18,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -12,
                  }}
                  transition={{
                    duration: 0.4,
                  }}
                  className="space-y-10"
                >

                  <ExistingWebsiteServices
                    form={form}
                    onChange={
                      updateField
                    }
                  />

                 

                  <div>

                    <label
                      htmlFor="existingMessage"
                      className="mb-3 block text-[9px] font-bold uppercase tracking-[0.2em] text-therynox-muted"
                    >
                      Tell us what you need
                    </label>

                    <textarea
                      id="existingMessage"
                      name="message"
                      value={
                        form.message
                      }
                      onChange={
                        updateField
                      }
                      required
                      rows={6}
                      placeholder="Describe the changes, improvements or services you need..."
                      className="w-full resize-none rounded-xl border border-therynox-border bg-therynox-bg px-4 py-4 text-sm leading-6 outline-none transition placeholder:text-black/30 focus:border-therynox-orange"
                    />

                  </div>

                  {/* Starting estimate is already rendered by ExistingWebsiteServices. */}

                </motion.div>
              )}


              {/* =========================================
                  EXISTING THERYNOX PROJECT
              ========================================= */}

              {customerType ===
                PROJECT_TYPES.EXISTING_PROJECT && (
                <motion.div
                  key="existing-project"
                  initial={{
                    opacity: 0,
                    y: 18,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -12,
                  }}
                  transition={{
                    duration: 0.4,
                  }}
                  className="space-y-10"
                >

                  <div className="rounded-2xl border border-therynox-orange/20 bg-therynox-orange/[0.05] p-5">

                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-therynox-orange">
                      Existing client
                    </p>

                    <p className="mt-2 text-sm leading-6 text-therynox-muted">
                      Already working with THERYNOX?
                      Tell us what additional work
                      you need. Your original package
                      does not need to be purchased
                      again.
                    </p>

                  </div>

                  <ExistingWebsiteServices
                    form={form}
                    onChange={
                      updateField
                    }
                  />

                  <div>

                    <label
                      htmlFor="projectMessage"
                      className="mb-3 block text-[9px] font-bold uppercase tracking-[0.2em] text-therynox-muted"
                    >
                      Additional work required
                    </label>

                    <textarea
                      id="projectMessage"
                      name="message"
                      value={
                        form.message
                      }
                      onChange={
                        updateField
                      }
                      required
                      rows={6}
                      placeholder="Tell us what you want to add or change..."
                      className="w-full resize-none rounded-xl border border-therynox-border bg-therynox-bg px-4 py-4 text-sm leading-6 outline-none transition placeholder:text-black/30 focus:border-therynox-orange"
                    />

                  </div>

                  {/* Additional work is already rendered by ExistingWebsiteServices. */}

                </motion.div>
              )}

            </AnimatePresence>


            {/* =============================================
                SUBMIT
            ============================================= */}

            <div className="mt-10 border-t border-therynox-border pt-8">

              <button
                type="button"
                disabled={
                  submitting ||
                  !customerType
                }
                onClick={handleSubmit}
                className="group flex w-full items-center justify-between rounded-full bg-therynox-black px-7 py-5 text-[9px] font-bold uppercase tracking-[0.2em] text-white transition hover:bg-therynox-orange disabled:cursor-not-allowed disabled:opacity-40"
              >

                <span className="flex items-center gap-3">

                  {submitting && (
                    <Loader2
                      size={15}
                      className="animate-spin"
                    />
                  )}

                  {submitting
                    ? "Sending enquiry..."
                    : "Start a conversation"}

                </span>

                {!submitting && (
                  <ArrowUpRight
                    size={15}
                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                )}

              </button>

              <p className="mt-4 text-center text-[10px] leading-5 text-therynox-muted">
                Your information will only be used to
                contact you about your project enquiry.
              </p>

            </div>

          </div>

        </div>

      </section>

    </PageLayout>
  );
}


/* ==========================================================
   PLAN SELECTOR
========================================================== */

function PlanSelector({
  value,
  onChange,
}) {
  const plans = Object.values(
    PLANS
  );

  return (
    <div>

      <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-therynox-orange">
        Choose a package
      </p>

      <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em]">
        What are you looking to build?
      </h3>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">

        {plans.map((plan) => {
          const active =
            value === plan.id;

          return (
            <button
              key={plan.id}
              type="button"
              onClick={() =>
                onChange(plan.id)
              }
              className={`
                flex items-center justify-between
                rounded-2xl border p-5
                text-left transition-all duration-300

                ${
                  active
                    ? "border-therynox-black bg-therynox-black text-white"
                    : "border-therynox-border bg-therynox-bg hover:border-black/30"
                }
              `}
            >

              <div>

                <p className="text-sm font-semibold">
                  {plan.name}
                </p>

                <p
                  className={`
                    mt-1 text-xs
                    ${
                      active
                        ? "text-white/50"
                        : "text-therynox-muted"
                    }
                  `}
                >
                  {plan.pages
                    ? `Up to ${plan.pages} page${
                        plan.pages > 1
                          ? "s"
                          : ""
                      }`
                    : "Custom scope"}
                </p>

              </div>

              <span className="text-sm font-bold">
                ₹
                {plan.price.toLocaleString(
                  "en-IN"
                )}
                {plan.id ===
                  "ecommerce" ||
                plan.id ===
                  "businessApp" ||
                plan.id ===
                  "custom"
                  ? "+"
                  : ""}
              </span>

            </button>
          );
        })}

      </div>

    </div>
  );
}


/* ==========================================================
   SELECTED PLAN
========================================================== */

function SelectedPlan({
  plan,
}) {
  return (
    <div className="rounded-2xl border border-therynox-border bg-therynox-bg p-5 sm:p-6">

      <div className="flex items-center justify-between gap-5">

        <div>

          <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-therynox-orange">
            Selected package
          </p>

          <h3 className="mt-2 text-xl font-semibold tracking-[-0.04em]">
            {plan.name}
          </h3>

          <p className="mt-1 text-xs text-therynox-muted">
            Complete design, development and
            launch workflow included.
          </p>

        </div>

        <div className="shrink-0 text-right">

          <p className="text-2xl font-bold tracking-[-0.05em]">
            ₹
            {plan.price.toLocaleString(
              "en-IN"
            )}
            {plan.id ===
              "ecommerce" ||
            plan.id ===
              "businessApp" ||
            plan.id ===
              "custom"
              ? "+"
              : ""}
          </p>

        </div>

      </div>

    </div>
  );
}


/* ==========================================================
   FIELD
========================================================== */

function Field({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
}) {
  return (
    <div>

      <label
        htmlFor={name}
        className="mb-3 block text-[9px] font-bold uppercase tracking-[0.2em] text-therynox-muted"
      >
        {label}
      </label>

      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl border border-therynox-border bg-therynox-bg px-4 py-4 text-sm outline-none transition placeholder:text-black/30 focus:border-therynox-orange"
      />

    </div>
  );
}

function SuccessStep({
  number,
  text,
  delay,
  active = false,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: -15,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        delay,
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="flex items-center gap-4"
    >
      <div
        className={`
          flex h-8 w-8 shrink-0 items-center justify-center
          rounded-full text-[8px] font-bold
          ${
            active
              ? "bg-therynox-orange text-white"
              : "bg-therynox-black text-white"
          }
        `}
      >
        {number}
      </div>

      <div className="h-px w-5 bg-therynox-border" />

      <p className="text-xs font-medium text-therynox-black">
        {text}
      </p>

      {active && (
        <span className="ml-auto text-[8px] font-bold uppercase tracking-[0.15em] text-therynox-orange">
          Next
        </span>
      )}
    </motion.div>
  );
}

function SuccessAtmosphere() {
  const sheets = [
    { left: "8%", delay: 0.1, duration: 4.8, rotate: -18, size: "42px" },
    { left: "18%", delay: 0.7, duration: 5.6, rotate: 14, size: "30px" },
    { left: "29%", delay: 0.35, duration: 4.4, rotate: -10, size: "52px" },
    { left: "42%", delay: 1.1, duration: 5.2, rotate: 18, size: "34px" },
    { left: "55%", delay: 0.45, duration: 4.7, rotate: -14, size: "45px" },
    { left: "68%", delay: 1.25, duration: 5.8, rotate: 12, size: "30px" },
    { left: "79%", delay: 0.2, duration: 4.9, rotate: -20, size: "48px" },
    { left: "91%", delay: 0.9, duration: 5.3, rotate: 16, size: "35px" },
  ];

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >

      {/* =========================================
          SOFT ORANGE ATMOSPHERE
      ========================================= */}

      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{
          opacity: [0, 0.18, 0.08],
          scale: [0.7, 1.15, 1],
        }}
        transition={{
          duration: 2.2,
          ease: "easeOut",
        }}
        className="absolute left-1/2 top-[38%] h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-therynox-orange blur-[120px]"
      />

      {/* =========================================
          FLOATING PROJECT SHEETS
      ========================================= */}

      {sheets.map((sheet, index) => (
        <motion.div
          key={index}
          initial={{
            x: 0,
            y: "-15vh",
            rotate: sheet.rotate,
            opacity: 0,
          }}
          animate={{
            x: [0, 18, -15, 8, 0],
            y: ["-15vh", "25vh", "55vh", "82vh", "115vh"],
            rotate: [
              sheet.rotate,
              sheet.rotate + 35,
              sheet.rotate - 25,
              sheet.rotate + 55,
              sheet.rotate + 80,
            ],
            opacity: [
              0,
              0.7,
              0.5,
              0.25,
              0,
            ],
          }}
          transition={{
            duration: sheet.duration,
            delay: sheet.delay,
            ease: "easeInOut",
          }}
          style={{
            left: sheet.left,
            width: sheet.size,
            height: `calc(${sheet.size} * 1.28)`,
          }}
          className="absolute top-0"
        >
          <div className="relative h-full w-full overflow-hidden rounded-[6px] border border-black/10 bg-white/80 shadow-[0_12px_40px_rgba(0,0,0,0.12)] backdrop-blur-sm">

            {/* browser dots */}
            <div className="absolute left-[20%] top-[14%] flex gap-[3px]">
              <span className="h-[3px] w-[3px] rounded-full bg-black/20" />
              <span className="h-[3px] w-[3px] rounded-full bg-black/15" />
              <span className="h-[3px] w-[3px] rounded-full bg-therynox-orange/60" />
            </div>

            {/* content lines */}
            <div className="absolute left-[18%] right-[18%] top-[35%] space-y-[4px]">
              <span className="block h-[3px] w-[75%] rounded-full bg-black/15" />
              <span className="block h-[3px] w-full rounded-full bg-black/10" />
              <span className="block h-[3px] w-[55%] rounded-full bg-therynox-orange/40" />
            </div>

            {/* orange corner */}
            <div className="absolute bottom-0 right-0 h-[28%] w-[28%] rounded-tl-full bg-therynox-orange/20" />

          </div>
        </motion.div>
      ))}

      {/* =========================================
          DIGITAL TRAILS
      ========================================= */}

      {[0, 1, 2].map((item) => (
        <motion.div
          key={`trail-${item}`}
          initial={{
            opacity: 0,
            scaleX: 0,
          }}
          animate={{
            opacity: [0, 0.5, 0],
            scaleX: [0, 1, 0.4],
          }}
          transition={{
            duration: 2,
            delay: 0.5 + item * 0.35,
            ease: "easeOut",
          }}
          className="absolute left-1/2 top-[54%] h-px w-[260px] origin-left -translate-x-1/2 bg-gradient-to-r from-transparent via-therynox-orange to-transparent"
        />
      ))}

    </div>
  );
}