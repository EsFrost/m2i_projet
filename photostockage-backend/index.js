const express = require('express')
const app = express()
const cors = require('cors')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const userRoute =require('./routes/userRoute')
const photoRoute = require('./routes/photoRoute')
const categoriesRoute = require('./routes/categoriesRoute')
const likesRoute = require('./routes/likesRoute')
const downloadsRoute = require('./routes/downloadsRoute')
const commentsRoute = require('./routes/commentsRoute')

app.use(express.json())
app.use(helmet())
app.use(cors({
    origin: 'http://localhost:3000'
}))

const limiter = rateLimit({
    windowsMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)    
})

app.use(limiter)

app.use('/user', userRoute)
app.use('/photos', photoRoute)
app.use('/categories', categoriesRoute)
app.use('/likes', likesRoute)
app.use('/downloads', downloadsRoute)
app.use('/comments', commentsRoute)

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})