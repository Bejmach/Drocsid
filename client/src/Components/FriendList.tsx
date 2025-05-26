import React, { useEffect, useState } from 'react';
import { Box, Tooltip, DialogTitle, DialogContent, DialogActions, Button } from '@mui/joy';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import styles from '../styles/Components/FriendList.module.scss';
import { Typography } from '@mui/joy';
import { chatService } from '../hooks/api';
import { Chat } from '../types';
import { TextField, Dialog } from '@mui/material';

interface DMListProps {
  userId: string;
  selectedDM: string;
  onDMChange: (dmId: string) => void;
  onBack: () => void;
}

export default function DMList({ userId, selectedDM, onDMChange, onBack }: DMListProps) {
  const [dms, setDms] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newUserId, setNewUserId] = useState('');

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    chatService.getDMs(userId)
      .then(res => {
        const data = res.data as unknown;
        let chats: Chat[] = [];
        if (Array.isArray(data)) chats = data;
        else if (typeof data === 'object' && data !== null && 'rows' in data && Array.isArray((data as any).rows)) {
          chats = (data as any).rows;
        }
        setDms(chats);
      })
      .catch(() => setError('Could not load your DMs.'))
      .finally(() => setLoading(false));
  }, [userId]);

  const handleOpen = () => setDialogOpen(true);
  const handleClose = () => {
    setDialogOpen(false);
    setNewUserId('');
  };

  const handleCreateDM = () => {
    if (!newUserId.trim()) return;
    // 1. create a new chat
    chatService.create(`DM-${userId}-${newUserId}`)
      .then(res => {
        const newChat: Chat = res.data;
        // 2. join both users to the chat
        return Promise.all([
          chatService.join(newChat.id, userId),
          chatService.join(newChat.id, newUserId)
        ]).then(() => newChat);
      })
      .then((newChat: Chat) => {
        setDms(prev => [newChat, ...prev]);
        handleClose();
      })
      .catch(err => {
        console.error(err);
        setError('Failed to create DM.');
      });
  };

  if (loading) return <Typography>Loading DMs…</Typography>;
  if (error) return <Typography color="danger">{error}</Typography>;

  return (
    <>
      <Box className={styles.friendsList}>
        <Tooltip title="Back to Servers" placement="right">
          <button className={`${styles.friendsIcon} ${styles.addFriend}`} onClick={onBack}>
            <ArrowBackIcon />
          </button>
        </Tooltip>

        {dms.map(dm => (
          <Tooltip key={dm.id} title={dm.name} placement="right">
            <button
              className={`${styles.friendsIcon} ${styles.friendsButton} ${selectedDM === dm.id ? styles.active : ''}`}
              onClick={() => onDMChange(dm.id)}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
                <AddIcon />
                <Typography sx={{ color: 'white', textAlign: 'center' }}>{dm.name}</Typography>
              </Box>
            </button>
          </Tooltip>
        ))}

        <Tooltip title="New DM" placement="right">
          <button className={`${styles.friendsIcon} ${styles.addFriend}`} onClick={handleOpen}>
            <AddIcon />
          </button>
        </Tooltip>
      </Box>

      <Dialog open={dialogOpen} onClose={handleClose}>
        <DialogTitle>Create New DM</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            label="User ID"
            placeholder="Enter user ID"
            fullWidth
            value={newUserId}
            onChange={e => setNewUserId(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="plain" onClick={handleClose}>Cancel</Button>
          <Button variant="solid" onClick={handleCreateDM}>Create</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
