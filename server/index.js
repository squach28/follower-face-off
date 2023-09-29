import express from 'express'
const app = express()
const port = process.env.PORT || 4000
import authRouter from './routers/authRouter.js'


app.use('/auth', authRouter)

app.get('/', (req, res) => {
    res.send('hello world!')
})

app.get('/callback', (req, res) => {
    const code = req.query.code
    console.log(code)
    res.send('callback was successful!')
})

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})