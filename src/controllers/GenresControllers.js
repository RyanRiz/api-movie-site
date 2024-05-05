import Directors from "../models/Directors.js";
import Genres from "../models/Genres.js";
import Movies from "../models/Movies.js";

async function getAllGenres(req, res) {
    try {
        const genres = await Genres.findAll({ attributes: ['id', 'genre_name']});

        res.status(200).json({
            status: 'success',
            data: genres
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function createGenre(req, res) {
    try {
        const { genre_name } = req.body;
        const genre = await Genres.create({ 
            genre_name: genre_name
        });

        res.status(201).json({
            status: 'success',
            message: 'Genre berhasil ditambahkan',
            data: genre
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getGenreById(req, res) {
    try {
        const { id } = req.params;
        const genre = await Genres.findByPk(id);

        if (!genre) {
            return res.status(404).json({ 
                status: 'error',
                error: 'Genre tidak ditemukan'
            });
        }

        res.status(200).json({
            status: 'success',
            genre: genre
        });
    } catch (error) {
        res.status(500).json({ 
            status: 'error',
            error: error.message
         });
    }
}

async function editGenreById(req, res) {
    try {
        const { id } = req.params;
        const { genre_name } = req.body;
        const genre = await Genres.findByPk(id);

        if (!genre) {
            return res.status(404).json({ 
                status: 'error',
                error: 'Genre tidak ditemukan' });
        }

        await genre.update({ 
            genre_name: genre_name
        });

        res.status(200).json({
            status: 'success',
            message: 'Genre berhasil diupdate'
        });
    } catch (error) {
        res.status(500).json({ 
            status: 'error',
            error: error.message
         });
    }
}

async function deleteGenreById(req, res) {
    try {
        const { id } = req.params;
        const genre = await Genres.findByPk(id);

        if (!genre) {
            return res.status(404).json({ 
                status: 'error',
                error: 'Genre tidak ditemukan' });
        }

        await genre.destroy();
        
        res.status(200).json({
            status: 'success',
            message: 'Genre berhasil dihapus'
        });
    } catch (error) {
        res.status(500).json({ 
            status: 'error',
            error: error.message
         });
    }
}

async function getGenreMovies(req, res) {
    try {
        const { id } = req.params;
        const genre = await Genres.findByPk(id, {
            include: [{
                model: Movies,
                include: {
                    model: Directors,
                    attributes: ['name']
                }
            }]
        });

        if (!genre) {
            return res.status(404).json({ 
                status: 'error',
                error: 'Genre tidak ditemukan' });
        }

        const moviesByGenre = {
            id: genre.id,
            genre_name: genre.genre_name,
            movies: genre.movies.map(movie => ({
                id: movie.id,
                title: movie.title,
                rating: movie.rating,
                year: movie.year,
                description: movie.description,
                duration: movie.duration,
                watched: movie.watched,
                director: movie.director.name
            }))
        };

        res.status(200).json({
            status: 'success',
            data: moviesByGenre
        });
    } catch (error) {
        res.status(500).json({ 
            status: 'error',
            error: error.message
         });
    }
}

export default { getAllGenres, createGenre, getGenreById, editGenreById, deleteGenreById, getGenreMovies };