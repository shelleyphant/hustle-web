const { Sequelize } = require('sequelize')

const method = new Sequelize('HustleDB', 'root', 'root', 
    {
        host: 'localhost',
        port: 8889,
        dialect: 'mysql'
    }
)
exports.sequelize = method

exports.connection = async (done) => {
    try {
        await method.authenticate()
    } catch (error) {
        console.error(error)
    }
    done()
}





// exports.query = (sql, done) => {
//     pass.query(sql, (err, res) => {
//         if(err) console.log(err)
//         console.log(res)
//     })
//     done()
// }