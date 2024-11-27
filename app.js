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
  const createManyPeople = (arrayOfPeople, done) => {   // Utilisation de la méthode Model.create() pour insérer plusieurs documents.
    persone.create(arrayOfPeople, (err, people) => {
      if (err) return console.error(err);
      done(null, people);
    });
  };

  const findPeopleByName = (personName, done) => {
    persone.find({ fullName: personName }, (err, people) => {
      if (err) return console.error(err);
      done(null, people);
    });
  };
  
  const findOneByFood = (food, done) => {
    persone.findOne({ favoriteFoods: food }, (err, person) => {
      if (err) return console.error(err);
      done(null, person);
    });
  };
  const FindByID = (id , done) => {
    persone.findById( id , (err, person ) => {
        if (err) return console.error(err);
        done(null, person)

    })
  };


  const findEditThenSave = (personId, done) => {
    persone.findById(personId, (err, person) => {
      if (err) return console.error(err);
  
      persone.favoriteFoods.push('hamburger');
      persone.save((err, updatedPerson) => {
        if (err) return console.error(err);
        done(null, updatedPerson);
      });
    });
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
  
  createAndSavePerson();
  
  