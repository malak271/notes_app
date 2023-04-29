const jwt=require('jsonwebtoken')

//middleware funcion for any route you want
module.exports=function(req,res,next){
  const token = req.header("auth_token")
  if(!token) return res.status(401).send("access denied")
  try{
    const verified = jwt.verify(token,process.env.TOKEN_SECRET)
    req.user=verified
    next()
  }catch(err){
    res.status(400).send('invalid token')
  }
}