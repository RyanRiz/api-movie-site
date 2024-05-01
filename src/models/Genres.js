import { Sequelize } from "sequelize";
import db from "../configs/db.config";

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
});