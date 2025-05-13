import textChatService from "../services/textChatService.js";

async function createChat(req, res) {
    try {
        const chat = await textChatService.createChat(req.params.name);
        res.json(chat);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
}

async function getAllTextChats(req, res) {
  try {
    const chat = await textChatService.getAllTextChats();
    res.json(chat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export default {createChat, getAllTextChats}