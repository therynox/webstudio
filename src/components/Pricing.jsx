import React, { useRef } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Plus,
} from "lucide-react";

const pricingPlans = [
  {
    id: "launch",
    number: "01",
    icon: "🌱",
    name: "Launch",
    price: "₹2,999",
    suffix: "",
    description: "For individuals, creators and simple launches.",
    delivery: "3–5 days",
    features: [
      "One-page website",
      "Custom responsive design",
      "Hero section",
      "About / Services",
      "Contact section",
      "WhatsApp integration",
      "Social links",
      "Basic SEO",
      "Mobile optimization",
    ],
    button: "Start Project",
  },

  {
    id: "starter",
    number: "02",
    icon: "🚀",
    name: "Starter",
    price: "₹4,999",
    suffix: "",
    description: "For small businesses ready to build their presence.",
    delivery: "5–7 days",
    features: [
      "Up to 4 pages",
      "Custom UI design",
      "Mobile + tablet responsive",
      "Contact form",
      "WhatsApp integration",
      "Google Maps",
      "Social media integration",
      "Basic SEO",
      "Basic animations",
      "Performance optimization",
    ],
    button: "Choose Starter",
  },

  {
    id: "business",
    number: "03",
    icon: "⚡",
    name: "Business",
    price: "₹7,999",
    suffix: "",
    popular: true,
    description:
      "For growing businesses that need more than a basic website.",
    delivery: "7–10 days",
    features: [
      "Up to 8 pages",
      "Premium custom UI/UX",
      "Advanced responsive layouts",
      "Enquiry & contact forms",
      "WhatsApp integration",
      "Google Maps",
      "Testimonials",
      "Gallery / Portfolio",
      "SEO setup",
      "Google Analytics",
      "Performance optimization",
    ],
    button: "Build My Website",
  },

  {
    id: "premium",
    number: "04",
    icon: "🏆",
    name: "Premium",
    price: "₹12,999",
    suffix: "",
    description: "For brands that want a stronger digital presence.",
    delivery: "10–14 days",
    features: [
      "Up to 12 pages",
      "Premium UI/UX",
      "Advanced animations",
      "Custom sections",
      "Blog / News system",
      "Advanced forms",
      "SEO optimization",
      "Analytics setup",
      "Speed optimization",
      "Social integrations",
      "CMS integration",
      "15 days support",
    ],
    button: "Go Premium",
  },

  {
    id: "commerce",
    number: "05",
    icon: "🛒",
    name: "Commerce",
    price: "₹14,999",
    suffix: "+",
    description: "For businesses ready to sell online.",
    delivery: "15–21 days",
    features: [
      "Custom e-commerce storefront",
      "Product categories",
      "Product variants",
      "Product management",
      "Shopping cart",
      "Checkout",
      "Payment gateway",
      "Order management",
      "Customer accounts",
      "Coupon system",
      "Admin dashboard",
      "SEO setup",
      "Analytics",
    ],
    button: "Build My Store",
  },

  {
    id: "business-app",
    number: "06",
    icon: "💼",
    name: "Business App",
    price: "₹24,999",
    suffix: "+",
    description:
      "For businesses that need custom software and workflows.",
    delivery: "Custom",
    features: [
      "Custom UI/UX",
      "User authentication",
      "Admin dashboard",
      "Database integration",
      "Customer management",
      "Forms & workflows",
      "API integrations",
      "WhatsApp / Email",
      "Reports & analytics",
      "Role-based permissions",
      "Real-time features",
      "Deployment",
    ],
    button: "Build My App",
  },

  {
    id: "custom-platform",
    number: "07",
    icon: "🧠",
    name: "Custom Platform",
    price: "₹49,999",
    suffix: "+",
    description:
      "For startups, enterprises and complex digital products.",
    delivery: "Custom",
    features: [
      "Complete custom UI/UX",
      "React / Next.js",
      "Laravel / PHP backend",
      "Custom database architecture",
      "REST APIs",
      "Payment systems",
      "Real-time functionality",
      "Advanced authentication",
      "Admin panel",
      "Analytics & reporting",
      "Third-party integrations",
      "Cloud deployment",
      "Security optimization",
      "Performance optimization",
    ],
    button: "Talk About Project",
  },
];

