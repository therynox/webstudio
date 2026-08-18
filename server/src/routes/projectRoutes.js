const express = require("express");

const router = express.Router();

const projectController = require("../controllers/projectController");

const authMiddleware = require("../middleware/authMiddleware");

// =====================================================
// PUBLIC ROUTES
// =====================================================

router.get(
  "/",
  projectController.getProjects
);

router.get(
  "/:slug",
  projectController.getProject
);

// =====================================================
// ADMIN ROUTES
// =====================================================

router.get(
  "/admin/all",
  authMiddleware,
  projectController.getAdminProjects
);

router.get(
  "/admin/:id",
  authMiddleware,
  projectController.getAdminProject
);

router.post(
  "/admin",
  authMiddleware,
  projectController.createProject
);

router.put(
  "/admin/:id",
  authMiddleware,
  projectController.updateProject
);

router.delete(
  "/admin/:id",
  authMiddleware,
  projectController.deleteProject
);

module.exports = router;