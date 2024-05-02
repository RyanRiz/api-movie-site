import Directors from "../models/Directors.js";

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
            return res.status(404).json({ error: 'Director not found' });
        }
        res.status(200).json({
            status: 'success',
            data: director
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
            return res.status(404).json({ error: 'Director not found' });
        }
        await director.update({
            name,
            age,
            birthdate,
            country
        });
        res.status(200).json({
            status: 'success',
            message: 'Director berhasil diupdate',
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
            return res.status(404).json({ error: 'Director not found' });
        }
        await director.destroy();
        res.status(204).json({
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

export default { getAllDirectors, createDirector, getDirectorById, editDirectorById, deleteDirectorById };