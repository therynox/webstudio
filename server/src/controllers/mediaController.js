const fs = require("fs");
const path = require("path");

const uploadRoot = path.resolve(__dirname, "../../uploads");
const allowedCategories = ["projects", "blog", "homepage", "other"];
const allowedExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg"]);

function ensureDirs() {
  for (const category of allowedCategories) {
    fs.mkdirSync(path.join(uploadRoot, category), { recursive: true });
  }
}

function safeCategory(value) {
  return allowedCategories.includes(value) ? value : "other";
}

function safeFileName(value) {
  if (typeof value !== "string") return "";
  return path.basename(value);
}

function fileMeta(category, filename) {
  const fullPath = path.join(uploadRoot, category, filename);
  const stat = fs.statSync(fullPath);
  const ext = path.extname(filename).toLowerCase();
  return {
    id: `${category}/${filename}`,
    category,
    filename,
    url: `/images/${category}/${filename}`,
    size: stat.size,
    modifiedAt: stat.mtime.toISOString(),
    type: ext.replace(".", "").toUpperCase(),
  };
}

async function collectUsage() {
  const usage = new Map();
  const add = (url, source) => {
    if (!url || typeof url !== "string") return;
    const normalized = url.split("?")[0].replace(/^https?:\/\/[^/]+/, "");
    if (!normalized.startsWith("/images/")) return;
    const key = normalized;
    const current = usage.get(key) || [];
    current.push(source);
    usage.set(key, current);
  };

  const Project = require("../models/Project");
  const Blog = require("../models/Blog");
  const Homepage = require("../models/Homepage");

  const [projects, blogs, homepage] = await Promise.all([
    Project.find({}).select("_id title slug coverImage images").lean(),
    Blog.find({}).select("_id title slug coverImage").lean(),
    Homepage.findOne({ singleton: "homepage" }).lean(),
  ]);

  projects.forEach((project) => {
    add(project.coverImage, { type: "project", id: String(project._id), title: project.title || "Untitled project", field: "cover" });
    (project.images || []).forEach((image, index) => {
      add(typeof image === "string" ? image : image?.url, {
        type: "project",
        id: String(project._id),
        title: project.title || "Untitled project",
        field: `gallery ${index + 1}`,
      });
    });
  });

  blogs.forEach((blog) => {
    add(blog.coverImage, { type: "blog", id: String(blog._id), title: blog.title || "Untitled article", field: "cover" });
  });

  add(homepage?.seo?.ogImage, { type: "homepage", id: "homepage", title: "Homepage", field: "SEO OG image" });

  return usage;
}

exports.listMedia = async (req, res) => {
  try {
    ensureDirs();
    // "all" is a real filter value, not a storage category.
    // Do not pass it through safeCategory(), otherwise it becomes "other"
    // and the All Media tab incorrectly shows zero/missing files.
    const requestedCategory = String(req.query.category || "all").toLowerCase();
    const category =
      requestedCategory === "all"
        ? "all"
        : safeCategory(requestedCategory);
    const search = String(req.query.search || "").trim().toLowerCase();
    const usage = await collectUsage();
    const result = [];

    for (const currentCategory of allowedCategories) {
      if (category !== "all" && currentCategory !== category) continue;
      const directory = path.join(uploadRoot, currentCategory);
      for (const filename of fs.readdirSync(directory)) {
        const ext = path.extname(filename).toLowerCase();
        if (!allowedExtensions.has(ext)) continue;
        if (search && !filename.toLowerCase().includes(search)) continue;
        try {
          const item = fileMeta(currentCategory, filename);
          item.usage = usage.get(item.url) || [];
          result.push(item);
        } catch {}
      }
    }

    result.sort((a, b) => new Date(b.modifiedAt) - new Date(a.modifiedAt));
    res.json({ success: true, count: result.length, data: result });
  } catch (error) {
    console.error("MEDIA LIST ERROR:", error);
    res.status(500).json({ success: false, message: "Unable to load media library." });
  }
};

exports.getMedia = async (req, res) => {
  try {
    ensureDirs();
    const rawId = String(req.params.id || "");
    const separatorIndex = rawId.indexOf("__");
    if (separatorIndex === -1) {
      return res.status(400).json({ success: false, message: "Invalid media identifier." });
    }
    const category = rawId.slice(0, separatorIndex);
    const filename = rawId.slice(separatorIndex + 2);
    const cleanCategory = safeCategory(category);
    const cleanFilename = safeFileName(filename);
    const fullPath = path.join(uploadRoot, cleanCategory, cleanFilename);
    if (!cleanFilename || !fs.existsSync(fullPath)) {
      return res.status(404).json({ success: false, message: "Media file not found." });
    }
    const usage = await collectUsage();
    const item = fileMeta(cleanCategory, cleanFilename);
    item.usage = usage.get(item.url) || [];
    res.json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: "Unable to load media details." });
  }
};


