const fs = require("fs");
const path = require("path");

/*
|--------------------------------------------------------------------------
| Upload Directory
|--------------------------------------------------------------------------
|
| Project:
| therynox-web-studio/
|
| server/
|   uploads/
|     projects/
|
*/

const uploadDirectory = path.resolve(
  __dirname,
  "../../uploads/projects"
);

/*
|--------------------------------------------------------------------------
| Ensure Directory Exists
|--------------------------------------------------------------------------
*/

const ensureUploadDirectory = () => {
  if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory, {
      recursive: true,
    });
  }
};

/*
|--------------------------------------------------------------------------
| POST /api/uploads
|--------------------------------------------------------------------------
*/

// =====================================================
// UPLOAD CONTROLLER
// =====================================================


exports.uploadImages = async (req, res) => {
  try {
    ensureUploadDirectory();

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No images uploaded.",
      });
    }

    // Never return a URL unless the physical file is actually present.
    const missingFiles = req.files.filter(
      (file) => !fs.existsSync(path.join(uploadDirectory, file.filename))
    );

    if (missingFiles.length > 0) {
      console.error("UPLOAD FILES MISSING AFTER MULTER:", missingFiles.map((file) => file.filename));

      return res.status(500).json({
        success: false,
        message: "Image upload completed without a saved file. Please try again.",
      });
    }

    const images = req.files.map((file, index) => ({
      url: `/images/projects/${file.filename}`,
      filename: file.filename,
      originalName: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
      order: index,
    }));

    console.log("UPLOADED IMAGES:", images);

    return res.status(201).json({
      success: true,
      message: "Images uploaded successfully.",
      data: images,
    });
  } catch (error) {
    console.error("UPLOAD IMAGES ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Image upload failed.",
    });
  }
};

// =====================================================
// MEDIA HEALTH / ADMIN AUDIT
// =====================================================

const normalizeLocalMediaPath = (value) => {
  if (typeof value !== "string") return "";
  const raw = value.trim();
  if (!raw || /^https?:\/\//i.test(raw) || raw.startsWith("blob:")) return "";
  return raw.replace(/^\/+/, "/");
};

const localFileFromMediaPath = (value) => {
  const raw = normalizeLocalMediaPath(value);
  if (!raw.startsWith("/images/projects/")) return null;

  const filename = raw.replace(/^\/images\/projects\//, "");
  if (!filename || filename.includes("..") || filename.includes("/") || filename.includes("\\")) {
    return null;
  }

  return {
    url: `/images/projects/${filename}`,
    filename,
    path: path.join(uploadDirectory, filename),
  };
};

exports.getMediaHealth = async (req, res) => {
  try {
    ensureUploadDirectory();

    const Project = require("../models/Project");

    const diskFiles = fs.readdirSync(uploadDirectory)
      .filter((name) => {
        try {
          return fs.statSync(path.join(uploadDirectory, name)).isFile();
        } catch {
          return false;
        }
      })
      .map((filename) => ({
        filename,
        url: `/images/projects/${filename}`,
        size: fs.statSync(path.join(uploadDirectory, filename)).size,
      }));

    const projects = await Project.find({})
      .select("_id title slug coverImage images")
      .lean();

    const references = [];
    const missing = [];

    const inspectReference = (project, type, value, index = null) => {
      const local = localFileFromMediaPath(value);
      if (!local) return;

      const item = {
        projectId: String(project._id),
        projectTitle: project.title || "Untitled project",
        slug: project.slug || "",
        type,
        index,
        url: local.url,
        filename: local.filename,
        exists: fs.existsSync(local.path),
      };

      references.push(item);
      if (!item.exists) missing.push(item);
    };

    projects.forEach((project) => {
      inspectReference(project, "cover", project.coverImage);

      if (Array.isArray(project.images)) {
        project.images.forEach((image, index) => {
          inspectReference(
            project,
            "gallery",
            typeof image === "string" ? image : image?.url,
            index
          );
        });
      }
    });

    res.json({
      success: true,
      data: {
        summary: {
          files: diskFiles.length,
          references: references.length,
          missing: missing.length,
          healthy: references.length - missing.length,
        },
        files: diskFiles,
        missing,
      },
    });
  } catch (error) {
    console.error("MEDIA HEALTH ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Unable to audit project media.",
    });
  }
};
