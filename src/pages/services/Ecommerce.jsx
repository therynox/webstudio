import React from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  CreditCard,
  Package,
  Search,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Truck,
  UserRound,
} from "lucide-react";
import { motion } from "framer-motion";

import PageLayout from "../../components/layout/PageLayout";
import PageHeader from "../../components/layout/PageHeader";

const capabilities = [
  {
    number: "01",
    title: "Storefronts",
    description:
      "Premium shopping experiences designed around your products, brand and customers.",
    icon: ShoppingBag,
  },
  {
    number: "02",
    title: "Product Systems",
    description:
      "Flexible product, category, variant and inventory structures built for growth.",
    icon: Package,
  },
  {
    number: "03",
    title: "Checkout & Payments",
    description:
      "Fast, simple checkout experiences connected to secure payment providers.",
    icon: CreditCard,
  },
  {
    number: "04",
    title: "Order Management",
    description:
      "Keep customers, orders, payments and fulfilment connected in one workflow.",
    icon: ShoppingCart,
  },
  {
    number: "05",
    title: "Customer Experience",
    description:
      "Accounts, order history, wishlists and personalised experiences that bring customers back.",
    icon: UserRound,
  },
  {
    number: "06",
    title: "Shipping & Fulfilment",
    description:
      "Connect shipping, tracking and fulfilment into the customer journey.",
    icon: Truck,
  },
];

const process = [
  {
    number: "01",
    title: "Discover",
    text: "Understand your products, customers, catalogue and business model.",
  },
  {
    number: "02",
    title: "Design",
    text: "Create a storefront that makes products easy to discover and buy.",
  },
  {
    number: "03",
    title: "Build",
    text: "Develop the store, catalogue, checkout, payments and business logic.",
  },
  {
    number: "04",
    title: "Grow",
    text: "Optimise the experience and build the foundation for long-term growth.",
  },
];

const products = [
  {
    name: "Essential Tee",
    price: "₹1,499",
    category: "NEW ARRIVAL",
    imageClass: "bg-[#e8e1d7]",
  },
  {
    name: "Studio Jacket",
    price: "₹3,999",
    category: "FEATURED",
    imageClass: "bg-[#dfe3e6]",
  },
  {
    name: "Everyday Bag",
    price: "₹2,499",
    category: "BESTSELLER",
    imageClass: "bg-[#e5e0e8]",
  },
];

export default function Ecommerce() {
  return (
    <PageLayout showCTA={false}>
      {/* =====================================================
          HEADER
      ===================================================== */}

      <PageHeader
        eyebrow="SERVICES / 03"
        number="03 / 06"
        title="E-Commerce."
        description="High-converting online stores designed to make products easy to discover, trust and buy."
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
              Turn products
              <br />
              into{" "}
              <span className="text-therynox-orange">
                experiences.
              </span>
            </motion.h2>

            <p className="max-w-md text-sm leading-7 text-therynox-muted sm:text-base">
              We build commerce experiences that combine strong visual
              design, intuitive shopping journeys and reliable technology.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          COMMERCE VISUAL
      ===================================================== */}

      <CommerceVisual />

      {/* =====================================================
          STATEMENT
      ===================================================== */}

      <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.65fr_0.35fr]">
            <h2 className="max-w-4xl text-4xl font-semibold leading-[0.98] tracking-[-0.06em] sm:text-5xl">
              From first click
              <br />
              to{" "}
              <span className="text-therynox-orange">
                loyal customer.
              </span>
            </h2>

            <p className="max-w-md text-sm leading-7 text-therynox-muted">
              Every part of an online store matters — discovery, product
              presentation, trust, checkout, payment and what happens after
              the purchase.
            </p>
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
                What we build
              </p>

              <h2 className="mt-6 max-w-sm text-4xl font-semibold leading-[0.95] tracking-[-0.06em] sm:text-5xl">
                Commerce
                <br />
                without friction.
              </h2>

              <p className="mt-6 max-w-sm text-sm leading-6 text-therynox-muted">
                From the storefront to fulfilment, every part of the
                experience is designed to work together.
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
                        strokeWidth={1.4}
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
          DARK SHOPPING JOURNEY
      ===================================================== */}

      <section className="bg-therynox-black px-5 py-24 text-white sm:px-8 lg:px-12 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-[0.42fr_0.58fr]">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-therynox-orange">
                The customer journey
              </p>

              <h2 className="mt-6 max-w-xl text-4xl font-semibold leading-[0.95] tracking-[-0.06em] sm:text-5xl">
                Simple for the
                <br />
                customer.
                <br />
                Powerful underneath.
              </h2>

              <p className="mt-6 max-w-md text-sm leading-7 text-white/40">
                The best commerce experiences hide the complexity and let
                customers focus on one thing: finding what they want.
              </p>
            </div>

            <ShoppingJourney />
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
                From product
                <br />
                to purchase.
              </h2>
            </div>

            <p className="max-w-sm text-sm leading-6 text-therynox-muted">
              A clear process keeps the store focused on customers while
              giving your business a solid technical foundation.
            </p>
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
                  {item.text}
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
                Ready to sell online?
              </p>

              <h2 className="mt-6 max-w-3xl text-4xl font-semibold leading-[0.95] tracking-[-0.06em] text-black sm:text-5xl lg:text-6xl">
                Let's build
                <br />
                your store.
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
   COMMERCE VISUAL
