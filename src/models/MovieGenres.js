import { Sequelize } from "sequelize";
import db from "../configs/db.config.js";

const MovieGenres = db.define('movie_genres', {
    //Auto Generate
}, {
    tableName: 'movie_genres',
    timestamps: false,
    underscored: true
});

db.sync();

export default MovieGenres;