const mongoose = require("mongoose");

const linkSchema = new mongoose.Schema({
  label: { type: String, required: true, trim: true },
  path: { type: String, default: "#", trim: true },
  visible: { type: Boolean, default: true },
  external: { type: Boolean, default: false },
}, { _id: true });

const footerGroupSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  links: { type: [linkSchema], default: [] },
}, { _id: true });

const globalSettingsSchema = new mongoose.Schema({
  singleton: { type: String, unique: true, default: "global" },

  branding: {
    brandName: { type: String, default: "THERYNOX" },
    studioName: { type: String, default: "WEB STUDIO" },
    logoUrl: { type: String, default: "" },
    faviconUrl: { type: String, default: "" },
  },

  navigation: {
    services: { type: [linkSchema], default: [] },
    solutions: { type: [linkSchema], default: [] },
    main: { type: [linkSchema], default: [] },
    ctaText: { type: String, default: "Start a Project" },
    ctaUrl: { type: String, default: "/contact" },
  },

  footer: {
    description: {
      type: String,
      default: "Digital experiences, websites and systems built for ambitious businesses.",
    },
    email: { type: String, default: "hello@therynox.com" },
    groups: { type: [footerGroupSchema], default: [] },
    social: { type: [linkSchema], default: [] },
    copyright: { type: String, default: "THERYNOX WEB STUDIO" },
    location: { type: String, default: "INDIA · WORKING WORLDWIDE" },
    privacyUrl: { type: String, default: "/privacy" },
    termsUrl: { type: String, default: "/terms" },
  },

  contact: {
    email: { type: String, default: "hello@therynox.com" },
    phone: { type: String, default: "" },
    whatsapp: { type: String, default: "" },
    address: { type: String, default: "India · Working Worldwide" },
    hours: { type: String, default: "Mon – Sat · 10:00 – 19:00" },
    mapsUrl: { type: String, default: "" },
  },

  social: { type: [linkSchema], default: [] },

  seo: {
    title: {
      type: String,
      default: "THERYNOX Web Studio | Digital Experiences",
    },
    description: {
      type: String,
      default:
        "THERYNOX builds premium websites, e-commerce platforms and digital systems for ambitious businesses.",
    },
    keywords: {
      type: String,
      default:
        "web design, web development, e-commerce, digital agency, THERYNOX",
    },
    ogImage: { type: String, default: "" },
    canonicalUrl: { type: String, default: "" },
    googleVerification: { type: String, default: "" },
  },
}, { timestamps: true });

module.exports = mongoose.model("GlobalSettings", globalSettingsSchema);
