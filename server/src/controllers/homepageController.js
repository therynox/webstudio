const mongoose = require("mongoose");
const Homepage = require("../models/Homepage");

const defaultSections = [
  { key: "hero", label: "Hero", visible: true, order: 1 },
  { key: "stats", label: "Stats", visible: true, order: 2 },
  { key: "technology", label: "Technology", visible: true, order: 3 },
  { key: "work", label: "Selected Work", visible: true, order: 4 },
  { key: "process", label: "Process", visible: true, order: 5 },
  { key: "pricing", label: "Pricing", visible: true, order: 6 },
  { key: "contact", label: "Final CTA", visible: true, order: 7 },
];

const defaults = {
  sections: defaultSections,
  hero: {
    enabled: true,
    badge: "THERYNOX WEB STUDIO",
    title: "Digital experiences built to move businesses.",
    description: "Strategy, design and development working together to create powerful digital products.",
    primaryCtaText: "Start a project",
    primaryCtaUrl: "/contact",
    secondaryCtaText: "View our work",
    secondaryCtaUrl: "/work",
    projectIds: [],
    autoplay: true,
    autoplayDuration: 5000,
  },
  stats: {
    enabled: true,
    items: [
      { number: "25+", label: "Digital Projects", visible: true },
      { number: "15+", label: "Business Systems", visible: true },
      { number: "10+", label: "Industries Served", visible: true },
      { number: "100%", label: "Built With Purpose", visible: true },
    ],
  },
  technology: { enabled: true, eyebrow: "Technology", title: "Built with modern technology.", description: "Modern tools and thoughtful engineering behind every digital experience." },
  work: { enabled: true, eyebrow: "Selected Work", title: "Work that moves businesses.", description: "A selection of websites, commerce platforms and digital systems built by THERYNOX WEB STUDIO." },
  process: { enabled: true, eyebrow: "How we work", title: "From idea to launch.", description: "A clear process. No unnecessary complexity." },
  pricing: { enabled: true, eyebrow: "Pricing", title: "Choose the right starting point.", description: "Flexible packages for businesses at different stages." },
  contact: { enabled: true, eyebrow: "Have a project in mind?", title: "Let's build something worth remembering.", description: "Tell us what you're building. We'll help turn your idea into a powerful digital experience.", ctaText: "Start a project", ctaUrl: "/contact" },
  seo: { title: "THERYNOX Web Studio | Digital Experiences", description: "THERYNOX builds premium websites, e-commerce platforms and digital systems for ambitious businesses.", keywords: "web design, web development, e-commerce, digital agency, THERYNOX", ogImage: "" },
};

async function getOrCreate() {
  let homepage = await Homepage.findOne({ singleton: "homepage" });
  if (!homepage) {
    homepage = await Homepage.create({ singleton: "homepage", ...defaults });
  } else if (!Array.isArray(homepage.sections) || homepage.sections.length === 0) {
    homepage.sections = defaultSections;
    await homepage.save();
  }
  return homepage;
}

exports.getHomepage = async (req, res) => {
  try {
    const homepage = await getOrCreate();
    res.json({ success: true, data: homepage });
  } catch (error) {
    console.error("GET HOMEPAGE ERROR:", error);
    res.status(500).json({ success: false, message: "Failed to fetch homepage settings" });
  }
};

exports.updateHomepage = async (req, res) => {
  try {
    const payload = req.body || {};
    const set = {};

    // Never replace the complete hero object when only one Hero setting changes.
    // This keeps projectIds intact across saves.
    if (payload.hero && typeof payload.hero === "object") {
      const hero = payload.hero;

      const heroProjectIds = Array.isArray(hero.projectIds)
        ? hero.projectIds
            .map((id) => String(id).trim())
            .filter((id) => mongoose.Types.ObjectId.isValid(id))
        : [];

      set["hero.enabled"] = hero.enabled !== false;
      set["hero.badge"] = hero.badge ?? "";
      set["hero.title"] = hero.title ?? "";
      set["hero.description"] = hero.description ?? "";
      set["hero.primaryCtaText"] = hero.primaryCtaText ?? "";
      set["hero.primaryCtaUrl"] = hero.primaryCtaUrl ?? "";
      set["hero.secondaryCtaText"] = hero.secondaryCtaText ?? "";
      set["hero.secondaryCtaUrl"] = hero.secondaryCtaUrl ?? "";
      set["hero.projectIds"] = heroProjectIds;
      set["hero.autoplay"] = hero.autoplay !== false;
      set["hero.autoplayDuration"] = Number(hero.autoplayDuration) || 5000;
    }

    if (Array.isArray(payload.sections)) {
      set.sections = payload.sections
        .filter((section) => section && section.key)
        .map((section, index) => ({
          key: section.key,
          label: section.label || section.key,
          visible: section.visible !== false,
          order: index + 1,
        }));
    }

    // Preserve the other homepage fields while updating the fields supplied by the editor.
    ["stats", "technology", "work", "process", "pricing", "contact", "seo"].forEach((key) => {
      if (payload[key] !== undefined) {
        set[key] = payload[key];
      }
    });

    const homepage = await Homepage.findOneAndUpdate(
      { singleton: "homepage" },
      { $set: set, $setOnInsert: { singleton: "homepage" } },
      { new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true }
    );

    // Return plain JSON with project IDs as strings so the admin checkbox state
    // remains stable after saving and reloading.
    const data = homepage.toObject();
    data.hero = data.hero || {};
    data.hero.projectIds = Array.isArray(data.hero.projectIds)
      ? data.hero.projectIds.map((id) => String(id))
      : [];

    res.json({
      success: true,
      message: "Homepage updated successfully",
      data,
    });
  } catch (error) {
    console.error("UPDATE HOMEPAGE ERROR:", error);
    res.status(400).json({ success: false, message: error.message || "Failed to update homepage" });
  }
};
