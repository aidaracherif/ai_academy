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
    
    exports.courses = (req, res) => {
        const level = req.query.level;
        const price = req.query.price;
      
        let filteredCourses = allCourses; // suppose que tu as une liste de cours
      
        if (level) {
          filteredCourses = filteredCourses.filter(c => c.level === level);
        }
      
        if (price) {
          filteredCourses = filteredCourses.filter(c => c.price === price);
        }
      
        res.render("courses", { courses: filteredCourses });
      };

      
    exports.contact = (req, res) => {
    res.render("contact", { pageTitle: "Contact" });
    };

    exports.subscriber = (req, res) => {
      res.render("subscriber");
    };
    
    exports.processContact = (req, res) => {
        const { name, email, course, message } = req.body;
      
        if (!name || !email) {
          req.session.error = "Veuillez remplir les champs obligatoires.";
          return res.redirect("/contact");
        }
      
        // Ici tu pourrais traiter ou stocker les données...
      
        req.session.success = "Votre message a bien été envoyé ! Merci de nous avoir contactés.";
        res.redirect("/contact");
      };
      
    
      