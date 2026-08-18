import React from "react";
import { motion } from "framer-motion";

export default function ProjectRequirements({
  form,
  onChange,
}) {
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
      {/* =========================================
          SECTION HEADER
      ========================================= */}

      <div>

        <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-therynox-orange">
          Project details
        </p>

        <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">
          Tell us about your project.
        </h3>

        <p className="mt-3 max-w-xl text-sm leading-6 text-therynox-muted">
          Your selected package already includes the complete
          design and development process. Just tell us what you
          want to build.
        </p>

      </div>


      {/* =========================================
          BUSINESS / BRAND NAME
      ========================================= */}

      <Field
        label="Business / brand name"
        name="businessName"
        value={form.businessName}
        onChange={onChange}
        placeholder="e.g. Therynox"
        required
      />


      {/* =========================================
          BUSINESS TYPE
      ========================================= */}

      <Field
        label="What does your business do?"
        name="businessType"
        value={form.businessType}
        onChange={onChange}
        placeholder="e.g. Fashion brand, Salon, Restaurant, Agency..."
        required
      />


      {/* =========================================
          WEBSITE PURPOSE
      ========================================= */}

      <div>

        <label
          htmlFor="projectGoal"
          className="mb-3 block text-[9px] font-bold uppercase tracking-[0.2em] text-therynox-muted"
        >
          What should the website do?
        </label>

        <textarea
          id="projectGoal"
          name="projectGoal"
          value={form.projectGoal}
          onChange={onChange}
          rows={4}
          required
          placeholder="Tell us what the website should achieve for your business..."
          className="w-full resize-none rounded-xl border border-therynox-border bg-therynox-bg px-4 py-4 text-sm leading-6 outline-none transition placeholder:text-black/30 focus:border-therynox-orange"
        />

      </div>


      {/* =========================================
          PAGES / SECTIONS
      ========================================= */}

      <div>

        <label
          htmlFor="pages"
          className="mb-3 block text-[9px] font-bold uppercase tracking-[0.2em] text-therynox-muted"
        >
          Pages / sections you need
        </label>

        <textarea
          id="pages"
          name="pages"
          value={form.pages}
          onChange={onChange}
          rows={4}
          placeholder="Example: Home, About, Services, Portfolio, Contact..."
          className="w-full resize-none rounded-xl border border-therynox-border bg-therynox-bg px-4 py-4 text-sm leading-6 outline-none transition placeholder:text-black/30 focus:border-therynox-orange"
        />

      </div>


      {/* =========================================
          REFERENCE WEBSITE
      ========================================= */}

      <Field
        label="Reference website"
        name="reference"
        type="url"
        value={form.reference}
        onChange={onChange}
        placeholder="https://example.com"
      />


      {/* =========================================
          SPECIAL REQUIREMENTS
      ========================================= */}

      <div>

        <label
          htmlFor="message"
          className="mb-3 block text-[9px] font-bold uppercase tracking-[0.2em] text-therynox-muted"
        >
          Additional requirements
        </label>

        <textarea
          id="message"
          name="message"
          value={form.message}
          onChange={onChange}
          rows={6}
          required
          placeholder="Anything else we should know about your project?"
          className="w-full resize-none rounded-xl border border-therynox-border bg-therynox-bg px-4 py-4 text-sm leading-6 outline-none transition placeholder:text-black/30 focus:border-therynox-orange"
        />

      </div>

    </motion.section>
  );
}


/* =========================================
   INPUT FIELD
========================================= */

function Field({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
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