import React, { useEffect, useState } from 'react';
import {
  Box,
  Tooltip,
  Typography,
  IconButton,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/joy';
import { Dialog, Input } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';
import styles from '../styles/Components/FriendList.module.scss';
import { chatService, userService } from '../hooks/api';
import { Chat } from '../types';

interface FriendsListProps {
  userId: string;
  onBack: () => void;
  onSelectFriend: (friendId: string) => void;
  selectedServer: string;
}

const FriendsList: React.FC<FriendsListProps> = ({
  userId,
  onBack,
  onSelectFriend,
  selectedServer,
}) => {
  const [friends, setFriends] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newUserId, setNewUserId] = useState('');
  const [dialogError, setDialogError] = useState('');

  const fetchFriends = () => {
    if (!userId) return;
    setLoading(true);
    chatService
      .getDMs(userId)
      .then(res => {
        const payload = res.data as Chat[] | { rows: Chat[] };
        setFriends(Array.isArray(payload) ? payload : payload.rows);
        setError('');
      })
      .catch(() => {
        setError('Could not load your friends.');
      })
      .finally(() => setLoading(false));
  };

  useEffect(fetchFriends, [userId]);

  const openDialog = () => {
    setDialogError('');
    setNewUserId('');
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setDialogError('');
    setNewUserId('');
  };

const handleCreateDM = async () => {
  setDialogError('');
  try {
    const users = await userService.getAll();
    const currentUser = users.data.find(u => u.id === userId);
    const targetUser = users.data.find(u => u.id === newUserId);
    
    if (!currentUser || !targetUser) {
      setDialogError('User not found.');
      return;
    }

    const [name1, name2] = [currentUser.name, targetUser.name].sort();

    const createRes = await chatService.create(`${name1} - ${name2}`);
    const chatId = createRes.data.message[0]?.id;

    await chatService.join(chatId, userId);
    await chatService.join(chatId, newUserId);

    console.log(chatId, userId);
    console.log(chatId, newUserId);

    onSelectFriend(chatId);
    fetchFriends();
    closeDialog();
  } catch (err) {
    console.error('Error creating DM:', err);
    if (axios.isAxiosError(err)) {
      setDialogError(err.response?.data?.message || 'Error creating DM.');
    } else {
      setDialogError('An unexpected error occurred.');
    }
  }
};

  if (loading) return <Typography>Loading friends…</Typography>;
  if (error) return <Typography color="danger">{error}</Typography>;

  return (
    <>
      <Box className={styles.friendsList}>
        <Tooltip title="Back to Servers" placement="right">
          <IconButton
            variant="plain"
            color="neutral"
            size="md"
            onClick={onBack}
            className={`${styles.friendsIcon} ${styles.addFriend}`}
          >
            <ArrowBackIcon />
          </IconButton>
        </Tooltip>
        {friends.map(friend => {
          const isActive = selectedServer === friend.id;
          return (
            <Tooltip key={friend.id} title={friend.name} placement="right">
              <Button
                variant="plain"
                size="sm"
                onClick={() => onSelectFriend(friend.id)}
                className={`${styles.friendsIcon} ${styles.friendsButton} ${
                  isActive ? styles.active : ''
                }`}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
                  <Box className={styles.statusIndicator} />
                  <Typography sx={{ color: 'white', textAlign: 'center' }}>{friend.name}</Typography>
                </Box>
              </Button>
            </Tooltip>
          );
        })}
        <Tooltip title="Add Friend" placement="right">
          <IconButton
            variant="plain"
            color="neutral"
            size="md"
            onClick={openDialog}
            className={`${styles.friendsIcon} ${styles.addFriend}`}
          >
            <AddIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Dialog open={dialogOpen} onClose={closeDialog}>
        <DialogTitle>Create New DM</DialogTitle>
        <DialogContent>
          <Input
            placeholder="Enter their user ID"
            fullWidth
            value={newUserId}
            onChange={e => setNewUserId(e.target.value)}
          />
          {dialogError && (
            <Typography color="danger" sx={{ mt: 1 }}>
              {dialogError}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button variant="plain" onClick={closeDialog}>
            Cancel
          </Button>
          <Button variant="solid" disabled={!newUserId.trim()} onClick={handleCreateDM}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FriendsList;