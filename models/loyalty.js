const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const Loyalty = sequelize.define('loyalty', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    points:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    description:{
        type: DataTypes.STRING(100),
        allowNull: false
    }
});

module.exports = Loyalty;