const express = require("express");
const router = express.Router();
const controller = require("../controllers/homepageController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", controller.getHomepage);
router.get("/admin", authMiddleware, controller.getHomepage);
router.put("/admin", authMiddleware, controller.updateHomepage);

module.exports = router;
