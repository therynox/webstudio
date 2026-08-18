import React from "react";
import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Boxes,
  ChevronRight,
  MapPin,
  Package,
  PackageCheck,
  PackageOpen,
  RefreshCw,
  RotateCcw,
  Search,
  ShoppingCart,
  Truck,
  Warehouse,
  WalletCards,
} from "lucide-react";
import { motion } from "framer-motion";

import PageLayout from "../../components/layout/PageLayout";
import PageHeader from "../../components/layout/PageHeader";

const products = [
  {
    name: "Premium Hoodie",
    sku: "THR-HDY-024",
    category: "Apparel",
    quantity: 240,
    status: "Healthy",
    movement: "+48",
  },
  {
    name: "Classic Sneakers",
    sku: "THR-SNK-118",
    category: "Footwear",
    quantity: 84,
    status: "Healthy",
    movement: "-18",
  },
  {
    name: "Denim Jacket",
    sku: "THR-DNM-072",
    category: "Apparel",
    quantity: 32,
    status: "Low stock",
    movement: "-12",
  },
  {
    name: "Essential Tee",
    sku: "THR-TEE-091",
    category: "Apparel",
    quantity: 186,
    status: "Healthy",
    movement: "+72",
  },
];

const warehouses = [
  {
    name: "Main Warehouse",
    location: "Rajkot",
    stock: "7,420",
    capacity: 82,
  },
  {
    name: "North Hub",
    location: "Ahmedabad",
    stock: "3,280",
    capacity: 64,
  },
  {
    name: "West Hub",
    location: "Mumbai",
    stock: "2,140",
    capacity: 48,
  },
];

const movements = [
  {
    product: "Premium Hoodie",
    type: "Stock received",
    quantity: "+240",
    warehouse: "Main Warehouse",
    time: "8 min",
    icon: PackageCheck,
  },
  {
    product: "Classic Sneakers",
    type: "Order fulfilled",
    quantity: "-38",
    warehouse: "Main Warehouse",
    time: "14 min",
    icon: ShoppingCart,
  },
  {
    product: "Denim Jacket",
    type: "Warehouse transfer",
    quantity: "+60",
    warehouse: "West Hub",
    time: "28 min",
    icon: Truck,
  },
  {
    product: "Essential Tee",
    type: "Return received",
    quantity: "+18",
    warehouse: "North Hub",
    time: "42 min",
    icon: RotateCcw,
  },
];

