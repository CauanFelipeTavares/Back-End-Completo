const express = require('express')
const app = express()

const bodyParser = require('body-parser')

const path = process.cwd()

app.use(express.static(`${path}/src/design`))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const jwt = require('jsonwebtoken')
require('./src/config/index')

const jwtKey = global.configs.jwtKey

const cookieParser = require('cookie-parser')
app.use(cookieParser())

const porta = 3000

app.get('/', (req, res) => {

    res.sendFile(`${path}/src/design/pages/home.html`)

})

app.post('/login', (req, res) => {

    let usuario = req.body.usuario
    let senha = req.body.senha

    const objLogin = {
        usuario: usuario,
        senha: senha
    }

    const token = jwt.sign(objLogin, jwtKey, {
        expiresIn: '10s'
    })

    res.cookie('jwt', token)

    res.redirect('/jwt')

})

app.get('/jwt', verifyJWT, (req, res, next) => { 

    console.log('object', req.cookies)

    res.json([{id:1,nome:'abc'}])

})

app.post('/register', (req, res) => {

    console.log(req.body)

    res.send('Register')
    
})

app.listen(porta, () => {

    console.log('Servidor Rodando')

})

// Functions 

function verifyJWT(req, res, next){

    const token = req.cookies.jwt

    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, jwtKey, function(err, decoded) {
      if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
      
      req.userId = decoded.id

      next()
    })

}