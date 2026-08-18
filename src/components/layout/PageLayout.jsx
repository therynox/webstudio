import React from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import CTA from "../CTA";

export default function PageLayout({
  children,
  showCTA = true,
}) {
  return (
    <div className="min-h-screen bg-therynox-bg text-therynox-black">

      <Navbar variant="light" />

      <main>
        {children}

        {showCTA && <CTA />}
      </main>

      <Footer />

    </div>
  );
}