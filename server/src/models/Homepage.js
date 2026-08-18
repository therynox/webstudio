const mongoose = require("mongoose");

const statSchema = new mongoose.Schema({
  number: { type: String, default: "" },
  label: { type: String, default: "" },
  visible: { type: Boolean, default: true },
}, { _id: false });

const sectionSchema = new mongoose.Schema({
  enabled: { type: Boolean, default: true },
  eyebrow: { type: String, default: "" },
  title: { type: String, default: "" },
  description: { type: String, default: "" },
  ctaText: { type: String, default: "" },
  ctaUrl: { type: String, default: "" },
}, { _id: false });


const homepageSectionSchema = new mongoose.Schema({
  key: { type: String, required: true },
  label: { type: String, required: true },
  visible: { type: Boolean, default: true },
  order: { type: Number, required: true },
}, { _id: false });

const homepageSchema = new mongoose.Schema({
  singleton: { type: String, unique: true, default: "homepage" },
  sections: { type: [homepageSectionSchema], default: [] },
  hero: {
    enabled: { type: Boolean, default: true },
    badge: { type: String, default: "THERYNOX WEB STUDIO" },
    title: { type: String, default: "Digital experiences built to move businesses." },
    description: { type: String, default: "Strategy, design and development working together to create powerful digital products." },
    primaryCtaText: { type: String, default: "Start a project" },
    primaryCtaUrl: { type: String, default: "/contact" },
    secondaryCtaText: { type: String, default: "View our work" },
    secondaryCtaUrl: { type: String, default: "/work" },
    projectIds: { type: [mongoose.Schema.Types.ObjectId], ref: "Project", default: [] },
    autoplay: { type: Boolean, default: true },
    autoplayDuration: { type: Number, default: 5000 },
  },
  stats: {
    enabled: { type: Boolean, default: true },
    items: { type: [statSchema], default: [] },
  },
  technology: sectionSchema,
  work: sectionSchema,
  process: sectionSchema,
  pricing: sectionSchema,
  contact: {
    enabled: { type: Boolean, default: true },
    eyebrow: { type: String, default: "Have a project in mind?" },
    title: { type: String, default: "Let's build something worth remembering." },
    description: { type: String, default: "Tell us what you're building. We'll help turn your idea into a powerful digital experience." },
    ctaText: { type: String, default: "Start a project" },
    ctaUrl: { type: String, default: "/contact" },
  },
  seo: {
    title: { type: String, default: "THERYNOX Web Studio | Digital Experiences" },
    description: { type: String, default: "THERYNOX builds premium websites, e-commerce platforms and digital systems for ambitious businesses." },
    keywords: { type: String, default: "web design, web development, e-commerce, digital agency, THERYNOX" },
    ogImage: { type: String, default: "" },
  },
}, { timestamps: true });

module.exports = mongoose.model("Homepage", homepageSchema);
