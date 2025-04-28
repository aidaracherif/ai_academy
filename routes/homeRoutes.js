const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");

// Page d'accueil
router.get("/", homeController.index);

// (Optionnel) Page Contact
router.get("/contact", homeController.contact);
// router.post("/contact", homeController.processContact, homeController.redirectView);

// (Optionnel) Page À propos
router.get("/about", homeController.about);

module.exports = router;
