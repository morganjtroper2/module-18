import { getUser } from '../../controllers/user-controller.js'; // Removed deleteBook import
import express from 'express';

const router = express.Router();

router.get('/user', getUser);

export default router;