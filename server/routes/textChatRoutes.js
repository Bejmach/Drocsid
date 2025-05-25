import express, { text } from 'express'

const router = express.Router();
import textChatController from '../controllers/textChatController.js';

router.get('/create/:name', textChatController.createChat);
router.get('/all', textChatController.getAllTextChats);
router.get('/chats/:userid', textChatController.getAllChatsWithUser);
router.get('/dm/:userid', textChatController.getAllDMWithUser);

export default router;
