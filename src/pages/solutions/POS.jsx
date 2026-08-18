import React from "react";
import {
  ArrowUpRight,
  BarChart3,
  CreditCard,
  Minus,
  Plus,
  Receipt,
  ScanBarcode,
  ShoppingCart,
  Smartphone,
  UserRound,
  Wallet,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";

import PageLayout from "../../components/layout/PageLayout";
import PageHeader from "../../components/layout/PageHeader";

const products = [
  {
    name: "Premium Hoodie",
    category: "Apparel",
    price: "₹2,499",
    stock: 84,
  },
  {
    name: "Classic Sneakers",
    category: "Footwear",
    price: "₹3,999",
    stock: 42,
  },
  {
    name: "Essential Tee",
    category: "Apparel",
    price: "₹899",
    stock: 186,
  },
  {
    name: "Denim Jacket",
    category: "Apparel",
    price: "₹2,999",
    stock: 32,
  },
];

const transactions = [
  {
    customer: "Aarav Studio",
    amount: "₹8,450",
    method: "UPI",
    time: "2 min",
  },
  {
    customer: "Walk-in Customer",
    amount: "₹3,999",
    method: "Card",
    time: "8 min",
  },
  {
    customer: "Mehta Retail",
    amount: "₹12,840",
    method: "UPI",
    time: "14 min",
  },
  {
    customer: "Noxwear",
    amount: "₹6,280",
    method: "Cash",
    time: "21 min",
  },
];

export default function POS() {
  return (
    <PageLayout showCTA={false}>
      <PageHeader
        eyebrow="SOLUTIONS / 05"
        number="05 / 06"
        title="POS Systems."
        description="A faster point-of-sale experience for products, payments, customers and real-time business reporting."
      />

      {/* =====================================================
          INTRO
      ===================================================== */}

      <section className="px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-7xl">

          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">

            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-5xl text-4xl font-semibold leading-[0.94] tracking-[-0.065em] sm:text-5xl lg:text-6xl"
            >
              Sell faster.
              <br />
              Track everything.
              <br />
              <span className="text-therynox-orange">
                Stay connected.
              </span>
            </motion.h2>

            <p className="max-w-md text-sm leading-7 text-therynox-muted sm:text-base">
              Turn every checkout into a connected business event. Products,
              customers, payments and reporting stay synchronised in real time.
            </p>

          </div>

        </div>
      </section>

      {/* =====================================================
          POS TERMINAL
      ===================================================== */}

      <section className="px-5 pb-16 sm:px-8 lg:px-12 lg:pb-24">

        <div className="mx-auto max-w-7xl overflow-hidden rounded-[30px] border border-black/10 bg-[#0a0a0a] text-white">

          {/* TOP BAR */}

          <div className="flex flex-col justify-between gap-4 border-b border-white/10 px-6 py-5 sm:flex-row sm:items-center sm:px-8">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-therynox-orange">

                <ShoppingCart
                  size={16}
                  className="text-black"
                />

              </div>

              <div>

                <p className="text-[8px] font-bold uppercase tracking-[0.3em] text-white/30">
                  THERYNOX POS
                </p>

                <p className="mt-1 text-xs font-medium">
                  Checkout terminal
                </p>

              </div>

            </div>

            <div className="flex items-center gap-3">

              <span className="h-1.5 w-1.5 rounded-full bg-green-400" />

              <span className="text-[7px] font-bold uppercase tracking-[0.2em] text-white/30">
                Terminal online
              </span>

            </div>

          </div>

          {/* POS BODY */}

          <div className="grid lg:grid-cols-[1fr_360px]">

            {/* PRODUCTS */}

            <div className="border-b border-white/10 p-5 sm:p-8 lg:border-b-0 lg:border-r">

              <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

                <div>

                  <p className="text-[8px] font-bold uppercase tracking-[0.3em] text-therynox-orange">
                    Product Catalog
                  </p>

                  <h3 className="mt-3 text-2xl font-semibold tracking-[-0.05em]">
                    Start a sale.
                  </h3>

                </div>

                <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">

                  <ScanBarcode
                    size={14}
                    className="text-white/30"
                  />

                  <span className="text-[7px] text-white/25">
                    Scan product or search
                  </span>

                </div>

              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">

                {products.map((product, index) => (
                  <ProductCard
                    key={product.name}
                    product={product}
                    index={index}
                  />
                ))}

              </div>

              {/* CATEGORY BAR */}

              <div className="mt-6 flex gap-2 overflow-x-auto pb-1">

                {[
                  "All",
                  "Apparel",
                  "Footwear",
                  "Accessories",
                ].map((item, index) => (
                  <button
                    key={item}
                    type="button"
                    className={`shrink-0 rounded-full px-4 py-2 text-[7px] font-bold uppercase tracking-[0.15em] ${
                      index === 0
                        ? "bg-therynox-orange text-black"
                        : "border border-white/10 text-white/30"
                    }`}
                  >
                    {item}
                  </button>
                ))}

              </div>

            </div>

            {/* CART */}

            <div className="bg-white/[0.025] p-5 sm:p-8">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-[8px] font-bold uppercase tracking-[0.25em] text-white/25">
                    CURRENT ORDER
                  </p>

                  <h3 className="mt-2 text-lg font-semibold">
                    New sale
                  </h3>

                </div>

                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5">

                  <ShoppingCart
                    size={14}
                    className="text-therynox-orange"
                  />

                </div>

              </div>

              <div className="mt-7 space-y-3">

                <CartItem
                  name="Premium Hoodie"
                  price="₹2,499"
                  quantity="1"
                />

                <CartItem
                  name="Classic Sneakers"
                  price="₹3,999"
                  quantity="1"
                />

                <CartItem
                  name="Essential Tee"
                  price="₹1,798"
                  quantity="2"
                />

              </div>

              <div className="mt-7 border-t border-white/10 pt-5">

                <div className="flex justify-between text-[8px] text-white/30">
                  <span>Subtotal</span>
                  <span>₹8,296</span>
                </div>

                <div className="mt-3 flex justify-between text-[8px] text-white/30">
                  <span>Tax</span>
                  <span>₹1,493</span>
                </div>

                <div className="mt-5 flex items-end justify-between">

                  <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/30">
                    Total
                  </span>

                  <span className="text-3xl font-semibold tracking-[-0.06em]">
                    ₹9,789
                  </span>

                </div>

              </div>

              <button
                type="button"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-therynox-orange px-5 py-4 text-[8px] font-bold uppercase tracking-[0.18em] text-black transition hover:bg-white"
              >
                Continue to payment
                <ArrowUpRight size={13} />
              </button>

            </div>

          </div>

          {/* TERMINAL FOOTER */}

          <div className="flex flex-col gap-3 border-t border-white/10 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">

            <span className="text-[7px] font-bold uppercase tracking-[0.25em] text-white/20">
              Products · Customers · Payments · Receipts
            </span>

            <span className="flex items-center gap-2 text-[7px] uppercase tracking-[0.15em] text-white/20">

              <Zap
                size={11}
                className="text-therynox-orange"
              />

              Real-time checkout

            </span>

          </div>

        </div>

      </section>

      {/* =====================================================
          STATS
      ===================================================== */}

      <section className="px-5 pb-20 sm:px-8 lg:px-12 lg:pb-28">

        <div className="mx-auto grid max-w-7xl border-y border-therynox-border sm:grid-cols-2 lg:grid-cols-4">

          <POSStat
            label="Today's sales"
            value="₹84.2K"
            change="+12.8%"
          />

          <POSStat
            label="Transactions"
            value="1,284"
            change="+8.4%"
          />

          <POSStat
            label="Average order"
            value="₹1,842"
            change="+6.2%"
          />

          <POSStat
            label="Success rate"
            value="99.8%"
            change="Operational"
          />

        </div>

      </section>

      {/* =====================================================
          PAYMENT SECTION
      ===================================================== */}

      <section className="bg-[#090909] px-5 py-24 text-white sm:px-8 lg:px-12 lg:py-32">

        <div className="mx-auto max-w-7xl">

          <div className="grid gap-14 lg:grid-cols-[0.4fr_0.6fr]">

            <div>

              <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-therynox-orange">
                Payments
              </p>

              <h2 className="mt-6 text-4xl font-semibold leading-[0.95] tracking-[-0.06em] sm:text-5xl">
                Every payment.
                <br />
                <span className="text-white/25">
                  One checkout.
                </span>
              </h2>

              <p className="mt-6 max-w-md text-sm leading-7 text-white/35">
                Accept UPI, cards and cash while keeping every transaction
                connected to your sales records.
              </p>

            </div>

            <div className="grid gap-3 sm:grid-cols-3">

              <PaymentCard
                icon={Smartphone}
                title="UPI"
                text="Fast digital payments"
              />

              <PaymentCard
                icon={CreditCard}
                title="Cards"
                text="Secure card checkout"
              />

              <PaymentCard
                icon={Wallet}
                title="Cash"
                text="Traditional checkout"
              />

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          LIVE TRANSACTIONS
      ===================================================== */}

      <section className="px-5 py-24 sm:px-8 lg:px-12 lg:py-32">

        <div className="mx-auto max-w-7xl">

          <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">

            <div>

              <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-therynox-orange">
                Live Operations
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.06em] sm:text-5xl">
                Sales happening
                <br />
                right now.
              </h2>

            </div>

            <div className="flex items-center gap-2">

              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />

              <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-black/30">
                Live feed
              </span>

            </div>

          </div>

          <div className="mt-12 rounded-[24px] border border-therynox-border bg-[#f7f7f4]">

            {transactions.map((transaction, index) => (
              <Transaction
                key={transaction.customer + index}
                transaction={transaction}
                index={index}
              />
            ))}

          </div>

        </div>

      </section>

      {/* =====================================================
          FEATURES
      ===================================================== */}

      <section className="border-t border-therynox-border px-5 py-24 sm:px-8 lg:px-12 lg:py-32">

        <div className="mx-auto max-w-7xl">

          <div className="grid gap-14 lg:grid-cols-[0.4fr_0.6fr]">

            <div>

              <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-therynox-orange">
                POS Capabilities
              </p>

              <h2 className="mt-6 text-4xl font-semibold leading-[0.95] tracking-[-0.06em] sm:text-5xl">
                More than
                <br />
                a cash register.
              </h2>

            </div>

            <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2">

              <Feature
                number="01"
                icon={ShoppingCart}
                title="Fast Checkout"
                text="Build orders quickly with product search, scanning and one-tap cart actions."
              />

              <Feature
                number="02"
                icon={CreditCard}
                title="Multiple Payments"
                text="Accept cards, UPI and cash without breaking the checkout flow."
              />

              <Feature
                number="03"
                icon={UserRound}
                title="Customer Profiles"
                text="Connect every purchase with customer information and purchase history."
              />

              <Feature
                number="04"
                icon={BarChart3}
                title="Live Reporting"
                text="Sales, transactions and revenue update automatically as your team sells."
              />

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="px-5 pb-24 sm:px-8 lg:px-12 lg:pb-32">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-7xl rounded-[30px] bg-therynox-orange p-8 sm:p-12 lg:p-16"
        >

          <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">

            <div>

              <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-black/50">
                Build your connected checkout
              </p>

              <h2 className="mt-6 max-w-3xl text-4xl font-semibold leading-[0.95] tracking-[-0.06em] text-black sm:text-5xl lg:text-6xl">
                Sell faster.
                <br />
                Know more.
              </h2>

            </div>

            <a
              href="/contact"
              className="group inline-flex shrink-0 items-center justify-center gap-3 rounded-full bg-[#090909] px-7 py-5 text-[9px] font-bold uppercase tracking-[0.18em] text-white transition hover:bg-white hover:text-black"
            >
              Discuss POS
              <ArrowUpRight
                size={15}
                className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </a>

          </div>

        </motion.div>

      </section>

    </PageLayout>
  );
}

