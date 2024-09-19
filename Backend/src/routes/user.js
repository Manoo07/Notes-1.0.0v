const { User } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { signupBody } = require('../validations/signUpValidation');
const router = require(".");

router.post('/signup', async(req,res)=>{
    const {success} = signupBody.safeParse(req.body)
    if(!success){
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    // db call 
    const existingUser = await User.findOne({
        username: req.body.username
    })

    if (existingUser) {
        return res.status(411).json({
            message: "Email already taken/Incorrect inputs"
        })
    }

    // db call 
    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })

    const user_id = user.id;

    const token = jwt.sign({
        user_id
    },JWT_SECRET)
    return res.status(200).json({
        token : token,
        message: "User created successfully",
    })
})

