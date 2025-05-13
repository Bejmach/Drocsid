import express from 'express'

const router = express.Router();
import userController from '../controllers/userController.js';

router.get('/all', userController.getAllUsers);
router.get('/register/:name/:email/:password', userController.registerUser);
router.get('/login/:name/:password', userController.loginUser);
router.get('/chat/:chatid', userController.getUsersFromChat);

export default router;