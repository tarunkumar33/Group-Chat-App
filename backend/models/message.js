const sequelize = require('../utils/database');
const Sequelize = require('sequelize');

module.exports = sequelize.define('message', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    msg: {
        type: Sequelize.STRING,
        allowNull: false
    },
    userName: {
        type: Sequelize.STRING,
        allowNull: false
    }
});
