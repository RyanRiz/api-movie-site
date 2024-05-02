import { Sequelize } from "sequelize";
import db from "../configs/db.config.js";
import Movies from "./Movies.js";

const Directors = db.define('directors', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    age: {
        type: Sequelize.INTEGER
    },
    birthdate: {
        type: Sequelize.DATE
    },
    country: {
        type: Sequelize.STRING
    }
}, {
    tableName: 'directors',
    timestamps: false,
    underscored: true
});

db.sync();

Directors.hasMany(Movies, { 
    foreignKey: 'director_id',
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT"
});

Movies.belongsTo(Directors, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT"
 });

export default Directors;