/* =========================================================
   PRODUCT CARD
========================================================= */

function ProductCard({ product, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07 }}
      whileHover={{ y: -3 }}
      className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 transition"
    >

      <div className="flex items-start justify-between">

        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5">
          <Receipt
            size={14}
            className="text-white/35"
          />
        </div>

        <span className="text-[7px] text-white/20">
          {product.stock} in stock
        </span>

      </div>

      <p className="mt-8 text-[8px] uppercase tracking-[0.15em] text-white/25">
        {product.category}
      </p>

      <h4 className="mt-2 text-sm font-semibold">
        {product.name}
      </h4>

      <div className="mt-5 flex items-center justify-between">

        <span className="text-lg font-semibold tracking-[-0.04em]">
          {product.price}
        </span>

        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-therynox-orange text-black transition hover:bg-white"
        >
          <Plus size={13} />
        </button>

      </div>

    </motion.div>
  );
}

/* =========================================================
   CART ITEM
========================================================= */

function CartItem({
  name,
  price,
  quantity,
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.025] p-3">

      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5">
        <Receipt
          size={12}
          className="text-white/25"
        />
      </div>

      <div className="min-w-0 flex-1">

        <p className="truncate text-[8px] font-semibold">
          {name}
        </p>

        <p className="mt-1 text-[7px] text-white/25">
          {price}
        </p>

      </div>

      <div className="flex items-center gap-2">

        <button
          type="button"
          className="flex h-6 w-6 items-center justify-center rounded-md border border-white/10 text-white/30"
        >
          <Minus size={9} />
        </button>

        <span className="w-3 text-center text-[8px]">
          {quantity}
        </span>

        <button
          type="button"
          className="flex h-6 w-6 items-center justify-center rounded-md border border-white/10 text-white/30"
        >
          <Plus size={9} />
        </button>

      </div>

    </div>
  );
}

