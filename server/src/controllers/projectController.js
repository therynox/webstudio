const Project = require("../models/Project");

// =====================================================
// HELPERS
// =====================================================

const isBlobUrl = (value) => {
  return (
    typeof value === "string" &&
    value.startsWith("blob:")
  );
};

// =====================================================
// CLEAN COVER IMAGE
// =====================================================

const cleanCoverImage = (value) => {
  if (!value) {
    return "";
  }

  if (typeof value !== "string") {
    return "";
  }

  const url = value.trim();

  // Never save temporary browser blob URLs
  if (isBlobUrl(url)) {
    return "";
  }

  return url;
};

// =====================================================
// CLEAN PROJECT GALLERY
// =====================================================

const cleanProjectImages = (images) => {
  if (!Array.isArray(images)) {
    return [];
  }

  return images
    .map((image, index) => {
      // ---------------------------------------------
      // STRING FORMAT
      //
      // "/images/projects/test.png"
      // ---------------------------------------------

      if (typeof image === "string") {
        const url = image.trim();

        if (!url) {
          return null;
        }

        // Old temporary blob URL
        if (isBlobUrl(url)) {
          return null;
        }

        return {
          url,
          caption: "",
          order: index,
        };
      }

      // ---------------------------------------------
      // OBJECT FORMAT
      //
      // {
      //   url: "...",
      //   caption: "...",
      //   order: 0
      // }
      // ---------------------------------------------

      if (
        image &&
        typeof image === "object"
      ) {
        const url =
          typeof image.url === "string"
            ? image.url.trim()
            : "";

        if (!url) {
          return null;
        }

        // Never save blob URLs
        if (isBlobUrl(url)) {
          return null;
        }

        return {
          url,

          caption:
            typeof image.caption ===
            "string"
              ? image.caption.trim()
              : "",

          order: index,
        };
      }

      return null;
    })
    .filter(Boolean);
};

// =====================================================
// PREPARE PROJECT DATA
// =====================================================

const prepareProjectData = (
  body
) => {
  const data = {
    ...body,
  };

  // ---------------------------------------------
  // COVER
  // ---------------------------------------------

  data.coverImage =
    cleanCoverImage(
      body.coverImage
    );

  // ---------------------------------------------
  // GALLERY
  // ---------------------------------------------

  data.images =
    cleanProjectImages(
      body.images
    );

  // ---------------------------------------------
  // TECHNOLOGIES
  // ---------------------------------------------

  if (
    typeof body.technologies ===
    "string"
  ) {
    data.technologies =
      body.technologies
        .split(",")
        .map((item) =>
          item.trim()
        )
        .filter(Boolean);
  } else if (
    Array.isArray(
      body.technologies
    )
  ) {
    data.technologies =
      body.technologies
        .map((item) =>
          String(item).trim()
        )
        .filter(Boolean);
  }

  // ---------------------------------------------
  // SERVICES
  // ---------------------------------------------

  if (
    typeof body.services ===
    "string"
  ) {
    data.services =
      body.services
        .split(",")
        .map((item) =>
          item.trim()
        )
        .filter(Boolean);
  } else if (
    Array.isArray(body.services)
  ) {
    data.services =
      body.services
        .map((item) =>
          String(item).trim()
        )
        .filter(Boolean);
  }

  return data;
};

// =====================================================
// PUBLIC
// =====================================================

// GET /api/projects
exports.getProjects = async (
  req,
  res
) => {
  try {
    const { category } =
      req.query;

    // Public portfolio includes published case studies and projects currently in progress.
    // Draft projects remain private.
    const filter = {
      status: { $in: ["published", "in-progress"] },
    };

    if (
      category &&
      category !== "ALL"
    ) {
      filter.category =
        category;
    }

    const projects =
      await Project.find(filter)
        .sort({
          featured: -1,
          createdAt: -1,
        })
        .lean();

    res.json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    console.error(
      "GET PUBLIC PROJECTS ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch projects",
    });
  }
};

// =====================================================
// GET PUBLIC PROJECT
// =====================================================

