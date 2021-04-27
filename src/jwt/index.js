const express = require('express')

const app = express()
app.use(express.json())
// app.use(cors())

// rota inicial
app.get('/', (req, res, next) => {
    res.json({msg: 'server online'})
})

app.listen(3000)
console.log('server online')