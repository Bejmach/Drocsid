import React from 'react';
import { Box, Typography } from '@mui/joy';
import { Message } from '../types';
import ChatInput from './ChatInput';

interface MainChatProps {
  messages: Message[];
  selectedChat: string;
  onSendMessage: (content: string) => Promise<void>;
}

const MainChat: React.FC<MainChatProps> = ({ messages, selectedChat, onSendMessage }) => {
  return (
    <Box sx={{ flex: 1, p: 3 }}>
      <Typography level="h4" sx={{ mb: 2 }}>
        {selectedChat || 'Select a chat'}
      </Typography>
      
      <Box sx={{ height: '70vh', overflowY: 'auto', mb: 2 }}>
        {messages.map(message => (
          <Box key={message.id} sx={{ mb: 2 }}>
            <Typography fontWeight="lg">{message.userId}</Typography>
            <Typography>{message.content}</Typography>
            <Typography level="body3">{new Date(message.time).toLocaleString()}</Typography>
          </Box>
        ))}
      </Box>
      
      <ChatInput onSend={onSendMessage} />
    </Box>
  );
};

export default MainChat;