import userService from "../services/userService.js"

async function registerUser(req, res){
    try {
        const users = await userService.registerUser(req.params.name, req.params.email, req.params.password);
        res.json(users);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
}

export default {registerUser};