import React from "react";
import {
  Activity,
  ArrowUpRight,
  CheckCircle2,
  Code2,
  CreditCard,
  Database,
  Globe2,
  LockKeyhole,
  Server,
  ShoppingBag,
  ShoppingCart,
  Terminal,
  Webhook,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";





export default function ServiceVisual({
  type = "development",
}) {
  if (type === "development") {
    return <DevelopmentVisual />;
  }

  if (type === "ecommerce") {
    return <EcommerceVisual />;
  }

  return null;
}

function EcommerceVisual() {
  const products = [
    { name: "Premium Hoodie", price: "₹2,499" },
    { name: "Essential Tee", price: "₹1,299" },
    { name: "Classic Cap", price: "₹899" },
  ];

  return (
    <section className="px-5 pb-24 sm:px-8 lg:px-12 lg:pb-32">
      <div className="mx-auto max-w-7xl">

        <div className="relative min-h-[560px] overflow-hidden rounded-[32px] bg-[#0b0b0b] sm:min-h-[650px]">

          {/* GRID */}

          <div
            className="absolute inset-0 opacity-[0.10]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
              backgroundSize: "64px 64px",
            }}
          />

          {/* GLOW */}

          <motion.div
            animate={{
              x: [0, 90, -50, 0],
              y: [0, -40, 60, 0],
              scale: [1, 1.2, 0.9, 1],
            }}
            transition={{
              duration: 11,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute left-[30%] top-[10%] h-80 w-80 rounded-full bg-therynox-orange/20 blur-[120px]"
          />

          {/* LABEL */}

          <div className="absolute left-7 top-7 flex items-center gap-3 sm:left-10 sm:top-10">

            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.05]">
              <ShoppingBagIcon />
            </div>

            <div>
              <p className="text-[8px] font-bold uppercase tracking-[0.3em] text-white/35">
                Commerce system
              </p>

              <p className="mt-1 text-xs text-white/70">
                Storefront → Order
              </p>
            </div>

          </div>

          {/* MAIN */}

          <div className="absolute inset-x-5 top-28 bottom-20 flex items-center justify-center sm:inset-x-10 sm:top-32 sm:bottom-24">

            <div className="grid w-full max-w-5xl gap-5 lg:grid-cols-[1.15fr_0.85fr]">

              {/* STORE */}

              <motion.div
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl"
              >

                {/* browser bar */}

                <div className="flex h-11 items-center gap-2 border-b border-white/10 px-4">

                  <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                  <span className="h-2.5 w-2.5 rounded-full bg-therynox-orange" />

                  <div className="ml-4 h-5 flex-1 rounded-full bg-white/[0.05]" />

                </div>

                <div className="p-5 sm:p-7">

                  {/* STORE HEADER */}

                  <div className="flex items-center justify-between">

                    <div>
                      <p className="text-sm font-bold tracking-[-0.03em] text-white">
                        NOIR / STORE
                      </p>

                      <p className="mt-1 text-[8px] uppercase tracking-[0.2em] text-white/30">
                        Premium collection
                      </p>
                    </div>

                    <div className="relative flex h-9 w-9 items-center justify-center rounded-full border border-white/10">
                      <ShoppingBagIcon size={14} />

                      <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-therynox-orange text-[7px] font-bold text-white">
                        2
                      </span>
                    </div>

                  </div>

                  {/* PRODUCTS */}

                  <div className="mt-6 grid grid-cols-3 gap-3">

                    {products.map((product, index) => (
                      <motion.div
                        key={product.name}
                        animate={{
                          y: [0, index === 1 ? -5 : 0, 0],
                        }}
                        transition={{
                          duration: 3 + index,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]"
                      >

                        <div className="aspect-square bg-gradient-to-br from-white/[0.10] to-white/[0.02]" />

                        <div className="p-3">

                          <p className="truncate text-[8px] text-white/50">
                            {product.name}
                          </p>

                          <p className="mt-2 text-[9px] font-semibold text-white">
                            {product.price}
                          </p>

                        </div>

                      </motion.div>
                    ))}

                  </div>

                  {/* CART */}

                  <div className="mt-5 flex items-center justify-between rounded-xl border border-therynox-orange/20 bg-therynox-orange/[0.06] px-4 py-3">

                    <div className="flex items-center gap-3">

                      <ShoppingCartIcon />

                      <div>
                        <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/35">
                          Cart
                        </p>

                        <p className="mt-1 text-xs text-white/70">
                          2 items
                        </p>
                      </div>

                    </div>

                    <span className="text-sm font-semibold text-therynox-orange">
                      ₹3,798
                    </span>

                  </div>

                </div>

              </motion.div>


              {/* ORDER SYSTEM */}

              <div className="grid gap-5">

                {/* CHECKOUT */}

                <motion.div
                  initial={{
                    opacity: 0,
                    x: 25,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.15,
                    duration: 0.7,
                  }}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl"
                >

                  <div className="flex items-center justify-between">

                    <div className="flex items-center gap-3">

                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-therynox-orange/10">
                        <CreditCardIcon />
                      </div>

                      <div>
                        <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/30">
                          Checkout
                        </p>

                        <p className="mt-1 text-sm font-semibold text-white">
                          Payment secured
                        </p>
                      </div>

                    </div>

                    <CheckCircleIcon />

                  </div>

                  <div className="mt-5 space-y-2">

                    <OrderLine
                      label="Subtotal"
                      value="₹3,798"
                    />

                    <OrderLine
                      label="Shipping"
                      value="Free"
                    />

                    <OrderLine
                      label="Total"
                      value="₹3,798"
                      strong
                    />

                  </div>

                </motion.div>


                {/* ORDER */}

                <motion.div
                  initial={{
                    opacity: 0,
                    x: 25,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.3,
                    duration: 0.7,
                  }}
                  className="rounded-2xl border border-therynox-orange/20 bg-therynox-orange/[0.06] p-5 backdrop-blur-xl"
                >

                  <div className="flex items-center justify-between">

                    <div>

                      <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/30">
                        Order #THX-2481
                      </p>

                      <p className="mt-2 text-sm font-semibold text-white">
                        Payment received
                      </p>

                    </div>

                    <motion.div
                      animate={{
                        scale: [1, 1.12, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-therynox-orange"
                    >
                      <CheckCircleIcon
                        size={16}
                      />
                    </motion.div>

                  </div>

                  <div className="mt-5 flex items-center gap-2">

                    <div className="h-1 flex-1 rounded-full bg-therynox-orange" />

                    <div className="h-1 flex-1 rounded-full bg-therynox-orange" />

                    <div className="h-1 flex-1 rounded-full bg-white/10" />

                  </div>

                  <div className="mt-3 flex justify-between text-[7px] uppercase tracking-[0.15em] text-white/30">

                    <span>Paid</span>
                    <span>Processing</span>
                    <span>Shipped</span>

                  </div>

                </motion.div>

              </div>

            </div>

          </div>


          {/* BOTTOM */}

          <div className="absolute bottom-7 left-7 right-7 flex items-center justify-between sm:bottom-10 sm:left-10 sm:right-10">

            <div className="flex items-center gap-2">

              <motion.span
                animate={{
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
                className="h-1.5 w-1.5 rounded-full bg-green-400"
              />

              <span className="text-[8px] font-bold uppercase tracking-[0.25em] text-white/35">
                Commerce operational
              </span>

            </div>

            <span className="hidden text-[8px] font-bold uppercase tracking-[0.25em] text-white/25 sm:block">
              Storefront · Checkout · Orders
            </span>

          </div>

        </div>

      </div>
    </section>
  );
}

function DevelopmentVisual() {
  return (
    <section className="px-5 pb-24 sm:px-8 lg:px-12 lg:pb-32">
      <div className="mx-auto max-w-7xl">

        <div className="relative min-h-[560px] overflow-hidden rounded-[32px] bg-[#0b0b0b] sm:min-h-[650px]">

          {/* =================================================
              BACKGROUND GRID
          ================================================= */}

          <div
            className="absolute inset-0 opacity-[0.10]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
              backgroundSize: "64px 64px",
            }}
          />

          {/* =================================================
              ORANGE GLOW
          ================================================= */}

          <motion.div
            animate={{
              x: [0, 100, -60, 0],
              y: [0, -50, 70, 0],
              scale: [1, 1.2, 0.9, 1],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute left-[35%] top-[10%] h-80 w-80 rounded-full bg-therynox-orange/20 blur-[120px]"
          />

          <motion.div
            animate={{
              x: [0, -70, 50, 0],
              y: [0, 50, -40, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-[5%] right-[5%] h-64 w-64 rounded-full bg-orange-500/10 blur-[100px]"
          />

          {/* =================================================
              TOP LABEL
          ================================================= */}

          <div className="absolute left-7 top-7 flex items-center gap-3 sm:left-10 sm:top-10">

            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.05]">
              <Code2
                size={15}
                className="text-therynox-orange"
              />
            </div>

            <div>
              <p className="text-[8px] font-bold uppercase tracking-[0.3em] text-white/35">
                Development system
              </p>

              <p className="mt-1 text-xs text-white/70">
                Built to perform
              </p>
            </div>

          </div>

          {/* =================================================
              ARCHITECTURE LABELS
          ================================================= */}

          <div className="absolute bottom-7 left-7 hidden gap-2 sm:flex sm:left-10 sm:bottom-10">

            <TechPill icon={Globe2} label="Frontend" />
            <TechPill icon={Server} label="Backend" />
            <TechPill icon={Database} label="Database" />

          </div>

          {/* =================================================
              MAIN SYSTEM
          ================================================= */}

          <div className="absolute inset-x-5 top-28 bottom-20 flex items-center justify-center sm:inset-x-10 sm:top-32 sm:bottom-24">

            <div className="relative w-full max-w-5xl">

              {/* CONNECTION LINE */}

              <div className="absolute left-[16%] right-[16%] top-1/2 hidden h-px bg-white/10 md:block" />

              <motion.div
                animate={{
                  left: ["16%", "82%"],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute top-1/2 hidden h-1 w-16 rounded-full bg-therynox-orange blur-[2px] md:block"
              />

              <div className="grid gap-5 md:grid-cols-3">

                {/* FRONTEND */}

                <SystemCard
                  icon={Code2}
                  label="01 / FRONTEND"
                  title="Interface"
                  description="Fast responsive experiences."
                  delay={0}
                >

                  <div className="mt-5 space-y-2">

                    <CodeLine text="<App>" />
                    <CodeLine text="  <Header />" muted />
                    <CodeLine text="  <Dashboard />" orange />
                    <CodeLine text="</App>" />

                  </div>

                </SystemCard>


                {/* BACKEND */}

                <SystemCard
                  icon={Server}
                  label="02 / BACKEND"
                  title="API Layer"
                  description="Secure business logic."
                  delay={0.12}
                  featured
                >

                  <div className="mt-5 rounded-xl border border-white/10 bg-black/30 p-4">

                    <div className="flex items-center gap-2">

                      <motion.span
                        animate={{
                          opacity: [0.3, 1, 0.3],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                        }}
                        className="h-2 w-2 rounded-full bg-therynox-orange"
                      />

                      <span className="text-[9px] uppercase tracking-[0.2em] text-white/40">
                        API online
                      </span>

                    </div>

                    <div className="mt-4 space-y-3">

                      <ApiRow
                        method="GET"
                        path="/projects"
                      />

                      <ApiRow
                        method="POST"
                        path="/enquiry"
                      />

                      <ApiRow
                        method="AUTH"
                        path="/secure"
                      />

                    </div>

                  </div>

                </SystemCard>


                {/* DATABASE */}

                <SystemCard
                  icon={Database}
                  label="03 / DATABASE"
                  title="Data"
                  description="Structured and reliable."
                  delay={0.24}
                >

                  <div className="mt-5 space-y-3">

                    <DatabaseRow
                      name="users"
                      count="1,248"
                    />

                    <DatabaseRow
                      name="projects"
                      count="384"
                    />

                    <DatabaseRow
                      name="orders"
                      count="2,914"
                    />

                  </div>

                </SystemCard>

              </div>

            </div>

          </div>

          {/* =================================================
              BOTTOM STATUS
          ================================================= */}

          <div className="absolute bottom-7 right-7 flex items-center gap-4 sm:bottom-10 sm:right-10">

            <div className="hidden items-center gap-2 sm:flex">

              <motion.span
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="h-1.5 w-1.5 rounded-full bg-green-400"
              />

              <span className="text-[8px] font-bold uppercase tracking-[0.25em] text-white/40">
                Systems operational
              </span>

            </div>

            <div className="flex items-center gap-2 text-[8px] font-bold uppercase tracking-[0.2em] text-white/40">
              <Activity size={13} />
              Live architecture
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}


/* =========================================================
   SYSTEM CARD
========================================================= */

function SystemCard({
  icon: Icon,
  label,
  title,
  description,
  children,
  delay = 0,
  featured = false,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 35,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        margin: "-80px",
      }}
      transition={{
        delay,
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -6,
      }}
      className={`relative rounded-2xl border p-5 backdrop-blur-xl transition-colors duration-300 ${
        featured
          ? "border-therynox-orange/30 bg-therynox-orange/[0.07]"
          : "border-white/10 bg-white/[0.04]"
      }`}
    >

      <div className="flex items-start justify-between">

        <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.05]">
          <Icon
            size={16}
            className={
              featured
                ? "text-therynox-orange"
                : "text-white/60"
            }
          />
        </div>

        <ArrowUpRight
          size={14}
          className="text-white/20"
        />

      </div>

      <p className="mt-6 text-[8px] font-bold uppercase tracking-[0.25em] text-white/30">
        {label}
      </p>

      <h3 className="mt-2 text-xl font-semibold tracking-[-0.04em] text-white">
        {title}
      </h3>

      <p className="mt-2 text-xs leading-5 text-white/40">
        {description}
      </p>

      {children}

    </motion.div>
  );
}


/* =========================================================
   CODE LINE
========================================================= */

function CodeLine({
  text,
  muted = false,
  orange = false,
}) {
  return (
    <div
      className={`font-mono text-[10px] ${
        orange
          ? "text-therynox-orange"
          : muted
          ? "text-white/25"
          : "text-white/50"
      }`}
    >
      {text}
    </div>
  );
}


/* =========================================================
   API ROW
========================================================= */

function ApiRow({ method, path }) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-white/[0.03] px-3 py-2">

      <div className="flex items-center gap-2">

        <span className="text-[7px] font-bold text-therynox-orange">
          {method}
        </span>

        <span className="font-mono text-[9px] text-white/45">
          {path}
        </span>

      </div>

      <CheckCircle2
        size={11}
        className="text-green-400/70"
      />

    </div>
  );
}


/* =========================================================
   DATABASE ROW
========================================================= */

function DatabaseRow({ name, count }) {
  return (
    <div className="flex items-center justify-between border-b border-white/10 pb-3">

      <div className="flex items-center gap-2">

        <div className="h-1.5 w-1.5 rounded-full bg-white/20" />

        <span className="font-mono text-[9px] text-white/50">
          {name}
        </span>

      </div>

      <span className="text-[9px] text-white/30">
        {count}
      </span>

    </div>
  );
}


/* =========================================================
   TECH PILL
========================================================= */

function TechPill({ icon: Icon, label }) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2">

      <Icon
        size={12}
        className="text-therynox-orange"
      />

      <span className="text-[8px] font-bold uppercase tracking-[0.18em] text-white/45">
        {label}
      </span>

    </div>
  );
}

/* =========================================================
   E-COMMERCE ICON HELPERS
========================================================= */

function ShoppingBagIcon({ size = 15 }) {
  return (
    <ShoppingBag
      size={size}
      strokeWidth={1.5}
      className="text-therynox-orange"
    />
  );
}


/* =========================================================
   SHOPPING CART
========================================================= */

function ShoppingCartIcon() {
  return (
    <ShoppingCart
      size={15}
      strokeWidth={1.5}
      className="text-therynox-orange"
    />
  );
}


/* =========================================================
   CREDIT CARD
========================================================= */

function CreditCardIcon() {
  return (
    <CreditCard
      size={15}
      strokeWidth={1.5}
      className="text-therynox-orange"
    />
  );
}


/* =========================================================
   CHECK
========================================================= */

function CheckCircleIcon({ size = 15 }) {
  return (
    <CheckCircle2
      size={size}
      strokeWidth={1.7}
      className="text-green-400"
    />
  );
}


/* =========================================================
   ORDER LINE
========================================================= */

function OrderLine({
  label,
  value,
  strong = false,
}) {
  return (
    <div className="flex items-center justify-between border-b border-white/10 pb-2 last:border-0">

      <span className="text-[9px] text-white/35">
        {label}
      </span>

      <span
        className={`text-[10px] ${
          strong
            ? "font-semibold text-white"
            : "text-white/55"
        }`}
      >
        {value}
      </span>

    </div>
  );
}