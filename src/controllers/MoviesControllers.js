async function getAllMovies(req, res) {
    try {
        const movies = await Movie.findAll();
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function createMovie(req, res) {
    try {
        const { title, rating, year, director, description, genre, duration, watched } = req.body;
        const movie = await Movie.create({
            title,
            rating,
            year,
            director,
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

export default { createMovie };