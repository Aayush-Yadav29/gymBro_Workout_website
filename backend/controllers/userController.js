const User = require('../models/Users')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' })
}


// login a user
const loginUser = async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await User.login(email, password)

    // create a token
    const token = createToken(user._id)
    if(user == 'All fields must be filled'){
      let msg = 'All fields must be filled'
      res.json({msg})
    }
    else if(user == 'Incorrect password'){
      let msg = 'Incorrect password'
      res.json({msg})
    }
    else if(user == 'Incorrect email'){
      let msg = 'Incorrect email'
      res.json({msg})
    }
    else{
        let msg = 'valid'
        res.status(200).json({msg,email, token})
    }

  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// signup a user
const signupUser = async (req, res) => {
  // console.log(req.body);
  const { email, password } = req.body

  try {
    // console.log("trying",email,password);
    const user = await User.signup(email, password)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({ email, token })
  } catch (error) {
    console.log("error");
    res.status(400).json({ error: error.message })
  }
}

module.exports = { loginUser, signupUser }