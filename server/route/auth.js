const express = require('express')
const route = express.Router()
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const verifyToken = require('../middleware/auth')

const User = require('../models/user')

//Check Login
route.get('/', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password')
        if (!user) return res.status(400).json({ success: false, message: 'User not found' })
        res.json({success: true, user})
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'server not found'
        })
    }
})

// register
route.post('/register', async (req, res) => {
    const { username, password } = req.body

    if (!username || !password)
        return res.status(400).json({
            success: false,
            message: 'Missing username or password'
        })
    
    try {
        const user = await User.findOne({ username })

        if (user)
            return res.status(400).json({
                success: false,
                message: 'User already exists'
            })
        
        const hashPassword = await argon2.hash(password)
        const newUser = new User({
            username: username,
            password: hashPassword
        })
        await newUser.save()

        // Token
        const accessToken = jwt.sign({
            userId: newUser._id
        }, process.env.ACCESS_TOKEN_SECRET)

        res.json({
            success: true,
            message: 'Register account successfully',
            accessToken
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'server not found'
        })
    }
})

// login
route.post('/login', async (req, res) => {
    const { username, password } = req.body
    
    if (!username || !password)
        return res.status(400).json({
            success: false,
            message: 'Missing username or password'
        })
    
    try {
        const user = await User.findOne({ username })
        
        if (!user)
            return res.status(400).json({
                success: false,
                message: 'Username false'
            })
        
        const passwordValid = await argon2.verify(user.password, password)
        if (!passwordValid)
            return res.status(400).json({
                success: false,
                message: 'Password false'
            })
        
        // Token
        const accessToken = jwt.sign({
            userId: user._id
        }, process.env.ACCESS_TOKEN_SECRET)

        res.json({
            success: true,
            message: 'Login user successfully',
            accessToken
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'server not found'
        })
    }
})

module.exports = route