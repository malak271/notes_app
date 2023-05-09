const router=require('express').Router()
const User=require("../models/User")
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const {registerValidation,loginValidation}= require("../helpers/validation")

const blacklist = new Set();

function addToBlacklist(token) {
  blacklist.add(token);
}

module.exports.isTokenBlacklisted= (token) =>{
  if (blacklist.has(token)) {
    console.log("token in blacklist")
    return res.status(401).send({ message: 'Invalid token' });
  }
}

module.exports.register=async(req,res)=>{

  //validate data before send 
  // const {error}=schema.validate(req.body)
  const {error}=registerValidation(req.body)
  if(error)
  return res.status(400).send(error.details[0].message)

  //check if user already exist
  const emailExist= await User.findOne({email: req.body.email})
  if(emailExist) return res.status(400).send("email already exist")

  //hash the password
  const salt= await bcrypt.genSalt(10);
  const hashPass=await bcrypt.hash(req.body.password,salt)
  req.body.password=hashPass

  try{
      const savedUser= await User.create(req.body)
      res.status(200).send(savedUser);
  }catch(err){
      res.status(400).send(err)
  }

}

module.exports.login=async (req,res)=>{
  
  //check if email  exist
  const user= await User.findOne({email: req.body.email})
  if(!user) return res.status(400).send("email or password is wrong")
  
  //check if password is correct
  const validPass= await bcrypt.compare(req.body.password,user.password)
  if(!validPass) return res.status(400).send("email or password is wrong")

  //create and assign a token 
  const token=jwt.sign({_id:user._id},process.env.TOKEN_SECRET, {algorithm: "HS256"})
  res.header('auth_token',token).send(token)
}

module.exports.logout = async (req, res) => {
  // const authHeader = req.header("Authorization");
  // const token = authHeader.split(' ')[1];
  const token = req.header("auth_token");
  addToBlacklist(token)
  res.status(200).send("ok")
};
