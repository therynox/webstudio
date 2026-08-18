require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const connectDatabase = require("./config/database");

const projectRoutes = require("./routes/projectRoutes");
const blogRoutes = require("./routes/blogRoutes");
const authRoutes = require("./routes/authRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const leadRoutes = require("./routes/leadRoutes");
const homepageRoutes = require("./routes/homepageRoutes");
const settingsRoutes = require("./routes/settingsRoutes");
const mediaRoutes = require("./routes/mediaRoutes");
const seoRoutes = require("./routes/seoRoutes");

const app = express();

const PORT = process.env.PORT || 5000;

connectDatabase();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json({ limit: "10mb" }));

// =====================================================
// STATIC IMAGE FILES
// =====================================================

const publicDirectory = path.resolve(
  __dirname,
  "../../public"
);

const fs = require("fs");

const imageDirectory = path.join(
  publicDirectory,
  "images"
);

fs.mkdirSync(path.join(imageDirectory, "projects"), {
  recursive: true,
});

const uploadedImagesDirectory = path.resolve(
  __dirname,
  "../uploads"
);

fs.mkdirSync(path.join(uploadedImagesDirectory, "projects"), {
  recursive: true,
});

// New uploads live outside the CRA public/ directory so
// writing an image cannot trigger the React dev-server reload.
app.use(
  "/images",
  express.static(uploadedImagesDirectory)
);

// Legacy images remain available from public/images.
app.use(
  "/images",
  express.static(imageDirectory)
);

// Safe fallback when the backend is launched from the project root.
const rootImageDirectory = path.resolve(
  __dirname,
  "../../public/images"
);

if (rootImageDirectory !== imageDirectory) {
  app.use(
    "/images",
    express.static(rootImageDirectory)
  );
}

// =====================================================
// IMAGE HEALTH
// =====================================================

app.get("/api/health/images", (req, res) => {
  const projectsDirectory = path.join(imageDirectory, "projects");

  res.json({
    success: true,
    directory: projectsDirectory,
    exists: fs.existsSync(projectsDirectory),
    files: fs.existsSync(projectsDirectory)
      ? fs.readdirSync(projectsDirectory)
      : [],
  });
});

// =====================================================
// HEALTH
// =====================================================

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "THERYNOX API is running",
  });
});

// =====================================================
// ROUTES
// =====================================================

app.use("/api/auth", authRoutes);

app.use("/api/projects", projectRoutes);
app.use("/api/blogs", blogRoutes);

app.use("/api/uploads", uploadRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/homepage", homepageRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/media", mediaRoutes);
app.use("/api/seo", seoRoutes);

// =====================================================
// SERVER
// =====================================================

app.listen(PORT, () => {
  console.log(
    `Server running on http://localhost:${PORT}`
  );

  console.log(
    `Images available at http://localhost:${PORT}/images`
  );
});