const { Sequelize, DataTypes } = require('sequelize')
const db = require('../connection')

const User = db.sequelize.define('user', {
    uid: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING,
        unique: true
    },
    password: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    firstname: {
        type: Sequelize.STRING,
        defaultValue: ''
    },
    lastname: {
        type: Sequelize.STRING,
        defaultValue: ''
    },
    image: {
        type: Sequelize.STRING,
        defaultValue: ''
    },
    email: {
        type: Sequelize.STRING,
        defaultValue: ''
    },
    city: {
        type: Sequelize.STRING,
        defaultValue: ''
    },
    country: {
        type: Sequelize.STRING,
        defaultValue: ''
    },
    verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
})
  
// User.sync({alter: true}).then(() => {
//     // console.log('table created');
// })

module.exports = User;