/* =========================================================
   POS STAT
========================================================= */

function POSStat({
  label,
  value,
  change,
}) {
  return (
    <div className="border-b border-therynox-border p-7 last:border-b-0 sm:nth-[odd]:border-r lg:border-b-0 lg:border-r lg:p-8 lg:last:border-r-0">

      <p className="text-[8px] font-bold uppercase tracking-[0.25em] text-black/30">
        {label}
      </p>

      <p className="mt-6 text-3xl font-semibold tracking-[-0.06em]">
        {value}
      </p>

      <div className="mt-3 flex items-center gap-2">

        <span className="h-1.5 w-1.5 rounded-full bg-green-500" />

        <span className="text-[7px] font-semibold text-green-600">
          {change}
        </span>

      </div>

    </div>
  );
}

/* =========================================================
   PAYMENT CARD
========================================================= */

function PaymentCard({
  icon: Icon,
  title,
  text,
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="rounded-2xl border border-white/10 bg-white/[0.035] p-6"
    >

      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-therynox-orange/10">

        <Icon
          size={16}
          className="text-therynox-orange"
        />

      </div>

      <h3 className="mt-8 text-lg font-semibold">
        {title}
      </h3>

      <p className="mt-2 text-[8px] leading-5 text-white/30">
        {text}
      </p>

    </motion.div>
  );
}

