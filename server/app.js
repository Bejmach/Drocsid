import express from 'express';
import cors from 'cors';

import userRoutes from './routes/userRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import textChatRoutes from './routes/textChatRoutes.js';
import userTextChatRoutes from './routes/userTextChatRoutes.js';

const app = express();

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true, // if you're using cookies or HTTP authentication
};

app.use(cors(corsOptions));

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/textchat', textChatRoutes);
app.use('/api/usertextchat', userTextChatRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
