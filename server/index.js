const express = require('express')
const mongoose = require('mongoose')
const authRoute = require('./route/auth')
const postRoute = require('./route/post')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()

const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mern-stact.yfzor.mongodb.net/MERN-stact?retryWrites=true&w=majority`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        console.log('ket noi den DB thanh cong')
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

connectDB()

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(cors())

app.use('/api/auth', authRoute)
app.use('/api/post', postRoute)
const port = process.env.PORT || 5000

app.listen(port, () => console.log('server is running on port ' + port))