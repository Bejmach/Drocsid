import React, { useEffect, useState } from 'react';
import { Box, Tooltip } from '@mui/joy';
import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';
import { Typography } from '@mui/joy';
import styles from '../styles/Components/ServerList.module.scss';
import { userService } from '../hooks/api';
import { Chat } from '../types';

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

  useEffect(() => {
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
          Array.isArray((data as { rows: unknown }).rows)
        ) {
          chats = (data as { rows: Chat[] }).rows;
        }

        setServers(chats);
      })
      .catch(err => {
        console.error(err);
        setError('Could not load your servers.');
      })
      .finally(() => setLoading(false));
  }, [userId]);

  if (loading) return <Typography>Loading servers…</Typography>;
  if (error)   return <Typography color="danger">{error}</Typography>;

  return (
    <Box className={styles.serverList}>
      <Tooltip title="Friends List" placement="right">
        <button
          className={`${styles.serverIcon} ${styles.addServer}`}
          onClick={onToggleFriends}
        >
          <HomeIcon />
        </button>
      </Tooltip>

      {servers.map(server => (
        <Tooltip key={server.id} title={server.name} placement="right">
          <button
            className={`${styles.serverIcon} ${
              server.id === selectedServer ? styles.active : ''
            }`}
            onClick={() => onServerChange(server.id)}
          >
            <Typography sx={{ color: 'white' }}>
              {server.name}
            </Typography>
          </button>
        </Tooltip>
      ))}

      <Tooltip title="Add Server" placement="right">
        <button className={`${styles.serverIcon} ${styles.addServer}`}>
          <AddIcon />
        </button>
      </Tooltip>
    </Box>
  );
}
