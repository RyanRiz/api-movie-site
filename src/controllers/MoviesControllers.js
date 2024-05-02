import Directors from "../models/Directors.js";
import Movies from "../models/Movies.js";

async function getAllMovies(req, res) {
    try {
        const data = await Movies.findAll({
            attributes: ['id', 'title', 'rating', 'year', 'description', 'genre', 'duration', 'watched'],
            include: {
                model: Directors,
                attributes: ['name', 'age', 'birthdate', 'country']
            }
        });
        res.status(200).json({
            status: 'success',
            data: data
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function createMovie(req, res) {
    try {
        const { title, rating, year, director_id, description, genre, duration, watched } = req.body;
        const movie = await Movies.create({
            title,
            rating,
            year,
            director_id,
            description,
            genre,
            duration,
            watched
        });
        res.status(201).json(movie);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getMovieById(req, res) {
    try {
        const { id } = req.params;
        const movie = await Movie.findByPk(id);
        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' });
        }
        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function editMovieById(req, res) {
    try {
        const { id } = req.params;
        const { title, rating, year, director, description, genre, duration, watched } = req.body;
        const movie = await Movie.findByPk(id);
        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' });
        }
        await movie.update({
            title,
            rating,
            year,
            director,
            description,
            genre,
            duration,
            watched
        });
        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function deleteMovieById(req, res) {
    try {
        const { id } = req.params;
        const movie = await Movie.findByPk(id);
        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' });
        }
        await movie.destroy();
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export default { createMovie, getAllMovies, getMovieById, editMovieById, deleteMovieById};