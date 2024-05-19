import { Sequelize } from "sequelize";
import db from "../configs/db.config.js";

const Users = db.define('users', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    tableName: 'users',
    underscored: true
});

db.sync();

export default Users;