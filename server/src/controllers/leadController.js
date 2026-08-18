const Lead = require("../models/Lead");

const clean = (value) => String(value ?? "").trim();

const addActivity = (lead, type, message = "") => {
  lead.activities = lead.activities || [];
  lead.activities.push({
    type,
    message: clean(message),
    createdAt: new Date(),
  });
};

exports.createLead = async (req, res) => {
  try {
    const body = req.body || {};
    const name = clean(body.name);
    const email = clean(body.email).toLowerCase();

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "Name and email are required.",
      });
    }

    const lead = new Lead({
      name,
      email,
      mobile: clean(body.mobile),
      company: clean(body.company),
      service: clean(body.service),
      customerType: clean(body.customerType) || "New Project",
      budget: clean(body.budget),
      message: clean(body.message),
      websiteUrl: clean(body.websiteUrl),
      projectGoal: clean(body.projectGoal),
      pages: clean(body.pages),
      reference: clean(body.reference),
      source: clean(body.source) || "Website Contact Form",
      plan: clean(body.plan),
      addons: clean(body.addons),
      services: clean(body.services),
      nextFollowUpAt: body.nextFollowUpAt || null,
      activities: [],
    });

    addActivity(
      lead,
      "created",
      `Lead received from ${lead.source}.`
    );

    await lead.save();

    res.status(201).json({ success: true, data: lead });
  } catch (error) {
    console.error("CREATE LEAD ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Unable to submit your inquiry right now.",
    });
  }
};

exports.getAdminLeads = async (req, res) => {
  try {
    const { status, search, page = 1, limit = 20 } = req.query;
    const filter = {};

    if (status && status !== "ALL") filter.status = status;

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
        { service: { $regex: search, $options: "i" } },
      ];
    }

    const safeLimit = Math.min(100, Math.max(1, Number(limit) || 20));
    const safePage = Math.max(1, Number(page) || 1);

    const [leads, total] = await Promise.all([
      Lead.find(filter)
        .sort({ createdAt: -1 })
        .skip((safePage - 1) * safeLimit)
        .limit(safeLimit)
        .lean(),
      Lead.countDocuments(filter),
    ]);

    res.json({
      success: true,
      count: leads.length,
      total,
      page: safePage,
      pages: Math.max(1, Math.ceil(total / safeLimit)),
      data: leads,
    });
  } catch (error) {
    console.error("GET ADMIN LEADS ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Unable to load leads.",
    });
  }
};

exports.getLeadStats = async (req, res) => {
  try {
    const grouped = await Lead.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    const counts = grouped.reduce(
      (acc, item) => ({ ...acc, [item._id]: item.count }),
      {}
    );

    const total = Object.values(counts).reduce(
      (a, b) => a + b,
      0
    );

    const won = counts.won || 0;

    res.json({
      success: true,
      data: {
        total,
        new: counts.new || 0,
        contacted: counts.contacted || 0,
        qualified: counts.qualified || 0,
        proposal: counts.proposal || 0,
        won,
        lost: counts.lost || 0,
        conversionRate: total
          ? Number(((won / total) * 100).toFixed(1))
          : 0,
      },
    });
  } catch (error) {
    console.error("GET LEAD STATS ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Unable to load lead statistics.",
    });
  }
};

