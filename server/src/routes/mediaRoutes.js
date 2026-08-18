const express = require("express");
const multer = require("multer");
const path = require("path");
const crypto = require("crypto");
const fs = require("fs");

const controller = require("../controllers/mediaController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();
const uploadRoot = path.resolve(__dirname, "../../uploads");
const categories = new Set(["projects", "blog", "homepage", "other"]);

function getCategory(req) {
  return categories.has(req.body?.category) ? req.body.category : "other";
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const category = getCategory(req);
    const dir = path.join(uploadRoot, category);
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const base = path.basename(file.originalname, ext)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "image";
    const id = `${Date.now()}-${crypto.randomBytes(5).toString("hex")}`;
    cb(null, `${base}-${id}${ext}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];
    if (allowed.includes(file.mimetype)) return cb(null, true);
    cb(new Error("Only JPG, PNG, WEBP, GIF and SVG images are allowed."));
  },
  limits: { fileSize: 10 * 1024 * 1024, files: 30 },
});

router.get("/", authMiddleware, controller.listMedia);
router.get("/detail/:id", authMiddleware, controller.getMedia);
router.post("/", authMiddleware, upload.array("files", 30), (req, res) => {
  const category = getCategory(req);
  const data = (req.files || []).map((file, index) => ({
    id: `${category}/${file.filename}`,
    category,
    filename: file.filename,
    url: `/images/${category}/${file.filename}`,
    originalName: file.originalname,
    mimeType: file.mimetype,
    size: file.size,
    order: index,
  }));
  if (!data.length) return res.status(400).json({ success: false, message: "No images uploaded." });
  res.status(201).json({ success: true, message: "Images uploaded successfully.", data });
});
router.put("/:id", authMiddleware, upload.single("file"), controller.replaceMedia);
router.delete("/:id", authMiddleware, controller.deleteMedia);

router.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    return res.status(400).json({ success: false, message: error.code === "LIMIT_FILE_SIZE" ? "Image size cannot exceed 10MB." : error.message });
  }
  if (error) return res.status(400).json({ success: false, message: error.message });
  next();
});

module.exports = router;
