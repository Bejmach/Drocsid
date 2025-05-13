import React, { useState } from 'react';
import {
  Box,
  IconButton,
  Stack,
} from '@mui/joy';
import { AddCircle, EmojiEmotions, Gif, Image, Send } from '@mui/icons-material';
import styles from '../styles/Components/ChatInput.module.scss';
import { Input } from '@mui/material';

interface MessageInputProps {
  serverId: string;
}

const MessageInput: React.FC<MessageInputProps> = ({ serverId }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  return (
    <Box className={styles.messageInputContainer}>
      <form onSubmit={handleSubmit} className={styles.messageInput}>
        <IconButton
          variant="plain"
          className={styles.uploadButton}
          component="label"
        >
          <AddCircle />
        </IconButton>

        <Input
          fullWidth
          placeholder={`Message #${serverId}`}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={styles.inputField}
          disableUnderline
        />

        <Stack direction="row" spacing={1} className={styles.messageActions}>
          <IconButton variant="plain" className={styles.actionButton}>
            <Gif />
          </IconButton>
          <IconButton variant="plain" className={styles.actionButton}>
            <Image />
          </IconButton>
          <IconButton variant="plain" className={styles.actionButton}>
            <EmojiEmotions />
          </IconButton>
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