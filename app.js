require('dotenv').config();// chargement des variable d'environement avec dotenv
const mongoose = require("mongoose"); //Chargement de Mongoose pour interagir avec MongoDB
const persone= require('./models/persone.js'); //Chargement du modèle contact
mongoose.connect(process.env.MONGO_URI,{ //Connexion à MongoDB avec Mongoose

})
.then(()=>{ // Gestion des promesses avec .then() et .catch() 
    console.log('connected to mongo db');
})
.catch((err)=>{
    console.error('error connecting to mongo db', err);
})

const createAndSavePerson = async () => {
    const person = new persone({
      fullName: 'omar',
      age: 25,
      favoriteFoods: ['couscous', 'jelbana'],
    });
  
    try {
        const savedPerson = await person.save();
        console.log("Multiple contacts saved:", savedPerson);
      } catch (err) {
        console.error("Error saving person:", err);
      }
  };
  const createManyPersons = async () => {
    const arrayOfPeople = [
      { fullName: "Zeineb Saadouli", age: 30, favoriteFoods: ["Sushi", "Salad"] },
      {
        fullName: "saleh kr",
        age: 21,
        favoriteFoods: ["Couscous", "Crepes"],
      },
      { fullName: "nesrine tb", age: 21, favoriteFoods: ["Steak", "Pasta"] },
    ];
  
    try {
      const persons = await persone.create(arrayOfPeople);
      console.log("Multiple people created:", persons);
    } catch (err) {
      console.error("Error saving mutiple persons:", err);
    }
  };

  const findPersonsByName = async (name) => {
    try {
      const person = await persone.find({ fullName: name });
      console.log("Person found:", persone);
    } catch (err) {
      console.error("Error Person not found:", err);
    }
  };

// Recherche une personne ayant un aliment spécifique dans ses plats préférés
const findOneByFood = async (food) => {
  try {
    // Utilisation de findOne pour trouver une correspondance unique
    const person = await persone.findOne({ favoriteFoods: food });
    return persone; // Retourne la personne trouvée
  } catch (err) {
    console.error("Erreur lors de la recherche :", err);
    throw err; // Propagation de l'erreur à l'appelant
  }
};



// Recherche une personne par son ID
const findById = async (personId) => {
  try {
    // Utilise findById pour rechercher une correspondance unique
    const person = await persone.findById(personId);
    return person; // Retourne la personne trouvée
  } catch (err) {
    console.error("Erreur lors de la recherche par ID :", err);
    throw err; // Propage l'erreur à l'appelant
  }
};



const findEditThenSave = async (personId) => {
  try {
    const person = await persone.findById(personId);
    person.favoriteFoods.push('Hamburger');
    const updatedPerson = await person.save();
    console.log('Person updated:', updatedPerson);
  } catch (err) {
    console.error('Error updating person:', err);
  }
};
  
  const findAndUpdate = (personName, done) => {
    persone.findOneAndUpdate(
      { fullName: personName },
      { age: 20 },
      { new: true },
      (err, updatedPerson) => {
        if (err) return console.error(err);
        done(null, updatedPerson);
      }
    );
  };

  const removeById = (personId, done) => {
    persone.findByIdAndRemove(personId, (err, removedPerson) => {
      if (err) return console.error(err);
      done(null, removedPerson);
    });
  };

  
  const removeManyPeople = (done) => {
    persone.deleteMany({ name: 'Mary' }, (err, result) => {
      if (err) return console.error(err);
      done(null, result);
    });
  };

  
  const queryChain = (done) => {
    persone.find({ favoriteFoods: 'burritos' })
      .sort({ name: 1 })
      .limit(2)
      .select('-age')
      .exec((err, data) => {
        if (err) return console.error(err);
        done(null, data);
      });
  };
  
  // createAndSavePerson();
  // createManyPersons();
  // findPersonsByName('nesrine tb');
  findOneByFood(`Steak`);
  // findById('673ddd50c841e8798487800f');
  // findEditThenSave('674745500dd7eea6530a8ef3');