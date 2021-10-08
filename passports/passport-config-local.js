const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')


const localConfig = (passport, getUserByUN, getUserById) => {
    const authenticateUser = async (username, password, done) => {
        const user = await getUserByUN(username)
        if (user == null) {
            return done(err, false)
        }

        bcrypt.compare(password, user[0].password, (err, res) => {
            if (err){ console.log(err) }
            if (res) {
                // console.log(user[0])
                return done(null, user[0])
            } else { return done(null, false) } //passwords didnt match
        })
    }

    passport.use(new LocalStrategy(authenticateUser))
    passport.serializeUser((user, done) => {
        return done(null, user.uid)
    })
    passport.deserializeUser((id, done) => {
        return done(null, getUserById(id))
    })
}

module.exports = localConfig