export default function Inventory() {
  return (
    <PageLayout showCTA={false}>
      <PageHeader
        eyebrow="SOLUTIONS / 04"
        number="04 / 06"
        title="Inventory Management."
        description="Know what you have, where it is, what is moving and what needs attention — all from one stock control system."
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
              transition={{ duration: 0.7 }}
              className="max-w-5xl text-4xl font-semibold leading-[0.94] tracking-[-0.065em] sm:text-5xl lg:text-6xl"
            >
              Know your stock.
              <br />
              Move it smarter.
              <br />
              <span className="text-therynox-orange">
                Stay in control.
              </span>
            </motion.h2>

            <p className="max-w-md text-sm leading-7 text-therynox-muted sm:text-base">
              Manage products, warehouses, stock movement, transfers and
              low-stock alerts from one clear inventory workspace.
            </p>

          </div>
        </div>
      </section>

      {/* =====================================================
          INVENTORY WORKSPACE
      ===================================================== */}

      <InventoryWorkspace />

      {/* =====================================================
          STATEMENT
      ===================================================== */}

      <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-7xl">

          <div className="grid gap-10 lg:grid-cols-[0.7fr_0.3fr]">

            <h2 className="max-w-5xl text-4xl font-semibold leading-[0.96] tracking-[-0.06em] sm:text-5xl lg:text-6xl">
              Every product.
              <br />
              Every warehouse.
              <br />
              <span className="text-therynox-orange">
                One clear picture.
              </span>
            </h2>

            <p className="max-w-sm text-sm leading-7 text-therynox-muted">
              See exactly where your inventory stands and react before a
              stock problem becomes a business problem.
            </p>

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
                Stock Operations
              </p>

              <h2 className="mt-6 max-w-sm text-4xl font-semibold leading-[0.95] tracking-[-0.06em] sm:text-5xl">
                Everything
                <br />
                moving
                <br />
                through stock.
              </h2>

              <p className="mt-6 max-w-sm text-sm leading-6 text-therynox-muted">
                From receiving goods to fulfilling orders, keep every
                inventory movement visible.
              </p>

            </div>

            <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2">

              <Feature
                number="01"
                icon={Package}
                title="Product Control"
                text="Manage SKUs, quantities, categories and product availability from one place."
              />

              <Feature
                number="02"
                icon={Warehouse}
                title="Multi-Warehouse"
                text="Track inventory across warehouses, hubs, branches and storage locations."
              />

              <Feature
                number="03"
                icon={ArrowUpRight}
                title="Stock In & Out"
                text="Record receiving, sales, transfers, returns and other stock movements."
              />

              <Feature
                number="04"
                icon={AlertTriangle}
                title="Low Stock Alerts"
                text="Know which products need attention before they run out."
              />

              <Feature
                number="05"
                icon={Truck}
                title="Transfers"
                text="Move inventory between locations while keeping quantities synchronised."
              />

              <Feature
                number="06"
                icon={BarChart3}
                title="Inventory Insights"
                text="Understand inventory value, movement patterns and stock health."
              />

            </div>

          </div>

        </div>
      </section>

      {/* =====================================================
          DARK MOVEMENT SECTION
      ===================================================== */}

      <section className="bg-[#090909] px-5 py-24 text-white sm:px-8 lg:px-12 lg:py-32">
        <div className="mx-auto max-w-7xl">

          <div className="grid gap-14 lg:grid-cols-[0.38fr_0.62fr] lg:items-start">

            <div>

              <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-therynox-orange">
                Stock Movement
              </p>

              <h2 className="mt-6 max-w-md text-4xl font-semibold leading-[0.95] tracking-[-0.06em] sm:text-5xl">
                See what is
                <br />
                coming in.
                <br />
                <span className="text-white/25">
                  And going out.
                </span>
              </h2>

              <p className="mt-6 max-w-md text-sm leading-7 text-white/40">
                Every stock movement creates a clearer picture of your
                inventory health.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-2">

                <DarkStat
                  value="+1,842"
                  label="Stock in"
                  positive
                />

                <DarkStat
                  value="-1,284"
                  label="Stock out"
                />

              </div>

            </div>

            <StockMovementPanel />

          </div>

        </div>
      </section>

      {/* =====================================================
          WAREHOUSES
      ===================================================== */}

      <section className="px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <div className="mx-auto max-w-7xl">

          <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">

            <div>

              <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-therynox-orange">
                Warehouses
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.06em] sm:text-5xl">
                Know where
                <br />
                your stock lives.
              </h2>

            </div>

            <p className="max-w-sm text-sm leading-6 text-therynox-muted">
              Monitor inventory capacity and stock distribution across every
              location.
            </p>

          </div>

          <div className="mt-14 grid gap-3 lg:grid-cols-3">

            {warehouses.map((warehouse, index) => (
              <WarehouseCard
                key={warehouse.name}
                warehouse={warehouse}
                index={index}
              />
            ))}

          </div>

        </div>
      </section>

      {/* =====================================================
          PRODUCT TABLE
      ===================================================== */}

      <section className="px-5 pb-24 sm:px-8 lg:px-12 lg:pb-32">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[30px] border border-therynox-border bg-[#f7f7f4]">

          <div className="grid lg:grid-cols-[0.32fr_0.68fr]">

            <div className="border-b border-therynox-border p-7 sm:p-10 lg:border-b-0 lg:border-r lg:p-12">

              <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-therynox-orange">
                Product Inventory
              </p>

              <h2 className="mt-6 text-4xl font-semibold leading-[0.95] tracking-[-0.06em] sm:text-5xl">
                Every SKU.
                <br />
                <span className="text-black/25">
                  Clearly tracked.
                </span>
              </h2>

              <p className="mt-6 max-w-sm text-sm leading-7 text-therynox-muted">
                Search products, check quantities and identify stock that
                needs attention.
              </p>

              <div className="mt-8 flex items-center gap-3 rounded-xl border border-black/10 bg-white px-4 py-3">

                <Search
                  size={13}
                  className="text-black/25"
                />

                <span className="text-[8px] text-black/25">
                  Search products or SKU...
                </span>

              </div>

            </div>

            <div className="bg-white p-5 sm:p-8 lg:p-10">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-[7px] font-bold uppercase tracking-[0.22em] text-black/30">
                    INVENTORY
                  </p>

                  <h3 className="mt-2 text-lg font-semibold tracking-[-0.04em]">
                    Product stock
                  </h3>

                </div>

                <span className="rounded-full bg-green-500/10 px-3 py-1.5 text-[7px] font-bold uppercase tracking-[0.15em] text-green-600">
                  3,842 products
                </span>

              </div>

              <div className="mt-7 overflow-x-auto">

                <div className="min-w-[620px]">

                  <div className="grid grid-cols-[1.6fr_1fr_0.6fr_0.6fr_0.7fr] border-b border-black/5 px-3 pb-3">

                    <span className="text-[6px] font-bold uppercase tracking-[0.15em] text-black/25">
                      Product
                    </span>

                    <span className="text-[6px] font-bold uppercase tracking-[0.15em] text-black/25">
                      Category
                    </span>

                    <span className="text-[6px] font-bold uppercase tracking-[0.15em] text-black/25">
                      Stock
                    </span>

                    <span className="text-[6px] font-bold uppercase tracking-[0.15em] text-black/25">
                      Move
                    </span>

                    <span className="text-[6px] font-bold uppercase tracking-[0.15em] text-black/25">
                      Status
                    </span>

                  </div>

                  {products.map((product, index) => (
                    <ProductRow
                      key={product.sku}
                      product={product}
                      index={index}
                    />
                  ))}

                </div>

              </div>

            </div>

          </div>

          <div className="flex flex-col gap-3 border-t border-therynox-border px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">

            <span className="text-[8px] font-bold uppercase tracking-[0.25em] text-black/25">
              Products · Warehouses · Stock · Transfers
            </span>

            <span className="text-[8px] uppercase tracking-[0.2em] text-black/20">
              Inventory always in view
            </span>

          </div>

        </div>
      </section>

      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="px-5 pb-24 sm:px-8 lg:px-12 lg:pb-32">

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-7xl overflow-hidden rounded-[30px] bg-therynox-orange p-8 sm:p-12 lg:p-16"
        >

          <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">

            <div>

              <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-black/50">
                Build smarter inventory operations
              </p>

              <h2 className="mt-6 max-w-3xl text-4xl font-semibold leading-[0.95] tracking-[-0.06em] text-black sm:text-5xl lg:text-6xl">
                Know your stock.
                <br />
                Move with confidence.
              </h2>

            </div>

            <a
              href="/contact"
              className="group inline-flex shrink-0 items-center justify-center gap-3 rounded-full bg-[#090909] px-7 py-5 text-[9px] font-bold uppercase tracking-[0.18em] text-white transition hover:bg-white hover:text-black"
            >
              Discuss Inventory

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
   INVENTORY WORKSPACE
========================================================= */

function InventoryWorkspace() {
  return (
    <section className="px-5 pb-10 sm:px-8 lg:px-12 lg:pb-16">

      <div className="mx-auto max-w-7xl overflow-hidden rounded-[30px] border border-black/10 bg-white">

        {/* HEADER */}

        <div className="flex flex-col justify-between gap-4 border-b border-black/10 px-6 py-5 sm:flex-row sm:items-center sm:px-8">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#090909]">

              <Boxes
                size={16}
                strokeWidth={1.4}
                className="text-white"
              />

            </div>

            <div>

              <p className="text-[8px] font-bold uppercase tracking-[0.3em] text-black/35">
                THERYNOX INVENTORY
              </p>

              <p className="mt-1 text-xs font-medium">
                Stock control center
              </p>

            </div>

          </div>

          <div className="flex items-center gap-2">

            <motion.span
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
              }}
              className="h-1.5 w-1.5 rounded-full bg-green-500"
            />

            <span className="text-[7px] font-bold uppercase tracking-[0.2em] text-black/30">
              Inventory online
            </span>

          </div>

        </div>

        {/* MAIN */}

        <div className="bg-[#f7f7f4] p-5 sm:p-8 lg:p-10">

          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">

            <div>

              <p className="text-[8px] font-bold uppercase tracking-[0.3em] text-therynox-orange">
                STOCK CONTROL
              </p>

              <h3 className="mt-3 max-w-2xl text-3xl font-semibold leading-[0.95] tracking-[-0.06em] sm:text-4xl">
                Everything in your
                <br />
                inventory,
                <span className="text-black/25">
                  visible.
                </span>
              </h3>

            </div>

            <div className="flex items-center gap-3 rounded-full border border-black/10 bg-white px-4 py-2.5">

              <MapPin
                size={12}
                className="text-therynox-orange"
              />

              <span className="text-[7px] font-bold uppercase tracking-[0.15em] text-black/35">
                3 locations connected
              </span>

            </div>

          </div>

          {/* =================================================
              METRIC CARDS
          ================================================= */}

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

            <InventoryMetric
              title="Products"
              value="3,842"
              label="Active SKUs"
              icon={Package}
            />

            <InventoryMetric
              title="In Stock"
              value="12,840"
              label="Total units"
              icon={Boxes}
            />

            <InventoryMetric
              title="Low Stock"
              value="24"
              label="Needs attention"
              icon={AlertTriangle}
              warning
            />

            <InventoryMetric
              title="Stock Value"
              value="₹42.8L"
              label="+8.4% this month"
              icon={WalletCards}
            />

          </div>

          {/* LOWER */}

          <div className="mt-3 grid gap-3 lg:grid-cols-[1.4fr_0.6fr]">

            <div className="rounded-2xl border border-black/10 bg-white p-5 sm:p-7">

              <div className="flex items-start justify-between">

                <div>

                  <p className="text-[7px] font-bold uppercase tracking-[0.22em] text-black/30">
                    STOCK MOVEMENT
                  </p>

                  <h4 className="mt-2 text-lg font-semibold tracking-[-0.04em]">
                    Inventory activity
                  </h4>

                </div>

                <div className="flex items-center gap-3">

                  <div className="flex items-center gap-1.5">

                    <span className="h-1.5 w-1.5 rounded-full bg-therynox-orange" />

                    <span className="text-[6px] text-black/30">
                      In
                    </span>

                  </div>

                  <div className="flex items-center gap-1.5">

                    <span className="h-1.5 w-1.5 rounded-full bg-black/20" />

                    <span className="text-[6px] text-black/30">
                      Out
                    </span>

                  </div>

                </div>

              </div>

              <div className="mt-9 h-[230px]">

                <div className="flex h-full items-end justify-between gap-3">

                  {[
                    { month: "JAN", inValue: 55, outValue: 38 },
                    { month: "FEB", inValue: 68, outValue: 45 },
                    { month: "MAR", inValue: 48, outValue: 62 },
                    { month: "APR", inValue: 76, outValue: 54 },
                    { month: "MAY", inValue: 63, outValue: 48 },
                    { month: "JUN", inValue: 84, outValue: 66 },
                    { month: "JUL", inValue: 94, outValue: 72 },
                  ].map((item, index) => (

                    <div
                      key={item.month}
                      className="flex h-full flex-1 flex-col justify-end"
                    >

                      <div className="flex h-[190px] items-end justify-center gap-1">

                        <motion.div
                          initial={{ height: 0 }}
                          whileInView={{
                            height: `${item.inValue}%`,
                          }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.7,
                            delay: index * 0.06,
                          }}
                          className="w-2.5 rounded-t-md bg-therynox-orange sm:w-4"
                        />

                        <motion.div
                          initial={{ height: 0 }}
                          whileInView={{
                            height: `${item.outValue}%`,
                          }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.7,
                            delay: index * 0.06 + 0.05,
                          }}
                          className="w-2.5 rounded-t-md bg-black/10 sm:w-4"
                        />

                      </div>

                      <span className="mt-4 text-center text-[6px] font-bold tracking-[0.12em] text-black/20">
                        {item.month}
                      </span>

                    </div>

                  ))}

                </div>

              </div>

              <div className="mt-5 flex items-center justify-between border-t border-black/5 pt-4">

                <span className="text-[7px] text-black/25">
                  Inventory movement over the last 7 months
                </span>

                <ArrowUpRight
                  size={12}
                  className="text-therynox-orange"
                />

              </div>

            </div>

            {/* ALERTS */}

            <div className="rounded-2xl border border-white/10 bg-[#090909] p-5 text-white sm:p-7">

              <div className="flex items-start justify-between">

                <div>

                  <p className="text-[7px] font-bold uppercase tracking-[0.22em] text-white/25">
                    ATTENTION
                  </p>

                  <h4 className="mt-2 text-lg font-semibold tracking-[-0.04em]">
                    Stock alerts
                  </h4>

                </div>

                <AlertTriangle
                  size={15}
                  className="text-therynox-orange"
                />

              </div>

              <div className="mt-7 space-y-2">

                <StockAlert
                  name="Denim Jacket"
                  stock="4 left"
                />

                <StockAlert
                  name="Classic Cap"
                  stock="7 left"
                />

                <StockAlert
                  name="Travel Bag"
                  stock="9 left"
                />

                <StockAlert
                  name="Running Shorts"
                  stock="12 left"
                />

              </div>

              <div className="mt-6 rounded-xl border border-therynox-orange/20 bg-therynox-orange/5 p-4">

                <p className="text-[7px] font-bold uppercase tracking-[0.18em] text-therynox-orange">
                  24 products
                </p>

                <p className="mt-2 text-[8px] leading-5 text-white/35">
                  are below their recommended stock threshold.
                </p>

              </div>

            </div>

          </div>

          {/* RECENT MOVEMENT */}

          <div className="mt-3 rounded-2xl border border-black/10 bg-white p-5 sm:p-7">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-[7px] font-bold uppercase tracking-[0.22em] text-black/30">
                  RECENT MOVEMENT
                </p>

                <h4 className="mt-2 text-lg font-semibold tracking-[-0.04em]">
                  What's moving now
                </h4>

              </div>

              <RefreshCw
                size={13}
                className="text-black/25"
              />

            </div>

            <div className="mt-6 grid gap-2 sm:grid-cols-2">

              {movements.map((movement, index) => (
                <MovementItem
                  key={movement.product}
                  movement={movement}
                  index={index}
                />
              ))}

            </div>

          </div>

        </div>

        {/* FOOTER */}

        <div className="flex flex-col gap-3 border-t border-black/10 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">

          <span className="text-[8px] font-bold uppercase tracking-[0.25em] text-black/25">
            Products · Warehouses · Stock · Transfers
          </span>

          <span className="text-[8px] uppercase tracking-[0.2em] text-black/20">
            Inventory always in view
          </span>

        </div>

      </div>

    </section>
  );
}

