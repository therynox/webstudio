import React from "react";
import { motion } from "framer-motion";
import "./CTA.css";

export default function CTA() {
  return (
    <section className="cta-section">
      <div className="cta-container">

        <div className="cta-label">
          HAVE A PROJECT IN MIND?
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Let's build something
          <br />
          <span>worth remembering.</span>
        </motion.h2>

        <p className="cta-description">
          Tell us what you're building. We'll help turn
          your idea into a powerful digital experience.
        </p>

        <motion.a
          href="#contact"
          className="cta-button"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <span>START A PROJECT</span>
          <strong>↗</strong>
        </motion.a>

        <div className="cta-meta">
          <span>WEB DESIGN</span>
          <span>DEVELOPMENT</span>
          <span>DIGITAL SYSTEMS</span>
          <span>E-COMMERCE</span>
        </div>

      </div>
    </section>
  );
}