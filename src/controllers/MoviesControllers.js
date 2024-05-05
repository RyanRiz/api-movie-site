import Directors from "../models/Directors.js";
import Movies from "../models/Movies.js";
import Genres from "../models/Genres.js";

async function getAllMovies(req, res) {
    try {
        const data = await Movies.findAll({
            attributes: ['id', 'title', 'rating', 'year', 'description', 'duration', 'watched'],
            include: [
                {
                    model: Directors,
                    attributes: ['name', 'age', 'birthdate', 'country'],
                },
                {
                    model: Genres,
                    attributes: ['genre_name']
                }
            ]
        });

        const movieData = data.map((movie) => {
            return {
                id: movie.id,
                title: movie.title,
                rating: movie.rating,
                year: movie.year,
                description: movie.description,
                duration: movie.duration,
                watched: movie.watched,
                director: movie.director.name,
                genre: movie.genres.map((genre) => genre.genre_name)
            };
        });

        res.status(200).json({
            status: 'success',
            data: movieData
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function createMovie(req, res) {
    try {
        const { title, rating, year, director_id, description, genre, duration, watched } = req.body;
        const movie = await Movies.create({
            title: title,
            rating: rating,
            year: year,
            director_id: director_id,
            description: description,
            duration:duration,
            watched: watched
        });

        await movie.setGenres(genre);

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
            attributes: ['id', 'title', 'rating', 'year', 'description', 'duration', 'watched'],
            include: [{
                model: Directors,
                attributes: ['name']
            }]
        });

        if (!movie) {
            return res.status(404).json({ error: 'Movie tidak ditemukan' });
        }

        const genres = await movie.getGenres();
        movie.genres = genres.map((genre) => genre.genre_name);

        const movieData = {
            id: movie.id,
            title: movie.title,
            rating: movie.rating,
            year: movie.year,
            description: movie.description,
            duration: movie.duration,
            watched: movie.watched,
            director: movie.director.name,
            genre: movie.genres
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
            title: title,
            rating: rating,
            year: year,
            description: description,
            genre: genre,
            duration: duration,
            watched:watched
        });

        if (genre && genre.length > 0) {
            await movie.setGenres(genre);
        }

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