import Directors from "../models/Directors.js";
import Genres from "../models/Genres.js";
import Movies from "../models/Movies.js";

async function getAllDirectors(req, res) {
    try {
        const directors = await Directors.findAll({
            attributes: ['id', 'name', 'age', 'birthdate', 'country']
        });

        res.status(200).json({
            status: 'success',
            data: directors
        });
    } catch (error) {
        res.status(404).json({ 
            status: 'error',
            error: error.message 
        });
    }
}

async function createDirector(req, res) {
    try {
        console.log("Request Body:", req.body);
        const { name, age, birthdate, country } = req.body;

        const director = await Directors.create({
            name: name,
            age: age,
            birthdate: birthdate,
            country: country
        });

        res.status(201).json({
            status: 'success',
            message: 'Director berhasil ditambahkan',
            data: director
        });
    } catch (error) {
        res.status(404).json({ 
            status: 'error',
            error: error.message
         });
    }
}

async function getDirectorById(req, res) {
    try {
        const { id } = req.params;

        const director = await Directors.findByPk(id);

        if (!director) {
            return res.status(404).json({ 
                status: 'error',
                error: 'Director tidak ditemukan' });
        }

        res.status(200).json({
            status: 'success',
            director: director
        });
    } catch (error) {
        res.status(500).json({ 
            status: 'error',
            error: error.message
         });
    }
}

async function editDirectorById(req, res) {
    try {
        const { id } = req.params;
        const { name, age, birthdate, country } = req.body;

        const director = await Directors.findByPk(id);

        if (!director) {
            return res.status(404).json({ error: 'Director tidak ditemukan' });
        }

        await director.update({
            name,
            age,
            birthdate,
            country
        });

        res.status(200).json({
            status: 'success',
            message: 'Director berhasil diperbarui',
            data: director
        });
    } catch (error) {
        res.status(500).json({ 
            status: 'error',
            error: error.message
         });
    }
}

async function deleteDirectorById(req, res) {
    try {
        const { id } = req.params;
        const director = await Directors.findByPk(id);

        if (!director) {
            return res.status(404).json({ error: 'Director tidak ditemukan' });
        }

        await director.destroy();

        res.status(200).json({
            status: 'success',
            message: 'Director berhasil dihapus'
        });
    } catch (error) {
        res.status(500).json({ 
            status: 'error',
            error: error.message
         });
    }
}

async function getDirectorMovies(req, res) {
    try {
        const { id } = req.params;

        const director = await Directors.findByPk(id, {
            include: [{
                model: Movies,
                attributes: ['id', 'title', 'rating', 'year', 'description', 'duration', 'watched'],
                include: {
                    model: Genres,
                    attributes: ['genre_name']
                }
            }]
        });

        if (!director) {
            return res.status(404).json({ error: 'Director tidak ditemukan' });
        }

        const directorMovies = {
            id: director.id,
            name: director.name,
            age: director.age,
            birthdate: director.birthdate,
            country: director.country,
            movies: director.movies.map(movie => ({
                id: movie.id,
                title: movie.title,
                rating: movie.rating,
                year: movie.year,
                description: movie.description,
                duration: movie.duration,
                watched: movie.watched,
                genres: movie.genres.map(genre => genre.genre_name)
            }))
        };
        
        res.status(200).json({
            status: 'success',
            data: directorMovies
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export default { getAllDirectors, createDirector, getDirectorById, editDirectorById, deleteDirectorById, getDirectorMovies };