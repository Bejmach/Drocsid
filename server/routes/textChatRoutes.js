import express, { text } from 'express'

const router = express.Router();
import textChatController from '../controllers/textChatController.js';

router.get('/create/:name', textChatController.createChat);
router.get('/all', textChatController.getAllTextChats);

export default router;