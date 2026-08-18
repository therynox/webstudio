require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

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


// =====================================================
// CORS
// =====================================================

const allowedOrigins = [
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "https://therynox-webstudio.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without Origin
      // Example: Postman, curl, server-to-server
      if (!origin) {
        return callback(null, true);
      }

      // Exact allowed domains
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // Vercel preview deployment
      if (
        /^https:\/\/webstudio-[a-z0-9-]+-therynoxnoreplay-3740s-projects\.vercel\.app$/i.test(
          origin
        )
      ) {
        return callback(null, true);
      }

      // Other Vercel preview URLs
      if (
        /^https:\/\/webstudio-[a-z0-9-]+\.vercel\.app$/i.test(
          origin
        )
      ) {
        return callback(null, true);
      }

      console.warn("CORS blocked origin:", origin);

      return callback(
        new Error(`CORS blocked origin: ${origin}`)
      );
    },

    credentials: true,

    methods: [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
      "OPTIONS",
    ],

    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
  })
);


// =====================================================
// BODY PARSER
// =====================================================

app.use(
  express.json({
    limit: "10mb",
  })
);


// =====================================================
// DATABASE
// =====================================================

connectDatabase();


// =====================================================
// STATIC IMAGE FILES
// =====================================================

const publicDirectory = path.resolve(
  __dirname,
  "../../public"
);

const imageDirectory = path.join(
  publicDirectory,
  "images"
);

fs.mkdirSync(
  path.join(imageDirectory, "projects"),
  {
    recursive: true,
  }
);


// =====================================================
// UPLOADED IMAGES
// =====================================================

const uploadedImagesDirectory = path.resolve(
  __dirname,
  "../uploads"
);

fs.mkdirSync(
  path.join(uploadedImagesDirectory, "projects"),
  {
    recursive: true,
  }
);


// =====================================================
// IMAGE ROUTES
// =====================================================

// New uploaded images
app.use(
  "/images",
  express.static(uploadedImagesDirectory)
);


// Legacy public images
app.use(
  "/images",
  express.static(imageDirectory)
);


// Safe fallback when backend is launched
// from another working directory
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

app.get(
  "/api/health/images",
  (req, res) => {
    const projectsDirectory = path.join(
      imageDirectory,
      "projects"
    );

    res.json({
      success: true,
      directory: projectsDirectory,
      exists: fs.existsSync(
        projectsDirectory
      ),
      files: fs.existsSync(
        projectsDirectory
      )
        ? fs.readdirSync(
            projectsDirectory
          )
        : [],
    });
  }
);


// =====================================================
// API HEALTH
// =====================================================

app.get(
  "/api/health",
  (req, res) => {
    res.json({
      success: true,
      message: "THERYNOX API is running",
    });
  }
);


// =====================================================
// ROUTES
// =====================================================

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/projects",
  projectRoutes
);

app.use(
  "/api/blogs",
  blogRoutes
);

app.use(
  "/api/uploads",
  uploadRoutes
);

app.use(
  "/api/leads",
  leadRoutes
);

app.use(
  "/api/homepage",
  homepageRoutes
);

app.use(
  "/api/settings",
  settingsRoutes
);

app.use(
  "/api/media",
  mediaRoutes
);

app.use(
  "/api/seo",
  seoRoutes
);


// =====================================================
// SERVER
// =====================================================

app.listen(
  PORT,
  () => {
    console.log(
      `Server running on http://localhost:${PORT}`
    );

    console.log(
      `Images available at http://localhost:${PORT}/images`
    );
  }
);