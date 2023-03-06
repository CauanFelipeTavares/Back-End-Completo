const express = require('express')
const router = express.Router()

const path = process.cwd()

const bodyParser = require('body-parser')

router.use(express.static(`${path}/src/design`))
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

const { signJWT, verifyJWT } = require('../middlewares/jwt')

router.post('/login', (req, res) => {

    let usuario = req.body.usuario
    let senha = req.body.senha

    const objLogin = {
        usuario: usuario,
        senha: senha
    }

    const token = signJWT(objLogin, {
        expiresIn: '10s'
    })

    res.cookie('jwt', token)

    res.redirect('/api/jwt')

})

router.get('/jwt', verifyJWT, (req, res) => { 

    res.json([{auth: true, token: req.cookies}])

})

router.post('/register', (req, res) => {

    console.log(req.body)

    res.send('Register')
    
})

module.exports = app => app.use('/api', router)