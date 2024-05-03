import { Sequelize } from "sequelize";
import db from "../configs/db.config.js";
import Genres from "./Genres.js";

const Movies = db.define('movies', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
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
    duration: {
        type: Sequelize.INTEGER
    },
    watched: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
}, {
    tableName: 'movies',
    underscored: true
});

db.sync();

Movies.belongsToMany(Genres, { 
    through: 'movie_genres',
    foreignKey: 'movie_id'
});

Genres.belongsToMany(Movies, {
    through: 'movie_genres',
    foreignKey: 'genre_id'
});

export default Movies;