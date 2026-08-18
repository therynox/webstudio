const express = require("express");

const controller = require("../controllers/seoPublicController");

const router = express.Router();

router.get("/sitemap.xml", controller.sitemap);

router.get("/robots.txt", controller.robots);

module.exports = router;