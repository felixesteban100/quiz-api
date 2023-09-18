require('dotenv').config()
require('express-async-errors')
import { Request, Response, NextFunction } from 'express';

// extra security package
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')

// importe the framework of nodejs (express)
const express = require('express')
const app = express()


// connect to Database
const connectToDB = require('./db/connect')
const authenticateUser = require('./middleware/authentication')

// routers 
const authRouter = require('./routes/auth')
const questionsRouter = require('./routes/questions')
const categoriesRouter = require('./routes/categories')

// error handler 
const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler')

// this is for deploying purposes
app.set('trust proxy', 1)

// Allow CORS requests from any origin with any method and headers
app.use((req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// using extra packages 
app.use(rateLimiter({
    window: 15 * 16 * 1000, // 15 minutes
    max: 100 // milit each IP to 100 request per windowMs
}))
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(xss())

app.use(express.static('src'))

// UI
app.get('/', (req: Request, res: Response) => {
    res.sendFile('index.html', { root: 'src' })
})

// routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/questions', authenticateUser, questionsRouter)
app.use('/api/v1/categories', authenticateUser, categoriesRouter)

//using own middleware
app.use(notFoundMiddleware)
app.use(errorMiddleware)

const port = process.env.PORT?.toString() || "5000";

async function start() {
    try {
        await connectToDB(process.env.MONGO_URI)
        app.listen(port, () => console.log(`http://localhost:${port}`))
    } catch (error) {
        console.log(error)
    }
}

start()

/* npm i bcryptjs cors dotenv express express-async-errors express-rate-limit helmet http-status-codes joi jsonwebtoken mongoose rate-limiter swagger-ui-express 
xss-clean yamljs */