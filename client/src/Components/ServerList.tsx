// MultipleFiles/ServerList.tsx
import { Box, Tooltip } from '@mui/joy';
import AddIcon from '@mui/icons-material/Add';
import styles from '../styles/Components/ServerList.module.scss';
import { Typography } from '@mui/joy';
import HomeIcon from '@mui/icons-material/Home';

const servers = [
  { id: '1', icon: 'A', name: 'Server A', tooltip: 'Server A' },
  { id: '2', icon: 'B', name: 'Server B', tooltip: 'Server B' },
];

interface ServerListProps {
  selectedServer: string;
  onServerChange: (serverId: string) => void;
  onToggleFriends: () => void;
}

export default function ServerList({ 
  selectedServer, 
  onServerChange,
  onToggleFriends 
}: ServerListProps) {
  return (
    <Box className={styles.serverList}>
      <Tooltip title="Friends List" placement="right">
        <button 
          className={`${styles.serverIcon} ${styles.addServer}`}
          onClick={onToggleFriends}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <HomeIcon />
          </Box>
        </button>
      </Tooltip>

      {servers.map((server) => (
        <Tooltip key={server.id} title={server.tooltip} placement="right">
          <button
            className={`serverButton ${styles.serverIcon} ${server.id === selectedServer ? styles.active : ''}`}
            onClick={() => onServerChange(server.id)}
          > 
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {server.icon}
              <Typography sx={{ color: 'white' }}>{server.name}</Typography>
            </Box>
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