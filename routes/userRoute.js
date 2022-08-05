import express from "express"
import User from '../models/user.js'
import valid from '../middlewares/validateUserName.js'
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import config from "config"
import userInformation from "../middlewares/userInfo.js"


const router = express.Router()

router.post('/user/register', async(req, res) =>{

    //validate leetcode handle
    let validated = await valid(req.body.leetcode) 
    if (validated["errors"]) return res.status(400).send(validated["errors"][0].message)


    //check if registerd before
    let user = await User.findOne({leetcode:req.body.leetcode});
    if (user) return res.status(400).send("leetcode already registered");

    else {
    //hash the password
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(req.body.password, salt);
    const userInfo = await userInformation(req.body.leetcode)
    
    //create a new user
     user = User({
        name:userInfo["data"]["matchedUser"].profile["realName"],
        email:req.body.email,
        password:hashed,
        leetcode:req.body.leetcode
    })
}

    //validate and register user
    try{
        const result = await user.save()

        //send token as a header
        const token = jwt.sign({username:user.leetcode},  config.get('jwtPrivateKey'))
        res.header('x-auth-token', token).status(201).send({name:result.name, username:result.leetcode});
    } catch(error){
        res.status(400).json({ message: error.message })
    }
})

//Login Route
router.post('/user/login', async(req, res) =>{

    //validate leetcode handle
    let validated = await valid(req.body.leetcode) 
    if (validated["errors"]) return res.status(400).send(validated["errors"][0].message)


    //check if registerd before
    let user = await User.findOne({leetcode:req.body.leetcode});
    if (!user) return res.status(400).send("leetcode username or password is not correct");

    else {
    //validate password and username
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) return res.status(400).send('leetcode username or password is not correct')
    const token = jwt.sign({username:user.leetcode}, config.get('jwtPrivateKey'))
    res.status(200).send(token)
}
})

export default router