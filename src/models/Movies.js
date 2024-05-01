import { Sequelize } from "sequelize";
import db from "../configs/db.config.js";

const Movies = db.define('movies', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    rating: {
        type: Sequelize.FLOAT
    },
    year: {
        type: Sequelize.INTEGER
    },
    director_id: {
        type: Sequelize.STRING,
    },
    description: {
        type: Sequelize.STRING
    },
    genre: {
        type: Sequelize.STRING
    },
    duration: {
        type: Sequelize.INTEGER
    },
    watched: {
        type: Sequelize.BOOLEAN
    },
    inserted_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
});

export default Movies;