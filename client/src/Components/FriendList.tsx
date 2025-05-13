import { Box, Tooltip } from '@mui/joy';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import styles from '../styles/Components/FriendList.module.scss';
import { Typography } from '@mui/joy';

interface Friend {
  id: string;
  username: string;
  status: 'online' | 'offline' | 'idle';
}

interface FriendsListProps {
  onBack: () => void;
  onSelectFriend: (friendId: string) => void;
  selectedServer: string;
}

const FriendsList: React.FC<FriendsListProps> = ({ 
  onBack,
  onSelectFriend,
  selectedServer
}) => {
  const friends: Friend[] = [
    { id: '1', username: 'User1', status: 'online' },
    { id: '2', username: 'User2', status: 'idle' },
    { id: '3', username: 'User3', status: 'online' },
    { id: '4', username: 'User4', status: 'offline' }
  ];

  return (
    <Box className={styles.friendsList}>
      <Tooltip title="Back to Servers" placement="right">
        <button 
          className={`${styles.friendsIcon} ${styles.addFriend}`}
          onClick={onBack}
        >
          <ArrowBackIcon />
        </button>
      </Tooltip>

      {friends.map((friend) => (
        <Tooltip key={friend.id} title={friend.username} placement="right">
          <button 
            className={`${styles.friendsIcon} ${styles.friendsButton} ${
              selectedServer === friend.id ? styles.active : ''
            }`}
            onClick={() => onSelectFriend(friend.id)}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
              <Box className={`${styles.statusIndicator} ${styles[friend.status]}`} />
              <Typography sx={{ color: 'white', textAlign: 'center' }}>{friend.username}</Typography>
            </Box>
          </button>
        </Tooltip>
      ))}

      <Tooltip title="Add Friend" placement="right">
        <button className={`${styles.friendsIcon} ${styles.addFriend}`}>
          <AddIcon />
        </button>
      </Tooltip>
    </Box>
  );
};

export default FriendsList;