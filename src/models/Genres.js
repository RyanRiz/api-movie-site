import { Sequelize } from "sequelize";
import db from "../configs/db.config.js";

const Genres = db.define('genres', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    genre_name: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    tableName: 'genres',
    timestamps: false
});

db.sync();

export default Genres;