if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const mysql = require('mysql')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')

const port = process.env.PORT || 5000
const db = require('./connection')

const initializePassport = require('./passports/passport-config-local')
initializePassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

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

