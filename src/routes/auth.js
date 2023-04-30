const router=require('express').Router()
const AuthController=require("../controllers/authController")
const verify=require('../helpers/verifyToken')


router.post('/register',AuthController.register);

router.post('/login',AuthController.login)

<<<<<<< HEAD
module.exports=router;



//router.:instead of app. , by require('express').Router()
=======
router.post('/logout',verify,AuthController.logout)


module.exports=router;
>>>>>>> 28ff63f81129a7386d238e7a9531393415eb6523
