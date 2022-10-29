const sequelize = require('../utils/database');
const Sequelize = require('sequelize');

module.exports = sequelize.define("groupmember", {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    admin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
    groupName:{
        type: Sequelize.STRING,
        allowNull:false
    }
});