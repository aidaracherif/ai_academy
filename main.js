const express = require("express");
const layouts = require("express-ejs-layouts");
const mongoose = require("mongoose"); // Ajout de Mongoose
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");

const homeController = require("./controllers/homeController");
const errorController = require("./controllers/errorController");
const subscribersController = require("./controllers/subscribersController");
const usersController = require("./controllers/usersController");
const coursesController = require("./controllers/coursesController");
const authController = require("./controllers/authController");

// Configuration de la connexion à MongoDB
mongoose.connect(
  "mongodb://localhost:27017/ai_academy",
  { useNewUrlParser: true,
    useUnifiedTopology: true,
  }
  
  
);
const db = mongoose.connection;
db.once("open", () => {
  console.log("Connexion réussie à MongoDB en utilisant Mongoose!");
});

const app = express();
const path = require("path"); // ajoute ce require en haut avec les autres
app.set("views", path.join(__dirname, "views"));
app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(layouts);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride("_method", {
  methods: ["POST", "GET"]
}));

// Configuration des cookies et des sessions
app.use(cookieParser("secret_passcode"));
app.use(session({
  secret: "secret_passcode",
  cookie: {
    maxAge: 4000000
  },
  resave: false,
  saveUninitialized: false
}));

// Configuration de flash messages
app.use(flash());

// Configuration de Passport
app.use(passport.initialize());
app.use(passport.session());

// Configuration du User model pour Passport
const User = require("./models/user");
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Middleware pour rendre les variables locales disponibles dans toutes les vues
app.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  res.locals.loggedIn = req.isAuthenticated();
  res.locals.currentUser = req.user;
  next();
});

// Routes pour les pages principales
app.get("/", homeController.index);
app.get("/about", homeController.about);
app.get("/courses", homeController.courses);
app.get("/contact", homeController.contact);
app.post("/contact", homeController.processContact);
app.get("/faq", homeController.faq);

// Routes d'authentification
app.get("/login", authController.login);
app.post("/login", authController.authenticate);
app.get("/logout", authController.logout, authController.redirectView);
app.get("/signup", authController.signup);
app.post("/signup", authController.register, authController.redirectView);

// Routes pour les abonnés
app.get("/subscribers", authController.ensureLoggedIn, subscribersController.getAllSubscribers);
app.get("/subscribers/new", subscribersController.getSubscriptionPage);
app.post("/subscribers/create", subscribersController.saveSubscriber);
app.get("/subscribers/:id", subscribersController.show);

// Routes pour les utilisateurs
app.get("/users", authController.ensureLoggedIn, usersController.index, usersController.indexView);
app.get("/users/new", authController.ensureLoggedIn, usersController.new);
app.post("/users/create", authController.ensureLoggedIn, usersController.create, usersController.redirectView);
app.get("/users/:id", authController.ensureLoggedIn, usersController.show, usersController.showView);
app.get("/users/:id/edit", authController.ensureLoggedIn, usersController.edit);
app.put("/users/:id/update", authController.ensureLoggedIn, usersController.update, usersController.redirectView);
app.delete("/users/:id/delete", authController.ensureLoggedIn, usersController.delete, usersController.redirectView);

// Routes pour les cours
app.get("/courses", coursesController.index, coursesController.indexView);
app.get("/courses/new", coursesController.new);
app.post("/courses/create", coursesController.create, coursesController.redirectView);
app.get("/courses/:id", coursesController.show, coursesController.showView);
app.get("/courses/:id/edit", coursesController.edit);
app.put("/courses/:id/update", coursesController.update, coursesController.redirectView);
app.delete("/courses/:id/delete", coursesController.delete, coursesController.redirectView);

// Routes protégées - accessibles uniquement aux utilisateurs connectés
// app.use("/users", authController.ensureLoggedIn);
// app.use("/courses/new", authController.ensureLoggedIn);
// app.use("/courses/:id/edit", authController.ensureLoggedIn);

// Gestion des erreurs
app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

app.use((req, res, next) => {
  console.log(`Route non trouvée: ${req.path}`);
  res.status(404).send(`Route non trouvée: ${req.path}`);
});

// Démarrer le serveur
app.listen(app.get("port"), () => {
  console.log(`Le serveur a démarré et écoute sur le port: ${app.get("port")}`);
  console.log(`Serveur accessible à l'adresse: http://localhost:${app.get("port")}`);
});
