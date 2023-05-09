//validation
const joi=require("@hapi/joi")

//register validation
const registerValidation=(data)=>{
const schema=joi.object({
    name: joi.string().min(6).required(),
    email:joi.string().min(6).required().email(),
    //password length between 6 to 20 characters, at least one numeric digit, one uppercase and one lowercase letter
    password: joi
            .string()
            .pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,}$/))
            .message('Password must be >= 7 digits, contains at least one numeric digit, one uppercase and one lowercase letter')
            .required(),
});
return schema.validate(data)
}

module.exports.registerValidation=registerValidation;
