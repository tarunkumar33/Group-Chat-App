const sequelize = require('../utils/database');
const Sequelize = require('sequelize');

module.exports = sequelize.define('groupmessage', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    msg: {
        type: Sequelize.STRING,
        allowNull: false
    }
});
