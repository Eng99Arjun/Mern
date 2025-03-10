const express = require("express");
const zod = require("zod");
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware");

const router = express.Router();

// Signup  -----------------------------------------------------------------------------------------------
const signupSchema = zod.object({
    username: zod.string().email(),
    firstName:zod.string(),
    lastName:zod.string(),
    password: zod.string()
})

router.post('/Signup', async(req, res) => {
    const {success} = signupSchema.safeParse(req.body)
    if(!success){
        return res.status(411).json({
            message:"Incorrect inputs"
        })
    }
    const existingUser = await User.findOne({
        username:req.body.username
    })
    if(existingUser){
        return res.status(411).json({
            message:"Email already exists"
        })
    }
    
    const user = await User.create({
        username:req.body.username,
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        password:req.body.password
    })
    
    const userId = user._id;

    // --- create new Account for the user

    await Account.create({
        userId,
        balance: 1 + Math.floor(Math.random() * 1000)
    })

    //----------------------------------------------------------

    const token = jwt.sign({
        userId
    },JWT_SECRET);

    res.json({
        message:"User created successfully",
        token:token
    })
});
//----------------------------------------------------------
// Sign in
const signinSchema = zod.object({
    username: zod.string().email(),
    password: zod.string()
})

router.post('/signin', async(req, res) => {
    const {success} = signinSchema.safeParse(req.body)
    if(!success){
        return res.status(411).json({
            message:"Incorrect inputs"
        })
    }

    const user = await User.findOne({
        username:req.body.username,
        password:req.body.password
    })
    if(user){
        const token = jwt.sign({
            userId:user._id
        },JWT_SECRET);
        res.json({
            token:token
        })
        return;
    }
    res.status(401).json({
        message:"Error while logging in"
    })

})

// Update Router -----------------------------------------------------------------------------------------------

const updateSchema = zod.object({
    firstName:zod.string(),
    lastName:zod.string(),
    password: zod.string()
});

router.put('/update', authMiddleware, async(req, res) => {
    const {success} = updateSchema.safeParse(req.body)
    if(!success){
        return res.status(411).json({
            message:"Error while updating"
        })
    }   
    await User.updateOne( req.body, {
        id: req.userId
    })
    res.json({
        message:"User updated successfully"
    })

})

// fetch users-----------------------------------------------------------------------------------------------

router.get('/bulk', authMiddleware, async(req, res) => {
    const filter = req.query.filter || "";
    const users = await User.find({
        $or: [{
            firstName:{
                "$regex":filter
            }
        },{
            lastName:{
                "$regex":filter
            }
        }]
    });
    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            id: user._id           
        }))
})
})

module.exports = router;