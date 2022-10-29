const sequelize = require('../utils/database');
const Sequelize = require('sequelize');

module.exports = sequelize.define('group', {
    id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true
    },
    groupName: {
        type: Sequelize.STRING,
        allowNull: false
    }
});