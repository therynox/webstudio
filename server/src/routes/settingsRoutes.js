const express = require("express");
const router = express.Router();

const controller = require("../controllers/settingsController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", controller.getSettings);
router.get("/admin", authMiddleware, controller.getSettings);
router.put("/admin", authMiddleware, controller.updateSettings);

module.exports = router;
