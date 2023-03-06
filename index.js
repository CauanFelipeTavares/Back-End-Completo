require('./src/config/index')

const express = require('express')
const app = express()

const cookieParser = require('cookie-parser')
app.use(cookieParser())

const porta = 3000

require('./src/routes/api.js')(app)
require('./src/routes/index.js')(app)

app.listen(porta, () => {

    console.log('Servidor Rodando')

})