import { Sequelize } from "sequelize";
import db from "../configs/db.config.js";

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
    genre: {
        type: Sequelize.STRING
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

export default Movies;