/* =========================================================
   TRANSACTION
========================================================= */

function Transaction({
  transaction,
  index,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -15 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
      className="flex flex-col gap-4 border-b border-black/5 px-5 py-5 last:border-b-0 sm:flex-row sm:items-center sm:px-7"
    >

      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white">

        <Receipt
          size={14}
          className="text-black/30"
        />

      </div>

      <div className="min-w-0 flex-1">

        <p className="text-[9px] font-semibold">
          {transaction.customer}
        </p>

        <p className="mt-1 text-[7px] text-black/25">
          Transaction completed
        </p>

      </div>

      <span className="rounded-full bg-black/5 px-3 py-1.5 text-[7px] font-bold uppercase tracking-[0.12em] text-black/35">
        {transaction.method}
      </span>

      <span className="text-[9px] font-semibold">
        {transaction.amount}
      </span>

      <span className="text-[7px] text-black/20">
        {transaction.time}
      </span>

    </motion.div>
  );
}

/* =========================================================
   FEATURE
========================================================= */

function Feature({
  number,
  icon: Icon,
  title,
  text,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group border-t border-therynox-border pt-5"
    >

      <div className="flex items-start justify-between">

        <span className="text-[9px] font-bold tracking-[0.2em] text-therynox-orange">
          {number}
        </span>

        <Icon
          size={18}
          strokeWidth={1.4}
          className="text-black/30 transition-colors group-hover:text-therynox-orange"
        />

      </div>

      <h3 className="mt-7 text-xl font-semibold tracking-[-0.04em]">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-6 text-therynox-muted">
        {text}
      </p>

    </motion.div>
  );
}