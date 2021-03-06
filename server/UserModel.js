const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  name: String
});

module.exports = mongoose.model('User', UserSchema);
