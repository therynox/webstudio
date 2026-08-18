const express = require("express");
const router = express.Router();
const leadController = require("../controllers/leadController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", leadController.createLead);
router.get("/admin/all", authMiddleware, leadController.getAdminLeads);
router.get("/admin/stats", authMiddleware, leadController.getLeadStats);
router.patch("/admin/:id", authMiddleware, leadController.updateLead);
router.delete("/admin/:id", authMiddleware, leadController.deleteLead);

module.exports = router;
router.post("/admin/:id/convert", authMiddleware, leadController.convertLeadToProject);
