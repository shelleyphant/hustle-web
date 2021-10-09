const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt')
const passport = require('passport')
const session = require('express-session')
const db = require('../connection')

// Load User model
const User = require('../models/User');

// router.use(cors())
router.use(express.json())
router.use(express.urlencoded({
  extended: true
}))
router.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
router.use(passport.initialize())
router.use(passport.session())

const localConfig = require('../passports/passport-config-local')
localConfig(
    passport,
    username => User.findAll({where: { username: username }}), //getUserByUN()
    uid => User.findAll({where: { uid: uid }})  //getUserById()
)

router.get('/', checkAuthenticated, (req, res) => {
    res.send({auth:true})
})

router.get('/login', checkNotAuthenticated, (req, res) => {
    res.send({auth: false, redirect: ''})
})

router.post('/login', checkNotAuthenticated, passport.authenticate('local'), (req, res) => {
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
    res.send({redirect: '/login'})
})

router.delete('/logout', (req, res) => {
    req.logOut()
    res.redirect('/login')
})

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.send({auth: false, redirect: '/login'})
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        res.send({auth: true, redirect: '/'})
    }
    next()
}

module.exports = router;