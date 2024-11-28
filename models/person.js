const mongoose = require("mongoose");
const { Schema } = mongoose;

const personSchema= new Schema ({
    fullName: {
        type: String,
        required: [true, "full name is required"],
      },
      age:{
        type: Number,
        required: [true, "age is required"]
      },
      favoriteFoods: { 
        type: [String], 
        required: [true, "favorite food is required"]
    }
})
//Création du model
const Person = mongoose.model("Person", personSchema);

module.exports = Person;