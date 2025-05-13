import express from 'express';

const app = express();
import userRoutes from './routes/userRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import textChatRoutes from './routes/textChatRoutes.js';
import userTextChatRoutes from './routes/userTextChatRoutes.js';


app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/textchat', textChatRoutes);
app.use('/api/usertextchat', userTextChatRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});