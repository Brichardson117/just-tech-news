const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Commet extends Model {}

Commet.init(
    {
        // columns will go here
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'commet'
    }
);

module.exports = Commet;