========================================================= */

function CommerceVisual() {
  return (
    <section className="px-5 pb-10 sm:px-8 lg:px-12 lg:pb-16">
      <div className="mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-[32px] border border-therynox-border bg-[#f7f6f3]">
          {/* STORE HEADER */}

          <div className="flex items-center justify-between border-b border-black/10 px-6 py-5 sm:px-8">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-therynox-black">
                <ShoppingBag
                  size={15}
                  className="text-white"
                  strokeWidth={1.5}
                />
              </div>

              <div>
                <p className="text-[8px] font-bold uppercase tracking-[0.3em] text-black/35">
                  THERYNOX STORE
                </p>

                <p className="mt-1 text-xs font-medium">
                  New collection
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Search
                size={17}
                strokeWidth={1.4}
                className="text-black/40"
              />

              <div className="relative">
                <ShoppingCart
                  size={17}
                  strokeWidth={1.4}
                  className="text-black/55"
                />

                <motion.span
                  animate={{
                    scale: [1, 1.15, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                  className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-therynox-orange text-[7px] font-bold text-white"
                >
                  2
                </motion.span>
              </div>
            </div>
          </div>

          {/* MAIN STORE */}

          <div className="grid lg:grid-cols-[1fr_0.37fr]">
            <div className="border-b border-black/10 p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
              <div className="flex items-end justify-between gap-5">
                <div>
                  <p className="text-[8px] font-bold uppercase tracking-[0.25em] text-therynox-orange">
                    Featured collection
                  </p>

                  <h3 className="mt-3 text-3xl font-semibold tracking-[-0.06em] sm:text-4xl">
                    Everyday,
                    <br />
                    refined.
                  </h3>
                </div>

                <button
                  type="button"
                  className="hidden items-center gap-2 text-[8px] font-bold uppercase tracking-[0.18em] text-black/40 sm:flex"
                >
                  View all
                  <ArrowRight size={13} />
                </button>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {products.map((product, index) => (
                  <ProductCard
                    key={product.name}
                    product={product}
                    index={index}
                  />
                ))}
              </div>
            </div>

            {/* CART */}

            <CartPanel />
          </div>

          {/* STORE FOOTER */}

          <div className="flex flex-col gap-3 border-t border-black/10 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <span className="text-[8px] font-bold uppercase tracking-[0.25em] text-black/30">
              Discover · Select · Checkout · Delivered
            </span>

            <span className="text-[8px] uppercase tracking-[0.2em] text-black/25">
              Premium commerce experience
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   PRODUCT CARD
========================================================= */

function ProductCard({
  product,
  index,
}) {
  return (
    <motion.div
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
        delay: index * 0.1,
      }}
      whileHover={{
        y: -4,
      }}
      className="group"
    >
      <div
        className={`relative aspect-[0.85] overflow-hidden rounded-xl ${product.imageClass}`}
      >
        <div className="absolute left-3 top-3 z-10 rounded-full bg-white/70 px-2.5 py-1 backdrop-blur-md">
          <span className="text-[6px] font-bold uppercase tracking-[0.15em] text-black/50">
            {product.category}
          </span>
        </div>

        <motion.div
          animate={{
            y: [0, -5, 0],
          }}
          transition={{
            duration: 4 + index,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-[14%] rounded-[40%_40%_12%_12%] bg-white/55 shadow-[0_20px_40px_rgba(0,0,0,0.08)]"
        />

        <div className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100">
          <ArrowUpRight size={13} />
        </div>
      </div>

      <div className="mt-3 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium">
            {product.name}
          </p>

          <p className="mt-1 text-[9px] text-black/35">
            Premium collection
          </p>
        </div>

        <span className="text-xs font-semibold">
          {product.price}
        </span>
      </div>
    </motion.div>
  );
}

/* =========================================================
   CART PANEL
========================================================= */

function CartPanel() {
  return (
    <div className="bg-white p-6 sm:p-8 lg:p-7">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[8px] font-bold uppercase tracking-[0.25em] text-black/30">
            Your cart
          </p>

          <h3 className="mt-2 text-lg font-semibold tracking-[-0.04em]">
            2 items
          </h3>
        </div>

        <ShoppingCart
          size={18}
          strokeWidth={1.4}
          className="text-therynox-orange"
        />
      </div>

      <div className="mt-7 space-y-4">
        <CartItem
          name="Essential Tee"
          price="₹1,499"
        />

        <CartItem
          name="Studio Jacket"
          price="₹3,999"
        />
      </div>

      <div className="mt-7 border-t border-black/10 pt-5">
        <div className="flex items-center justify-between text-xs">
          <span className="text-black/40">
            Subtotal
          </span>

          <span className="font-medium">
            ₹5,498
          </span>
        </div>

        <div className="mt-2 flex items-center justify-between text-xs">
          <span className="text-black/40">
            Shipping
          </span>

          <span className="font-medium">
            Free
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-black/10 pt-4">
          <span className="text-sm font-semibold">
            Total
          </span>

          <span className="text-lg font-semibold tracking-[-0.04em]">
            ₹5,498
          </span>
        </div>
      </div>

      <button
        type="button"
        className="group mt-6 flex w-full items-center justify-between rounded-full bg-therynox-black px-5 py-4 text-[8px] font-bold uppercase tracking-[0.2em] text-white transition hover:bg-therynox-orange"
      >
        Checkout

        <ArrowUpRight
          size={14}
          className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
        />
      </button>

      <div className="mt-4 flex items-center justify-center gap-2">
        <Check
          size={12}
          className="text-green-500"
        />

        <span className="text-[7px] uppercase tracking-[0.18em] text-black/30">
          Secure checkout
        </span>
      </div>
    </div>
  );
}

/* =========================================================
   CART ITEM
========================================================= */

function CartItem({
  name,
  price,
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-12 w-12 shrink-0 rounded-lg bg-therynox-bg" />

      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-medium">
          {name}
        </p>

        <p className="mt-1 text-[9px] text-black/30">
          Qty 1
        </p>
      </div>

      <span className="text-xs font-medium">
        {price}
      </span>
    </div>
  );
}

/* =========================================================
   SHOPPING JOURNEY
========================================================= */

function ShoppingJourney() {
  const steps = [
    {
      number: "01",
      label: "PRODUCT",
      title: "Discover",
      icon: Search,
    },
    {
      number: "02",
      label: "CART",
      title: "Select",
      icon: ShoppingCart,
    },
    {
      number: "03",
      label: "CHECKOUT",
      title: "Purchase",
      icon: CreditCard,
    },
    {
      number: "04",
      label: "ORDER",
      title: "Deliver",
      icon: Truck,
    },
  ];

  return (
    <div className="rounded-[24px] border border-white/10 bg-white/[0.025] p-5 sm:p-7">
      {steps.map((step, index) => {
        const Icon = step.icon;

        return (
          <React.Fragment key={step.number}>
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
              transition={{
                delay: index * 0.1,
              }}
              className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.025] p-4"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-therynox-orange/10">
                <Icon
                  size={17}
                  strokeWidth={1.4}
                  className="text-therynox-orange"
                />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[7px] font-bold tracking-[0.2em] text-therynox-orange">
                    {step.number}
                  </span>

                  <span className="text-[7px] font-bold uppercase tracking-[0.2em] text-white/25">
                    {step.label}
                  </span>
                </div>

                <p className="mt-1 text-sm font-medium text-white/75">
                  {step.title}
                </p>
              </div>

              <Check
                size={15}
                strokeWidth={2}
                className="text-green-400"
              />
            </motion.div>

            {index < steps.length - 1 && (
              <div className="flex h-7 items-center pl-9">
                <motion.div
                  animate={{
                    opacity: [0.2, 1, 0.2],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: index * 0.2,
                  }}
                  className="h-7 w-px bg-therynox-orange/50"
                />
              </div>
            )}
          </React.Fragment>
        );
      })}

      <div className="mt-7 flex items-center justify-center gap-3 rounded-full border border-white/10 bg-white/[0.02] px-5 py-3">
        <Sparkles
          size={13}
          className="text-therynox-orange"
        />

        <span className="text-[8px] font-bold uppercase tracking-[0.22em] text-white/30">
          Every step designed for conversion
        </span>
      </div>
    </div>
  );
}