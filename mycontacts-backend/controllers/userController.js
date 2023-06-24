const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

//@desc Register a user
//@route POST /api/user/register
//@access Public
const registerUser = asyncHandler(async(req,res) => {
    const { username, email, password } = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All fields are required");
    }
    const userAvailable = await User.findOne({ email });
    if(userAvailable){
        res.status(400);
        throw new Error("User already exists");
    }

    // Hash password
    const hashPassword = await bcrypt.hash(password, 10);
    console.log('Hash Password:',hashPassword);
    const user = await User.create({
        username,
        email,
        password: hashPassword
    });
    console.log(`User ${user} created`);
    if(user){
        res.status(201).json({
            _id: user._id,
            email: user.email
        })
    }else{
        res.status(400);
        throw new Error("Invalid user data");
    }
});

//@desc Login user
//@route POST /api/user/login
//@access Public
const loginUser = asyncHandler(async(req,res) => {
    const { email, password } = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are required");
    }
    const user = await User.findOne({ email });
    // compare password with hash password
    if(user && (await bcrypt.compare(password, user.password))){
        // create token
        const accessToken = jwt.sign({
            user:{
                username: user.username,
                email: user.email,
                id: user._id
            }
        }, 
        process.env.ACCESS_TOKEN_SECRET, 
        {expiresIn: '30m'}
        );
    res.status(200).json({ accessToken });
    }else{
        res.status(401);
        throw new Error("Invalid email or password");
    }
});

//@desc Current user
//@route POST /api/user/current
//@access Public
const currentUser = asyncHandler((req,res) => {
    try{
        const user = req.user;
        res.status(200).json(user);
    }catch(err){
        res.status(401);
        throw new Error("Not authorized, no token");
    }
});

module.exports = { registerUser, loginUser, currentUser };