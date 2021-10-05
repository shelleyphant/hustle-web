const mysql = require('mysql')

const pass = mysql.createConnection({
    host: 'localhost',
    port: 8889,
    user: 'root',
    password: 'root',
    database: 'HustleDB',
})

exports.connection = (done) => {
    pass.connect((err) => {
        if(err) console.log(err)
    })
    done()
}
