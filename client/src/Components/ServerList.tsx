import { Box, Tooltip } from '@mui/joy';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import styles from '../styles/Components/ServerList.module.scss';

const servers = [
  { id: 'home', icon: <HomeIcon />, tooltip: 'Home' },
  { id: '1', icon: 'A', tooltip: 'Server A' },
  { id: '2', icon: 'B', tooltip: 'Server B' },
];

interface ServerListProps {
  selectedServer: string;
  onServerChange: (serverId: string) => void;
}

export default function ServerList({ selectedServer, onServerChange }: ServerListProps) {
  return (
    <Box className={styles.serverList}>
      {servers.map((server) => (
        <Tooltip key={server.id} title={server.tooltip} placement="right">
          <button
            className={`${styles.serverIcon} ${server.id === selectedServer ? styles.active : ''}`}
            onClick={() => onServerChange(server.id)}
          >
            {server.icon}
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