exports.replaceMedia = async (req, res) => {
  try {
    ensureDirs();

    const rawId = String(req.params.id || "");
    const separatorIndex = rawId.indexOf("__");

    if (separatorIndex === -1) {
      if (req.file?.path) {
        try { fs.unlinkSync(req.file.path); } catch {}
      }
      return res.status(400).json({
        success: false,
        message: "Invalid media identifier.",
      });
    }

    const category = rawId.slice(0, separatorIndex);
    const filename = rawId.slice(separatorIndex + 2);
    const cleanCategory = safeCategory(category);
    const cleanFilename = safeFileName(filename);
    const fullPath = path.join(uploadRoot, cleanCategory, cleanFilename);

    if (!cleanFilename || !fs.existsSync(fullPath)) {
      if (req.file?.path) {
        try { fs.unlinkSync(req.file.path); } catch {}
      }
      return res.status(404).json({
        success: false,
        message: "Original media file not found.",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please select an image to replace.",
      });
    }

    const Project = require("../models/Project");
    const Blog = require("../models/Blog");
    const Homepage = require("../models/Homepage");

    const oldUrl = `/images/${cleanCategory}/${cleanFilename}`;
    const newUrl = `/images/${cleanCategory}/${req.file.filename}`;

    // Find every database reference before changing anything.
    const [projects, blogs, homepage] = await Promise.all([
      Project.find({
        $or: [
          { coverImage: oldUrl },
          { "images.url": oldUrl },
        ],
      }),
      Blog.find({ coverImage: oldUrl }),
      Homepage.findOne({
        singleton: "homepage",
        "seo.ogImage": oldUrl,
      }),
    ]);

    const references = [];

    projects.forEach((project) => {
      if (project.coverImage === oldUrl) {
        references.push({
          type: "project",
          id: String(project._id),
          title: project.title || "Untitled project",
          field: "cover",
        });
      }

      (project.images || []).forEach((image, index) => {
        if (image?.url === oldUrl) {
          references.push({
            type: "project",
            id: String(project._id),
            title: project.title || "Untitled project",
            field: `gallery ${index + 1}`,
          });
        }
      });
    });

    blogs.forEach((blog) => {
      references.push({
        type: "blog",
        id: String(blog._id),
        title: blog.title || "Untitled article",
        field: "cover",
      });
    });

    if (homepage?.seo?.ogImage === oldUrl) {
      references.push({
        type: "homepage",
        id: "homepage",
        title: "Homepage",
        field: "SEO OG image",
      });
    }

    try {
      /*
       * Update every reference to the NEW URL.
       * The old file is deleted only after all database writes succeed.
       */

      for (const project of projects) {
        let changed = false;

        if (project.coverImage === oldUrl) {
          project.coverImage = newUrl;
          changed = true;
        }

        (project.images || []).forEach((image) => {
          if (image?.url === oldUrl) {
            image.url = newUrl;
            changed = true;
          }
        });

        if (changed) {
          await project.save();
        }
      }

      for (const blog of blogs) {
        if (blog.coverImage === oldUrl) {
          blog.coverImage = newUrl;
          await blog.save();
        }
      }

      if (homepage?.seo?.ogImage === oldUrl) {
        homepage.seo.ogImage = newUrl;
        await homepage.save();
      }

      // Database now points to the replacement, so the old file can safely go.
      fs.unlinkSync(fullPath);

      const replacement = fileMeta(cleanCategory, req.file.filename);
      replacement.usage = references;

      return res.json({
        success: true,
        message: references.length
          ? "Image replaced successfully. All existing references were updated."
          : "Image replaced successfully.",
        data: {
          old: {
            filename: cleanFilename,
            url: oldUrl,
            usage: references,
          },
          replacement,
          referencesUpdated: references.length,
        },
      });
    } catch (updateError) {
      /*
       * Roll back the uploaded replacement if any DB update fails.
       * The original image remains untouched.
       */
      try {
        if (req.file?.path && fs.existsSync(req.file.path)) {
          fs.unlinkSync(req.file.path);
        }
      } catch {}

      throw updateError;
    }
  } catch (error) {
    console.error("MEDIA REPLACE ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Unable to replace image. The original image was kept unchanged.",
    });
  }
};

exports.deleteMedia = async (req, res) => {
  try {
    ensureDirs();
    const rawId = String(req.params.id || "");
    const separatorIndex = rawId.indexOf("__");
    if (separatorIndex === -1) {
      return res.status(400).json({ success: false, message: "Invalid media identifier." });
    }
    const category = rawId.slice(0, separatorIndex);
    const filename = rawId.slice(separatorIndex + 2);
    const cleanCategory = safeCategory(category);
    const cleanFilename = safeFileName(filename);
    const fullPath = path.join(uploadRoot, cleanCategory, cleanFilename);
    if (!cleanFilename || !fs.existsSync(fullPath)) {
      return res.status(404).json({ success: false, message: "Media file not found." });
    }

    const usage = await collectUsage();
    const url = `/images/${cleanCategory}/${cleanFilename}`;
    const references = usage.get(url) || [];
    if (references.length) {
      return res.status(409).json({
        success: false,
        message: "This image is currently in use and cannot be deleted.",
        usage: references,
      });
    }

    fs.unlinkSync(fullPath);
    res.json({ success: true, message: "Media deleted successfully." });
  } catch (error) {
    console.error("MEDIA DELETE ERROR:", error);
    res.status(500).json({ success: false, message: "Unable to delete media." });
  }
};