const addOns = [
  ["Extra Page", "₹500"],
  ["Premium Animation", "₹1,500+"],
  ["SEO Setup", "₹2,999+"],
  ["WhatsApp Integration", "₹499"],
  ["Payment Gateway", "₹1,999+"],
  ["Google Analytics", "₹499"],
  ["Domain Setup", "₹499"],
  ["Hosting Setup", "₹999"],
  ["Maintenance", "₹999/month"],
  ["Extra Revision", "₹499"],
];

const technologies = {
  Frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  Backend: ["Laravel", "PHP", "Node.js", "NestJS"],
  Database: ["MySQL", "PostgreSQL", "Prisma"],
  "Real-time": ["WebSockets", "Laravel Reverb", "WebRTC"],
  Payments: ["Razorpay", "Cashfree"],
  Infrastructure: ["Vercel", "Cloudinary", "GitHub", "Docker"],
};

export default function Pricing() {
  const sliderRef = useRef(null);

  const scrollCards = (direction) => {
    if (!sliderRef.current) return;

    const amount = sliderRef.current.clientWidth * 0.72;

    sliderRef.current.scrollBy({
      left: direction === "next" ? amount : -amount,
      behavior: "smooth",
    });
  };

  return (
    <main className="overflow-hidden bg-therynox-bg text-therynox-black">

      {/* =====================================================
          PRICING HERO
      ===================================================== */}

      <section className="px-5 pb-16 pt-28 sm:px-8 lg:px-12 lg:pb-20 lg:pt-32">

        <div className="mx-auto max-w-7xl">

          {/* Top line */}

          <div className="flex items-center justify-between border-b border-therynox-border pb-5">

            <div className="flex items-center gap-3">

              <span className="h-2 w-2 rounded-full bg-therynox-orange" />

              <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-therynox-orange">
                Pricing
              </span>

            </div>

            <span className="text-[9px] font-medium tracking-[0.2em] text-therynox-muted">
              04 / 06
            </span>

          </div>

          {/* Hero */}

          <div className="grid gap-8 pt-14 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:pt-20">

            <h1 className="max-w-4xl text-[clamp(4rem,8vw,8.5rem)] font-semibold leading-[0.82] tracking-[-0.075em]">
              Choose your
              <br />
              level.
            </h1>

            <div className="max-w-md pb-2">

              <p className="text-base leading-7 text-therynox-muted sm:text-lg">
                Flexible digital solutions designed around your
                business, goals and growth.
              </p>

              <div className="mt-7 flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.25em]">

                <span>Scroll to explore</span>

                <ArrowRight
                  size={14}
                  className="text-therynox-orange"
                />

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          PLANS
      ===================================================== */}

      <section className="pb-20">

        <div className="mx-auto max-w-[1600px]">

          {/* Section heading */}

          <div className="mb-7 flex items-end justify-between px-5 sm:px-8 lg:px-12">

            <div>

              <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-therynox-orange">
                Investment
              </span>

              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">
                Choose your starting point.
              </h2>

            </div>

            {/* arrows */}

            <div className="hidden gap-2 sm:flex">

              <button
                type="button"
                onClick={() => scrollCards("prev")}
                aria-label="Previous pricing plans"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-therynox-border bg-white transition-all duration-300 hover:bg-therynox-black hover:text-white"
              >
                <ArrowLeft size={17} />
              </button>

              <button
                type="button"
                onClick={() => scrollCards("next")}
                aria-label="Next pricing plans"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-therynox-border bg-white transition-all duration-300 hover:bg-therynox-black hover:text-white"
              >
                <ArrowRight size={17} />
              </button>

            </div>

          </div>


          {/* Horizontal slider */}

          <div
            ref={sliderRef}
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-8 scrollbar-hide sm:px-8 lg:px-12"
          >

            {pricingPlans.map((plan) => (
              <PricingCard
                key={plan.id}
                plan={plan}
              />
            ))}

          </div>


          {/* Mobile hint */}

          <div className="px-5 pt-2 text-center sm:hidden">

            <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-therynox-muted">
              Swipe to explore plans →
            </span>

          </div>

        </div>

      </section>


      {/* =====================================================
          ADDONS
      ===================================================== */}

      <section className="border-y border-therynox-border bg-therynox-surface">

        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-24">

          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">

            <div>

              <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-therynox-orange">
                Add-ons
              </span>

              <h2 className="mt-5 text-4xl font-semibold leading-[0.95] tracking-[-0.06em] sm:text-6xl">
                Add what
                <br />
                you need.
              </h2>

              <p className="mt-6 max-w-md text-sm leading-7 text-therynox-muted">
                Extend your project with additional features and
                services whenever you need them.
              </p>

            </div>


            <div className="grid border-t border-therynox-border sm:grid-cols-2">

              {addOns.map(([name, price]) => (

                <div
                  key={name}
                  className="flex items-center justify-between border-b border-therynox-border py-5 sm:px-4"
                >

                  <div className="flex items-center gap-3">

                    <Plus
                      size={13}
                      className="text-therynox-orange"
                    />

                    <span className="text-sm">
                      {name}
                    </span>

                  </div>

                  <span className="text-xs font-semibold">
                    {price}
                  </span>

                </div>

              ))}

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          TECHNOLOGY
      ===================================================== */}

      <section className="bg-therynox-black text-white">

        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-28">

          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">

            <div>

              <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-therynox-orange">
                Technology
              </span>

              <h2 className="mt-5 text-4xl font-semibold leading-[0.95] tracking-[-0.06em] sm:text-6xl">
                Built with the
                <br />
                right technology.
              </h2>

            </div>

            <p className="max-w-lg text-sm leading-7 text-white/50 lg:pt-10">
              We select technology around your product, users and
              business requirements.
            </p>

          </div>


          <div className="mt-16 grid border-t border-white/10 sm:grid-cols-2 lg:grid-cols-3">

            {Object.entries(technologies).map(
              ([category, items]) => (

                <div
                  key={category}
                  className="border-b border-white/10 p-6 lg:p-8"
                >

                  <p className="mb-6 text-[9px] font-bold uppercase tracking-[0.25em] text-therynox-orange">
                    {category}
                  </p>

                  <div className="flex flex-wrap gap-2">

                    {items.map((technology) => (

                      <span
                        key={technology}
                        className="rounded-full border border-white/10 px-3 py-2 text-xs text-white/70 transition-colors hover:border-therynox-orange hover:text-white"
                      >
                        {technology}
                      </span>

                    ))}

                  </div>

                </div>

              )
            )}

          </div>

        </div>

      </section>


      {/* =====================================================
          CTA
      ===================================================== */}


    </main>
  );
}


