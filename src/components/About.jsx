import React from "react";
import { FiArrowUpRight, FiCheck } from "react-icons/fi";

const strengths = [
  "Strategy before execution",
  "Design-led development",
  "Scalable architecture",
  "Performance focused",
  "SEO-ready builds",
  "Long-term support",
];

export default function About() {
  return (
    <section className="about-section" id="about">
      <style>{`
        .about-section {
          position: relative;
          min-height: 100vh;
          padding: 160px 0;
          overflow: hidden;
          background: #050505;
          color: #fff;
        }

        .about-container {
          position: relative;
          z-index: 2;
          width: min(1380px, calc(100% - 48px));
          margin: 0 auto;
        }

        .about-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 50px;
          margin-bottom: 100px;
        }

        .about-eyebrow {
          display: flex;
          align-items: center;
          gap: 12px;
          color: #ff7a00;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.28em;
          text-transform: uppercase;
        }

        .about-line {
          width: 32px;
          height: 1px;
          background: #ff7a00;
        }

        .about-index {
          color: rgba(255,255,255,0.22);
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.2em;
        }

        .about-main {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 100px;
          align-items: center;
        }

        .about-title {
          margin: 0;
          font-size: clamp(52px, 7vw, 105px);
          line-height: 0.88;
          letter-spacing: -0.075em;
          font-weight: 500;
        }

        .about-title span {
          color: rgba(255,255,255,0.25);
        }

        .about-title em {
          color: #ff7a00;
          font-style: normal;
        }

        .about-intro {
          max-width: 650px;
          margin-top: 40px;
          color: rgba(255,255,255,0.48);
          font-size: 16px;
          line-height: 1.75;
        }

        .about-intro strong {
          color: rgba(255,255,255,0.82);
          font-weight: 500;
        }

        .about-copy {
          max-width: 650px;
          margin-top: 22px;
          color: rgba(255,255,255,0.3);
          font-size: 13px;
          line-height: 1.8;
        }

        .about-visual {
          position: relative;
          min-height: 480px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .about-orbit {
          position: relative;
          width: 390px;
          height: 390px;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 50%;
        }

        .about-orbit::before {
          content: "";
          position: absolute;
          inset: 45px;
          border: 1px dashed rgba(255,122,0,0.2);
          border-radius: 50%;
          animation: aboutRotate 20s linear infinite;
        }

        .about-orbit::after {
          content: "";
          position: absolute;
          inset: 100px;
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 50%;
        }

        @keyframes aboutRotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .about-center {
          position: absolute;
          inset: 50%;
          width: 170px;
          height: 170px;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          background:
            radial-gradient(
              circle at 50% 30%,
              rgba(255,122,0,0.15),
              #0a0a0a 65%
            );
          border: 1px solid rgba(255,255,255,0.12);
          box-shadow:
            0 0 80px rgba(0,0,0,0.8),
            inset 0 0 40px rgba(255,255,255,0.03);
        }

        .about-center-small {
          color: rgba(255,255,255,0.35);
          font-size: 7px;
          font-weight: 700;
          letter-spacing: 0.3em;
        }

        .about-center-title {
          margin-top: 12px;
          font-size: 26px;
          line-height: 0.9;
          letter-spacing: -0.05em;
          font-weight: 600;
        }

        .about-center-title span {
          color: #ff7a00;
        }

        .about-orbit-dot {
          position: absolute;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #ff7a00;
          box-shadow: 0 0 25px rgba(255,122,0,0.8);
        }

        .about-dot-1 {
          top: 22px;
          left: 50%;
          transform: translateX(-50%);
        }

        .about-dot-2 {
          right: 35px;
          top: 110px;
        }

        .about-dot-3 {
          left: 35px;
          bottom: 110px;
        }

        .about-stat {
          position: absolute;
          padding: 15px 18px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.025);
          backdrop-filter: blur(15px);
        }

        .about-stat-1 {
          top: 30px;
          right: -15px;
        }

        .about-stat-2 {
          left: -20px;
          bottom: 45px;
        }

        .about-stat strong {
          display: block;
          font-size: 24px;
          letter-spacing: -0.05em;
          font-weight: 500;
        }

        .about-stat span {
          display: block;
          margin-top: 4px;
          color: rgba(255,255,255,0.3);
          font-size: 7px;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }

        .about-bottom {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          margin-top: 120px;
          padding-top: 40px;
          border-top: 1px solid rgba(255,255,255,0.09);
        }

        .about-bottom-label {
          color: rgba(255,255,255,0.25);
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }

        .about-strengths {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px 30px;
        }

        .about-strength {
          display: flex;
          align-items: center;
          gap: 10px;
          color: rgba(255,255,255,0.48);
          font-size: 11px;
        }

        .about-strength-icon {
          width: 22px;
          height: 22px;
          flex: 0 0 22px;
          display: grid;
          place-items: center;
          border: 1px solid rgba(255,122,0,0.25);
          border-radius: 50%;
          color: #ff7a00;
        }

        .about-cta {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          margin-top: 35px;
          color: #ff7a00;
          text-decoration: none;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        .about-cta svg {
          transition: transform 0.3s ease;
        }

        .about-cta:hover svg {
          transform: translate(4px, -4px);
        }

        @media (max-width: 950px) {
          .about-section {
            padding: 120px 0;
          }

          .about-main {
            grid-template-columns: 1fr;
            gap: 70px;
          }

          .about-visual {
            min-height: 450px;
          }

          .about-bottom {
            grid-template-columns: 1fr;
            gap: 35px;
          }
        }

        @media (max-width: 600px) {
          .about-section {
            padding: 90px 0;
          }

          .about-container {
            width: calc(100% - 28px);
          }

          .about-top {
            margin-bottom: 65px;
          }

          .about-title {
            font-size: 52px;
          }

          .about-intro {
            font-size: 14px;
            margin-top: 28px;
          }

          .about-copy {
            font-size: 12px;
          }

          .about-visual {
            min-height: 370px;
          }

          .about-orbit {
            width: 300px;
            height: 300px;
          }

          .about-center {
            width: 135px;
            height: 135px;
          }

          .about-center-title {
            font-size: 21px;
          }

          .about-stat-1 {
            right: 0;
            top: 5px;
          }

          .about-stat-2 {
            left: 0;
            bottom: 15px;
          }

          .about-stat strong {
            font-size: 19px;
          }

          .about-bottom {
            margin-top: 80px;
          }

          .about-strengths {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="about-container">

        {/* TOP */}
        <div className="about-top">

          <div className="about-eyebrow">
            <span className="about-line" />
            About THERYNOX
          </div>

          <div className="about-index">
            04 / 08
          </div>

        </div>

        {/* MAIN */}
        <div className="about-main">

          <div className="about-content">

            <h2 className="about-title">
              We don't just
              <br />
              build <em>websites.</em>
              <br />
              <span>We build digital</span>
              <br />
              <span>experiences.</span>
            </h2>

            <p className="about-intro">
              THERYNOX Web Studio is a digital design and
              development studio focused on creating
              <strong> modern, high-performance digital products.</strong>
            </p>

            <p className="about-copy">
              We bring strategy, design, development and
              technology together under one roof. Whether
              you're launching a new brand, rebuilding an
              existing website or creating a complex business
              platform, we build with the long term in mind.
            </p>

            <a href="#contact" className="about-cta">
              Work with us
              <FiArrowUpRight size={15} />
            </a>

          </div>

          {/* VISUAL */}
          <div className="about-visual">

            <div className="about-orbit">

              <div className="about-orbit-dot about-dot-1" />
              <div className="about-orbit-dot about-dot-2" />
              <div className="about-orbit-dot about-dot-3" />

              <div className="about-center">

                <span className="about-center-small">
                  THERYNOX
                </span>

                <div className="about-center-title">
                  DIGITAL
                  <span>STUDIO</span>
                </div>

              </div>

            </div>

            <div className="about-stat about-stat-1">
              <strong>100%</strong>
              <span>Design & Development</span>
            </div>

            <div className="about-stat about-stat-2">
              <strong>01 → ∞</strong>
              <span>Long-term Partnership</span>
            </div>

          </div>

        </div>

        {/* BOTTOM */}
        <div className="about-bottom">

          <div>
            <div className="about-bottom-label">
              Why THERYNOX
            </div>
          </div>

          <div className="about-strengths">

            {strengths.map((item) => (
              <div
                className="about-strength"
                key={item}
              >
                <span className="about-strength-icon">
                  <FiCheck size={11} />
                </span>

                {item}
              </div>
            ))}

          </div>

        </div>

      </div>
    </section>
  );
}