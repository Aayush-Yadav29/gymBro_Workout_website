const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const UserSchema = mongoose.Schema({
    // name : {
    //     type : String,
    //     // required : true
    // },
    email: {
        type : String,
        required : true,
        unique : true
    },
    password: {
        type : String,
        required : true,
        unique : true
    }

},{timestamps : true});
// const User = mongoose.model("User",UserSchema);

// static signup method
UserSchema.statics.signup = async function(email, password) {
    // console.log("static.signup")
    // validation
    if (!email || !password) {
      return ('All fields must be filled')
    }
    // if (!validator.isEmail(email)) {
    //   throw Error('Email not valid')
    // }
    // if (!validator.isStrongPassword(password)) {
    //   throw Error('Password not strong enough')
    // }
  
    const exists = await this.findOne({ email })
  
    if (exists) {
      return ('Email already in use')
    }
  
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
  
    const user = await this.create({ email, password: hash })
  
    return user
}

// static login method
UserSchema.statics.login = async function(email, password) {

    if (!email || !password) {
      // throw Error('All fields must be filled')
      return ('All fields must be filled')
    }
  
    const user = await this.findOne({ email })
    if (!user) {
      // throw Error('Incorrect email')
      return ('Incorrect email')
    }
  
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      // throw Error('Incorrect password')
      return ('Incorrect password')
    }
  
    return user
  }
module.exports = mongoose.model("User",UserSchema);