const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {

    const notes = await Blog
        .find({}).populate('user', {username: 1, name: 1})

    response.json(notes)
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body

    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({error: 'token missing or invalid'})
    }
    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response, next) => {
    const blog = await Blog.findById(request.params.id).populate('user')

    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({error: 'token missing or invalid'})
    }
    if (decodedToken.id != blog.user.id) {
        return response.status(401).json({error: 'no permission to delete the blog'})
    }

    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response, next) => {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, {
        ...request.body,
        user: request.body.user.id
    }, {new: true})
    response.json(updatedBlog.populate('user', {username: 1, name: 1}))
})

module.exports = blogsRouter