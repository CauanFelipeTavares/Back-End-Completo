const express = require('express')
const app = express()

const bodyParser = require('body-parser')

const path = process.cwd()

app.use(express.static(`${path}/src/design`))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const porta = 3000

app.get('/', (req, res) => {

    res.sendFile(`${path}/src/design/pages/home.html`)

})

app.post('/login', (req, res) => {

    console.log(req.body)

    res.send('Login')

})

app.post('/register', (req, res) => {

    console.log(req.body)

    res.send('Register')
    
})

app.listen(porta, () => {

    console.log('Servidor Rodando')

})