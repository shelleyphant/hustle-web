const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt')
const passport = require('passport')
const cors = require('cors')
// const { v4: uuidv4 } = require('uuid')

const db = require('../connection')

// Load User model
const User = require('../models/User');

router.use(cors())
router.use(express.json())
router.use(express.urlencoded({
  extended: true
}))

const localConfig = require('../passports/passport-config-local')
// passport.use(localConfig)
localConfig(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
)

const users = () => {
    db.query(`SELECT * FROM users`, (err, result) => {
        if (err) throw err
        console.log(result)
    })
}
// users()

// router.use(passport.initialize())
// router.use(passport.session())


router.get('/login', (req, res) => {
    // res.render('login.ejs')
    console.log('pulls')
})

router.post('/login', (req, res) => {
    console.log('submits')
})


// router.get('/login', checkNotAuthenticated, (req, res) => {
//     res.render('login.ejs')
// })

// router.post('/login', checkNotAuthenticated, passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/login',
//     failureFlash: true
// }))

router.get('/register', (req, res) => {
    res.send({message: true})
})

router.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)

        User.create({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        }, { fields: ['username', 'email', 'password'] })
    } catch(err) {
        console.log(err)
    }
})

// router.delete('/logout', (req, res) => {
//     req.logOut()
//     res.redirect('/login')
// })

// function checkAuthenticated(req, res, next) {
//     if (req.isAuthenticated()) {
//         return next()
//     }
//     // res.redirect('/login')
// }

// function checkNotAuthenticated(req, res, next) {
//     if (req.isAuthenticated()) {
//         // return res.redirect('/')
//     }
//     next()
// }

module.exports = router;