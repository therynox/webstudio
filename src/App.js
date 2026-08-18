import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import LoadingScreen from "./components/LoadingScreen";

import Home from "./pages/Home";
import Work from "./pages/Work";
import Pricing from "./pages/Pricing";
import Process from "./pages/Process";
import Contact from "./pages/Contact";
import ProjectDetail from "./pages/ProjectDetail";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";


import WebDesign from "./pages/services/WebDesign";
import WebDevelopment from "./pages/services/WebDevelopment";
import Ecommerce from "./pages/services/Ecommerce";
import WebApplications from "./pages/services/WebApplications";
import BusinessSystems from "./pages/services/BusinessSystems";
import SeoGrowth from "./pages/services/SeoGrowth";

import CRM from "./pages/solutions/CRM";
import ERP from "./pages/solutions/ERP";
import HRManagement from "./pages/solutions/HRManagement";
import Inventory from "./pages/solutions/Inventory";
import POS from "./pages/solutions/POS";
import Booking from "./pages/solutions/Booking";


import AdminLogin from "./admin/pages/AdminLogin";
import Dashboard from "./admin/pages/Dashboard";
import Projects from "./admin/pages/Projects";
import CreateProject from "./admin/pages/CreateProject";
import EditProject from "./admin/pages/EditProject";
import Blogs from "./admin/pages/Blogs";
import BlogEditor from "./admin/pages/BlogEditor";
import MediaHealth from "./admin/pages/MediaHealth";
import MediaLibrary from "./admin/pages/MediaLibrary";
import Leads from "./admin/pages/Leads";
import HomepageEditor from "./admin/pages/HomepageEditor";
import Settings from "./admin/pages/Settings";
import SEOManager from "./admin/pages/SEOManager";
import AdminLayout from "./admin/components/AdminLayout";
import ProtectedRoute from "./admin/components/ProtectedRoute";
import "./admin/Admin.css";