exports.updateLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found.",
      });
    }

    const { status, notes, lastContactedAt, nextFollowUpAt } =
      req.body || {};

    if (status !== undefined && status !== lead.status) {
      const previous = lead.status;
      lead.status = status;

      addActivity(
        lead,
        "status_changed",
        `Status changed from ${previous} to ${status}.`
      );
    }

    if (notes !== undefined && clean(notes) !== clean(lead.notes)) {
      lead.notes = clean(notes);

      addActivity(
        lead,
        "note",
        "Internal project/lead note updated."
      );
    }

    if (lastContactedAt !== undefined) {
      lead.lastContactedAt = lastContactedAt || null;

      if (lastContactedAt) {
        addActivity(
          lead,
          "follow_up",
          `Last contacted: ${new Date(lastContactedAt).toLocaleString("en-IN")}.`
        );
      }
    }

    if (nextFollowUpAt !== undefined) {
      const previousFollowUp = lead.nextFollowUpAt;
      lead.nextFollowUpAt = nextFollowUpAt || null;

      if (nextFollowUpAt && String(previousFollowUp || "") !== String(nextFollowUpAt)) {
        addActivity(
          lead,
          "follow_up",
          `Follow-up scheduled for ${new Date(nextFollowUpAt).toLocaleString("en-IN")}.`
        );
      } else if (!nextFollowUpAt && previousFollowUp) {
        addActivity(
          lead,
          "follow_up",
          "Follow-up cleared after contact."
        );
      }
    }

    await lead.save();

    res.json({ success: true, data: lead.toObject() });
  } catch (error) {
    console.error("UPDATE LEAD ERROR:", error);
    res.status(400).json({
      success: false,
      message: "Unable to update lead.",
    });
  }
};

exports.deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found.",
      });
    }

    res.json({
      success: true,
      message: "Lead deleted.",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Unable to delete lead.",
    });
  }
};


exports.convertLeadToProject = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found.",
      });
    }

    if (lead.convertedProjectId) {
      return res.status(409).json({
        success: false,
        message: "This lead has already been converted to a project.",
        projectId: lead.convertedProjectId,
      });
    }

    const Project = require("../models/Project");

    const body = req.body || {};
    const title = String(body.title || lead.company || lead.name || "New Project").trim();
    const baseSlug = String(body.slug || title)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 80);

    if (!baseSlug) {
      return res.status(400).json({
        success: false,
        message: "A valid project title is required.",
      });
    }

    let slug = baseSlug;
    let suffix = 2;
    while (await Project.exists({ slug })) {
      slug = `${baseSlug}-${suffix++}`;
    }

    const year = Number(body.year) || new Date().getFullYear();

    const project = await Project.create({
      title,
      slug,
      category: String(body.category || "OTHER").trim(),
      type: String(body.type || lead.service || "Website Project").trim(),
      client: String(body.client || lead.company || lead.name || "").trim(),
      year,
      shortDescription: String(
        body.shortDescription ||
        lead.projectGoal ||
        lead.message ||
        ""
      ).trim(),
      description: String(
        body.description ||
        lead.message ||
        lead.projectGoal ||
        ""
      ).trim(),
      challenge: String(body.challenge || "").trim(),
      solution: String(body.solution || "").trim(),
      result: String(body.result || "").trim(),
      technologies: Array.isArray(body.technologies)
        ? body.technologies.map(String).map((v) => v.trim()).filter(Boolean)
        : [],
      services: Array.isArray(body.services)
        ? body.services.map(String).map((v) => v.trim()).filter(Boolean)
        : lead.services
          ? String(lead.services).split(",").map((v) => v.trim()).filter(Boolean)
          : [],
      liveUrl: String(body.liveUrl || lead.websiteUrl || "").trim(),
      featured: Boolean(body.featured),
      status: body.status === "published" ? "published" : body.status === "in-progress" ? "in-progress" : "draft",
      coverImage: String(body.coverImage || "").trim(),
      images: Array.isArray(body.images) ? body.images : [],
    });

    lead.convertedProjectId = project._id;
    lead.convertedAt = new Date();
    lead.status = "won";
    addActivity(
      lead,
      "status_changed",
      `Lead converted to project "${project.title}".`
    );

    await lead.save();

    res.status(201).json({
      success: true,
      message: "Lead converted to project successfully.",
      data: {
        project,
        lead,
      },
    });
  } catch (error) {
    console.error("CONVERT LEAD ERROR:", error);
    res.status(400).json({
      success: false,
      message: error.message || "Unable to convert lead to project.",
    });
  }
};
