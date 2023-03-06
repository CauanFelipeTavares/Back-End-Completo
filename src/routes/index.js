const express = require('express')
const router = express.Router()

const path = process.cwd()

const bodyParser = require('body-parser')

router.use(express.static(`${path}/src/design`))
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

router.get('/', (req, res) => {

    res.sendFile(`${path}/src/design/pages/home.html`)

})

router.get('/*', (req, res) => {

    res.send({code: 404, message: 'pagina não encontrada'})

})

module.exports = app => app.use('/', router)