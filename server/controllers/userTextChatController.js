import userTextChatService from "../services/userTextChatService.js";

async function joinChat(req, res) {
       try {
               const usertextchat = await userTextChatService.joinChat(req.params.chatid, req.params.userid);
               res.json(usertextchat);
             } catch (err) {
               res.status(500).json({ error: err.message });
             }
}

async function getAllUserTextChat(req, res) {
  try {
    const usertextchat = await userTextChatService.getAllUserTextChat();
    res.json(usertextchat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export default {joinChat, getAllUserTextChat}