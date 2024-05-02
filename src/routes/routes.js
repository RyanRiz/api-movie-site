import express from 'express';
import DirectorsControllers from '../controllers/DirectorsControllers.js';
import MoviesControllers from '../controllers/MoviesControllers.js';

const router = express.Router();
const route = "/api";

// Directors Routes
router.get(`${route}/directors`, DirectorsControllers.getAllDirectors);
router.post(`${route}/directors`, DirectorsControllers.createDirector);
router.get(`${route}/directors/:id`, DirectorsControllers.getDirectorById);
router.put(`${route}/directors/:id`, DirectorsControllers.editDirectorById);
router.delete(`${route}/directors/:id`, DirectorsControllers.deleteDirectorById);
router.get(`${route}/directors/:id/movies`, DirectorsControllers.getDirectorMovies);

// Movies Routes
router.get(`${route}/movies`, MoviesControllers.getAllMovies);
router.post(`${route}/movies`, MoviesControllers.createMovie);
router.get(`${route}/movies/:id`, MoviesControllers.getMovieById);
router.put(`${route}/movies/:id`, MoviesControllers.editMovieById);
router.delete(`${route}/movies/:id`, MoviesControllers.deleteMovieById);

export default router;