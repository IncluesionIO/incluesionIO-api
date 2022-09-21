const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    enum: ['ADMIN', 'USER'],
    default: 'USER'
  },
  accountStatus: {
    type: Boolean,
    required: true,
    default: true
  },
  resetToken: {
    type: String,
    required: false
  },
  resetTokenExpiration: {
    type: Date,
    required: false
  }
})

//Before saving, check if the password has been changed
userSchema.pre('save', function(next)
{
  var user = this
  //run only if the password has been modified or new
  if(!user.isModified('password')) return next();

  bcrypt.hash(user.password, 12, (err, hash) =>
  {
    //Go to next middleware if error
    if(err) return next(err)
    //Save new hashed password
    user.password = hash
    next()
  })
})

//Password comparison
/**
 * Use this function to compare the password from an input, to what is stored in the DB.
 * @param {String} inputPass The input password.
 * @param {userSchema~requestCallback} cb The callback function to be performed after the password is checked.
 */
userSchema.methods.comparePassword = function(inputPass, cb)
{
  bcrypt.compare(inputPass, this.password, (err, isMatch) =>
  {
    if(err) return cb(err)
    cb(null, isMatch)
  })
}

/**
 * This callback should handle the return from the comparePassword method.
 * @callback userSchema~requestCallback
 * @param {Error} err Error object.
 * @param {boolean} isMatch Boolean result for password matching.
 */

module.exports = mongoose.model('User', userSchema)