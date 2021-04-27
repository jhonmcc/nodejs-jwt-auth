const express = require('express')

const app = express()
app.use(express.json())
// app.use(cors())

// rota inicial
app.get('/', (req, res, next) => {
    res.json({msg: 'server online'})
})

// simulando retorno de todos os clientes
app.get('/clientes', (req, res, next) => {
    res.json([{id: 1, nome: 'Jhon'}])
})


app.listen(3000)
console.log('server online')