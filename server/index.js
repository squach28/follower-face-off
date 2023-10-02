import express from 'express'
const app = express()
const port = process.env.PORT || 4000
import artistRouter from './routers/artistRouter.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const corsOption = {
    origin: true,
    optionsSuccessStatus: 200,
    credentials: true
}
app.use(cookieParser())
app.use(cors(corsOption))

app.use('/artist', artistRouter)

app.get('/', (req, res) => {
    res.send('hello world!')
})

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})