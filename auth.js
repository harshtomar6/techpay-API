// Dependencies
const jwt = require('jwt-simple');

// Generate Token
let generateToken = user => {
  let expires = expiresIn(7);
  let token = jwt.encode({
    exp: expires
  }, process.env.SECRET);

  return {
    token,
    key: user._id,
    expires,
    user 
  }
}

let expiresIn = (num) => {
  let date = new Date();
  return date.setDate(date.getDate() + num);
}

module.exports = {
  generateToken,
  expiresIn
}