/* =============================================================
   PRICING CARD
============================================================= */
function PricingCard({ plan }) {
  const contactUrl = `/contact?plan=${encodeURIComponent(
    plan.name
  )}&price=${encodeURIComponent(`${plan.price}${plan.suffix}`)}`;

  return (
    <article
      className={`
        group relative flex h-[680px] w-[86vw] max-w-[460px]
        shrink-0 snap-center flex-col overflow-hidden rounded-[28px]
        border transition-all duration-500
        sm:w-[52vw]
        lg:h-[700px] lg:w-[31vw] lg:max-w-[430px]
        ${
          plan.popular
            ? "border-therynox-orange bg-therynox-black text-white"
            : "border-therynox-border bg-white text-therynox-black"
        }
      `}
    >
      {/* =====================================================
          POPULAR BADGE
      ===================================================== */}

      {plan.popular && (
        <div className="absolute right-6 top-6 z-10 rounded-full bg-therynox-orange px-4 py-2 text-[8px] font-bold uppercase tracking-[0.2em] text-white">
          Most Popular
        </div>
      )}

      {/* =====================================================
          CARD HEADER
      ===================================================== */}

      <div
        className={`
          shrink-0 border-b p-7 sm:p-8
          ${
            plan.popular
              ? "border-white/10"
              : "border-therynox-border"
          }
        `}
      >
        {/* Number */}

        <div className="flex items-center justify-between">

          <span
            className={`
              text-[9px] font-bold uppercase tracking-[0.25em]
              ${
                plan.popular
                  ? "text-white/40"
                  : "text-therynox-muted"
              }
            `}
          >
            {plan.number} / 07
          </span>

        </div>

        {/* Name */}

        <div className="mt-7 flex items-center gap-3">

          <span className="text-xl">
            {plan.icon}
          </span>

          <h3 className="text-2xl font-semibold tracking-[-0.04em]">
            {plan.name}
          </h3>

        </div>

        {/* Price */}

        <div className="mt-7 flex items-baseline">

          <span className="text-[clamp(3rem,5vw,4rem)] font-semibold leading-none tracking-[-0.07em]">
            {plan.price}
          </span>

          {plan.suffix && (
            <span className="ml-1 text-xl font-medium">
              {plan.suffix}
            </span>
          )}

        </div>

        {/* Description */}

        <p
          className={`
            mt-5 max-w-[340px] text-sm leading-6
            ${
              plan.popular
                ? "text-white/55"
                : "text-therynox-muted"
            }
          `}
        >
          {plan.description}
        </p>

        {/* Delivery */}

        <div className="mt-6 flex items-center gap-2">

          <span className="h-1.5 w-1.5 rounded-full bg-therynox-orange" />

          <span
            className={`
              text-[9px] font-bold uppercase tracking-[0.2em]
              ${
                plan.popular
                  ? "text-white/45"
                  : "text-therynox-muted"
              }
            `}
          >
            {plan.delivery}
          </span>

        </div>
      </div>

      {/* =====================================================
          FEATURES
      ===================================================== */}

      <div className="flex min-h-0 flex-1 flex-col p-7 sm:p-8">

        <p
          className={`
            mb-5 shrink-0 text-[9px] font-bold uppercase
            tracking-[0.25em]
            ${
              plan.popular
                ? "text-white/35"
                : "text-therynox-muted"
            }
          `}
        >
          Includes
        </p>

        {/* Feature list */}

        <div className="min-h-0 flex-1 overflow-y-auto pr-2 scrollbar-hide">

          <ul className="grid gap-3">

            {plan.features.map((feature) => (

              <li
                key={feature}
                className="flex items-start gap-3 text-[13px] leading-5"
              >

                <span
                  className={`
                    mt-[2px] flex h-[17px] w-[17px]
                    shrink-0 items-center justify-center
                    rounded-full
                    ${
                      plan.popular
                        ? "bg-white/10"
                        : "bg-therynox-surface"
                    }
                  `}
                >
                  <Check
                    size={9}
                    strokeWidth={3}
                    className="text-therynox-orange"
                  />
                </span>

                <span
                  className={
                    plan.popular
                      ? "text-white/70"
                      : "text-therynox-muted"
                  }
                >
                  {feature}
                </span>

              </li>

            ))}

          </ul>

        </div>

        {/* =================================================
            BUTTON
        ================================================= */}

        <a
          href={contactUrl}
          className={`
            group mt-6 flex shrink-0 items-center
            justify-between rounded-full px-6 py-4
            text-[9px] font-bold uppercase tracking-[0.18em]
            transition-all duration-300
            ${
              plan.popular
                ? "bg-white text-black hover:bg-therynox-orange hover:text-white"
                : "bg-therynox-black text-white hover:bg-therynox-orange"
            }
          `}
        >
          <span>{plan.button}</span>

          <ArrowUpRight
            size={14}
            className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
          />
        </a>

      </div>
    </article>
  );
}