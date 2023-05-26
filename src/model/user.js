'use strict';
const { Model, Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) { }
    };
    User.init({
        _id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        avatar: {
            type: DataTypes.STRING
        },
        firstName: {
            type: DataTypes.STRING
        },
        middleName: {
            type: DataTypes.STRING
        },
        lastName: {
            type: DataTypes.STRING
        },
        phone: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        address: {
            type: DataTypes.TEXT('long')
        },
        password: {
            type: DataTypes.STRING
        },
        status: {
            type: DataTypes.ENUM,
            values: ['pending', 'verified', 'active']
        }
    },
        {
            sequelize,
            tableName: "user"
        });
    User.removeAttribute('id');
    return User;
};