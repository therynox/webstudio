const express = require("express");
const multer = require("multer");
const path = require("path");
const crypto = require("crypto");
const fs = require("fs");

const uploadController = require("../controllers/uploadController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Upload Directory
|--------------------------------------------------------------------------
*/

const uploadDirectory = path.resolve(
  __dirname,
  "../../uploads/projects"
);

// Always make sure the destination exists before Multer writes files.
fs.mkdirSync(uploadDirectory, { recursive: true });

/*
|--------------------------------------------------------------------------
| Multer Storage
|--------------------------------------------------------------------------
*/

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    try {
      fs.mkdirSync(uploadDirectory, { recursive: true });
      cb(null, uploadDirectory);
    } catch (error) {
      cb(error);
    }
  },

  filename: (req, file, cb) => {
    const extension = path.extname(
      file.originalname
    ).toLowerCase();

    const originalName = path
      .basename(
        file.originalname,
        extension
      )
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const uniqueId =
      Date.now() +
      "-" +
      crypto
        .randomBytes(5)
        .toString("hex");

    const filename =
      `${originalName || "project-image"}-` +
      `${uniqueId}${extension}`;

    cb(null, filename);
  },
});

/*
|--------------------------------------------------------------------------
| File Filter
|--------------------------------------------------------------------------
*/

const fileFilter = (
  req,
  file,
  cb
) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
    "image/svg+xml",
  ];

  if (
    allowedTypes.includes(
      file.mimetype
    )
  ) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Only JPG, PNG, WEBP, GIF and SVG images are allowed."
      ),
      false
    );
  }
};

/*
|--------------------------------------------------------------------------
| Multer
|--------------------------------------------------------------------------
*/

const upload = multer({
  storage,

  fileFilter,

  limits: {
    fileSize: 10 * 1024 * 1024,
    files: 20,
  },
});

/*
|--------------------------------------------------------------------------
| POST /api/uploads
|--------------------------------------------------------------------------
|
| Frontend sends:
|
| FormData:
| files = image
|
*/

router.get(
  "/health",
  authMiddleware,
  uploadController.getMediaHealth
);

router.post(
  "/",
  authMiddleware,
  upload.array("files", 20),
  uploadController.uploadImages
);

/*
|--------------------------------------------------------------------------
| Multer Error Handler
|--------------------------------------------------------------------------
*/

router.use(
  (error, req, res, next) => {
    if (
      error instanceof multer.MulterError
    ) {
      return res.status(400).json({
        success: false,
        message:
          error.code ===
          "LIMIT_FILE_SIZE"
            ? "Image size cannot exceed 10MB."
            : error.message,
      });
    }

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    next();
  }
);

module.exports = router;