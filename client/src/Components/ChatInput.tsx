import React, { useState } from 'react';
import {
  Box,
  IconButton,
  Stack,
} from '@mui/joy';
import {Send } from '@mui/icons-material';
import Input from '@mui/material/Input';
import styles from '../styles/Components/ChatInput.module.scss';

interface MessageInputProps {
  serverId?: string;
  friendId?: string;
  serverName?: string;
  isFriendsList: boolean;
  onSendMessage: (content: string) => void;
}


const MessageInput: React.FC<MessageInputProps> = ({ serverId, serverName, friendId, onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <Box className={styles.messageInputContainer}>
      <form onSubmit={handleSubmit} className={styles.messageInput}>
        <Input
          fullWidth
          placeholder={serverId ? `Message ${serverName}` : `Message @${friendId}`}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={styles.inputField}
          disableUnderline
        />

        <Stack direction="row" spacing={1} className={styles.messageActions}>
          <IconButton 
            type="submit" 
            variant="solid" 
            className={styles.sendButton}
          >
            <Send />
          </IconButton>
        </Stack>
      </form>
    </Box>
  );
};

export default MessageInput;