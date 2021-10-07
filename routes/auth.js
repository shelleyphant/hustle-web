const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt')
const passport = require('passport')
const cors = require('cors')
const { v4: uuidv4 } = require('uuid')

const db = require('../connection')

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

// router.get('/login', checkNotAuthenticated, (req, res) => {
//     res.render('login.ejs')
// })

// router.post('/login', checkNotAuthenticated, passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/login',
//     failureFlash: true
// }))

router.get('/register', (req, res) => {
    // res.render('register.ejs')
    res.send({message: true})
    // console.log('can sign up')
})

router.post('/register', async (req, res) => {
    try {
        const uuid = uuidv4()
        const hashedPassword = await bcrypt.hash(req.body.password, 10)

        var username = req.body.username
        var email = req.body.email
        var password = hashedPassword
        var id = uuid
 
        var sql = `INSERT INTO users (username, email, password, uid) VALUES ("${username}", "${email}", "${password}", "${id}")`;
        db.query(sql, (err, results) => {
            if (err) throw err
        })
        console.log('added user')
        res.send({message: 'added user!'})
        // res.redirect('/login')
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