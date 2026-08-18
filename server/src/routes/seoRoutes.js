const express = require("express");
const router = express.Router();

const controller = require("../controllers/seoController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/public/:type/:reference", controller.getPublic);
router.get("/admin", authMiddleware, controller.getAdmin);
router.get("/", authMiddleware, controller.list);
router.put("/", authMiddleware, controller.upsert);

module.exports = router;
