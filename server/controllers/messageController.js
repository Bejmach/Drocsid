import messageService from "../services/messageService.js"

async function getMessagesFromChat(req, res){
    try {
        const messages = await messageService.getMessagesFromChat(req.params.chatid, req.params.limit, req.params.offset);
        res.json(messages);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
}

async function getMessagesFromChatAfter(req, res) {
    try {
        const messages = await messageService.getMessagesFromChatAfter(req.params.chatid, req.params.messageid);
        res.json(messages);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
}

async function sendMessage(req, res){
    try {
        const messages = await messageService.sendMessage(req.params.chatid, req.params.userid, req.params.content);
        res.json(messages);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
}

async function getAllMessages(req, res) {
  try {
    const messages = await messageService.getAllMessages();
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export default {getMessagesFromChat, getMessagesFromChatAfter, sendMessage, getAllMessages};