import express from 'express';
import router from './src/routes/routes.js';
import db from './src/configs/db.config.js';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(router);

try {
    await db.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});