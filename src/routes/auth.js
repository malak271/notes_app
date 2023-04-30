const router=require('express').Router()
const AuthController=require("../controllers/authController")
const verify=require('../helpers/verifyToken')


router.post('/register',AuthController.register);

router.post('/login',AuthController.login)

module.exports=router;
//router.:instead of app. , by require('express').Router()
