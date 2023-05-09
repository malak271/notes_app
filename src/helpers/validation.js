//validation
const joi=require("@hapi/joi")

//register validation
const registerValidation=(data)=>{
const schema=joi.object({
    name: joi.string().min(6).required(),
    email:joi.string().min(6).required().email(),
    //TODO: add regex
    password: joi.string().min(6).required(),
});
return schema.validate(data)
}

//login validation
const loginValidation=(data)=>{
    const schema=joi.object({
        email:joi.string().min(6).required().email(),
        // TODO: add regex
        password: joi.string().min(6).required(),
    });
    return schema.validate(data)
    }

module.exports.registerValidation=registerValidation;
module.exports.loginValidation=loginValidation;
