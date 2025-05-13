import express from 'express'

const router = express.Router();
import messageController from '../controllers/messageController.js';

router.get('/get/after/:chatid/:messageid', messageController.getMessagesFromChatAfter);
router.get('/get/:chatid/:limit/:offset', messageController.getMessagesFromChat);
router.get('/send/:chatid/:userid/:content', messageController.sendMessage);
router.get('/all', messageController.getAllMessages);

export default router;