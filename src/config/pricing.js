export const PLANS = {
  launch: {
    id: "launch",
    name: "Landing Page",
    price: 2999,
    pages: 1,
  },

  starter: {
    id: "starter",
    name: "Starter Website",
    price: 4999,
    pages: 4,
  },

  business: {
    id: "business",
    name: "Business Website",
    price: 7999,
    pages: 8,
  },

  premium: {
    id: "premium",
    name: "Premium Website",
    price: 12999,
    pages: 12,
  },

  ecommerce: {
    id: "ecommerce",
    name: "E-Commerce",
    price: 14999,
    pages: null,
  },

  businessApp: {
    id: "businessApp",
    name: "Business Web App",
    price: 24999,
    pages: null,
  },

  custom: {
    id: "custom",
    name: "Custom Platform",
    price: 49999,
    pages: null,
  },
};

export const ADDONS = [
  {
    id: "extra-page",
    name: "Extra Page",
    price: 500,
    unit: "page",
  },
  {
    id: "premium-animation",
    name: "Premium Animation",
    price: 1500,
  },
  {
    id: "seo-setup",
    name: "SEO Setup",
    price: 2999,
  },
  {
    id: "whatsapp",
    name: "WhatsApp Integration",
    price: 499,
  },
  {
    id: "payment-gateway",
    name: "Payment Gateway",
    price: 1999,
  },
  {
    id: "analytics",
    name: "Google Analytics",
    price: 499,
  },
  {
    id: "domain",
    name: "Domain Setup",
    price: 499,
  },
  {
    id: "hosting",
    name: "Hosting Setup",
    price: 999,
  },
  {
    id: "maintenance",
    name: "Maintenance",
    price: 999,
    suffix: "/month",
  },
  {
    id: "extra-revision",
    name: "Extra Revision",
    price: 499,
  },
];

export const EXISTING_SERVICES = [
  {
    id: "redesign",
    name: "Website Redesign",
    price: null,
  },
  {
    id: "development",
    name: "Web Development",
    price: null,
  },
  {
    id: "seo",
    name: "SEO & Growth",
    price: null,
  },
  {
    id: "performance",
    name: "Performance Optimization",
    price: null,
  },
  {
    id: "bug-fixing",
    name: "Bug Fixing",
    price: null,
  },
  {
    id: "maintenance",
    name: "Website Maintenance",
    price: 999,
    suffix: "/month",
  },
  {
    id: "domain",
    name: "Domain Setup",
    price: 499,
  },
  {
    id: "hosting",
    name: "Hosting Setup",
    price: 999,
  },
  {
    id: "whatsapp",
    name: "WhatsApp Integration",
    price: 499,
  },
  {
    id: "payment",
    name: "Payment Gateway",
    price: 1999,
  },
  {
    id: "animation",
    name: "Premium Animation",
    price: 1500,
  },
  {
    id: "extra-page",
    name: "Extra Page",
    price: 500,
  },
  {
    id: "other",
    name: "Something Else",
    price: null,
  },
];

export const PROJECT_TYPES = {
  NEW: "new",
  EXISTING_WEBSITE: "existing-website",
  EXISTING_PROJECT: "existing-project",
};