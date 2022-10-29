const sequelize = require('../utils/database');
const Sequelize = require('sequelize');

module.exports = sequelize.define('archivedchat', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    msg: {
        type: Sequelize.STRING,
        allowNull: false
    },
    userId:{
        type: Sequelize.STRING,
    },
    groupId:{
        type: Sequelize.STRING,
    }
});
