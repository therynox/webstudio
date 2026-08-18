const express = require("express");
const router = express.Router();

const blogController = require("../controllers/blogController");
const authMiddleware = require("../middleware/authMiddleware");

// Admin
router.get("/admin/all", authMiddleware, blogController.getAdminBlogs);
router.get("/admin/meta", authMiddleware, blogController.getAdminMeta);
router.get("/admin/:id", authMiddleware, blogController.getAdminBlog);
router.post("/admin", authMiddleware, blogController.createBlog);
router.put("/admin/:id", authMiddleware, blogController.updateBlog);
router.delete("/admin/:id", authMiddleware, blogController.deleteBlog);

// Public
router.get("/", blogController.getBlogs);
router.get("/:slug", blogController.getBlog);

module.exports = router;
