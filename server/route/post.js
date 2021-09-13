const express = require('express')
const route = express.Router()
const verifyToken = require('../middleware/auth')

const Post = require('../models/posts')

route.post('/', verifyToken, async (req, res) => {
    const { title, description, url, status } = req.body
    
    if (!title)
    {
        return res.status(400).json({
            success: false,
            message: 'title is required'
        })
    } else {
        try {
            const newPost = new Post({
                title,
                description,
                url: url.startsWith('https://') ? url : `https://${url}`,
                status: status || 'TO LEARN',
                user: req.userId
            })
    
            await newPost.save()
    
            res.json({success: true, message: 'happy learning', post: newPost})
        } catch (error) {
            console.log(error)
            res.status(500).json({
                success: false,
                message: 'server not found'
            })
        }
    }
    
})

route.get('/myposts', verifyToken, async (req, res) => {
    try {
        const posts = await Post.find({ user: req.userId }).populate('user', 'username')
        return res.json({
            success: true,
            posts
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'get posts failed'
        })
    }
})

route.put('/:id', verifyToken, async (req, res) => {
    const { title, description, url, status } = req.body

    if (!title)
        return res.status(400).json({
            success: false,
            message: 'title is required'
        })

    try {
        let updatePost = {
            title,
            description: description || '',
            url: url.startsWith('https://') ? url : `https://${url}`,
            status: status || 'TO LEARN',
        }
        
        const postUpdateCondition = { _id: req.params.id, user: req.userId }
        
        updatePost = await Post.findOneAndUpdate(postUpdateCondition, updatePost, { new: true })

        if (!updatePost)
            return res.status(401).json({ success: false, message: 'Post not found or user not found' })
        
        res.json({ success: true, message: 'Update post successfully !', post: updatePost})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'server not found'
        })
    }
})

route.delete('/:id', verifyToken, async (req, res) => {
    try {
        const postDeleteCondition = { _id: req.params.id, user: req.userId }
        const deletePost = await Post.findOneAndDelete(postDeleteCondition)

        if (!deletePost)
            return res.status(401).json({
                success: false,
                message: 'delete post failed'
            })
        res.json({
            success: true, 
            message: 'delete post successfully'
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