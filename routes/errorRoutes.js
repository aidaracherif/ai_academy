const express = require("express");
const router = express.Router();

// Attrape toutes les erreurs 404
router.use((req, res) => {
  res.status(404);
  res.render("error", { 
    pageTitle: "Page Introuvable", 
    errorMessage: "La page que vous recherchez n'existe pas." 
  });
});

module.exports = router;
