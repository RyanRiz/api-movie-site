import { Sequelize } from "sequelize";
import db from "../configs/db.config.js";

const Movies = db.define('movies', {
    movie_id: {
        type: Sequelize.UUID,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    rating: {
        type: Sequelize.FLOAT
    },
    year: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    director_id: {
        type: Sequelize.UUID,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    genre: {
        type: Sequelize.STRING
    },
    duration: {
        type: Sequelize.INTEGER
    },
    watched: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    inserted_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
}, {
    tableName: 'movies',
    underscored: true
});

db.sync();

export default Movies;