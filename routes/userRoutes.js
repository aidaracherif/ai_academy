const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const authController = require("../controllers/authController");

// // Routes publiques (accessibles même sans être connecté)
// router.get("/signup", authController.signup);        // Formulaire d'inscription
// router.post("/register", authController.register, authController.redirectView); // Enregistrement utilisateur
// router.get("/login", authController.login);           // Formulaire de connexion
// router.post("/login", authController.authenticate);   // Traitement de connexion
// router.get("/logout", authController.logout, authController.redirectView); // Déconnexion

// router.get("/login", authController.login);
// router.post("/login", authController.authenticate);
// router.get("/logout", authController.logout, authController.redirectView);
// router.get("/signup", authController.signup);
// router.post("/signup", authController.register, authController.redirectView)

// Protéger toutes les routes suivantes
router.use(authController.ensureLoggedIn);

// Routes protégées (CRUD utilisateurs)
router.get("/", usersController.index, usersController.indexView);
router.get("/:id", usersController.show, usersController.showView);
router.get("/:id/edit", usersController.edit);
router.put("/:id/update", usersController.update, usersController.redirectView);
router.delete("/:id/delete", usersController.delete, usersController.redirectView);

module.exports = router;
