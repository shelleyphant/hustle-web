if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors(
    {
        origin: 'http://localhost:3000',
        credentials: true
    }
))

const port = process.env.PORT || 5000
const db = require('./connection')

db.connection((error) => {
    if(error){ 
        console.log('no database connection' + error)
        process.exit(1)
    } else {
        app.listen(port, () => {
            console.log(`Listening at http://localhost:${port}`)
        })
    }
})

app.use('/auth', require('./routes/auth'))