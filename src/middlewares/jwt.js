const jwt = require('jsonwebtoken')
const jwtKey = global.configs.jwtKey

function signJWT(data, options = {}){

    let token = jwt.sign(data, jwtKey, options)

    return token

}

function verifyJWT(req, res, next){

    const token = req.cookies.jwt

    if(!token) return res.status(401).json({ auth: false, message: 'Sem Login'})
    
    jwt.verify(token, jwtKey, function(err, decoded) {
        
        if (err){

            return res.status(500).json({ auth: false, message: 'Login Expirado'})

        }
      
        // console.log('Decoded', decoded)

        next()

    })

}

module.exports = {
    signJWT,
    verifyJWT
}