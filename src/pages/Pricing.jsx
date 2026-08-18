import React from "react";
import PageLayout from "../components/layout/PageLayout";
import Pricing from "../components/Pricing";

export default function PricingPage() {
  return (
    <PageLayout showCTA={false}>
      <Pricing />
    </PageLayout>
  );
}