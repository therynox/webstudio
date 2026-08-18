import React, { useEffect, useState } from "react";
import {
  FiArrowLeft,
  FiArrowRight,
  FiArrowUpRight,
} from "react-icons/fi";

const testimonials = [
  {
    quote:
      "THERYNOX didn't just redesign our website. They changed how our brand feels online.",
    name: "Arjun Mehta",
    role: "Founder · Apex Ventures",
  },
  {
    quote:
      "The attention to detail was exceptional. Every interaction feels intentional and premium.",
    name: "Riya Shah",
    role: "Creative Director · Luma Studio",
  },
  {
    quote:
      "We needed a digital system, not just a website. THERYNOX understood that immediately.",
    name: "Karan Patel",
    role: "CEO · Nexora",
  },
  {
    quote:
      "Our new digital experience finally feels like the company we wanted to become.",
    name: "Neha Joshi",
    role: "Co-Founder · Maison 24",
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);

  const next = () => {
    setActive((current) => (current + 1) % testimonials.length);
  };

  const previous = () => {
    setActive(
      (current) =>
        (current - 1 + testimonials.length) %
        testimonials.length
    );
  };

  useEffect(() => {
    const timer = setInterval(next, 7000);

    return () => clearInterval(timer);
  }, []);

  const testimonial = testimonials[active];

  return (
    <section className="testimonial-section" id="testimonials">

      <style>{`

        .testimonial-section {
          position: relative;
          padding: 110px 0;
          background: #050505;
          color: #fff;
          overflow: hidden;
        }

        .testimonial-section::before {
          content: "";
          position: absolute;
          width: 350px;
          height: 350px;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          background: rgba(255, 122, 0, 0.035);
          filter: blur(100px);
          border-radius: 50%;
          pointer-events: none;
        }

        .testimonial-container {
          position: relative;
          z-index: 2;
          width: min(1100px, calc(100% - 40px));
          margin: auto;
        }

        /* HEADER */

        .testimonial-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 55px;
        }

        .testimonial-label {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #ff7a00;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.25em;
          text-transform: uppercase;
        }

        .testimonial-label-line {
          width: 25px;
          height: 1px;
          background: #ff7a00;
        }

        .testimonial-counter {
          color: rgba(255,255,255,0.25);
          font-size: 9px;
          letter-spacing: 0.2em;
        }

        /* MAIN */

        .testimonial-content {
          display: grid;
          grid-template-columns: 90px 1fr 90px;
          align-items: center;
          min-height: 330px;
          border-top: 1px solid rgba(255,255,255,0.09);
          border-bottom: 1px solid rgba(255,255,255,0.09);
        }

        .testimonial-symbol {
          font-family: Georgia, serif;
          font-size: 85px;
          line-height: 1;
          color: #ff7a00;
          opacity: 0.8;
        }

        .testimonial-text {
          max-width: 850px;
          margin: auto;
          text-align: center;
        }

        .testimonial-quote {
          margin: 0;
          font-size: clamp(27px, 3.2vw, 48px);
          line-height: 1.1;
          letter-spacing: -0.055em;
          font-weight: 400;
        }

        .testimonial-client {
          margin-top: 30px;
        }

        .testimonial-name {
          margin: 0;
          color: rgba(255,255,255,0.85);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.04em;
        }

        .testimonial-role {
          margin-top: 6px;
          color: rgba(255,255,255,0.28);
          font-size: 8px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }

        .testimonial-right {
          display: flex;
          justify-content: flex-end;
        }

        /* CONTROLS */

        .testimonial-controls {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 28px;
        }

        .testimonial-progress {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .testimonial-progress-bar {
          width: 100px;
          height: 1px;
          background: rgba(255,255,255,0.12);
        }

        .testimonial-progress-fill {
          height: 100%;
          background: #ff7a00;
          transition: width 0.4s ease;
        }

        .testimonial-progress-number {
          color: rgba(255,255,255,0.3);
          font-size: 8px;
          letter-spacing: 0.15em;
        }

        .testimonial-buttons {
          display: flex;
          gap: 6px;
        }

        .testimonial-button {
          width: 38px;
          height: 38px;
          display: grid;
          place-items: center;
          border: 1px solid rgba(255,255,255,0.12);
          background: transparent;
          color: rgba(255,255,255,0.5);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .testimonial-button:hover {
          border-color: #ff7a00;
          color: #ff7a00;
        }

        /* BOTTOM */

        .testimonial-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 45px;
        }

        .testimonial-bottom-text {
          color: rgba(255,255,255,0.22);
          font-size: 8px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        .testimonial-link {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #ff7a00;
          text-decoration: none;
          font-size: 8px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        .testimonial-link svg {
          transition: transform 0.3s ease;
        }

        .testimonial-link:hover svg {
          transform: translate(3px, -3px);
        }

        /* MOBILE */

        @media (max-width: 700px) {

          .testimonial-section {
            padding: 80px 0;
          }

          .testimonial-container {
            width: calc(100% - 28px);
          }

          .testimonial-header {
            margin-bottom: 35px;
          }

          .testimonial-content {
            grid-template-columns: 35px 1fr 35px;
            min-height: 380px;
          }

          .testimonial-symbol {
            font-size: 45px;
          }

          .testimonial-quote {
            font-size: 26px;
          }

          .testimonial-bottom {
            flex-direction: column;
            align-items: flex-start;
            gap: 20px;
          }

        }

      `}</style>

      <div className="testimonial-container">

        {/* HEADER */}

        <div className="testimonial-header">

          <div className="testimonial-label">

            <span className="testimonial-label-line" />

            Client Words

          </div>

          <div className="testimonial-counter">

            {String(active + 1).padStart(2, "0")} /{" "}
            {String(testimonials.length).padStart(2, "0")}

          </div>

        </div>


        {/* CONTENT */}

        <div className="testimonial-content">

          <div className="testimonial-symbol">
            “
          </div>


          <div
            className="testimonial-text"
            key={active}
          >

            <blockquote className="testimonial-quote">

              {testimonial.quote}

            </blockquote>


            <div className="testimonial-client">

              <p className="testimonial-name">
                {testimonial.name}
              </p>

              <p className="testimonial-role">
                {testimonial.role}
              </p>

            </div>

          </div>


          <div className="testimonial-right">

            <div className="testimonial-symbol">
              ”
            </div>

          </div>

        </div>


        {/* CONTROLS */}

        <div className="testimonial-controls">

          <div className="testimonial-progress">

            <div className="testimonial-progress-bar">

              <div
                className="testimonial-progress-fill"
                style={{
                  width: `${
                    ((active + 1) /
                      testimonials.length) *
                    100
                  }%`,
                }}
              />

            </div>

            <span className="testimonial-progress-number">
              {String(active + 1).padStart(2, "0")}
            </span>

          </div>


          <div className="testimonial-buttons">

            <button
              type="button"
              className="testimonial-button"
              onClick={previous}
              aria-label="Previous"
            >
              <FiArrowLeft size={14} />
            </button>

            <button
              type="button"
              className="testimonial-button"
              onClick={next}
              aria-label="Next"
            >
              <FiArrowRight size={14} />
            </button>

          </div>

        </div>


        {/* BOTTOM */}

        <div className="testimonial-bottom">

          <span className="testimonial-bottom-text">
            Trusted by ambitious businesses
          </span>

          <a
            href="#contact"
            className="testimonial-link"
          >
            Start a conversation
            <FiArrowUpRight size={13} />
          </a>

        </div>

      </div>

    </section>
  );
}