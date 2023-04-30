const router=require('express').Router()
const AuthController=require("../controllers/authController")
const verify=require('../helpers/verifyToken')


router.post('/register',AuthController.register);

router.post('/login',AuthController.login)

router.post('/logout',verify,AuthController.logout)


module.exports=router;