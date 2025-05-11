import express from 'express'

const router = express.Router();
import userController from '../controllers/userController.js';

router.get('/register/:name/:email/:password', userController.registerUser);

export default router;