// GET /api/projects/:slug
exports.getProject = async (
  req,
  res
) => {
  try {
    const project =
      await Project.findOne({
        slug: req.params.slug,
        status: { $in: ["published", "in-progress"] },
      }).lean();

    if (!project) {
      return res.status(404).json({
        success: false,
        message:
          "Project not found",
      });
    }

    res.json({
      success: true,
      data: project,
    });
  } catch (error) {
    console.error(
      "GET PUBLIC PROJECT ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch project",
    });
  }
};

// =====================================================
// ADMIN
// =====================================================

// GET /api/projects/admin/all
exports.getAdminProjects =
  async (req, res) => {
    try {
      const {
        category,
        status,
        search,
      } = req.query;

      const filter = {};

      if (
        category &&
        category !== "ALL"
      ) {
        filter.category =
          category;
      }

      if (
        status &&
        status !== "ALL"
      ) {
        filter.status =
          status;
      }

      if (search) {
        filter.$or = [
          {
            title: {
              $regex: search,
              $options: "i",
            },
          },
          {
            client: {
              $regex: search,
              $options: "i",
            },
          },
          {
            category: {
              $regex: search,
              $options: "i",
            },
          },
        ];
      }

      const projects =
        await Project.find(filter)
          .sort({
            featured: -1,
            createdAt: -1,
          })
          .lean();

      res.json({
        success: true,
        count: projects.length,
        data: projects,
      });
    } catch (error) {
      console.error(
        "GET ADMIN PROJECTS ERROR:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Failed to fetch admin projects",
      });
    }
  };

// =====================================================
// GET ADMIN PROJECT
// =====================================================

// GET /api/projects/admin/:id
exports.getAdminProject =
  async (req, res) => {
    try {
      const project =
        await Project.findById(
          req.params.id
        ).lean();

      if (!project) {
        return res.status(404).json({
          success: false,
          message:
            "Project not found",
        });
      }

      res.json({
        success: true,
        data: project,
      });
    } catch (error) {
      console.error(
        "GET ADMIN PROJECT ERROR:",
        error
      );

      res.status(400).json({
        success: false,
        message:
          "Invalid project ID",
      });
    }
  };

// =====================================================
// CREATE
// =====================================================

// POST /api/projects/admin
exports.createProject =
  async (req, res) => {
    try {
      const data =
        prepareProjectData(
          req.body
        );

      const project =
        await Project.create(
          data
        );

      res.status(201).json({
        success: true,
        message:
          "Project created successfully",
        data: project,
      });
    } catch (error) {
      console.error(
        "CREATE PROJECT ERROR:",
        error
      );

      res.status(400).json({
        success: false,
        message:
          error.message,
      });
    }
  };

// =====================================================
// UPDATE
// =====================================================

// PUT /api/projects/admin/:id
exports.updateProject =
  async (req, res) => {
    try {
      const data =
        prepareProjectData(
          req.body
        );

      const project =
        await Project.findByIdAndUpdate(
          req.params.id,
          data,
          {
            new: true,
            runValidators: true,
          }
        );

      if (!project) {
        return res.status(404).json({
          success: false,
          message:
            "Project not found",
        });
      }

      res.json({
        success: true,
        message:
          "Project updated successfully",
        data: project,
      });
    } catch (error) {
      console.error(
        "UPDATE PROJECT ERROR:",
        error
      );

      res.status(400).json({
        success: false,
        message:
          error.message,
      });
    }
  };

// =====================================================
// DELETE
// =====================================================

// DELETE /api/projects/admin/:id
exports.deleteProject =
  async (req, res) => {
    try {
      const project =
        await Project.findByIdAndDelete(
          req.params.id
        );

      if (!project) {
        return res.status(404).json({
          success: false,
          message:
            "Project not found",
        });
      }

      res.json({
        success: true,
        message:
          "Project deleted successfully",
      });
    } catch (error) {
      console.error(
        "DELETE PROJECT ERROR:",
        error
      );

      res.status(400).json({
        success: false,
        message:
          "Invalid project ID",
      });
    }
  };