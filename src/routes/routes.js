import express from 'express';
import DirectorsControllers from '../controllers/DirectorsControllers.js';

const router = express.Router();
const route = "/api";


router.get(`${route}/directors`, DirectorsControllers.getAllDirectors);
router.post(`${route}/directors`, DirectorsControllers.createDirector);
router.get(`${route}/directors/:id`, DirectorsControllers.getDirectorById);
router.put(`${route}/directors/:id`, DirectorsControllers.editDirectorById);
router.delete(`${route}/directors/:id`, DirectorsControllers.deleteDirectorById);


export default router;