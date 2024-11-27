const mongoose = require("mongoose");
const { Schema } = mongoose;
const personeSchema = new Schema({
    fullName: {
      type: String,
      required: [true, "full name is required"],
    },
    age: {
        type: String,
        required: [true, "age is required"],
      },
      favoriteFoods: { 
        type: [String], 
        required: [true, "favorite food is required"]
    },
    
})

const persone = mongoose.model("persone", personeSchema);

module.exports = persone;

