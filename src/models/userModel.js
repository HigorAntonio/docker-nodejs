const bcrypt = require('bcryptjs');

const mongoose = require('../database');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: [true, 'User must have a username'],
    unique: true,
  },
  password: {
    type: String,
    require: [true, 'User must have a password'],
  },
});

userSchema.pre('save', function (next) {
  const hash = bcrypt.hashSync(this.password, 10);
  this.password = hash;

  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