function NotFound() {
  return (
    <div className="not-found-page">
      <style>{`
        .not-found-page {
          position: relative;
          min-height: 100vh;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #050505;
          color: #fff;
          isolation: isolate;
        }

        /* ================================
           BACKGROUND
        ================================= */

        .nf-grid {
          position: absolute;
          inset: 0;
          z-index: -3;
          opacity: 0.35;
          background-image:
            linear-gradient(
              rgba(255,255,255,0.035) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255,255,255,0.035) 1px,
              transparent 1px
            );
          background-size: 70px 70px;
          mask-image: radial-gradient(
            circle at center,
            black 0%,
            transparent 75%
          );
        }

        .nf-glow {
          position: absolute;
          width: 550px;
          height: 550px;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(255,122,0,0.13),
            rgba(255,122,0,0.035) 35%,
            transparent 70%
          );
          filter: blur(10px);
          animation: nfPulse 5s ease-in-out infinite;
          z-index: -2;
        }

        @keyframes nfPulse {
          0%, 100% {
            transform: translate(-50%, -50%) scale(0.9);
            opacity: 0.55;
          }

          50% {
            transform: translate(-50%, -50%) scale(1.08);
            opacity: 1;
          }
        }

        /* ================================
           ORBITS
        ================================= */

        .nf-orbit {
          position: absolute;
          left: 50%;
          top: 50%;
          width: min(620px, 85vw);
          aspect-ratio: 1;
          transform: translate(-50%, -50%);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 50%;
          pointer-events: none;
        }

        .nf-orbit::before,
        .nf-orbit::after {
          content: "";
          position: absolute;
          inset: 9%;
          border-radius: 50%;
          border: 1px dashed rgba(255,122,0,0.18);
        }

        .nf-orbit::after {
          inset: 22%;
          border-style: solid;
          border-color: rgba(255,255,255,0.05);
        }

        .nf-orbit-rotate {
          animation: nfRotate 25s linear infinite;
        }

        .nf-orbit-reverse {
          width: min(430px, 65vw);
          animation: nfRotateReverse 18s linear infinite;
        }

        @keyframes nfRotate {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }

          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }

        @keyframes nfRotateReverse {
          from {
            transform: translate(-50%, -50%) rotate(360deg);
          }

          to {
            transform: translate(-50%, -50%) rotate(0deg);
          }
        }

        /* ================================
           ORBIT DOTS
        ================================= */

        .nf-dot {
          position: absolute;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #ff7a00;
          box-shadow:
            0 0 15px rgba(255,122,0,0.9),
            0 0 35px rgba(255,122,0,0.35);
        }

        .nf-dot-one {
          top: -3px;
          left: 50%;
        }

        .nf-dot-two {
          right: 12%;
          top: 20%;
        }

        .nf-dot-three {
          left: 10%;
          bottom: 20%;
        }

        /* ================================
           SCAN LINE
        ================================= */

        .nf-scan {
          position: absolute;
          left: 50%;
          top: 50%;
          width: min(680px, 90vw);
          height: 1px;
          transform: translate(-50%, -50%);
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255,122,0,0.65),
            transparent
          );
          animation: nfScan 4s ease-in-out infinite;
          opacity: 0.5;
        }

        @keyframes nfScan {
          0%, 100% {
            transform: translate(-50%, -50%) scaleX(0.4);
            opacity: 0;
          }

          50% {
            transform: translate(-50%, -50%) scaleX(1);
            opacity: 0.8;
          }
        }

        /* ================================
           CONTENT
        ================================= */

        .nf-content {
          position: relative;
          z-index: 5;
          width: min(900px, calc(100% - 32px));
          text-align: center;
        }

        .nf-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          margin-bottom: 25px;
          color: rgba(255,255,255,0.35);
          font-size: 8px;
          font-weight: 700;
          letter-spacing: 0.3em;
          text-transform: uppercase;
        }

        .nf-status {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #ff7a00;
          box-shadow: 0 0 12px rgba(255,122,0,0.9);
          animation: nfBlink 1.6s ease-in-out infinite;
        }

        @keyframes nfBlink {
          0%, 100% {
            opacity: 0.35;
          }

          50% {
            opacity: 1;
          }
        }

        .nf-number {
          margin: 0;
          font-size: clamp(130px, 24vw, 310px);
          line-height: 0.72;
          letter-spacing: -0.12em;
          font-weight: 600;
          color: #fff;
          text-shadow:
            0 0 80px rgba(255,122,0,0.08);
          user-select: none;
        }

        .nf-number span {
          color: #ff7a00;
        }

        .nf-title {
          margin-top: 45px;
          font-size: clamp(25px, 4vw, 48px);
          line-height: 0.95;
          letter-spacing: -0.055em;
          font-weight: 500;
        }

        .nf-title-muted {
          color: rgba(255,255,255,0.28);
        }

        .nf-description {
          max-width: 470px;
          margin: 20px auto 0;
          color: rgba(255,255,255,0.35);
          font-size: 13px;
          line-height: 1.7;
        }

        /* ================================
           BUTTON
        ================================= */

        .nf-actions {
          display: flex;
          justify-content: center;
          margin-top: 32px;
        }

        .nf-home {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 15px 22px;
          border-radius: 999px;
          background: #ff7a00;
          color: #050505;
          text-decoration: none;
          font-size: 8px;
          font-weight: 800;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          transition:
            transform 0.3s ease,
            background 0.3s ease,
            box-shadow 0.3s ease;
        }

        .nf-home:hover {
          transform: translateY(-3px);
          background: #fff;
          box-shadow: 0 15px 40px rgba(255,122,0,0.18);
        }

        .nf-arrow {
          font-size: 15px;
          transition: transform 0.3s ease;
        }

        .nf-home:hover .nf-arrow {
          transform: translate(3px, -3px);
        }

        /* ================================
           FLOATING LABELS
        ================================= */

        .nf-label {
          position: absolute;
          z-index: 3;
          padding: 10px 13px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.025);
          backdrop-filter: blur(15px);
          color: rgba(255,255,255,0.28);
          font-size: 6px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        .nf-label-left {
          left: 5%;
          top: 28%;
          animation: nfFloatOne 5s ease-in-out infinite;
        }

        .nf-label-right {
          right: 5%;
          bottom: 27%;
          animation: nfFloatTwo 6s ease-in-out infinite;
        }

        @keyframes nfFloatOne {
          0%, 100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-12px);
          }
        }

        @keyframes nfFloatTwo {
          0%, 100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(10px);
          }
        }

        /* ================================
           FOOTER
        ================================= */

        .nf-footer {
          position: absolute;
          bottom: 25px;
          left: 50%;
          transform: translateX(-50%);
          width: calc(100% - 32px);
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: rgba(255,255,255,0.18);
          font-size: 6px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }

        /* ================================
           MOBILE
        ================================= */

        @media (max-width: 600px) {

          .nf-grid {
            background-size: 45px 45px;
          }

          .nf-glow {
            width: 360px;
            height: 360px;
          }

          .nf-orbit {
            width: 360px;
          }

          .nf-orbit-reverse {
            width: 250px;
          }

          .nf-label {
            display: none;
          }

          .nf-number {
            font-size: 38vw;
          }

          .nf-title {
            margin-top: 35px;
          }

          .nf-description {
            font-size: 12px;
          }

          .nf-footer {
            bottom: 18px;
          }

          .nf-footer span:last-child {
            display: none;
          }
        }
      `}</style>

      {/* BACKGROUND GRID */}
      <div className="nf-grid" />

      {/* ORANGE GLOW */}
      <div className="nf-glow" />

      {/* ORBITS */}
      <div className="nf-orbit nf-orbit-rotate">
        <div className="nf-dot nf-dot-one" />
        <div className="nf-dot nf-dot-two" />
        <div className="nf-dot nf-dot-three" />
      </div>

      <div className="nf-orbit nf-orbit-reverse" />

      {/* SCANNING LINE */}
      <div className="nf-scan" />

      {/* FLOATING SYSTEM LABELS */}
      <div className="nf-label nf-label-left">
        ROUTE NOT FOUND
      </div>

      <div className="nf-label nf-label-right">
        SYSTEM / 404
      </div>

      {/* MAIN */}
      <main className="nf-content">

        <div className="nf-eyebrow">
          <span className="nf-status" />
          THERYNOX DIGITAL STUDIO
        </div>

        <h1 className="nf-number">
          4<span>0</span>4
        </h1>

        <h2 className="nf-title">
          Looks like this page
          <br />
          <span className="nf-title-muted">
            went somewhere else.
          </span>
        </h2>

        <p className="nf-description">
          The route you're looking for doesn't exist, has moved,
          or was never deployed. Let's get you back to the
          THERYNOX experience.
        </p>

        <div className="nf-actions">

          <a
            href="/"
            className="nf-home"
          >
            Back to home

            <span className="nf-arrow">
              ↗
            </span>
          </a>

        </div>

      </main>

      {/* FOOTER */}
      <div className="nf-footer">

        <span>
          THERYNOX WEB STUDIO
        </span>

        <span>
          DESIGN · DEVELOP · DEPLOY
        </span>

      </div>

    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>

      {/* GLOBAL LOADING SCREEN */}
      <LoadingScreen />

      <Routes>

        {/* HOME */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* WORK */}
        <Route
          path="/work"
          element={<Work />}
        />

        {/* PROJECT DETAIL */}
        <Route
          path="/work/:slug"
          element={<ProjectDetail />}
        />

        <Route
          path="/blog"
          element={<Blog />}
        />

        <Route
          path="/blog/:slug"
          element={<BlogDetail />}
        />

        {/* PRICING */}
        <Route
          path="/pricing"
          element={<Pricing />}
        />

        {/* PROCESS */}
        <Route
          path="/process"
          element={<Process />}
        />

        {/* CONTACT */}
        <Route
          path="/contact"
          element={<Contact />}
        />


        {/* =========================================
            SERVICES
        ========================================= */}

        <Route
          path="/services/web-design"
          element={<WebDesign />}
        />

        <Route
          path="/services/web-development"
          element={<WebDevelopment />}
        />

        <Route
          path="/services/ecommerce"
          element={<Ecommerce />}
        />

        <Route
          path="/services/web-applications"
          element={<WebApplications />}
        />

        <Route
          path="/services/business-systems"
          element={<BusinessSystems />}
        />

        <Route
          path="/services/seo-growth"
          element={<SeoGrowth />}
        />


        {/* =========================================
            SOLUTIONS
        ========================================= */}

        <Route
          path="/solutions/crm"
          element={<CRM />}
        />

        <Route
          path="/solutions/erp"
          element={<ERP />}
        />

        <Route
          path="/solutions/hr-management"
          element={<HRManagement />}
        />

        <Route
          path="/solutions/inventory"
          element={<Inventory />}
        />

        <Route
          path="/solutions/pos"
          element={<POS />}
        />

        <Route
          path="/solutions/booking"
          element={<Booking />}
        />


        {/* =========================================
            ADMIN
        ========================================= */}

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        <Route
          path="/admin/dashboard"
          element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
        />

        <Route
          path="/admin/projects"
          element={<ProtectedRoute><Projects /></ProtectedRoute>}
        />

        <Route
          path="/admin/projects/create"
          element={<ProtectedRoute><CreateProject /></ProtectedRoute>}
        />

        <Route
          path="/admin/projects/:id/edit"
          element={<ProtectedRoute><EditProject /></ProtectedRoute>}
        />

        <Route
          path="/admin/media"
          element={<ProtectedRoute><MediaLibrary /></ProtectedRoute>}
        />

        <Route
          path="/admin/leads"
          element={<ProtectedRoute><Leads /></ProtectedRoute>}
        />

        <Route
          path="/admin/homepage"
          element={<ProtectedRoute><HomepageEditor /></ProtectedRoute>}
        />

        <Route
          path="/admin/settings"
          element={<ProtectedRoute><Settings /></ProtectedRoute>}
        />
        <Route
          path="/admin/seo"
          element={<ProtectedRoute><SEOManager /></ProtectedRoute>}
        />

        <Route
          path="/admin/blog"
          element={<ProtectedRoute><Blogs /></ProtectedRoute>}
        />

        <Route
          path="/admin/blog/create"
          element={<ProtectedRoute><BlogEditor mode="create" /></ProtectedRoute>}
        />

        <Route
          path="/admin/blog/:id/edit"
          element={<ProtectedRoute><BlogEditor mode="edit" /></ProtectedRoute>}
        />


        {/* =========================================
            404
        ========================================= */}

        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>

    </BrowserRouter>
  );
}