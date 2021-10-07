const LocalStrategy = require('passport-local').Strategy
// const passport = require('passport')
const bcrypt = require('bcrypt')


const localConfig = (passport, getUserByUN, getUserById) => {
    const authenticateUser = async (username, password, done) => {
        const user = await getUserByUN(username)
        if (user == null) {
            return done(err, false)
        }
        bcrypt.compare(password, user[0].password, (err, res) => {
            if (err){
                console.log(err)
            }
            if (res) {
                console.log('success')
            } else {
                console.log('no cigar')
            }
        })
    }

    passport.use(new LocalStrategy(authenticateUser))
    passport.serializeUser((user, done) => done(null, user.uid))
    passport.deserializeUser((id, done) => {
        return done(err, getUserById(id))
    })
}

module.exports = localConfig