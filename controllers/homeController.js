const courses = [
    {
    title: "Introduction à l'IA",
    description: "Découvrez les fondamentaux de l'intelligence artificielle.",
    price: 199,
    level: "Débutant"
    },
    {
    title: "Machine Learning Fondamental",
    description: "Apprenez les principes du machine learning et les algorithmes de base.",
    price: 299, 
    level: "Intermédiaire"
    },
    {
    title: "Deep Learning Avancé",
    description: "Maîtrisez les réseaux de neurones profonds et leurs applications.",
    price: 399,
    level: "Avancé"
    }
    ];

exports.index = (req, res) => {
    res.render("index", { pageTitle: "Accueil" });
    };

exports.faq = (req, res) => {
    res.render("faq", { pageTitle: "FAQ" });
    };

exports.about = (req, res) => {
    res.render("about", { pageTitle: "À propos" });
    };

// exports.contact = (req, res) => {
//       res.render("contact", { pageTitle: "Contact" });
//       };

exports.contact = (req, res) => {
  const successMessage = req.session.success || null;
  const errorMessage = req.session.error || null;

  // Efface les messages après les avoir affichés
  req.session.success = null;
  req.session.error = null;

  res.render("contact", {
      pageTitle: "Contact",
      successMessage,
      errorMessage
  });
};

exports.processContact = (req, res) => {
  const { name, email, course, message } = req.body;

  if (!name || !email || !course || !message) {
      req.session.error = "Veuillez remplir tous les champs obligatoires.";
      return res.redirect("/contact");
  }

  // Ici tu pourrais traiter ou stocker les données...

  req.session.success = "Votre message a bien été envoyé ! Merci de nous avoir contactés.";
  res.redirect("/contact");
};

    
exports.courses = (req, res) => {
        const level = req.query.level;
        const price = req.query.price;
      
        let filteredCourses = courses; // suppose que tu as une liste de cours
      
        if (level) {
          filteredCourses = filteredCourses.filter(c => c.level === level);
        }
      
        if (price) {
          filteredCourses = filteredCourses.filter(c => c.price === parseInt(price));
        }
        
      
        res.render("courses", { 
          pageTitle: "Nos cours",
          courses: filteredCourses 
        });
      };

      

exports.subscriber = (req, res) => {
      res.render("subscriber", { pageTitle: "Abonnes" });
    };
    

      
    
      