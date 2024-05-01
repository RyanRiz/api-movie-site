import { Sequelize } from "sequelize";
import db from "../configs/db.config.js";
import Movies from "./Movies.js";

const Directors = db.define('directors', {
    id: {
        type: Sequelize.INTEGER,
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
});

Directors.hasMany(Movies, { foreignKey: 'director_id' });
Movies.belongsTo(Directors, { foreignKey: 'director_id' });

export default Directors;