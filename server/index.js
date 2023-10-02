import express from 'express'
const app = express()
const port = process.env.PORT || 4000
import artistRouter from './routers/artistRouter.js'
import cookieParser from 'cookie-parser'

app.use(cookieParser())
app.use('/artist', artistRouter)

app.get('/', (req, res) => {
    res.send('hello world!')
})

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})