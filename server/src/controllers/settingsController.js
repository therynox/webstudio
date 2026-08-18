const GlobalSettings = require("../models/GlobalSettings");

const defaults = {
  singleton: "global",

  branding: {
    brandName: "THERYNOX",
    studioName: "WEB STUDIO",
    logoUrl: "",
    faviconUrl: "",
  },

  navigation: {
    services: [
      { label: "Web Design", path: "/services/web-design", visible: true },
      { label: "Web Development", path: "/services/web-development", visible: true },
      { label: "E-commerce", path: "/services/ecommerce", visible: true },
      { label: "Web Applications", path: "/services/web-applications", visible: true },
      { label: "Business Systems", path: "/services/business-systems", visible: true },
      { label: "SEO & Growth", path: "/services/seo-growth", visible: true },
    ],
    solutions: [
      { label: "CRM Systems", path: "/solutions/crm", visible: true },
      { label: "ERP Systems", path: "/solutions/erp", visible: true },
      { label: "HR Management", path: "/solutions/hr-management", visible: true },
      { label: "Inventory Management", path: "/solutions/inventory", visible: true },
      { label: "POS Systems", path: "/solutions/pos", visible: true },
      { label: "Booking Systems", path: "/solutions/booking", visible: true },
    ],
    main: [
      { label: "Work", path: "/work", visible: true },
      { label: "Blog", path: "/blog", visible: true },
      { label: "Pricing", path: "/pricing", visible: true },
      { label: "Process", path: "/process", visible: true },
    ],
    ctaText: "Start a Project",
    ctaUrl: "/contact",
  },

  footer: {
    description:
      "Digital experiences, websites and systems built for ambitious businesses.",
    email: "hello@therynox.com",
    groups: [
      {
        title: "EXPLORE",
        links: [
          { label: "Home", path: "/" },
          { label: "Work", path: "/work" },
          { label: "Services", path: "/services" },
          { label: "Process", path: "/process" },
        ],
      },
      {
        title: "SERVICES",
        links: [
          { label: "Web Design", path: "/services/web-design" },
          { label: "Online Store", path: "/services/ecommerce" },
          { label: "Web Applications", path: "/services/web-applications" },
          { label: "Business Systems", path: "/services/business-systems" },
        ],
      },
    ],
    social: [
      { label: "Instagram", path: "https://instagram.com", external: true },
      { label: "LinkedIn", path: "https://linkedin.com", external: true },
      { label: "GitHub", path: "https://github.com", external: true },
    ],
    copyright: "THERYNOX WEB STUDIO",
    location: "INDIA · WORKING WORLDWIDE",
    privacyUrl: "/privacy",
    termsUrl: "/terms",
  },

  contact: {
    email: "hello@therynox.com",
    phone: "",
    whatsapp: "",
    address: "India · Working Worldwide",
    hours: "Mon – Sat · 10:00 – 19:00",
    mapsUrl: "",
  },

  social: [],

  seo: {
    title: "THERYNOX Web Studio | Digital Experiences",
    description:
      "THERYNOX builds premium websites, e-commerce platforms and digital systems for ambitious businesses.",
    keywords:
      "web design, web development, e-commerce, digital agency, THERYNOX",
    ogImage: "",
    canonicalUrl: "",
    googleVerification: "",
  },
};

async function getOrCreate() {
  let settings = await GlobalSettings.findOne({ singleton: "global" });
  if (!settings) {
    settings = await GlobalSettings.create(defaults);
  }
  return settings;
}

exports.getSettings = async (req, res) => {
  try {
    const settings = await getOrCreate();
    res.json({ success: true, data: settings });
  } catch (error) {
    console.error("GET SETTINGS ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to load global settings",
    });
  }
};

exports.updateSettings = async (req, res) => {
  try {
    const payload = req.body || {};

    const settings = await GlobalSettings.findOneAndUpdate(
      { singleton: "global" },
      { $set: { ...payload, singleton: "global" } },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
        runValidators: true,
      }
    );

    res.json({
      success: true,
      message: "Global settings saved successfully",
      data: settings,
    });
  } catch (error) {
    console.error("UPDATE SETTINGS ERROR:", error);
    res.status(400).json({
      success: false,
      message: error.message || "Failed to save global settings",
    });
  }
};
