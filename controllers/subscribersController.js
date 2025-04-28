const Subscriber = require("../models/subscriber");

exports.getAllSubscribers = (req, res, next) => {
  
  Subscriber.find({})
    .exec()
    .then(subscribers => {
      console.log("Voici les abonnés trouvés :", subscribers);
      res.render("subscribers/index",{ pageTitle: "Liste des abonnés", subscribers: subscribers });
    })
    .catch(error => {
      console.log(`Erreur lors de la récupération des abonnés: ${error.message}`);
      next(error);
    });
};

exports.getSubscriptionPage = (req, res) => {
  res.render("subscribers/new", {
    pageTitle: "S'abonner",
    formData: {
      name: "",
      email: "",
      zipCode: ""
    },
    validationErrors: []
  });
};


exports.saveSubscriber = (req, res) => {
  let newSubscriber = new Subscriber({
    name: req.body.name,
    email: req.body.email,
    zipCode: req.body.zipCode
  });
  newSubscriber.save()
    .then(result => {
      res.render("subscribers/thanks", {
        pageTitle: "Merci pour votre abonnement",
        subscriber: result
      });
    })
    .catch(error => {
      res.status(500).send(error.message);
    });
};

exports.show = (req, res, next) => {
  let subscriberId = req.params.id;
  Subscriber.findById(subscriberId)
    .then(subscriber => {
      res.render("subscribers/show", {
        subscriber: subscriber
      });
    })
    .catch(error => {
      console.log(`Erreur lors de la récupération d'un abonné par ID: ${error.message}`);
      next(error);
    });
};
