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
        res.status(201).json({
            status: 'success',
            message: 'Movie berhasil ditambahkan',
            data: movie
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getMovieById(req, res) {
    try {
        const { id } = req.params;
        const movie = await Movies.findByPk(id, {
            attributes: ['id', 'title', 'rating', 'year', 'description', 'genre', 'duration', 'watched'],
            include: [{
                model: Directors,
                attributes: ['name']
            }]
        });
        if (!movie) {
            return res.status(404).json({ error: 'Movie tidak ditemukan' });
        }

        const directorName = movie.director.name;

        const movieData = {
            id: movie.id,
            title: movie.title,
            rating: movie.rating,
            year: movie.year,
            description: movie.description,
            genre: movie.genre,
            duration: movie.duration,
            watched: movie.watched,
            director: directorName
        };

        res.status(200).json({
            status: 'success',
            data: movieData
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function editMovieById(req, res) {
    try {
        const { id } = req.params;
        const { title, rating, year, description, genre, duration, watched } = req.body;
        const movie = await Movies.findByPk(id);
        if (!movie) {
            return res.status(404).json({ error: 'Movie tidak ditemukan' });
        }
        await movie.update({
            title,
            rating,
            year,
            description,
            genre,
            duration,
            watched
        });
        res.status(200).json({
            status: 'success',
            message: 'Movie berhasil diperbarui',
            data: movie
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function deleteMovieById(req, res) {
    try {
        const { id } = req.params;
        const movie = await Movies.findByPk(id);
        if (!movie) {
            return res.status(404).json({ error: 'Movie tidak ditemukan' });
        }
        await movie.destroy();
        res.status(200).json({
            status: 'success',
            message: 'Movie berhasil dihapus'
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export default { createMovie, getAllMovies, getMovieById, editMovieById, deleteMovieById};