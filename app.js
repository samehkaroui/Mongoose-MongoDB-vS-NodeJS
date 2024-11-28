require("dotenv").config(); // chargement des variable d'environement avec dotenv
const mongoose = require("mongoose"); //Chargement de Mongoose pour interagir avec MongoDB
const Person = require("./models/person"); //Chargement du modèle contact

// Connect to MongoDB using the connection string in .env
mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

//create one person
const createAndSavePerson = async () => {
  const person = new Person({
    fullName: "Sameh Karoui",
    age: 25,
    favoriteFoods: ["Pizza", "Spaghetti"],
  });

  try {
    const savedPerson = await Person.save();
    console.log("Multiple contacts saved:", savedPerson);
  } catch (err) {
    console.error("Error saving person:", err);
  }
};

//create many people
const createManyPersons = async () => {
  const arrayOfPeople = [
    { fullName: "Zeineb Saadouli", age: 30, favoriteFoods: ["Sushi", "Salad"] },
    {fullName: "Omar Barhoumi",age: 21,favoriteFoods: ["Couscous", "Crepes"]},
    { fullName: "Nesrine Teyeb", age: 22, favoriteFoods: ["Steak", "Pasta"] },
    { fullName: "Mohamed Salah", age: 34, favoriteFoods: ["Burritos", "Lasagne"] },
  ];

  try {
    const persons = await Person.create(arrayOfPeople);
    console.log("Multiple people created:", persons);
  } catch (err) {
    console.error("Error saving mutiple persons:", err);
  }
};

//find Person by Name
const findPersonsByName = async (name) => {
  try {
    const person = await Person.find({ fullName: name });
    console.log("Person found:", person);
  } catch (err) {
    console.error("Error Person not found:", err);
  }
};


//find by favorite food
const findByFavouriteFood = async (food) => {
  try {
    const person = await Person.findOne({ favoriteFoods: food });
    console.log("Person found by favourite food:", person);
  } catch (err) {
    console.error("Error finding person by favourite food:", err);
  }
};

//find Person by id
const findPersonById = async (personId) => {
  try {
    const person = await Person.findById(personId);
    console.log("Person found by id :", person);
  } catch (err) {
    console.error("Error Person not found by id:", err);
  }
};

//find edit and save
const findEditThenSave = async (personId) => {
  try {
    const person = await Person.findById(personId);
    person.favoriteFoods.push('Hamburger');
    const updatedPerson = await person.save();
    console.log('Person updated:', updatedPerson);
  } catch (err) {
    console.error('Error updating person:', err);
  }
};

//findOneAndUpdate
const findOneAndUpdate = async (personName,newage) =>{
  try {
    const updatedPerson = await Person.findOneAndUpdate(
      { fullName: personName },
      { age: newage },
      { new: true }
    );
    console.log('Person updated:', updatedPerson);
  } catch (err) {
    console.error('Error updating person by name:', err);
  }
}

//delete une personne par ID
const deletePersonById = async (personId) =>{
  try {
    const deletedPerson = await Person.findByIdAndDelete(personId);
    console.log('Person deleted:', deletedPerson);
  } catch (err) {
    console.error('Error deleted person by id:', err);
  }
}

//Remove many persons par ID
const deleteManyPersons= async (name) =>{
  try {
    const deletedPersons = await Person.deleteMany({fullName: name});
    console.log('Person deleted:', deletedPersons);
  } catch (err) {
    console.error('Error removing people:', err);
  }
}

//Chain Search Query Helpers to Narrow Results
const chainSearch= async (food) =>{
  try {
    const people = await Person.find({ favoriteFoods: food })
      .sort({ name: 1 }) // Tri par nom
      .limit(2)          // Limite à 2 résultats
      .select('-age')    // Exclut le champ `age`
      .exec();
    console.log('People matching query:', people);
  } catch (err) {
    console.error('Error with chained search:', err);
  }

}






createAndSavePerson()
createManyPersons();
findPersonsByName("Sameh Karoui");
findByFavouriteFood("Sushi")
findPersonById('67473e7c05e3970cb5507327')
findEditThenSave('67473e7c05e3970cb5507327')
findAndUpdate('Zeineb Saadouli', 31);
deletePersonById('67473e7c05e3970cb5507327')
deleteManyPersons('Nesrine Teyeb', "Sameh Karoui")
chainSearch('Burritos');