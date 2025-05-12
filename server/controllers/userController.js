import userService from "../services/userService.js"

async function registerUser(req, res){
    try {
        const users = await userService.registerUser(req.params.name, req.params.email, req.params.password);
        res.json(users);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
}

async function loginUser(req, res){
  try {
      const users = await userService.loginUser(req.params.name, req.params.password);
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
}

async function getAllUsers(req, res) {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getUsersFromChat(req, res) {
  try {
    const users = await userService.getUsersFromChat(req.params.chatid);
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export default {getAllUsers, registerUser, loginUser, getUsersFromChat};