const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt')
const passport = require('passport')
const cors = require('cors')
const session = require('express-session')
const db = require('../connection')

// Load User model
const User = require('../models/User');

router.use(cors())
router.use(express.json())
router.use(express.urlencoded({
  extended: true
}))
router.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

const localConfig = require('../passports/passport-config-local')
localConfig(
    passport,
    username => User.findAll({where: { username: username }}), //getUserByUN()
    id => User.findByPk(user => user.uid === uid)  //getUserById()
)

router.use(passport.initialize())
router.use(passport.session())

router.get('/', checkAuthenticated, (req, res) => {
    res.send({auth:true})
})

router.get('/login', checkNotAuthenticated, (req, res) => {
    res.send({auth: false, redirect: ''})
})

router.post('/login', checkNotAuthenticated, passport.authenticate('local'),(req, res) => {
    res.send({auth: true, redirect: '/'})
})

router.get('/register', checkNotAuthenticated, (req, res) => {
    res.send({auth: false, redirect: ''})
})

router.post('/register', checkNotAuthenticated, async (req, res) => {
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
    res.send({redirect: '/'})
})

// router.delete('/logout', (req, res) => {
//     req.logOut()
//     res.redirect('/login')
// })

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.send({auth: false, redirect: '/login'})
    // res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        // return res.redirect('/')
        res.send({auth: true, redirect: '/'})
    }
    next()
}

module.exports = router;