import { Sequelize } from "sequelize";

const db = new Sequelize('movie-site', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

export default db;