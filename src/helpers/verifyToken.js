const jwt = require('jsonwebtoken')
const {isTokenBlacklisted}=require("../controllers/authController")

//middleware funcion for any route you want
module.exports = function (req, res, next) {
  try {
    const token = req.header("auth_token");
    isTokenBlacklisted(token)
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user=decodedToken
    next()
  } catch (err) {
    console.log(err.message)
    res.status(400).send('invalid token')
  }
  // const token = req.header("Authorization")
  // // if(!token) return res.status(401).send("access denied")
  // try{
  //   const verified = jwt.verify(token,process.env.TOKEN_SECRET)
  //   
  //   next()
  // }catch(err){
  //   res.status(400).send('invalid token')
  // }
}