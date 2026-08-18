const SEO = require("../models/SEO");

const defaults = {
  global: {
    title: "THERYNOX Web Studio | Digital Experiences",
    description:
      "THERYNOX builds premium websites, e-commerce platforms and digital systems for ambitious businesses.",
    keywords:
      "web design, web development, e-commerce, digital agency, THERYNOX",
    schemaType: "Organization",
  },
  homepage: {
    title: "THERYNOX Web Studio | Premium Websites & Digital Systems",
    description:
      "Premium websites, e-commerce platforms and business systems built by THERYNOX Web Studio.",
    keywords:
      "web studio, website development, e-commerce development, digital agency",
    schemaType: "WebSite",
  },
};

function normalizeType(value) {
  const allowed = ["global", "homepage", "project", "blog", "service"];
  return allowed.includes(value) ? value : "global";
}

async function getOne(type, referenceId = "") {
  return SEO.findOne({
    type: normalizeType(type),
    referenceId: String(referenceId || ""),
  });
}

exports.list = async (req, res) => {
  try {
    const type = req.query.type ? normalizeType(req.query.type) : null;
    const filter = type ? { type } : {};
    const items = await SEO.find(filter).sort({ updatedAt: -1 }).lean();

    res.json({
      success: true,
      count: items.length,
      data: items,
    });
  } catch (error) {
    console.error("SEO LIST ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to load SEO settings.",
    });
  }
};

exports.getPublic = async (req, res) => {
  try {
    const type = normalizeType(req.params.type);
    const reference = String(req.params.reference || "");

    let seo = await getOne(type, reference);

    if (!seo && type === "homepage") {
      seo = await getOne("homepage", "");
    }

    if (!seo && type === "global") {
      seo = await getOne("global", "");
    }

    if (!seo && defaults[type]) {
      seo = {
        type,
        referenceId: "",
        ...defaults[type],
        robotsIndex: true,
        robotsFollow: true,
      };
    }

    res.json({
      success: true,
      data: seo || null,
    });
  } catch (error) {
    console.error("SEO PUBLIC ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to load SEO data.",
    });
  }
};

exports.getAdmin = async (req, res) => {
  try {
    const type = normalizeType(req.query.type || "global");
    const referenceId = String(req.query.referenceId || "");

    let seo = await getOne(type, referenceId);

    if (!seo && defaults[type]) {
      seo = {
        type,
        referenceId,
        ...defaults[type],
        robotsIndex: true,
        robotsFollow: true,
      };
    }

    res.json({
      success: true,
      data: seo || {
        type,
        referenceId,
        robotsIndex: true,
        robotsFollow: true,
      },
    });
  } catch (error) {
    console.error("SEO ADMIN GET ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to load SEO settings.",
    });
  }
};

exports.upsert = async (req, res) => {
  try {
    const payload = req.body || {};
    const type = normalizeType(payload.type);
    const referenceId = String(payload.referenceId || "");

    const seo = await SEO.findOneAndUpdate(
      { type, referenceId },
      {
        $set: {
          ...payload,
          type,
          referenceId,
          referenceSlug: String(payload.referenceSlug || "").toLowerCase(),
        },
      },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
        runValidators: true,
      }
    );

    res.json({
      success: true,
      message: "SEO settings saved successfully.",
      data: seo,
    });
  } catch (error) {
    console.error("SEO SAVE ERROR:", error);
    res.status(400).json({
      success: false,
      message: error.message || "Unable to save SEO settings.",
    });
  }
};
