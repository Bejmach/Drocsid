import express, { text } from 'express'

const router = express.Router();
import userTextChatController from '../controllers/userTextChatController.js';

router.get('/join/:chatid/:userid', userTextChatController.joinChat);
router.get('/all', userTextChatController.getAllUserTextChat);

export default router;