const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstname: { type: String },
  lastname: { type: String },
  email: { type: String, unique: true },
  phone: { type: String },
  file: { type: String },
});

module.exports = mongoose.model('User', userSchema);
