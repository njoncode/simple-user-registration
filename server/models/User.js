const mongoose = require('mongoose');
const validator = require('validator');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Please supply a name',
        trim: true
    },
    email: {
        type: String,
        unique: true,
        lowerCase: true,
        trim: true,
        validate: [validator.isEmail, 'Invalid Email Address'],
        required: 'Please supply an email address'
    },
    password: {
        type: String,
      },
    confirmPassword: {
        type: String,
      },
}, {timestamps: true});

// plugin for passport-local-mongoose
userSchema.plugin(passportLocalMongoose, { usernameField: 'email', session: false });  //  Disable sessions as we'll use JWTs


// exporting the userSchema
module.exports = mongoose.model('User', userSchema)


/**
 * passportLocalMongoose plugin exposes us to a method called .register,
   which is gonna take care of all lower-level registration for us.
 */