if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
// const passport = require('passport')
// const flash = require('express-flash')
// const session = require('express-session')
// const methodOverride = require('method-override')
// const cors = require('cors')

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

// app.use(cors())
// app.use(express.urlencoded({ extended: false }))
// app.use(flash())
// app.use(session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false
// }))

// app.use(methodOverride('_method'))



