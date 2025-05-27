import React, { useState, useEffect } from 'react';
import { Box, Tooltip, Typography, IconButton, Button, DialogTitle, DialogContent, DialogActions, Input } from '@mui/joy';
import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';
import styles from '../styles/Components/ServerList.module.scss';
import { userService, chatService } from '../hooks/api';
import { Chat } from '../types';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';

interface ServerListProps {
  userId: string;
  selectedServer: string;
  onServerChange: (serverId: string) => void;
  onToggleFriends: () => void;
}

export default function ServerList({
  userId,
  selectedServer,
  onServerChange,
  onToggleFriends
}: ServerListProps) {
  const [servers, setServers] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  // Dialog state for creating a server
  const [dialogOpen, setDialogOpen] = useState(false);
  const [serverName, setServerName] = useState('');
  const [userId1, setUserId1] = useState('');
  const [userId2, setUserId2] = useState('');
  const [userId3, setUserId3] = useState('');
  const [dialogError, setDialogError] = useState('');

  const fetchServers = () => {
    if (!userId) return;
    setLoading(true);
    userService
      .getUserChats(userId)
      .then(res => {
        const data = res.data as unknown;
        let chats: Chat[] = [];

        if (Array.isArray(data)) {
          chats = data;
        } else if (
          typeof data === 'object' &&
          data !== null &&
          'rows' in data &&
          Array.isArray((data as { rows: Chat[] }).rows)
        ) {
          chats = (data as { rows: Chat[] }).rows;
        }

        setServers(chats);
        setError('');
      })
      .catch(err => {
        console.error(err);
        setError('Could not load your servers.');
      })
      .finally(() => setLoading(false));
  };

  useEffect(fetchServers, [userId]);

  const openDialog = () => {
    console.log('Opening create server dialog');
    setDialogError('');
    setServerName('');
    setUserId1('');
    setUserId2('');
    setUserId3('');
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setDialogError('');
  };

  const handleCreateServer = async () => {
    setDialogError('');
    try {
      // Create the server
      const createRes = await chatService.create(serverName);
      const chatId = createRes.data.message[0]?.id;
      if (!chatId) {
        throw new Error('Server creation failed');
      }

      // Join the creator
      await chatService.join(chatId, userId);
      // Join additional users
      const extraIds = [userId1, userId2, userId3].filter(id => id.trim());
      for (const uid of extraIds) {
        await chatService.join(chatId, uid);
      }

      // Select new server and refresh
      onServerChange(chatId);
      fetchServers();
      closeDialog();
    } catch (err) {
      console.error('Error creating server:', err);
      if (axios.isAxiosError(err)) {
        setDialogError(err.response?.data?.message || 'Error creating server.');
      } else {
        setDialogError((err as Error).message);
      }
    }
  };

  if (loading) return <Typography>Loading servers…</Typography>;
  if (error) return <Typography color="danger">{error}</Typography>;

  return (
    <>
      <Box className={styles.serverList}>
        <Tooltip title="Friends List" placement="right">
          <IconButton
            variant="plain"
            color="neutral"
            size="md"
            onClick={onToggleFriends}
            className={`${styles.serverIcon} ${styles.addServer}`}
          >
            <HomeIcon />
          </IconButton>
        </Tooltip>

        {servers.map(server => (
          <Tooltip key={server.id} title={server.name} placement="right">
            <IconButton
              variant="plain"
              size="md"
              onClick={() => onServerChange(server.id)}
              className={`${styles.serverIcon} ${
                server.id === selectedServer ? styles.active : ''
              }`}
            >
              <Typography sx={{ color: 'white' }}>{server.name}</Typography>
            </IconButton>
          </Tooltip>
        ))}

        <Tooltip title="Add Server" placement="right">
          <IconButton
            variant="plain"
            color="neutral"
            size="md"
            onClick={openDialog}
            className={`${styles.serverIcon} ${styles.addServer}`}
          >
            <AddIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <Dialog open={dialogOpen} onClose={closeDialog}>
        <DialogTitle>Create New Server</DialogTitle>
        <DialogContent>
          <Input
            placeholder="Server Name"
            fullWidth
            value={serverName}
            onChange={e => setServerName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Input
            placeholder="User ID 1"
            fullWidth
            value={userId1}
            onChange={e => setUserId1(e.target.value)}
            sx={{ mb: 1 }}
          />
          <Input
            placeholder="User ID 2"
            fullWidth
            value={userId2}
            onChange={e => setUserId2(e.target.value)}
            sx={{ mb: 1 }}
          />
          <Input
            placeholder="User ID 3"
            fullWidth
            value={userId3}
            onChange={e => setUserId3(e.target.value)}
          />
          {dialogError && (
            <Typography color="danger" sx={{ mt: 1 }}>
              {dialogError}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button variant="plain" onClick={closeDialog}>Cancel</Button>
          <Button
            variant="solid"
            disabled={!serverName.trim()}
            onClick={handleCreateServer}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
