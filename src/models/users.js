const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    validate: (val) => {
      if (val.length < 3) {
        throw new Error("Username must be at least 3 characters long");
      }
    },
    required: [true, "username is required"],
    unique: [true, "username already exists"],
  },
  email: {
    type: String,
    unique: [true, "email already exists"],
    required: [true, "email is required"],
  },
  password:{
    type: String,
    required: [true, "password is required"],
    validate: (val) => {
      if (val.length < 6) {
        throw new Error("Password must be at least 6 characters long");
      }
    }
  }
});

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;