import { Box, Tooltip } from '@mui/joy';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import styles from '../styles/Components/ServerList.module.scss';
import { Typography } from '@mui/joy';

interface Friend {
  id: string;
  username: string;
  status: 'online' | 'offline' | 'idle';
}

const FriendsList: React.FC = ({ onBack }: { onBack: () => void }) => {
  const friends: Friend[] = [
    { id: '1', username: 'User1', status: 'online' },
    { id: '2', username: 'User2', status: 'idle' },
    { id: '3', username: 'User3', status: 'online' },
    { id: '4', username: 'User4', status: 'offline' }
  ];

  return (
    <Box className={styles.serverList}>
      <Tooltip title="Back to Servers" placement="right">
        <button 
          className={`${styles.serverIcon} ${styles.addServer}`}
          onClick={onBack}
        >
          <ArrowBackIcon />
        </button>
      </Tooltip>

      {friends.map((friend) => (
        <Tooltip key={friend.id} title={friend.username} placement="right">
          <button className={`${styles.serverIcon} ${styles.serverButton}`}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box className={`${styles.statusIndicator} ${styles[friend.status]}`} />
              <Typography sx={{ color: 'white' }}>{friend.username}</Typography>
            </Box>
          </button>
        </Tooltip>
      ))}

      <Tooltip title="Add Friend" placement="right">
        <button className={`${styles.serverIcon} ${styles.addServer}`}>
          <AddIcon />
        </button>
      </Tooltip>
    </Box>
  );
};

export default FriendsList;