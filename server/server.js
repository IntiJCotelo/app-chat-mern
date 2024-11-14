import express from 'express'
import dotenv from 'dotenv'

import authRoutes from './routes/auth.routes.js'

const app = express()

dotenv.config()

const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

// routes

app.use('/api/auth', authRoutes)


// routes


app.listen(3000, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})