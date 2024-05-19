import express from 'express';
import DirectorsControllers from '../controllers/DirectorsControllers.js';
import MoviesControllers from '../controllers/MoviesControllers.js';
import GenresControllers from '../controllers/GenresControllers.js';
import AuthControllers from '../controllers/AuthControllers.js';

// Middleware
import upload from '../middlewares/upload.js';
import auth from '../middlewares/auth.js';

const router = express.Router();
const route = "/api";

// Auth Routes
router.post(`${route}/register`, AuthControllers.register);
router.post(`${route}/login`, AuthControllers.login);
router.post(`${route}/logout`, AuthControllers.logout);

// Directors Routes
router.get(`${route}/directors`, DirectorsControllers.getAllDirectors);
router.post(`${route}/directors`, auth, upload.single("image"), DirectorsControllers.createDirector);
router.get(`${route}/directors/:id`, DirectorsControllers.getDirectorById);
router.put(`${route}/directors/:id`, auth, upload.single("image"), DirectorsControllers.editDirectorById);
router.delete(`${route}/directors/:id`, auth, DirectorsControllers.deleteDirectorById);
router.get(`${route}/directors/:id/movies`, DirectorsControllers.getDirectorMovies);

// Movies Routes
router.get(`${route}/movies`, MoviesControllers.getAllMovies);
router.post(`${route}/movies`, auth, MoviesControllers.createMovie);
router.get(`${route}/movies/:id`, MoviesControllers.getMovieById);
router.put(`${route}/movies/:id`, auth, MoviesControllers.editMovieById);
router.delete(`${route}/movies/:id`, auth, MoviesControllers.deleteMovieById);

// Genres Routes
router.get(`${route}/genres`, GenresControllers.getAllGenres);
router.post(`${route}/genres`, auth, GenresControllers.createGenre);
router.get(`${route}/genres/:id`, GenresControllers.getGenreById);
router.put(`${route}/genres/:id`, auth, GenresControllers.editGenreById);
router.delete(`${route}/genres/:id`, auth, GenresControllers.deleteGenreById);
router.get(`${route}/genres/:id/movies`, GenresControllers.getGenreMovies);

export default router;