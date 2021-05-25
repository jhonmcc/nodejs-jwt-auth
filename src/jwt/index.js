const express = require('express')
const jwt = require('jsonwebtoken')
require('dotenv').config() //para injetar as variaveis de ambiente do arquivo .env

const app = express()
app.use(express.json())
// app.use(cors())

// use function to verify token 
function verifyJWT(req, res, next){
    const token = req.headers['x-access-token']
    if (!token) return res.status(401).json({auth: false, message: 'no token provided.'})

    jwt.verify(token, process.env.SECRET, function(err, decoded){
        if (err) return res.status(500).json({auth: false, message: 'Faile to authenticate'})

        // if all is ok save the request to use
        req.userId = decoded.id
        next()
    })
}

// rota inicial
app.get('/', (req, res, next) => {
    res.json({msg: 'server online'})
})

// simulando retorno de todos os clientes
app.get('/clientes', verifyJWT, (req, res, next) => {
    res.json([{id: 1, nome: 'Test'}])
})

// autenticacao
app.post('/login', (req, res, next) => {
    // teste de validacao e retorno do usuario pelo banco de dados 
    if (req.body.user === 'test' && req.body.pass === '123'){
        // auth ok
        const id = 1
        const token = jwt.sign({ id }, process.env.SECRET, {
            expiresIn: '2m'
        })
        return res.json({ auth: true, token: token })
    }

    res.status(401).json({ message: 'Login ou Senha invalidos'})
})

app.route('/logout', (req, res, next) => {
    res.json({ auth: false, token: null })
})

app.listen(3000)
console.log('server online')