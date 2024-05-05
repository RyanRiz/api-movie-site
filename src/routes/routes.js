import express from 'express';
import DirectorsControllers from '../controllers/DirectorsControllers.js';
import MoviesControllers from '../controllers/MoviesControllers.js';
import GenresControllers from '../controllers/GenresControllers.js';
import upload from '../middlewares/upload.js';

const router = express.Router();
const route = "/api";

// Directors Routes
router.get(`${route}/directors`, DirectorsControllers.getAllDirectors);
router.post(`${route}/directors`, upload.single("image"), DirectorsControllers.createDirector);
router.get(`${route}/directors/:id`, DirectorsControllers.getDirectorById);
router.put(`${route}/directors/:id`, upload.single("image"), DirectorsControllers.editDirectorById);
router.delete(`${route}/directors/:id`, DirectorsControllers.deleteDirectorById);
router.get(`${route}/directors/:id/movies`, DirectorsControllers.getDirectorMovies);

// Movies Routes
router.get(`${route}/movies`, MoviesControllers.getAllMovies);
router.post(`${route}/movies`, MoviesControllers.createMovie);
router.get(`${route}/movies/:id`, MoviesControllers.getMovieById);
router.put(`${route}/movies/:id`, MoviesControllers.editMovieById);
router.delete(`${route}/movies/:id`, MoviesControllers.deleteMovieById);

// Genres Routes
router.get(`${route}/genres`, GenresControllers.getAllGenres);
router.post(`${route}/genres`, GenresControllers.createGenre);
router.get(`${route}/genres/:id`, GenresControllers.getGenreById);
router.put(`${route}/genres/:id`, GenresControllers.editGenreById);
router.delete(`${route}/genres/:id`, GenresControllers.deleteGenreById);
router.get(`${route}/genres/:id/movies`, GenresControllers.getGenreMovies);

export default router;