/* =========================================================
   INVENTORY METRIC
========================================================= */

function InventoryMetric({
  title,
  value,
  label,
  icon: Icon,
  warning = false,
}) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="relative min-h-[190px] overflow-hidden rounded-2xl border border-black/10 bg-white p-5 transition-shadow duration-300 hover:shadow-[0_15px_35px_rgba(0,0,0,0.06)]"
    >

      {/* SMALL ICON */}

      <div className="flex items-center justify-between">

        <span className="text-[7px] font-bold uppercase tracking-[0.2em] text-black/30">
          {title}
        </span>

        <div
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
            warning
              ? "bg-therynox-orange/10"
              : "bg-black/[0.035]"
          }`}
        >
          <Icon
            size={14}
            strokeWidth={1.6}
            className={
              warning
                ? "text-therynox-orange"
                : "text-black/30"
            }
          />
        </div>

      </div>

      {/* VALUE */}

      <div className="absolute bottom-5 left-5">

        <p className="text-[30px] font-semibold leading-none tracking-[-0.065em] sm:text-[32px]">
          {value}
        </p>

        <p
          className={`mt-3 text-[7px] font-medium ${
            warning
              ? "text-therynox-orange"
              : "text-black/30"
          }`}
        >
          {label}
        </p>

      </div>

    </motion.div>
  );
}

/* =========================================================
   STOCK ALERT
========================================================= */

function StockAlert({ name, stock }) {
  return (
    <motion.div
      whileHover={{ x: 3 }}
      className="flex items-center gap-3 border-b border-white/10 py-3 last:border-b-0"
    >

      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-therynox-orange/10">

        <PackageOpen
          size={13}
          className="text-therynox-orange"
        />

      </div>

      <div className="min-w-0 flex-1">

        <p className="truncate text-[8px] font-semibold">
          {name}
        </p>

        <p className="mt-1 text-[7px] text-white/25">
          Below threshold
        </p>

      </div>

      <span className="text-[7px] font-bold text-therynox-orange">
        {stock}
      </span>

    </motion.div>
  );
}

/* =========================================================
   STOCK MOVEMENT PANEL
========================================================= */

function StockMovementPanel() {
  return (
    <div className="overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.035]">

      <div className="flex items-center justify-between border-b border-white/10 px-5 py-5 sm:px-6">

        <div>

          <p className="text-[7px] font-bold uppercase tracking-[0.22em] text-white/25">
            LIVE INVENTORY
          </p>

          <h3 className="mt-2 text-lg font-semibold tracking-[-0.04em]">
            Recent movement
          </h3>

        </div>

        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <RefreshCw
            size={15}
            className="text-therynox-orange"
          />
        </motion.div>

      </div>

      <div className="divide-y divide-white/10">

        {movements.map((movement, index) => {

          const Icon = movement.icon;

          return (
            <motion.div
              key={movement.product}
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
                delay: index * 0.08,
              }}
              className="flex items-center gap-4 px-5 py-4 sm:px-6"
            >

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/5">

                <Icon
                  size={14}
                  strokeWidth={1.4}
                  className="text-therynox-orange"
                />

              </div>

              <div className="min-w-0 flex-1">

                <p className="truncate text-[9px] font-semibold">
                  {movement.product}
                </p>

                <p className="mt-1 text-[7px] text-white/25">
                  {movement.type}
                </p>

              </div>

              <div className="text-right">

                <p
                  className={`text-[9px] font-semibold ${
                    movement.quantity.startsWith("+")
                      ? "text-green-400"
                      : "text-white/60"
                  }`}
                >
                  {movement.quantity}
                </p>

                <p className="mt-1 text-[6px] text-white/20">
                  {movement.time}
                </p>

              </div>

            </motion.div>
          );
        })}

      </div>

      <div className="border-t border-white/10 px-5 py-4 sm:px-6">

        <div className="flex items-center justify-between">

          <span className="text-[7px] text-white/25">
            4 recent inventory events
          </span>

          <span className="flex items-center gap-2 text-[7px] font-bold uppercase tracking-[0.15em] text-white/30">

            <span className="h-1.5 w-1.5 rounded-full bg-green-400" />

            Live

          </span>

        </div>

      </div>

    </div>
  );
}

/* =========================================================
   WAREHOUSE CARD
========================================================= */

function WarehouseCard({
  warehouse,
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
        delay: index * 0.08,
      }}
      whileHover={{
        y: -3,
      }}
      className="rounded-2xl border border-therynox-border bg-white p-6"
    >

      <div className="flex items-start justify-between">

        <div className="flex items-center gap-3">

          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f5f4f0]">

            <Warehouse
              size={15}
              strokeWidth={1.4}
              className="text-black/35"
            />

          </div>

          <div>

            <h3 className="text-sm font-semibold tracking-[-0.03em]">
              {warehouse.name}
            </h3>

            <p className="mt-1 flex items-center gap-1 text-[7px] text-black/25">

              <MapPin size={9} />

              {warehouse.location}

            </p>

          </div>

        </div>

        <ChevronRight
          size={14}
          className="text-therynox-orange"
        />

      </div>

      <div className="mt-8 flex items-end justify-between">

        <div>

          <p className="text-2xl font-semibold tracking-[-0.06em]">
            {warehouse.stock}
          </p>

          <p className="mt-1 text-[7px] text-black/25">
            Units stored
          </p>

        </div>

        <span className="text-[8px] font-semibold">
          {warehouse.capacity}%
        </span>

      </div>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-black/5">

        <motion.div
          initial={{ width: 0 }}
          whileInView={{
            width: `${warehouse.capacity}%`,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 1,
            delay: index * 0.1,
          }}
          className="h-full rounded-full bg-therynox-orange"
        />

      </div>

      <div className="mt-3 flex items-center justify-between">

        <span className="text-[7px] uppercase tracking-[0.12em] text-black/20">
          Storage usage
        </span>

        <span className="text-[7px] text-black/25">
          {100 - warehouse.capacity}% available
        </span>

      </div>

    </motion.div>
  );
}

/* =========================================================
   PRODUCT ROW
========================================================= */

function ProductRow({
  product,
  index,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 8,
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
      className="grid grid-cols-[1.6fr_1fr_0.6fr_0.6fr_0.7fr] items-center border-b border-black/5 px-3 py-4 last:border-b-0"
    >

      <div className="flex items-center gap-3">

        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#f5f4f0]">

          <Package
            size={12}
            className="text-black/30"
          />

        </div>

        <div className="min-w-0">

          <p className="truncate text-[8px] font-semibold">
            {product.name}
          </p>

          <p className="mt-1 truncate text-[6px] text-black/20">
            {product.sku}
          </p>

        </div>

      </div>

      <span className="text-[7px] text-black/35">
        {product.category}
      </span>

      <span className="text-[8px] font-semibold">
        {product.quantity}
      </span>

      <span
        className={`text-[8px] font-semibold ${
          product.movement.startsWith("+")
            ? "text-green-600"
            : "text-black/40"
        }`}
      >
        {product.movement}
      </span>

      <span
        className={`inline-flex w-fit rounded-full px-2 py-1 text-[6px] font-bold uppercase tracking-[0.1em] ${
          product.status === "Low stock"
            ? "bg-therynox-orange/10 text-therynox-orange"
            : "bg-green-500/10 text-green-600"
        }`}
      >
        {product.status}
      </span>

    </motion.div>
  );
}

/* =========================================================
   MOVEMENT ITEM
========================================================= */

function MovementItem({
  movement,
  index,
}) {
  const Icon = movement.icon;

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 12,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        delay: index * 0.07,
      }}
      whileHover={{
        y: -2,
      }}
      className="flex items-center gap-3 rounded-xl border border-black/5 bg-[#f7f7f4] p-3"
    >

      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white">

        <Icon
          size={13}
          strokeWidth={1.4}
          className="text-black/35"
        />

      </div>

      <div className="min-w-0 flex-1">

        <p className="truncate text-[8px] font-semibold">
          {movement.product}
        </p>

        <p className="mt-1 truncate text-[7px] text-black/25">
          {movement.type} · {movement.warehouse}
        </p>

      </div>

      <div className="text-right">

        <p
          className={`text-[8px] font-semibold ${
            movement.quantity.startsWith("+")
              ? "text-green-600"
              : "text-black/40"
          }`}
        >
          {movement.quantity}
        </p>

        <p className="mt-1 text-[6px] text-black/20">
          {movement.time}
        </p>

      </div>

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
      className="group border-t border-therynox-border pt-5"
    >

      <div className="flex items-start justify-between">

        <span className="text-[9px] font-bold tracking-[0.2em] text-therynox-orange">
          {number}
        </span>

        <Icon
          size={18}
          strokeWidth={1.4}
          className="text-therynox-muted transition-colors duration-300 group-hover:text-therynox-orange"
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

/* =========================================================
   DARK STAT
========================================================= */

function DarkStat({
  value,
  label,
  positive = false,
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">

      <p
        className={`text-xl font-semibold tracking-[-0.05em] ${
          positive
            ? "text-green-400"
            : "text-white/70"
        }`}
      >
        {value}
      </p>

      <p className="mt-1 text-[7px] uppercase tracking-[0.15em] text-white/25">
        {label}
      </p>

    </div>
  );
}