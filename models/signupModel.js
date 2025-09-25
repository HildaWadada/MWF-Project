const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const signupSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    trim: true,
  },
});


signupSchema.plugin(passportLocalMongoose,{
  usernameField:"email"
});
module.exports = mongoose.model('User', signupSchema);