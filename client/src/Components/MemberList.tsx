import { List, ListItem, Typography, Box, Avatar } from '@mui/joy';
import styles from '../styles/Components/MemberList.module.scss';

interface Member {
  id: string;
  username: string;
  status: 'online' | 'offline' | 'idle';
}

const MemberList: React.FC = () => {
  const members: Member[] = [
    { id: '1', username: 'User1', status: 'online' },
    { id: '2', username: 'User2', status: 'idle' }
  ];

  return (
    <Box className={styles.memberList}>
      <Typography level="title-lg" sx={{ color: 'white', p: 2 }}>
        Online Members
      </Typography>
      <List>
        {members.map((member) => (
          <ListItem key={member.id} className={styles.memberItem}>
            <Avatar size="sm" />
            <Typography className={styles.memberName}>
              {member.username}
            </Typography>
            <Box className={`${styles.statusIndicator} ${styles[member.status]}`} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default MemberList;