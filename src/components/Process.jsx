import React from "react";
import { motion } from "framer-motion";
import "./Process.css";

const steps = [
  {
    number: "01",
    title: "DISCOVER",
    text: "We understand your business, audience, goals and requirements before anything is designed.",
  },
  {
    number: "02",
    title: "DESIGN",
    text: "We turn strategy into a clear, distinctive and high-converting digital experience.",
  },
  {
    number: "03",
    title: "BUILD",
    text: "We develop your website, application or system with modern and scalable technology.",
  },
  {
    number: "04",
    title: "LAUNCH",
    text: "We test, refine and launch your product with confidence, performance and purpose.",
  },
];

export default function Process() {
  return (
    <section className="process-section">
      <div className="process-container">

        <div className="process-intro">
          <div className="process-label">
            HOW WE WORK
          </div>

          <div className="process-heading-wrap">
            <h2>
              From idea
              <br />
              to launch.
            </h2>

            <p>
              A clear process.
              <br />
              No unnecessary complexity.
            </p>
          </div>
        </div>

        <div className="process-grid">
          {steps.map((step, index) => (
            <motion.article
              className="process-card"
              key={step.number}
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
                amount: 0.2,
              }}
              transition={{
                duration: 0.6,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="process-card-top">
                <span className="process-number">
                  {step.number}
                </span>

                <span className="process-dot" />
              </div>

              <div className="process-card-content">
                <h3>{step.title}</h3>

                <p>{step.text}</p>
              </div>

              {index < steps.length - 1 && (
                <span className="process-line" />
              )}
            </motion.article>
          ))}
        </div>

        <div className="process-footer">
          <span>
            STRATEGY
          </span>

          <span>
            DESIGN
          </span>

          <span>
            DEVELOPMENT
          </span>

          <span>
            DELIVERY
          </span>
        </div>

      </div>
    </section>
  );
}