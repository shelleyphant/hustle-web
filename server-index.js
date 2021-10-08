if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const cors = require('cors')

// app.use((req, res, next) => {
//     res.append('Access-Control-Allow-Origin', ['*']);
//     res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.append('Access-Control-Allow-Headers', 'Content-Type');
//     next()
// })
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