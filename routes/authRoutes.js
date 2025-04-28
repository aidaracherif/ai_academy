const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Routes d'authentification
router.get("/login", authController.login);         // Formulaire login
router.post("/login", authController.authenticate); // Traitement login
router.get("/logout", authController.logout, authController.redirectView); // Déconnexion
router.get("/signup", authController.signup);       // Formulaire signup
router.post("/register", authController.register, authController.redirectView); // Enregistrement nouvel utilisateur

module.exports = router;
